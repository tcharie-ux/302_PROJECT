import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Authentification,
  AuthenticationResponse,
} from '../../../services/authentification';
import { WorkspaceData } from '../../../services/workspace-data';
import { DashboardMetric, WorkspaceNotification, WorkspaceProject } from '../../../models/workspace';

@Component({
  selector: 'app-dashboard-client',
  standalone: false,
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient {
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
    this.metrics = this.workspaceData.getDashboardMetrics('CLIENT');
    this.projects = this.workspaceData.getProjects().slice(0, 2);
    this.notifications = this.workspaceData.getNotifications().slice(0, 2);
  }

  openProject(projectId: string): void {
    this.router.navigate(['/modelisation', projectId, 'esquisse']);
  }

  goToProjects(): void {
    this.router.navigate(['/mesprojets']);
  }

  createProject(): void {
    this.router.navigate(['/projets/nouveau']);
  }
}
