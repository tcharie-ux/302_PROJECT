import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Authentification,
  AuthenticationResponse,
} from '../../../services/authentification';
import { DashboardMetric, WorkspaceNotification, WorkspaceProject } from '../../../models/workspace';
import { WorkspaceData } from '../../../services/workspace-data';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin {
  readonly currentUser: AuthenticationResponse | null;
  readonly metrics: DashboardMetric[];
  readonly projects: WorkspaceProject[];
  readonly notifications: WorkspaceNotification[];

  constructor(
    private readonly authService: Authentification,
    private readonly router: Router,
    private readonly workspaceData: WorkspaceData
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.metrics = this.workspaceData.getDashboardMetrics('ADMIN');
    this.projects = this.workspaceData.getProjects().slice(0, 2);
    this.notifications = this.workspaceData.getNotifications().slice(0, 3);
  }

  manageUsers(): void {
    this.router.navigate(['/utilisateurs']);
  }

  openProject(projectId: string): void {
    this.router.navigate(['/modelisation', projectId, '3d']);
  }
}
