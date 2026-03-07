import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TeacherDashboardData,
  StatCardConfig,
  DataTableConfig,
  TableColumn,
  GradeData,
  DashboardLayoutConfig,
  AlertConfig,
} from '../../../../shared/types/dashboard.types';
import {
  calculateStudentStats,
  calculateAverage,
  formatDate,
} from '../../../../shared/utils/dashboard.utils';
import { DashboardLayoutComponent } from '../../../../shared/components/dashboard-layout/dashboard-layout.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { AlertBoxComponent } from '../../../../shared/components/alert-box/alert-box.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardLayoutComponent,
    StatCardComponent,
    DataTableComponent,
    AlertBoxComponent,
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherDashboardComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  layoutConfig!: DashboardLayoutConfig;
  dashboardData!: TeacherDashboardData;
  statCards: StatCardConfig[] = [];
  tableConfig!: DataTableConfig;
  alerts: AlertConfig[] = [];

  selectedDateStart = signal(new Date(2026, 1, 9));
  selectedDateEnd = signal(new Date(2026, 1, 19));
  selectedSubjectId = signal('elect-digital-3');

  ngOnInit(): void {
    this.initializeLayout();
    this.loadDashboardData();
    this.createStatCards();
    this.createTableConfig();
    this.loadAlerts();
  }

  private initializeLayout(): void {
    this.layoutConfig = {
      userRole: 'teacher',
      userName: 'Dr. Juan Pérez',
      userTitle: 'Docente',
      userAvatar: undefined,
      showNotifications: true,
      notificationCount: 1,
      sidebarItems: [
        {
          id: 'portal',
          label: 'Mis Materias',
          icon: 'book-open',
          active: true,
        },
        {
          id: 'students',
          label: 'Estudiantes',
          icon: 'students',
        },
        {
          id: 'grades',
          label: 'Calificaciones',
          icon: 'clipboard-list',
        },
        {
          id: 'materials',
          label: 'Materiales',
          icon: 'book',
        },
        {
          id: 'calendar',
          label: 'Calendario',
          icon: 'calendar',
        },
      ],
      onLogout: () => this.confirmLogout(),
    };
  }

  private loadDashboardData(): void {
    const mockGrades: GradeData[] = [
      {
        code: 'AUT-2024-001',
        studentName: 'Juan Carlos Pérez García',
        parcial1: 65,
        parcial2: 72,
        finalExam: 68,
        average: calculateAverage(65, 72, 68),
        status: 'approved',
      },
      {
        code: 'AUT-2024-002',
        studentName: 'María Fernanda López Sánchez',
        parcial1: 78,
        parcial2: 82,
        finalExam: 85,
        average: calculateAverage(78, 82, 85),
        status: 'approved',
      },
      {
        code: 'AUT-2024-003',
        studentName: 'Carlos Alberto Mamani Quispe',
        parcial1: 45,
        parcial2: 50,
        finalExam: 48,
        average: calculateAverage(45, 50, 48),
        status: 'failed',
      },
      {
        code: 'AUT-2024-004',
        studentName: 'Ana Patricia Rodríguez Flores',
        parcial1: 0,
        parcial2: 0,
        finalExam: 0,
        average: 0,
        status: 'pending',
      },
      {
        code: 'AUT-2024-005',
        studentName: 'Roberto José Gutiérrez Torres',
        parcial1: 70,
        parcial2: 75,
        finalExam: 0,
        average: calculateAverage(70, 75, 0),
        status: 'pending',
      },
    ];

    const stats = calculateStudentStats(mockGrades);

    this.dashboardData = {
      totalStudents: stats.totalStudents,
      approved: stats.approved,
      failed: stats.failed,
      pending: stats.pending,
      generalAverage: stats.generalAverage,
      studentsGrades: mockGrades,
      selectedSubject: 'Electrónica Digital - 3er Semestre - Turno Mañana',
      subject: {
        name: 'Electrónica Digital',
        semester: '3er Semestre',
        shift: 'Turno Mañana',
      },
      dateRange: {
        start: formatDate(this.selectedDateStart()),
        end: formatDate(this.selectedDateEnd()),
      },
    };
  }

  private createStatCards(): void {
    this.statCards = [
      {
        value: this.dashboardData.totalStudents,
        label: 'Total Estudiantes',
        icon: '👥',
        iconBgColor: 'primary',
      },
      {
        value: this.dashboardData.approved,
        label: 'Aprobados',
        icon: '✓',
        iconBgColor: 'success',
        trend: { value: 40, direction: 'up' },
      },
      {
        value: this.dashboardData.failed,
        label: 'Reprobados',
        icon: '✕',
        iconBgColor: 'danger',
        trend: { value: 20, direction: 'down' },
      },
      {
        value: this.dashboardData.pending,
        label: 'Pendientes',
        icon: '⏳',
        iconBgColor: 'warning',
      },
      {
        value: this.dashboardData.generalAverage,
        label: 'Promedio General',
        icon: '📊',
        iconBgColor: 'info',
      },
    ];
  }

  private createTableConfig(): void {
    const columns: TableColumn[] = [
      { key: 'code', header: 'Código', width: '100px', sortable: true },
      { key: 'studentName', header: 'Estudiante', width: '200px', sortable: true, filterable: true },
      { key: 'parcial1', header: 'Parcial 1', type: 'number', width: '80px', sortable: true },
      { key: 'parcial2', header: 'Parcial 2', type: 'number', width: '80px', sortable: true },
      { key: 'finalExam', header: 'Examen Final', type: 'number', width: '100px', sortable: true },
      { key: 'average', header: 'Promedio', type: 'number', width: '80px', sortable: true },
      { key: 'status', header: 'Estado', type: 'status', width: '100px', sortable: true },
    ];

    this.tableConfig = {
      columns,
      data: this.dashboardData.studentsGrades,
      pageable: true,
      pageSize: 10,
      striped: true,
      hoverable: true,
      selectable: false,
      sortBy: 'studentName',
      sortOrder: 'asc',
      emptyMessage: 'No hay estudiantes registrados',
      onRowClick: (row: any) => this.handleRowClick(row),
    };
  }

  private loadAlerts(): void {
    this.alerts = [
      {
        type: 'warning',
        title: 'Fuera de Período',
        message: 'Está fuera del período de carga de notas. El período es del 9/2/2026 a 19/2/2026.',
        icon: '⏰',
        closable: true,
      },
      {
        type: 'info',
        title: 'Información',
        message: 'La edición de notas está deshabilitada. Está fuera de período de carga de notas.',
        icon: 'ℹ️',
        closable: true,
      },
    ];
  }

  onSubjectChange(subjectId: string): void {
    this.selectedSubjectId.set(subjectId);
  }

  onDateRangeChange(): void {
    this.dashboardData.dateRange = {
      start: formatDate(this.selectedDateStart()),
      end: formatDate(this.selectedDateEnd()),
    };
  }

  handleRowClick(row: GradeData): void {
    console.log('Fila clickeada:', row);
  }

  confirmLogout(): void {
    this.logout.emit();
  }
}
