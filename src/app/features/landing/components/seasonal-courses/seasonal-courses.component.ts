import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface Course {
  id: number;
  title: string;
  description: string;
  spots: number;
  duration: string;
  startDate: string;
  schedules: string[];
  investment: string;
}

@Component({
  selector: 'app-seasonal-courses',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './seasonal-courses.component.html',
  styleUrl: './seasonal-courses.component.css'
})
export class SeasonalCoursesComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'Electricidad Automotriz Básica',
      description: 'Aprende los fundamentos de electricidad automotriz, sistemas de carga, arranque y diagnóstico de fallas eléctricas.',
      spots: 25,
      duration: '3 meses',
      startDate: '15 de Marzo 2026',
      schedules: ['Lunes y Miércoles 18:00-20:00', 'Sábados 08:00-12:00'],
      investment: 'Bs. 1,200'
    },
    {
      id: 2,
      title: 'Mecánica Automotriz Intensivo',
      description: 'Curso intensivo sobre mecánica del motor, sistemas de transmisión, suspensión y frenos.',
      spots: 20,
      duration: '4 meses',
      startDate: '22 de Marzo 2026',
      schedules: ['Martes y Jueves 18:00-20:00', 'Sábados 14:00-18:00'],
      investment: 'Bs. 1,500'
    }
  ];
}
