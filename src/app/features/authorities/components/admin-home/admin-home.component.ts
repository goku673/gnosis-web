import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IconName } from '../../../../shared/components/icon/icon.types';

interface StatCard {
  label: string;
  value: string;
  subtitle: string;
  icon: IconName;
  iconBg: string;
}

interface QuickAction {
  label: string;
  icon: IconName;
  variant: 'orange' | 'white';
}

interface Alert {
  message: string;
  date: string;
}

interface Activity {
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  statCards: StatCard[] = [
    {
      label: 'Estudiantes Activos',
      value: '342',
      subtitle: '+12 este mes',
      icon: 'users',
      iconBg: 'bg-azul',
    },
    {
      label: 'Pagos Pendientes',
      value: '28',
      subtitle: 'Requieren atencion',
      icon: 'dollar-sign',
      iconBg: 'bg-naranja',
    },
    {
      label: 'Periodo Activo',
      value: '1-2026',
      subtitle: 'Semestre en curso',
      icon: 'book-open',
      iconBg: 'bg-naranja',
    },
    {
      label: 'Centralizadores Pendientes',
      value: '3',
      subtitle: 'Por generar',
      icon: 'clipboard-list',
      iconBg: 'bg-azul',
    },
  ];

  quickActions: QuickAction[] = [
    { label: 'Crear Estudiante', icon: 'user-plus', variant: 'orange' },
    { label: 'Habilitar Notas', icon: 'file-check', variant: 'orange' },
    { label: 'Generar Centralizador', icon: 'file-text', variant: 'orange' },
    { label: 'Pagar Matricula Estudiante', icon: 'credit-card', variant: 'white' },
  ];

  alerts: Alert[] = [
    {
      message: 'Periodo de inscripciones abierto: cierra el 15 de Febrero',
      date: '2026-02-01',
    },
    {
      message: 'Centralizador 6to Semestre - Turno Manana pendiente de generacion',
      date: '2026-01-28',
    },
    {
      message: '28 estudiantes con pagos pendientes',
      date: '2026-01-27',
    },
  ];

  recentActivity: Activity[] = [
    {
      title: 'Inscripcion aprobada',
      description: 'Juan Carlos Perez - 3er Semestre',
      time: 'Hace 15 min',
    },
    {
      title: 'Pago registrado',
      description: 'Maria Gonzalez - Bs. 800',
      time: 'Hace 1 hora',
    },
    {
      title: 'Nota modificada',
      description: 'Sistemas Electronicos - 5to Semestre',
      time: 'Hace 2 horas',
    },
    {
      title: 'Boletin generado',
      description: 'Pedro Mamani - 2do Semestre',
      time: 'Hace 3 horas',
    },
  ];
}
