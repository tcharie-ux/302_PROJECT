import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Authentification } from '../../../services/authentification';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  loading = false;
  successMessage = '';
  errorMessage = '';

  readonly registerForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: Authentification,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['CLIENT', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const fullName = this.registerForm.controls.fullName.value?.trim() ?? '';
    const email = this.registerForm.controls.email.value?.trim() ?? '';
    const password = this.registerForm.controls.password.value ?? '';
    const confirmPassword = this.registerForm.controls.confirmPassword.value ?? '';

    if (password !== confirmPassword) {
      this.errorMessage = 'La confirmation du mot de passe ne correspond pas.';
      return;
    }

    const { prenom, nom } = this.splitFullName(fullName);

    this.loading = true;
    this.authService.register({ nom, prenom, email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Compte cree avec succes. Tu peux maintenant te connecter.';
        this.registerForm.reset({
          fullName: '',
          email: '',
          telephone: '',
          password: '',
          confirmPassword: '',
          role: 'CLIENT',
          acceptTerms: false,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error?.error?.message || error?.error?.error || 'Inscription impossible.';
      },
    });
  }

  private splitFullName(fullName: string): { prenom: string; nom: string } {
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 0) {
      return { prenom: '', nom: '' };
    }
    if (parts.length === 1) {
      return { prenom: parts[0], nom: parts[0] };
    }
    return {
      prenom: parts[0],
      nom: parts.slice(1).join(' '),
    };
  }
}
