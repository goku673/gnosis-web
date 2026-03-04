import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IconName } from '../../../../shared/components/icon/icon.types';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

export type AdminView =
  | 'dashboard'
  | 'roles'
  | 'usuarios'
  | 'permisos-docentes'
  | 'estudiantes'
  | 'docentes'
  | 'materias'
  | 'academico'
  | 'pagos'
  | 'centralizador'
  | 'boletines'
  | 'kardex'
  | 'auditoria'
  | 'configuracion';

interface NavItem {
  id: AdminView;
  label: string;
  icon: IconName;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, IconComponent, AdminHomeComponent ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  @Input() roleName = 'Super Administrador';
  @Output() logout = new EventEmitter<void>();

  activeView = signal<AdminView>('dashboard');
  showLogoutConfirm = signal(false);

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'roles', label: 'Roles y Permisos', icon: 'shield' },
    { id: 'usuarios', label: 'Gestion de Usuarios', icon: 'users' },
    { id: 'permisos-docentes', label: 'Permisos Docentes', icon: 'clipboard-list' },
    { id: 'estudiantes', label: 'Estudiantes', icon: 'user' },
    { id: 'docentes', label: 'Docentes', icon: 'user-check' },
    { id: 'materias', label: 'Materias', icon: 'file-text' },
    { id: 'academico', label: 'Academico', icon: 'book-open' },
    { id: 'pagos', label: 'Pagos', icon: 'credit-card' },
    { id: 'centralizador', label: 'Centralizador', icon: 'table' },
    { id: 'boletines', label: 'Boletines', icon: 'file-check' },
    { id: 'kardex', label: 'Kardex', icon: 'folder' },
    { id: 'auditoria', label: 'Auditoria', icon: 'settings' },
    { id: 'configuracion', label: 'Configuracion', icon: 'sliders' },
  ];

  getPageTitle(): string {
    const item = this.navItems.find((n) => n.id === this.activeView());
    return item ? item.label : 'Dashboard';
  }

  setView(view: AdminView): void {
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
