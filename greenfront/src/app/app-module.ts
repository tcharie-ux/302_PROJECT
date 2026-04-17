import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
  bootstrap: [App]
})
export class AppModule { }
