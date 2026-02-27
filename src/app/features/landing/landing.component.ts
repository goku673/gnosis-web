import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}