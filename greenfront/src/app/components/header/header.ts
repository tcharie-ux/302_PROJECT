import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Authentification } from '../../services/authentification';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [RouterLink],
})
export class Header {
  readonly currentUser;
  currentTitle = 'Dashboard';

  constructor(
    private readonly authService: Authentification,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.updateTitle();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  get displayName(): string {
    return this.currentUser?.fullName || this.currentUser?.username || 'Utilisateur';
  }

  get initials(): string {
    const source = this.displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((value) => value[0]?.toUpperCase() ?? '');

    return source.join('') || 'U';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateTitle(): void {
    let route = this.activatedRoute.firstChild;

    while (route?.firstChild) {
      route = route.firstChild;
    }

    this.currentTitle = route?.snapshot.data['title'] ?? 'Dashboard';
  }
}
