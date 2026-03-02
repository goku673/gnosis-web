import { Component, signal } from '@angular/core';
import { LandingComponent } from './features/landing/landing.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gnosis-web');
}
