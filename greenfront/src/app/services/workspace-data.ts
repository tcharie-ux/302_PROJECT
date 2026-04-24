import { Injectable } from '@angular/core';
import {
  DashboardMetric,
  ProfilePreferences,
  UserRole,
  WorkspaceNotification,
  WorkspacePlanElement,
  WorkspaceProject,
} from '../models/workspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceData {
  private apiProjects: WorkspaceProject[] = [];
  private readonly projects: WorkspaceProject[] = [
    {
      id: 'PRJ-001',
      name: 'Villa ArchiMorph',
      type: 'Villa moderne',
      location: 'Lome, Togo',
      status: 'En modelisation',
      progress: 68,
      createdAt: '2026-04-08',
      updatedAt: '2026-04-23',
      clientName: 'Laure Essah',
      architectName: 'Nadia Kossi',
      summary:
        "Residence R+1 avec sejour traversant, cuisine ouverte et grande terrasse orientee sud.",
      dimensions: {
        length: 18,
        width: 11,
        height: 3.4,
        floors: 2,
      },
      splineSceneUrl: 'https://prod.spline.design/votre-scene/scene.splinecode',
      materialsReady: false,
      elements: [
        this.createElement('EL-01', 'wall', 'Mur facade nord', 18, 0.2, 3.4, 30, 40, 'Beton arme'),
        this.createElement('EL-02', 'wall', 'Mur facade sud', 18, 0.2, 3.4, 30, 240, 'Beton arme'),
        this.createElement('EL-03', 'wall', 'Mur lateral ouest', 11, 0.2, 3.4, 30, 40, 'Beton arme'),
        this.createElement('EL-04', 'wall', 'Mur lateral est', 11, 0.2, 3.4, 340, 40, 'Beton arme'),
        this.createElement('EL-05', 'door', 'Entree principale', 1.2, 0.08, 2.4, 165, 238, 'Bois massif'),
        this.createElement('EL-06', 'window', 'Baie sejour', 2.4, 0.08, 1.6, 120, 38, 'Aluminium'),
        this.createElement('EL-07', 'column', 'Poteau angle', 0.4, 0.4, 3.4, 44, 44, 'Beton arme'),
      ],
      stages: [
        {
          key: 'esquisse',
          label: 'Esquisse',
          description: 'Croquis fonctionnel et implantation des volumes.',
          status: 'done',
        },
        {
          key: '2d',
          label: 'Modelisation 2D',
          description: 'Plans cotes, murs, ouvertures et structure.',
          status: 'active',
        },
        {
          key: '3d',
          label: 'Modelisation 3D',
          description: 'Previsualisation immersive pour Spline IA.',
          status: 'pending',
        },
        {
          key: 'estimation',
          label: 'Estimation',
          description: 'Preparation du chiffrage materiaux.',
          status: 'pending',
        },
      ],
    },
    {
      id: 'PRJ-002',
      name: 'Residence Horizon',
      type: 'Maison familiale',
      location: 'Kara, Togo',
      status: 'Validation client',
      progress: 42,
      createdAt: '2026-03-28',
      updatedAt: '2026-04-20',
      clientName: 'Kodjo Mensah',
      architectName: 'Afi Lawson',
      summary: 'Maison de plain-pied 4 chambres avec patio central et bureau annexe.',
      dimensions: {
        length: 16,
        width: 12,
        height: 3.2,
        floors: 1,
      },
      splineSceneUrl: '',
      materialsReady: false,
      elements: [
        this.createElement('EL-11', 'wall', 'Mur principal', 16, 0.2, 3.2, 30, 50, 'Agglo creux'),
        this.createElement('EL-12', 'door', 'Porte salon', 1.1, 0.08, 2.2, 176, 248, 'Bois'),
        this.createElement('EL-13', 'window', 'Fenetre chambre', 1.8, 0.08, 1.4, 110, 48, 'Aluminium'),
      ],
      stages: [
        {
          key: 'esquisse',
          label: 'Esquisse',
          description: 'Esquisse validee.',
          status: 'done',
        },
        {
          key: '2d',
          label: 'Modelisation 2D',
          description: 'Plans techniques en revision.',
          status: 'active',
        },
        {
          key: '3d',
          label: 'Modelisation 3D',
          description: 'Generation 3D en attente.',
          status: 'pending',
        },
        {
          key: 'estimation',
          label: 'Estimation',
          description: 'Bloc estimation a venir.',
          status: 'pending',
        },
      ],
    },
  ];

  private readonly notifications: WorkspaceNotification[] = [
    {
      id: 'NOTIF-1',
      title: 'Esquisse approuvee',
      message: 'Le client a valide le zonage initial de la Villa ArchiMorph.',
      level: 'success',
      createdAt: '2026-04-23 14:20',
      projectId: 'PRJ-001',
    },
    {
      id: 'NOTIF-2',
      title: 'Completer la scene Spline',
      message: 'Le projet Residence Horizon attend la liaison du viewer 3D.',
      level: 'warning',
      createdAt: '2026-04-22 09:10',
      projectId: 'PRJ-002',
    },
    {
      id: 'NOTIF-3',
      title: 'Nouveau commentaire architecte',
      message: 'Une remarque a ete laissee sur la hauteur de la baie du sejour.',
      level: 'info',
      createdAt: '2026-04-21 17:45',
      projectId: 'PRJ-001',
    },
  ];

  getProjects(): WorkspaceProject[] {
    return this.getAllProjects().map((project) => this.cloneProject(project));
  }

  getProjectById(projectId: string | null): WorkspaceProject | null {
    const project = this.getAllProjects().find((item) => item.id === projectId);
    return project ? this.cloneProject(project) : null;
  }

  getFeaturedProject(): WorkspaceProject {
    return this.cloneProject(this.getAllProjects()[0]);
  }

  setApiProjects(projects: WorkspaceProject[]): void {
    this.apiProjects = projects.map((project) => this.cloneProject(project));
  }

  upsertApiProject(project: WorkspaceProject): void {
    const nextProjects = this.apiProjects.length > 0 ? [...this.apiProjects] : [...this.projects];
    const existingIndex = nextProjects.findIndex((item) => item.id === project.id);

    if (existingIndex >= 0) {
      nextProjects[existingIndex] = this.cloneProject(project);
    } else {
      nextProjects.unshift(this.cloneProject(project));
    }

    this.apiProjects = nextProjects;
  }

  getNotifications(): WorkspaceNotification[] {
    return this.notifications.map((notification) => ({ ...notification }));
  }

  getDashboardMetrics(role: UserRole): DashboardMetric[] {
    const catalog: Record<UserRole, DashboardMetric[]> = {
      ADMIN: [
        {
          label: 'Utilisateurs actifs',
          value: '248',
          detail: '+12 comptes cette semaine',
          tone: 'primary',
        },
        {
          label: 'Projets supervises',
          value: '156',
          detail: '32 en phase modelisation',
          tone: 'success',
        },
        {
          label: 'Integrations a verifier',
          value: '03',
          detail: 'Spline, notifications et roles',
          tone: 'warning',
        },
      ],
      CLIENT: [
        {
          label: 'Mes projets',
          value: '05',
          detail: '2 livrables attendus',
          tone: 'primary',
        },
        {
          label: 'Etape active',
          value: '2D',
          detail: 'Villa ArchiMorph en cours',
          tone: 'success',
        },
        {
          label: 'Alertes',
          value: '02',
          detail: 'Nouveaux retours architecte',
          tone: 'warning',
        },
      ],
      ARCHITECTE: [
        {
          label: 'Clients actifs',
          value: '12',
          detail: '4 projets demandes cette semaine',
          tone: 'primary',
        },
        {
          label: 'Dossiers a revoir',
          value: '08',
          detail: '2 scenes 3D a connecter',
          tone: 'warning',
        },
        {
          label: 'Livrables termines',
          value: '03',
          detail: 'Derniere mise a jour hier',
          tone: 'success',
        },
      ],
    };

    return catalog[role].map((metric) => ({ ...metric }));
  }

  getProfile(role: UserRole, fullName: string, email: string): ProfilePreferences {
    const roleLabel =
      role === 'ADMIN' ? 'Administrateur' : role === 'ARCHITECTE' ? 'Architecte' : 'Client';

    return {
      fullName,
      email,
      phone: '+228 90 00 00 00',
      roleLabel,
      company: 'ArchiMorph Studio',
      emailNotifications: true,
      pushNotifications: true,
      weeklySummary: role !== 'CLIENT',
    };
  }

  private createElement(
    id: string,
    kind: WorkspacePlanElement['kind'],
    label: string,
    length: number,
    thickness: number,
    height: number,
    x: number,
    y: number,
    material: string
  ): WorkspacePlanElement {
    return {
      id,
      kind,
      label,
      length,
      thickness,
      height,
      x,
      y,
      material,
    };
  }

  private cloneProject(project: WorkspaceProject): WorkspaceProject {
    return {
      ...project,
      dimensions: { ...project.dimensions },
      elements: project.elements.map((element) => ({ ...element })),
      stages: project.stages.map((stage) => ({ ...stage })),
    };
  }

  private getAllProjects(): WorkspaceProject[] {
    return this.apiProjects.length > 0 ? this.apiProjects : this.projects;
  }
}
