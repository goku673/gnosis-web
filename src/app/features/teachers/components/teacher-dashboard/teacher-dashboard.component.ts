import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IconName } from '../../../../shared/components/icon/icon.types';

import { PanelDocenteComponent } from '../teaching-panel/teaching-panel.component';
import { MySubjectsComponent as MySubjectsComponent } from '../my-subjects/my-subjects.component';
import { ImproveGradesComponent as ImproveGradesComponent } from '../improve-grades/improve-grades.component';

export type DashboardView = 'inicio' | 'materias' | 'calificaciones';

interface NavItem {
  id: DashboardView;
  label: string;
  icon: IconName;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    PanelDocenteComponent,
    MySubjectsComponent,
    ImproveGradesComponent,
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent {
  @Output() logout = new EventEmitter<void>();

  activeView = signal<DashboardView>('inicio');
  showLogoutConfirm = signal(false);

  navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'materias', label: 'Mis Materias', icon: 'book-open' },
    { id: 'calificaciones', label: 'Subir Calificaciones', icon: 'clipboard-list' },
  ];

  getPageTitle(): string {
    switch (this.activeView()) {
      case 'inicio':
        return 'Panel Docente';
      case 'materias':
        return 'Mis Materias';
      case 'calificaciones':
        return 'Subir Calificaciones';
    }
  }

  setView(view: DashboardView): void {
    this.activeView.set(view);
  }

  requestLogout(): void {
    this.showLogoutConfirm.set(true);
  }

  confirmLogout(): void {
    this.showLogoutConfirm.set(false);
    this.logout.emit();
  }

  cancelLogout(): void {
    this.showLogoutConfirm.set(false);
  }
}