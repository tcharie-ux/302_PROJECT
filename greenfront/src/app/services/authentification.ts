import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

interface ApiAuthenticationResponse {
  token: string;
  id: string | null;
  fullName?: string | null;
  username?: string | null;
  ministere: number | null;
  direction: string | null;
  roles?: string[] | string | null;
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
  fullName: string;
  username: string;
  password: string;
  invitationToken?: string | null;
}

interface ApiUser {
  id?: string | number | null;
  nom?: string | null;
  prenom?: string | null;
  fullName?: string | null;
  email?: string | null;
  username?: string | null;
  role?: string | null;
  roles?: string[] | string | null;
  direction?: string | null;
  ministere?: number | null;
  enable?: boolean;
  createdAt?: string | null;
}

interface UsersApiResponse {
  content?: ApiUser[];
  users?: ApiUser[];
  data?: ApiUser[];
}

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly tokenStorageKey = 'auth_token';
  private readonly userStorageKey = 'auth_user';

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<ApiAuthenticationResponse>(`${this.apiBaseUrl}/v1/login`, payload)
      .pipe(
        map((response) => this.normalizeAuthenticationResponse(response)),
        tap((response) => this.storeSession(response))
      );
  }

  register(payload: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.apiBaseUrl}/v1/register`, payload);
  }

  getUsers(): Observable<Utilisateur[]> {
    return this.http
      .get<ApiUser[] | UsersApiResponse>(`${this.apiBaseUrl}/v1/users`)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          return response.content ?? response.users ?? response.data ?? [];
        }),
        map((users) => users.map((user) => this.normalizeUser(user)))
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
      const parsed = JSON.parse(raw) as ApiAuthenticationResponse;
      const normalized = this.normalizeAuthenticationResponse(parsed);
      localStorage.setItem(this.userStorageKey, JSON.stringify(normalized));
      return normalized;
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

    const normalizedRole = this.normalizeRole(role);
    return currentUser.roles.some((userRole) => this.normalizeRole(userRole) === normalizedRole);
  }

  getDefaultDashboardRoute(): string {
    if (this.hasRole('ADMIN')) {
      return '/dashboard-admin';
    }

    if (this.hasRole('ARCHITECTE')) {
      return '/dashboard-architecte';
    }

    return '/dashboard-client';
  }

  private storeSession(response: AuthenticationResponse): void {
    localStorage.setItem(this.tokenStorageKey, response.token);
    localStorage.setItem(this.userStorageKey, JSON.stringify(response));
  }

  private normalizeAuthenticationResponse(
    response: ApiAuthenticationResponse
  ): AuthenticationResponse {
    return {
      token: response.token,
      id: response.id ?? null,
      fullName: response.fullName?.trim() ?? '',
      username: response.username?.trim() ?? '',
      ministere: response.ministere ?? null,
      direction: response.direction ?? null,
      roles: this.normalizeRoles(response.roles),
    };
  }

  private normalizeUser(user: ApiUser): Utilisateur {
    const fullName = user.fullName?.trim() || this.combineFullName(user.prenom, user.nom);
    const normalizedRoles = this.normalizeRoles(user.roles ?? user.role);
    const { prenom, nom } = this.splitFullName(fullName);

    return {
      id: user.id ?? null,
      nom,
      prenom,
      fullName: fullName || null,
      email: user.email ?? user.username ?? '',
      username: user.username ?? user.email ?? null,
      role: normalizedRoles[0] ?? null,
      roles: normalizedRoles,
      direction: user.direction ?? null,
      ministere: user.ministere ?? null,
      enable: user.enable ?? true,
      createdAt: user.createdAt ?? null,
    };
  }

  private normalizeRoles(roles: string[] | string | null | undefined): string[] {
    if (!roles) {
      return [];
    }

    const values = Array.isArray(roles) ? roles : [roles];
    return values.map((role) => this.normalizeRole(role)).filter(Boolean);
  }

  private normalizeRole(role: string | null | undefined): string {
    return (role ?? '').replace(/^ROLE_/i, '').trim().toUpperCase();
  }

  private combineFullName(prenom?: string | null, nom?: string | null): string {
    return `${prenom ?? ''} ${nom ?? ''}`.trim();
  }

  private splitFullName(fullName: string): { prenom: string; nom: string } {
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 0) {
      return { prenom: '', nom: '' };
    }

    if (parts.length === 1) {
      return { prenom: '', nom: parts[0] };
    }

    return {
      prenom: parts[0],
      nom: parts.slice(1).join(' '),
    };
  }
}
