import { NgIf } from '@angular/common';
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
  imports: [NgIf, RouterOutlet, Header, Sidebars],
})
export class App {
  showDashboardShell = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.updateLayout();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateLayout());
  }

  private updateLayout(): void {
    let route = this.activatedRoute.firstChild;
    let layout = route?.snapshot.data['layout'];

    while (route?.firstChild) {
      route = route.firstChild;
      layout = route.snapshot.data['layout'] ?? layout;
    }

    this.showDashboardShell = layout === 'dashboard';
  }
}
