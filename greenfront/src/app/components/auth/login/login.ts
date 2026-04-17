import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Authentification } from '../../../services/authentification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  readonly loginForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: Authentification,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.controls.username.value?.trim() ?? '';
    const password = this.loginForm.controls.password.value ?? '';

    this.loading = true;
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = `Connecte en tant que ${response.fullName || response.username}`;
        this.router.navigate([this.authService.getDefaultDashboardRoute()]);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'Connexion impossible. Verifie les identifiants.';
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
