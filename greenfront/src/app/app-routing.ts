import { inject } from '@angular/core';
import { Router, Routes, CanActivateFn } from '@angular/router';
import { Authentification } from './services/authentification';

const authGuard: CanActivateFn = () => {
  const authService = inject(Authentification);
  const router = inject(Router);

  return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

const guestGuard: CanActivateFn = () => {
  const authService = inject(Authentification);
  const router = inject(Router);

  return authService.isAuthenticated()
    ? router.createUrlTree([authService.getDefaultDashboardRoute()])
    : true;
};

const roleGuard = (role: string): CanActivateFn => () => {
  const authService = inject(Authentification);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }
  
  return authService.hasRole(role)
    ? true
    : router.createUrlTree([authService.getDefaultDashboardRoute()]);
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.Login),
    canActivate: [guestGuard],
    data: { layout: 'auth', title: 'Connexion' },
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register').then(m => m.Register),
    canActivate: [guestGuard],
    data: { layout: 'auth', title: 'Inscription' },
  },
  {
    path: 'dashboard-client',
    loadComponent: () => import('./components/client/dashboard-client/dashboard-client').then(m => m.DashboardClient),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Dashboard client' },
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./components/admin/dashboard-admin/dashboard-admin').then(m => m.DashboardAdmin),
    canActivate: [roleGuard('ADMIN')],
    data: { layout: 'dashboard', title: 'Dashboard administrateur' },
  },
  {
    path: 'dashboard-architecte',
    loadComponent: () => import('./components/architecte/dash-architecte/dash-architecte').then(m => m.DashArchitecte),
    canActivate: [roleGuard('ARCHITECTE')],
    data: { layout: 'dashboard', title: 'Dashboard architecte' },
  },
  {
    path: 'utilisateurs',
    loadComponent: () => import('./components/utilisateurs/utilisateurs').then(m => m.Utilisateurs),
    canActivate: [roleGuard('ADMIN')],
    data: { layout: 'dashboard', title: 'Gestion des utilisateurs' },
  },
  {
    path: 'mesprojets',
    loadComponent: () => import('./components/client/mesprojet/mesprojet').then(m => m.Mesprojet),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Mes projets' },
  },
  {
    path: 'projets/nouveau',
    loadComponent: () => import('./components/client/createprojetform/createprojetform').then(m => m.Createprojetform),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Nouveau projet' },
  },
  {
    path: 'notifications',
    loadComponent: () => import('./components/modelisation/notification/notification').then(m => m.Notification),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Notifications' },
  },
  {
    path: 'profil',
    loadComponent: () => import('./components/client/client').then(m => m.Client),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Profil' },
  },
  {
    path: 'modelisation/:id',
    loadComponent: () => import('./components/modelisation/modelisation').then(m => m.Modelisation),
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Modelisation' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'esquisse' },
      { path: 'esquisse', loadComponent: () => import('./components/modelisation/esquisse/esquisse').then(m => m.Esquisse), data: { title: 'Esquisse' } },
      { path: '2d', loadComponent: () => import('./components/modelisation/mod-2-d/mod-2-d').then(m => m.Mod2D), data: { title: 'Modelisation 2D' } },
      { path: '3d', loadComponent: () => import('./components/modelisation/mod-3-d/mod-3-d').then(m => m.Mod3D), data: { title: 'Modelisation 3D' } },
      { path: 'estimation', loadComponent: () => import('./components/modelisation/estimation/estimation').then(m => m.Estimation), data: { title: 'Estimation' } },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
