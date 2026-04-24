import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceProject } from '../../../models/workspace';
import { WorkspaceData } from '../../../services/workspace-data';

@Component({
  selector: 'app-mod-3-d',
  standalone: false,
  templateUrl: './mod-3-d.html',
  styleUrl: './mod-3-d.scss',
})
export class Mod3D implements OnInit {
  project: WorkspaceProject | null = null;
  viewerAvailable = false;
  viewerLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly workspaceData: WorkspaceData
  ) {}

  async ngOnInit(): Promise<void> {
    const projectId =
      this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id');
    this.project = this.workspaceData.getProjectById(projectId);
    await this.loadViewer();
  }

  get estimatedVolume(): number {
    if (!this.project) {
      return 0;
    }

    return (
      this.project.dimensions.length *
      this.project.dimensions.width *
      this.project.dimensions.height *
      this.project.dimensions.floors
    );
  }

  get sceneUrl(): string {
    return this.project?.splineSceneUrl || '';
  }

  get canRenderViewer(): boolean {
    return this.viewerAvailable && !!this.sceneUrl;
  }

  private async loadViewer(): Promise<void> {
    if (typeof window === 'undefined') {
      this.viewerLoading = false;
      return;
    }

    if (!window.customElements?.get('spline-viewer')) {
      await import('@splinetool/viewer');
    }

    this.viewerAvailable = !!window.customElements?.get('spline-viewer');
    this.viewerLoading = false;
  }
}
