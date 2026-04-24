import { Component } from '@angular/core';
import { Authentification } from '../../services/authentification';
import { ProfilePreferences, UserRole } from '../../models/workspace';
import { WorkspaceData } from '../../services/workspace-data';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.html',
  styleUrl: './client.scss',
})
export class Client {
  successMessage = '';
  readonly profile: ProfilePreferences;

  constructor(
    private readonly authService: Authentification,
    private readonly workspaceData: WorkspaceData
  ) {
    const currentUser = this.authService.getCurrentUser();
    const role: UserRole = this.authService.hasRole('ADMIN')
      ? 'ADMIN'
      : this.authService.hasRole('ARCHITECTE')
        ? 'ARCHITECTE'
        : 'CLIENT';

    this.profile = this.workspaceData.getProfile(
      role,
      currentUser?.fullName || 'Utilisateur',
      currentUser?.username || 'utilisateur@example.com'
    );
  }

  saveProfile(): void {
    this.successMessage = 'Le profil local a ete mis a jour. Il ne reste plus qu a relier le backend profil.';
  }
}
