import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Authentification,
  AuthenticationResponse,
} from '../../../services/authentification';

@Component({
  selector: 'app-dashboard-client',
  standalone: false,
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient {
  readonly currentUser: AuthenticationResponse | null;
  readonly isAdmin: boolean;

  constructor(
    private readonly authService: Authentification,
    private readonly router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.hasRole('Admin');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
