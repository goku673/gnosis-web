import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { ProfessionalCareerComponent } from './components/professional-career/professional-career.component';
import { SeasonalCoursesComponent } from './components/seasonal-courses/seasonal-courses.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    //RouterLink,
    //IconComponent,
    ProfessionalCareerComponent,
    SeasonalCoursesComponent,
    ContactComponent,
    HeroCarouselComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
