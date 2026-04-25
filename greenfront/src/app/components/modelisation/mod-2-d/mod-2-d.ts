import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceProject } from '../../../models/workspace';
import { WorkspaceData } from '../../../services/workspace-data';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-mod-2-d',
  standalone: true,
  templateUrl: './mod-2-d.html',
  styleUrl: './mod-2-d.scss',
 imports: [FormsModule]
})
export class Mod2D implements OnInit, AfterViewInit {
  @ViewChild('planCanvas') planCanvasRef!: ElementRef<HTMLCanvasElement>;

  currentTool = 'mur';
  projectName = 'Projet';
  project: WorkspaceProject | null = null;
  planReady = false;
  statusMessage = 'Renseigne les dimensions puis valide le plan 2D.';
  dimensionDraft = {
    length: 0,
    width: 0,
    height: 0,
    floors: 1,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly workspaceData: WorkspaceData
  ) {}

  ngOnInit(): void {
    const projectId =
      this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id');
    this.project = this.workspaceData.getProjectById(projectId);
    this.projectName = this.project?.name ?? 'Projet';

    if (this.project) {
      this.dimensionDraft = { ...this.project.dimensions };
    }
  }

  ngAfterViewInit(): void {
    this.planReady = true;
    this.renderPlan();
  }

  setTool(tool: string) {
    this.currentTool = tool;
    this.statusMessage = `Outil actif: ${tool}.`;
  }

  applyDimensions(): void {
    if (!this.project) {
      return;
    }

    this.project = {
      ...this.project,
      dimensions: { ...this.dimensionDraft },
    };
    this.renderPlan();
    this.statusMessage = 'Plan 2D rafraichi avec les nouvelles dimensions.';
  }

  save() {
    this.statusMessage = 'Configuration 2D sauvegardee. La scene est prete a etre poussee vers la 3D.';
  }

  goTo3D(): void {
    if (!this.project) {
      return;
    }

    this.router.navigate(['/modelisation', this.project.id, '3d']);
  }

  get surface(): number {
    return this.dimensionDraft.length * this.dimensionDraft.width;
  }

  private renderPlan(): void {
    if (!this.planReady || !this.project) {
      return;
    }

    const canvas = this.planCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f7fbf9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 60;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;
    const scale = Math.min(
      availableWidth / Math.max(this.dimensionDraft.length, 1),
      availableHeight / Math.max(this.dimensionDraft.width, 1)
    );

    const width = this.dimensionDraft.length * scale;
    const height = this.dimensionDraft.width * scale;
    const originX = (canvas.width - width) / 2;
    const originY = (canvas.height - height) / 2;

    ctx.strokeStyle = '#173b35';
    ctx.lineWidth = 3;
    ctx.strokeRect(originX, originY, width, height);

    for (const element of this.project.elements) {
      ctx.lineWidth = element.kind === 'wall' ? 4 : 3;
      ctx.strokeStyle =
        element.kind === 'door'
          ? '#8b5e3c'
          : element.kind === 'window'
            ? '#2d7ca6'
            : element.kind === 'column'
              ? '#56796f'
              : '#173b35';

      const x = originX + element.x * 0.8;
      const y = originY + element.y * 0.55;
      const length = Math.max(element.length * scale * 0.35, 12);

      if (element.kind === 'column') {
        ctx.fillStyle = '#56796f';
        ctx.fillRect(x, y, 12, 12);
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#4f6d65';
    ctx.font = '14px Manrope';
    ctx.fillText(
      `${this.dimensionDraft.length}m x ${this.dimensionDraft.width}m`,
      originX,
      originY - 18
    );
  }
}
