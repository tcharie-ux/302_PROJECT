import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentification } from '../../services/authentification';
import { WorkspaceData } from '../../services/workspace-data';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebars',
  standalone: true,
  templateUrl: './sidebars.html',
  styleUrl: './sidebars.scss',
  imports: [NgFor, RouterLink, RouterLinkActive],
})
export class Sidebars {
  readonly currentUser;
  readonly featuredProjectId;

  constructor(
    private readonly authService: Authentification,
    private readonly workspaceData: WorkspaceData
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.featuredProjectId = this.workspaceData.getFeaturedProject().id;
  }

  get navigationItems(): SidebarItem[] {
    if (this.authService.hasRole('ADMIN')) {
      return [
        { label: 'Dashboard', route: '/dashboard-admin', icon: 'pi pi-home', exact: true },
        { label: 'Utilisateurs', route: '/utilisateurs', icon: 'pi pi-users' },
        { label: 'Projets', route: '/mesprojets', icon: 'pi pi-folder' },
        { label: 'Notifications', route: '/notifications', icon: 'pi pi-bell' },
        { label: 'Profil', route: '/profil', icon: 'pi pi-user' },
      ];
    }

    if (this.authService.hasRole('ARCHITECTE')) {
      return [
        {
          label: 'Dashboard',
          route: '/dashboard-architecte',
          icon: 'pi pi-home',
          exact: true,
        },
        { label: 'Mes projets', route: '/mesprojets', icon: 'pi pi-briefcase' },
        {
          label: 'Studio 3D',
          route: `/modelisation/${this.featuredProjectId}/3d`,
          icon: 'pi pi-box',
        },
        { label: 'Notifications', route: '/notifications', icon: 'pi pi-bell' },
        { label: 'Profil', route: '/profil', icon: 'pi pi-user' },
      ];
    }

    return [
      { label: 'Dashboard', route: '/dashboard-client', icon: 'pi pi-home', exact: true },
      { label: 'Mes projets', route: '/mesprojets', icon: 'pi pi-folder' },
      {
        label: 'Modelisation',
        route: `/modelisation/${this.featuredProjectId}/esquisse`,
        icon: 'pi pi-pencil',
      },
      { label: 'Notifications', route: '/notifications', icon: 'pi pi-bell' },
      { label: 'Profil', route: '/profil', icon: 'pi pi-user' },
    ];
  }

  get displayName(): string {
    return this.currentUser?.fullName || this.currentUser?.username || 'Utilisateur';
  }

  get roleLabel(): string {
    if (this.authService.hasRole('ADMIN')) {
      return 'Administrateur';
    }

    if (this.authService.hasRole('ARCHITECTE')) {
      return 'Architecte';
    }

    return 'Client';
  }
}
