import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { AuthoritiesComponent } from './features/authorities/authorities.component';
import { TeachersComponent } from './features/teachers/teachers.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'authorities',
    component: AuthoritiesComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent
  }
];
