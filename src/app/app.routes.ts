import { Routes } from '@angular/router';
import { AuthoritiesComponent } from './features/authorities/authorities.compoment';
import { LandingComponent } from './features/landing/landing.component';
import { TeachersComponent } from './features/teachers/teachers.compoment';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'authorities', component: AuthoritiesComponent },
  { path: 'teachers', component: TeachersComponent },
];
