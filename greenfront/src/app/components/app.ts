import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './header/header';
import { Sidebars } from './sidebars/sidebars';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CommonModule, RouterOutlet, Header, Sidebars],
})
export class App {
  showDashboardShell = false;

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateLayout());

    this.updateLayout();
  }

  private updateLayout(): void {
    // On repart toujours de la racine du snapshot du routeur
    let route = this.router.routerState.snapshot.root;
    let layout = route.data['layout'];

    // On descend jusqu'à la route active la plus profonde
    while (route.firstChild) {
      route = route.firstChild;
      layout = route.data['layout'] ?? layout;
    }

    this.showDashboardShell = layout === 'dashboard';
  }
}
