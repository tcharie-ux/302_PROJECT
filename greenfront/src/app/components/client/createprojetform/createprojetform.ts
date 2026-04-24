import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsApi } from '../../../services/projects-api';
import { WorkspaceData } from '../../../services/workspace-data';

@Component({
  selector: 'app-createprojetform',
  standalone: false,
  templateUrl: './createprojetform.html',
  styleUrl: './createprojetform.scss',
})
export class Createprojetform {
  successMessage = '';
  projectDraft = {
    name: '',
    location: '',
    buildingType: 'maison',
    architectEmail: '',
    length: 10,
    width: 8,
    height: 3,
    floors: 1,
  };

  constructor(
    private readonly router: Router,
    private readonly projectsApi: ProjectsApi,
    private readonly workspaceData: WorkspaceData
  ) {}

  submitForm(): void {
    this.successMessage = '';
    const description = [
      `Type: ${this.projectDraft.buildingType}`,
      `Localisation: ${this.projectDraft.location || 'a preciser'}`,
      `Dimensions: ${this.projectDraft.length}m x ${this.projectDraft.width}m x ${this.projectDraft.height}m`,
      `Niveaux: ${this.projectDraft.floors}`,
    ].join(' | ');

    this.projectsApi
      .createProject({
        nomProjet: this.projectDraft.name || 'Projet sans nom',
        description,
        emailArchitecte: this.projectDraft.architectEmail || null,
      })
      .subscribe({
        next: (project) => {
          this.workspaceData.upsertApiProject(project);
          this.successMessage = 'Projet cree via le backend. Redirection vers la modelisation.';
          this.router.navigate(['/modelisation', project.id, 'esquisse']);
        },
        error: (error) => {
          this.successMessage =
            error?.error?.message ||
            error?.error?.error ||
            "Le backend a refuse la creation. Verifie le token et le format des champs.";
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/mesprojets']);
  }
}
