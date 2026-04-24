import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceNotification } from '../../../models/workspace';
import { ProjectsApi } from '../../../services/projects-api';
import { WorkspaceData } from '../../../services/workspace-data';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  notifications: WorkspaceNotification[];
  errorMessage = '';

  constructor(
    private readonly router: Router,
    private readonly projectsApi: ProjectsApi,
    private readonly workspaceData: WorkspaceData
  ) {
    this.notifications = this.workspaceData.getNotifications();
    this.loadNotifications();
  }

  openProject(projectId?: string): void {
    if (!projectId) {
      return;
    }

    this.router.navigate(['/modelisation', projectId, 'esquisse']);
  }

  private loadNotifications(): void {
    this.projectsApi
      .getReceivedNotifications()
      .pipe(
        catchError(() => {
          this.errorMessage =
            "Backend notifications indisponible pour l instant. Affichage des donnees locales.";
          return of(this.workspaceData.getNotifications());
        })
      )
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }
}
