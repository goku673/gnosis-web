import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent } from './shared/components/icon/icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gnosis-web');
}
