import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { CursosTemporadaComponent } from './components/cursos-temporada/cursos-temporada.component';
import { CarreraProfesionalComponent } from './components/carrera-profesional/carrera-profesional.component';
import { ContactoComponent } from './components/contacto/contacto.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, IconComponent, HeroCarouselComponent, CursosTemporadaComponent, CarreraProfesionalComponent, ContactoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {}
