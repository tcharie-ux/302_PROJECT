import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  id: string | null;
  fullName: string;
  username: string;
  ministere: number | null;
  direction: string | null;
  roles: string[];
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

interface UsersApiResponse {
  content?: Utilisateur[];
  users?: Utilisateur[];
  data?: Utilisateur[];
}

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  private readonly apiBaseUrl = 'http://localhost:8080/api';
  private readonly tokenStorageKey = 'auth_token';
  private readonly userStorageKey = 'auth_user';

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiBaseUrl}/v1/login`, payload)
      .pipe(tap((response) => this.storeSession(response)));
  }

  register(payload: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.apiBaseUrl}/v1/register`, payload);
  }

  getUsers(): Observable<Utilisateur[]> {
    return this.http
      .get<Utilisateur[] | UsersApiResponse>(`${this.apiBaseUrl}/v1/users`)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          return response.content ?? response.users ?? response.data ?? [];
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.userStorageKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  getCurrentUser(): AuthenticationResponse | null {
    const raw = localStorage.getItem(this.userStorageKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthenticationResponse;
    } catch {
      this.logout();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.roles?.length) {
      return false;
    }

    return currentUser.roles.some((userRole) => userRole.toLowerCase() === role.toLowerCase());
  }

  getDefaultDashboardRoute(): string {
    return this.hasRole('Admin') ? '/dashboard-admin' : '/dashboard-client';
  }

  private storeSession(response: AuthenticationResponse): void {
    localStorage.setItem(this.tokenStorageKey, response.token);
    localStorage.setItem(this.userStorageKey, JSON.stringify(response));
  }
}
