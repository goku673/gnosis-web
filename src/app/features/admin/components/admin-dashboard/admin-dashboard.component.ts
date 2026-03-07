import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AdminDashboardData,
  StatCardConfig,
  QuickAccessButton,
  ActivityItem,
  AlertConfig,
  DashboardLayoutConfig,
} from '../../../../shared/types/dashboard.types';
import { formatRelativeTime } from '../../../../shared/utils/dashboard.utils';
import { DashboardLayoutComponent } from '../../../../shared/components/dashboard-layout/dashboard-layout.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { ActivityItemComponent } from '../../../../shared/components/activity-item/activity-item.component';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutComponent,
    StatCardComponent,
    ActivityItemComponent,
    AlertBoxComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  layoutConfig!: DashboardLayoutConfig;
  dashboardData!: AdminDashboardData;
  statCards: StatCardConfig[] = [];
  quickAccessButtons: QuickAccessButton[] = [];
  recentActivityItems: ActivityItem[] = [];
  alerts: AlertConfig[] = [];

  activePeriod = signal({
    name: '1-2026',
    startDate: '01/02/2026',
    endDate: '30/06/2026',
    status: 'Activo',
  });

  ngOnInit(): void {
    this.initializeLayout();
    this.loadDashboardData();
    this.createStatCards();
    this.createQuickAccessButtons();
    this.loadRecentActivity();
    this.loadAlerts();
  }

  private initializeLayout(): void {
    this.layoutConfig = {
      userRole: 'admin',
      userName: 'Super Administrador',
      userTitle: 'Super Administrador',
      userAvatar: undefined,
      showNotifications: true,
      notificationCount: 3,
      sidebarItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'dashboard',
          active: true,
        },
        {
          id: 'roles',
          label: 'Roles y Permisos',
          icon: 'users',
        },
        {
          id: 'users',
          label: 'Gestión de Usuarios',
          icon: 'user',
        },
        {
          id: 'permissions',
          label: 'Permisos Docentes',
          icon: 'lock',
        },
        {
          id: 'students',
          label: 'Estudiantes',
          icon: 'book',
        },
        {
          id: 'teachers',
          label: 'Docentes',
          icon: 'users',
        },
        {
          id: 'subjects',
          label: 'Materias',
          icon: 'book-open',
        },
        {
          id: 'centralizer',
          label: 'Centralizador',
          icon: 'clipboard',
        },
        {
          id: 'audits',
          label: 'Auditoría',
          icon: 'shield',
        },
        {
          id: 'config',
          label: 'Configuración',
          icon: 'settings',
        },
      ],
      onLogout: () => this.confirmLogout(),
    };
  }

  private loadDashboardData(): void {
    this.dashboardData = {
      activeStudents: 342,
      pendingPayments: 28,
      activePeriod: '1-2026',
      centralizers: 3,
      studentTrend: 12,
      paymentTrend: -5,
      alerts: [],
      recentActivity: [],
      quickAccess: [],
    };
  }

  private createStatCards(): void {
    this.statCards = [
      {
        value: this.dashboardData.activeStudents,
        label: 'Estudiantes Activos',
        icon: '👥',
        iconBgColor: 'primary',
        subtitle: '+12 este mes',
        trend: { value: 12, direction: 'up' },
      },
      {
        value: this.dashboardData.pendingPayments,
        label: 'Pagos Pendientes',
        icon: '💰',
        iconBgColor: 'warning',
        subtitle: 'Requieren atención',
        trend: { value: 5, direction: 'down' },
      },
      {
        value: this.dashboardData.activePeriod,
        label: 'Período Activo',
        icon: '📅',
        iconBgColor: 'success',
        subtitle: 'Semestre en curso',
      },
      {
        value: this.dashboardData.centralizers,
        label: 'Centralizadores Pendientes',
        icon: '📋',
        iconBgColor: 'danger',
        subtitle: 'Por generar',
      },
    ];
  }

  private createQuickAccessButtons(): void {
    this.quickAccessButtons = [
      {
        id: 'create-student',
        label: 'Crear Estudiante',
        icon: '👤',
        backgroundColor: '#f57c00',
        textColor: '#ffffff',
        onClick: () => this.handleQuickAction('create-student'),
      },
      {
        id: 'enable-notes',
        label: 'Habilitar Notas',
        icon: '📝',
        backgroundColor: '#1f3a6d',
        textColor: '#ffffff',
        onClick: () => this.handleQuickAction('enable-notes'),
      },
      {
        id: 'generate-centralizer',
        label: 'Generar Centralizador',
        icon: '📊',
        backgroundColor: '#f57c00',
        textColor: '#ffffff',
        onClick: () => this.handleQuickAction('generate-centralizer'),
      },
      {
        id: 'pay-tuition',
        label: 'Pagar Matrícula Estudiante',
        icon: '💳',
        backgroundColor: '#1f3a6d',
        textColor: '#ffffff',
        onClick: () => this.handleQuickAction('pay-tuition'),
      },
    ];
  }

  private loadRecentActivity(): void {
    this.recentActivityItems = [
      {
        id: 1,
        title: 'Inscripción aprobada',
        description: 'Juan Carlos Pérez - 3er Semestre',
        timestamp: new Date(Date.now() - 15 * 60000),
        type: 'success',
      },
      {
        id: 2,
        title: 'Pago registrado',
        description: 'María González - Bs. 800',
        timestamp: new Date(Date.now() - 60 * 60000),
        type: 'success',
      },
      {
        id: 3,
        title: 'Nota modificada',
        description: 'Sistemas Electrónicos - Sto. Semestre',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        type: 'info',
      },
      {
        id: 4,
        title: 'Boletín generado',
        description: 'Pedro Mamani - 2do Semestre',
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        type: 'success',
      },
    ];
  }

  private loadAlerts(): void {
    this.alerts = [
      {
        type: 'warning',
        title: 'Período de Inscripciones Abierto',
        message: 'Cierre el 15 de febrero. Son 28 estudiantes con pagos pendientes.',
        icon: '⏰',
        closable: true,
      },
      {
        type: 'info',
        title: 'Centralizador - Sto Semestre',
        message: 'Por generar. Está fuera de período de generación de centralizador.',
        icon: 'ℹ️',
        closable: true,
      },
    ];
  }

  handleQuickAction(actionId: string): void {
    console.log('Quick action clicked:', actionId);
  }

  confirmLogout(): void {
    this.logout.emit();
  }
}
