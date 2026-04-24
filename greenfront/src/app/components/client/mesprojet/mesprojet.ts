import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceProject } from '../../../models/workspace';
import { ProjectsApi } from '../../../services/projects-api';
import { WorkspaceData } from '../../../services/workspace-data';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-mesprojet',
  standalone: false,
  templateUrl: './mesprojet.html',
  styleUrl: './mesprojet.scss',
})
export class Mesprojet {
  projects: WorkspaceProject[];
  searchTerm = '';
  loading = true;
  errorMessage = '';

  constructor(
    private readonly router: Router,
    private readonly projectsApi: ProjectsApi,
    private readonly workspaceData: WorkspaceData
  ) {
    this.projects = this.workspaceData.getProjects();
    this.loadProjects();
  }

  get filteredProjects(): WorkspaceProject[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.projects;
    }

    return this.projects.filter((project) =>
      [project.name, project.location, project.type, project.status]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }

  openProject(projectId: string): void {
    this.router.navigate(['/modelisation', projectId, 'esquisse']);
  }

  private loadProjects(): void {
    this.loading = true;

    this.projectsApi
      .getProjects()
      .pipe(
        catchError(() => {
          this.errorMessage =
            "Backend projets indisponible pour l instant. Affichage des donnees locales.";
          return of(this.workspaceData.getProjects());
        })
      )
      .subscribe((projects) => {
        this.projects = projects;
        this.workspaceData.setApiProjects(projects);
        this.loading = false;
      });
  }
}
