import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface Actividad {
  titulo: string;
  fecha: string;
  estado: 'pendiente' | 'programado' | 'completado';
}

@Component({
  selector: 'app-teaching-panel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './teaching-panel.component.html',
  styleUrls: ['./teaching-panel.component.css'],
})
export class PanelDocenteComponent {
  materiasAsignadas = 3;
  totalEstudiantes = 80;

  actividades: Actividad[] = [
    {
      titulo: 'Carga de notas 1er Parcial',
      fecha: '28/01/2026',
      estado: 'pendiente',
    },
    {
      titulo: 'Entrega de planificación 2do Parcial',
      fecha: '05/02/2026',
      estado: 'pendiente',
    },
    {
      titulo: 'Examen final Electrónica',
      fecha: '15/02/2026',
      estado: 'programado',
    },
  ];

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'bg-red-600 text-white';
      case 'programado':
        return 'bg-azul text-white';
      case 'completado':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  }
    trackByTitulo(index: number, actividad: Actividad): string {
    return actividad.titulo;
  }
}