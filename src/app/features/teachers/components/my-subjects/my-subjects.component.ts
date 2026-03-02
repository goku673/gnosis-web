import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

export interface Materia {
  nombre: string;
  semestre: string;
  grupo: string;
  turno: string;
  estudiantes: number;
}

@Component({
  selector: 'app-my-subjects',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './my-subjects.component.html',
  styleUrl: './my-subjects.component.css',
})
export class MySubjectsComponent {
  materias: Materia[] = [
    {
      nombre: 'Electrónica Automotriz',
      semestre: '4to Semestre',
      grupo: 'Grupo A',
      turno: 'Turno Mañana',
      estudiantes: 28,
    },
    {
      nombre: 'Sistemas de Inyección',
      semestre: '4to Semestre',
      grupo: 'Grupo A',
      turno: 'Turno Mañana',
      estudiantes: 28,
    },
    {
      nombre: 'Diagnóstico Automotriz',
      semestre: '5to Semestre',
      grupo: 'Grupo B',
      turno: 'Turno Tarde',
      estudiantes: 24,
    },
  ];

  get totalEstudiantes(): number {
    return this.materias.reduce((sum, m) => sum + m.estudiantes, 0);
  }
}
