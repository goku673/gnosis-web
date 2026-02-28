import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { SeasonalCoursesComponent } from './components/seasonal-courses/seasonal-courses.component';
import { ProfessionalCareerComponent } from './components/professional-career/professional-career.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, ButtonComponent, IconComponent, HeroCarouselComponent, SeasonalCoursesComponent, ProfessionalCareerComponent, ContactComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {}
