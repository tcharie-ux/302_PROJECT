import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardMetric, WorkspaceProject } from '../../../models/workspace';
import { WorkspaceData } from '../../../services/workspace-data';

@Component({
  selector: 'app-dash-architecte',
  standalone: false,
  templateUrl: './dash-architecte.html',
  styleUrl: './dash-architecte.scss',
})
export class DashArchitecte {
  readonly metrics: DashboardMetric[];
  readonly projects: WorkspaceProject[];

  constructor(
    private readonly router: Router,
    private readonly workspaceData: WorkspaceData
  ) {
    this.metrics = this.workspaceData.getDashboardMetrics('ARCHITECTE');
    this.projects = this.workspaceData.getProjects();
  }

  openProject(projectId: string): void {
    this.router.navigate(['/modelisation', projectId, '2d']);
  }
}
