import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Authentification,
  AuthenticationResponse,
} from '../../../services/authentification';

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin {
  readonly currentUser: AuthenticationResponse | null;

  constructor(
    private readonly authService: Authentification,
    private readonly router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
