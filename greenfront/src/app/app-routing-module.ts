import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { DashboardClient } from './components/client/dashboard-client/dashboard-client';
import { DashboardAdmin } from './components/admin/dashboard-admin/dashboard-admin';
import { Utilisateurs } from './components/utilisateurs/utilisateurs';
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

const adminGuard: CanActivateFn = () => {
  const authService = inject(Authentification);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  return authService.hasRole('Admin')
    ? true
    : router.createUrlTree([authService.getDefaultDashboardRoute()]);
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'dashboard-client', component: DashboardClient, canActivate: [authGuard] },
  { path: 'dashboard-admin', component: DashboardAdmin, canActivate: [adminGuard] },
  { path: 'utilisateurs', component: Utilisateurs, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
