import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.css'
})
export class HeroCarouselComponent {
  currentSlide = signal(0);

  slides = [
    {
      title: 'Carrera de Autotrónica',
      subtitle: 'Conviértete en un experto en sistemas automotrices electrónicos y mecánicos. Formación integral en 6 semestres con enfoque práctico y profesional.',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop'
    },
    {
      title: 'Carreras Profesionales',
      subtitle: 'Múltiples programas técnicos diseñados para desarrollar profesionales competentes en el sector automotriz.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'
    },
    {
      title: 'Formación de Calidad',
      subtitle: 'Con docentes especializados y talleres equipados con tecnología moderna para una enseñanza integral.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop'
    }
  ];

  nextSlide(): void {
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.set((this.currentSlide() - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }
}
