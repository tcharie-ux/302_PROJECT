import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Authentification, AuthenticationResponse } from './authentification';
import { Utilisateur } from '../models/utilisateur';

describe('Authentification', () => {
  let service: Authentification;
  let httpController: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [Authentification, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Authentification);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should normalize backend roles on login', () => {
    let response: AuthenticationResponse | null = null;

    service.login({ username: 'admin@example.com', password: 'secret123' }).subscribe((result) => {
      response = result;
    });

    const request = httpController.expectOne('/api/v1/login');
    expect(request.request.method).toBe('POST');
    request.flush({
      token: 'jwt-token',
      id: '550e8400-e29b-41d4-a716-446655440000',
      fullName: 'Admin Principal',
      username: 'admin@example.com',
      ministere: 12,
      direction: 'DIR-01',
      roles: ['ROLE_ADMIN'],
    });

    expect(response).toEqual(
      jasmine.objectContaining({
        fullName: 'Admin Principal',
        username: 'admin@example.com',
        roles: ['ADMIN'],
      })
    );
    expect(service.hasRole('Admin')).toBeTrue();
    expect(service.getDefaultDashboardRoute()).toBe('/dashboard-admin');
  });

  it('should normalize users returned by the backend', () => {
    let users: Utilisateur[] = [];

    service.getUsers().subscribe((result) => {
      users = result;
    });

    const request = httpController.expectOne('/api/v1/users');
    expect(request.request.method).toBe('GET');
    request.flush([
      {
        id: 1,
        fullName: 'Jean Dupont',
        username: 'jean@example.com',
        direction: 'BAT-A',
        roles: 'CLIENT',
      },
    ]);

    expect(users).toEqual([
      jasmine.objectContaining({
        id: 1,
        fullName: 'Jean Dupont',
        username: 'jean@example.com',
        email: 'jean@example.com',
        role: 'CLIENT',
        roles: ['CLIENT'],
      }),
    ]);
  });

  it('should normalize a legacy session stored in localStorage', () => {
    localStorage.setItem('auth_token', 'jwt-token');
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        token: 'jwt-token',
        id: '550e8400-e29b-41d4-a716-446655440000',
        fullName: 'Legacy Admin',
        username: 'legacy@example.com',
        ministere: 1,
        direction: 'DIR-02',
        roles: ['ROLE_ADMIN'],
      })
    );

    const currentUser = service.getCurrentUser();

    expect(currentUser?.roles).toEqual(['ADMIN']);
    expect(service.hasRole('ADMIN')).toBeTrue();
  });
});
