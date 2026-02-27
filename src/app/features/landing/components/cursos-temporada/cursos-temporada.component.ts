import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  cupos: number;
  duracion: string;
  fechaInicio: string;
  horarios: string[];
  inversion: string;
}

@Component({
  selector: 'app-cursos-temporada',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './cursos-temporada.component.html',
  styleUrl: './cursos-temporada.component.css'
})
export class CursosTemporadaComponent {
  cursos: Curso[] = [
    {
      id: 1,
      titulo: 'Electricidad Automotriz Básica',
      descripcion: 'Aprende los fundamentos de electricidad automotriz, sistemas de carga, arranque y diagnóstico de fallas eléctricas.',
      cupos: 25,
      duracion: '3 meses',
      fechaInicio: '15 de Marzo 2026',
      horarios: ['Lunes y Miércoles 18:00-20:00', 'Sábados 08:00-12:00'],
      inversion: 'Bs. 1,200'
    },
    {
      id: 2,
      titulo: 'Mecánica Automotriz Intensivo',
      descripcion: 'Curso intensivo sobre mecánica del motor, sistemas de transmisión, suspensión y frenos.',
      cupos: 20,
      duracion: '4 meses',
      fechaInicio: '22 de Marzo 2026',
      horarios: ['Martes y Jueves 18:00-20:00', 'Sábados 14:00-18:00'],
      inversion: 'Bs. 1,500'
    }
  ];
}
