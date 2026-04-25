import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkspaceProject } from '../../../models/workspace';
import { WorkspaceData } from '../../../services/workspace-data';

@Component({
  selector: 'app-esquisse',
  standalone: true,
  templateUrl: './esquisse.html',
  styleUrl: './esquisse.scss',
  imports:[RouterLink]
})
export class Esquisse implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  currentTool = 'mur';
  projectName = 'Projet';
  project: WorkspaceProject | null = null;
  statusMessage = 'Le canevas est pret pour les premiers traits.';
  private lastPoint: { x: number; y: number } | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly workspaceData: WorkspaceData
  ) {}

  ngOnInit(): void {
    const projectId =
      this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id');
    this.project = this.workspaceData.getProjectById(projectId);
    this.projectName = this.project?.name ?? 'Projet';
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resetCanvas(canvas);
    this.handleDraw(canvas);
  }

  setTool(tool: string) {
    this.currentTool = tool;
    this.statusMessage = `Outil actif: ${tool}.`;
  }

  resetCanvas(canvas: HTMLCanvasElement): void {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawGrid(canvas);
    this.drawProjectGuide();
  }

  drawGrid(canvas: HTMLCanvasElement) {
    const ctx = this.ctx;
    const size = 20;

    ctx.strokeStyle = '#d5e3dc';

    for (let x = 0; x < canvas.width; x += size) {
      for (let y = 0; y < canvas.height; y += size) {
        ctx.strokeRect(x, y, size, size);
      }
    }
  }

  drawProjectGuide(): void {
    if (!this.project) {
      return;
    }

    this.ctx.strokeStyle = '#173b35';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(80, 70, 280, 180);
    this.ctx.fillStyle = '#4d6b63';
    this.ctx.font = '14px Manrope';
    this.ctx.fillText(this.project.name, 80, 55);
  }

  handleDraw(canvas: HTMLCanvasElement) {
    let drawing = false;

    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      this.lastPoint = { x: e.offsetX, y: e.offsetY };

      if (this.currentTool === 'delete') {
        this.ctx.clearRect(e.offsetX - 12, e.offsetY - 12, 24, 24);
        this.statusMessage = 'Zone retiree de l esquisse.';
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!drawing || !this.lastPoint || this.currentTool === 'delete') {
        return;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.lineWidth = this.currentTool === 'mur' ? 3 : 2;
      this.ctx.strokeStyle =
        this.currentTool === 'porte'
          ? '#8b5e3c'
          : this.currentTool === 'fenetre'
            ? '#2d7ca6'
            : '#1f2937';
      this.ctx.stroke();
      this.lastPoint = { x: e.offsetX, y: e.offsetY };
    });

    canvas.addEventListener('mouseup', () => {
      drawing = false;
      this.lastPoint = null;
    });
  }

  save() {
    this.statusMessage = 'Esquisse enregistree localement. Prochaine etape: modelisation 2D.';
  }

  clearSketch(): void {
    this.resetCanvas(this.canvasRef.nativeElement);
    this.statusMessage = 'Le canevas a ete reinitialise.';
  }
}
