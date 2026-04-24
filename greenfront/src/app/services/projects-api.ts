import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { WorkspaceNotification, WorkspacePlanElement, WorkspaceProject } from '../models/workspace';

interface ProjetApiDto {
  id: number;
  nomProjet: string;
  description: string;
  statut: boolean;
  dateCreation?: string | null;
  nomClient?: string | null;
  nomArchitecte?: string | null;
  architectures?: Array<{ id?: number | null }>;
  modeles2D?: Array<{
    id?: number | null;
    nomModele?: string | null;
    objet?: string | null;
    modelisation3D?: {
      url_model?: string | null;
    } | null;
    elements?: Array<{
      id?: number | null;
      type?: string | null;
      longeur?: number | null;
      epaisseur?: number | null;
      hauteur?: number | null;
      position_X?: number | null;
      position_Y?: number | null;
    }>;
  }>;
}

interface ProjetElementApiDto {
  id?: number | null;
  type?: string | null;
  longeur?: number | null;
  epaisseur?: number | null;
  hauteur?: number | null;
  position_X?: number | null;
  position_Y?: number | null;
}

interface ProjetCreationPayload {
  nomProjet: string;
  description: string;
  emailArchitecte?: string | null;
}

interface NotificationApiDto {
  idNotification?: number | null;
  message?: string | null;
  statut?: string | null;
  typeNotification?: string | null;
  idProjet?: number | null;
  nomProjet?: string | null;
  dateEnvoie?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsApi {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<WorkspaceProject[]> {
    return this.http
      .get<ProjetApiDto[]>(`${this.apiBaseUrl}/v1/projects`)
      .pipe(map((projects) => projects.map((project) => this.normalizeProject(project))));
  }

  getProjectById(projectId: string): Observable<WorkspaceProject> {
    return this.http
      .get<ProjetApiDto>(`${this.apiBaseUrl}/v1/projects/${projectId}`)
      .pipe(map((project) => this.normalizeProject(project)));
  }

  createProject(payload: ProjetCreationPayload): Observable<WorkspaceProject> {
    return this.http
      .post<ProjetApiDto>(`${this.apiBaseUrl}/v1/projects`, payload)
      .pipe(map((project) => this.normalizeProject(project)));
  }

  getReceivedNotifications(): Observable<WorkspaceNotification[]> {
    return this.http
      .get<NotificationApiDto[]>(`${this.apiBaseUrl}/v1/notifications/received`)
      .pipe(
        map((notifications) =>
          notifications.map((notification) => this.normalizeNotification(notification))
        )
      );
  }

  private normalizeProject(project: ProjetApiDto): WorkspaceProject {
    const model2D = project.modeles2D?.[0];
    const elements = model2D?.elements?.map((element) => this.normalizeElement(element)) ?? [];
    const has3D = !!model2D?.modelisation3D?.url_model;
    const status = project.statut ? 'Actif' : 'Brouillon';
    const createdAt = project.dateCreation?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
    const progress = has3D ? 90 : model2D ? 65 : project.architectures?.length ? 35 : 15;

    return {
      id: String(project.id),
      name: project.nomProjet,
      type: 'Projet backend',
      location: 'A renseigner',
      status,
      progress,
      createdAt,
      updatedAt: createdAt,
      clientName: project.nomClient || 'Client',
      architectName: project.nomArchitecte || 'Architecte non assigne',
      summary: project.description,
      dimensions: this.inferDimensions(elements),
      splineSceneUrl: model2D?.modelisation3D?.url_model || '',
      materialsReady: false,
      elements,
      stages: [
        {
          key: 'esquisse',
          label: 'Esquisse',
          description: 'Esquisses et documents du projet.',
          status: project.architectures?.length ? 'done' : 'active',
        },
        {
          key: '2d',
          label: 'Modelisation 2D',
          description: 'Modele 2D et elements de plan.',
          status: model2D ? 'active' : 'pending',
        },
        {
          key: '3d',
          label: 'Modelisation 3D',
          description: 'Scene immersive Spline.',
          status: has3D ? 'active' : 'pending',
        },
        {
          key: 'estimation',
          label: 'Estimation',
          description: 'Chiffrage futur.',
          status: 'pending',
        },
      ],
    };
  }

  private normalizeElement(element: ProjetElementApiDto): WorkspacePlanElement {
    const rawKind = (element.type || '').toLowerCase();
    const kind: WorkspacePlanElement['kind'] =
      rawKind.includes('porte')
        ? 'door'
        : rawKind.includes('fen')
          ? 'window'
          : rawKind.includes('poteau')
            ? 'column'
            : 'wall';

    return {
      id: String(element.id ?? crypto.randomUUID()),
      kind,
      label: element.type || 'Element',
      length: element.longeur ?? 1,
      thickness: element.epaisseur ?? 0.2,
      height: element.hauteur ?? 3,
      x: element.position_X ?? 40,
      y: element.position_Y ?? 40,
      material: 'A definir',
    };
  }

  private inferDimensions(elements: WorkspacePlanElement[]): WorkspaceProject['dimensions'] {
    if (!elements.length) {
      return {
        length: 10,
        width: 8,
        height: 3,
        floors: 1,
      };
    }

    const longest = Math.max(...elements.map((element) => element.length), 10);
    const tallest = Math.max(...elements.map((element) => element.height), 3);

    return {
      length: Math.round(longest),
      width: Math.max(8, Math.round(longest * 0.65)),
      height: Math.round(tallest * 10) / 10,
      floors: 1,
    };
  }

  private normalizeNotification(notification: NotificationApiDto): WorkspaceNotification {
    const level: WorkspaceNotification['level'] =
      (notification.statut || '').toUpperCase().includes('ACCEP')
        ? 'success'
        : (notification.statut || '').toUpperCase().includes('ATTENTE')
          ? 'warning'
          : 'info';

    return {
      id: String(notification.idNotification ?? crypto.randomUUID()),
      title: notification.nomProjet || notification.typeNotification || 'Notification',
      message: notification.message || '',
      level,
      createdAt: notification.dateEnvoie?.replace('T', ' ').slice(0, 16) || 'Date indisponible',
      projectId: notification.idProjet ? String(notification.idProjet) : undefined,
    };
  }
}
