import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProjectStage, WorkspaceProject } from '../../models/workspace';
import { ProjectsApi } from '../../services/projects-api';
import { WorkspaceData } from '../../services/workspace-data';

@Component({
  selector: 'app-modelisation',
  standalone: false,
  templateUrl: './modelisation.html',
  styleUrl: './modelisation.scss',
})
export class Modelisation implements OnInit {
  projectId: string | null = null;
  project: WorkspaceProject | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectsApi: ProjectsApi,
    private readonly workspaceData: WorkspaceData
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.project = this.workspaceData.getProjectById(this.projectId);

    if (this.projectId) {
      this.projectsApi
        .getProjectById(this.projectId)
        .pipe(catchError(() => of(this.workspaceData.getProjectById(this.projectId))))
        .subscribe((project) => {
          if (project) {
            this.workspaceData.upsertApiProject(project);
            this.project = project;
          }
        });
    }
  }

  get stageLinks(): Array<ProjectStage & { route: string }> {
    if (!this.projectId || !this.project) {
      return [];
    }

    return this.project.stages.map((stage) => ({
      ...stage,
      route: `/modelisation/${this.projectId}/${stage.key}`,
    }));
  }

  get floorArea(): number {
    if (!this.project) {
      return 0;
    }

    return this.project.dimensions.length * this.project.dimensions.width;
  }
}
