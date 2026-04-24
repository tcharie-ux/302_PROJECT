import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './components/app';
import { Auth } from './components/auth/auth';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { AuthTokenInterceptor } from './interceptors/auth-token-interceptor';
import { DashboardClient } from './components/client/dashboard-client/dashboard-client';
import { Utilisateurs } from './components/utilisateurs/utilisateurs';
import { DashboardAdmin } from './components/admin/dashboard-admin/dashboard-admin';
import { Logout } from './components/auth/logout/logout';
import { Client } from './components/client/client';
import { Admin } from './components/admin/admin';
import { Createprojetform } from './components/client/createprojetform/createprojetform';
import { Mesprojet } from './components/client/mesprojet/mesprojet';
import { Architecte } from './components/architecte/architecte';
import { DashArchitecte } from './components/architecte/dash-architecte/dash-architecte';
import { Header } from './components/header/header';
import { Sidebars } from './components/sidebars/sidebars';
import { Modelisation } from './components/modelisation/modelisation';
import { Esquisse } from './components/modelisation/esquisse/esquisse';
import { Mod2D } from './components/modelisation/mod-2-d/mod-2-d';
import { Mod3D } from './components/modelisation/mod-3-d/mod-3-d';
import { Notification } from './components/modelisation/notification/notification';
import { Estimation } from './components/modelisation/estimation/estimation';

@NgModule({
  declarations: [
    DashboardClient,
    Utilisateurs,
    DashboardAdmin,
    Logout,
    Client,
    Admin,
    Createprojetform,
    Mesprojet,
    Architecte,
    DashArchitecte,
    Modelisation,
    Esquisse,
    Mod2D,
    Mod3D,
    Notification,
    Estimation,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    App,
    Auth,
    Register,
    Login,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [App],
})
export class AppModule { }
