import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes, CanActivateFn } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { DashboardClient } from './components/client/dashboard-client/dashboard-client';
import { DashboardAdmin } from './components/admin/dashboard-admin/dashboard-admin';
import { DashArchitecte } from './components/architecte/dash-architecte/dash-architecte';
import { Utilisateurs } from './components/utilisateurs/utilisateurs';
import { Authentification } from './services/authentification';
import { Mesprojet } from './components/client/mesprojet/mesprojet';
import { Esquisse } from './components/modelisation/esquisse/esquisse';
import { Mod2D } from './components/modelisation/mod-2-d/mod-2-d';
import { Mod3D } from './components/modelisation/mod-3-d/mod-3-d';
import { Modelisation } from './components/modelisation/modelisation';
import { Notification } from './components/modelisation/notification/notification';
import { Client } from './components/client/client';
import { Createprojetform } from './components/client/createprojetform/createprojetform';
import { Estimation } from './components/modelisation/estimation/estimation';

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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
    data: { layout: 'auth', title: 'Connexion' },
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard],
    data: { layout: 'auth', title: 'Inscription' },
  },
  {
    path: 'dashboard-client',
    component: DashboardClient,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Dashboard client' },
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdmin,
    canActivate: [roleGuard('ADMIN')],
    data: { layout: 'dashboard', title: 'Dashboard administrateur' },
  },
  {
    path: 'dashboard-architecte',
    component: DashArchitecte,
    canActivate: [roleGuard('ARCHITECTE')],
    data: { layout: 'dashboard', title: 'Dashboard architecte' },
  },
  {
    path: 'utilisateurs',
    component: Utilisateurs,
    canActivate: [roleGuard('ADMIN')],
    data: { layout: 'dashboard', title: 'Gestion des utilisateurs' },
  },
  {
    path: 'mesprojets',
    component: Mesprojet,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Mes projets' },
  },
  {
    path: 'projets/nouveau',
    component: Createprojetform,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Nouveau projet' },
  },
  {
    path: 'notifications',
    component: Notification,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Notifications' },
  },
  {
    path: 'profil',
    component: Client,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Profil' },
  },
  {
    path: 'modelisation/:id',
    component: Modelisation,
    canActivate: [authGuard],
    data: { layout: 'dashboard', title: 'Modelisation' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'esquisse' },
      { path: 'esquisse', component: Esquisse, data: { title: 'Esquisse' } },
      { path: '2d', component: Mod2D, data: { title: 'Modelisation 2D' } },
      { path: '3d', component: Mod3D, data: { title: 'Modelisation 3D' } },
      { path: 'estimation', component: Estimation, data: { title: 'Estimation' } },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
