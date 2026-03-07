# Ejemplos de Uso de Componentes Reutilizables

## 1. Ejemplo: StatCard Simple

```typescript
// En tu componente
import { StatCardComponent } from '@shared/components';
import { StatCardConfig } from '@shared/types';

export class MyComponent {
  statCard: StatCardConfig = {
    value: 342,
    label: 'Estudiantes Activos',
    icon: '👥',
    iconBgColor: 'primary',
    subtitle: '+12 este mes',
    trend: { value: 12, direction: 'up' }
  };
}
```

```html
<!-- En tu template -->
<app-stat-card [config]="statCard"></app-stat-card>
```

---

## 2. Ejemplo: Tabla Básica

```typescript
import { DataTableComponent } from '@shared/components';
import { DataTableConfig, TableColumn } from '@shared/types';

export class StudentListComponent implements OnInit {
  tableConfig!: DataTableConfig;
  
  ngOnInit() {
    const columns: TableColumn[] = [
      { 
        key: 'code', 
        header: 'Código', 
        sortable: true,
        width: '100px'
      },
      { 
        key: 'name', 
        header: 'Nombre', 
        sortable: true,
        filterable: true,
        width: '250px'
      },
      { 
        key: 'email', 
        header: 'Email',
        width: '200px'
      },
      { 
        key: 'status', 
        header: 'Estado', 
        type: 'status',
        width: '120px'
      }
    ];

    this.tableConfig = {
      columns,
      data: [
        { code: 'EST-001', name: 'Juan Pérez', email: 'juan@email.com', status: 'active' },
        { code: 'EST-002', name: 'María López', email: 'maria@email.com', status: 'inactive' },
        // más estudiantes...
      ],
      pageable: true,
      pageSize: 10,
      striped: true,
      hoverable: true,
      sortBy: 'name',
      sortOrder: 'asc'
    };
  }

  handleRowClick(row: any) {
    console.log('Fila clickeada:', row);
  }
}
```

```html
<app-data-table [config]="tableConfig" (rowClicked)="handleRowClick($event)"></app-data-table>
```

---

## 3. Ejemplo: Tabla con Renderizador Personalizado

```typescript
import { DataTableConfig, TableColumn } from '@shared/types';

export class GradesComponent {
  gradesTable: DataTableConfig = {
    columns: [
      { key: 'studentName', header: 'Estudiante', width: '200px', sortable: true },
      { key: 'parcial1', header: 'Parcial 1', type: 'number', width: '80px' },
      { key: 'parcial2', header: 'Parcial 2', type: 'number', width: '80px' },
      { key: 'finalExam', header: 'Examen Final', type: 'number', width: '100px' },
      {
        key: 'average',
        header: 'Promedio',
        type: 'custom',
        width: '100px',
        customRenderer: (value, row) => {
          // Renderizador personalizado para el promedio
          const bgColor = value >= 60 ? 'bg-green-100' : 'bg-red-100';
          const textColor = value >= 60 ? 'text-green-800' : 'text-red-800';
          return `<span class="px-3 py-1 rounded ${bgColor} ${textColor} font-bold">${value.toFixed(1)}</span>`;
        }
      },
      { key: 'status', header: 'Estado', type: 'status', width: '120px' }
    ],
    data: this.gradesData,
    pageable: true,
    pageSize: 15,
    striped: true,
    hoverable: true,
    sortBy: 'studentName',
    sortOrder: 'asc',
    onRowClick: (row) => this.viewStudentDetails(row)
  };

  viewStudentDetails(row: any) {
    console.log('Ver detalles del estudiante:', row);
  }
}
```

---

## 4. Ejemplo: Tabla Seleccionable

```typescript
import { DataTableConfig } from '@shared/types';

export class BulkActionsComponent {
  selectedStudents: any[] = [];
  
  tableConfig: DataTableConfig = {
    columns: [
      { key: 'code', header: 'Código', width: '100px' },
      { key: 'name', header: 'Nombre', width: '200px', sortable: true },
      { key: 'email', header: 'Email', width: '200px' }
    ],
    data: this.students,
    selectable: true,
    pageable: true,
    pageSize: 20,
    onSelectionChange: (selected) => this.handleSelection(selected)
  };

  handleSelection(selected: any[]) {
    this.selectedStudents = selected;
    console.log('Estudiantes seleccionados:', selected.length);
  }

  deleteSelected() {
    if (this.selectedStudents.length > 0) {
      console.log('Eliminar', this.selectedStudents.length, 'estudiantes');
    }
  }
}
```

```html
<app-data-table [config]="tableConfig"></app-data-table>

<div *ngIf="selectedStudents.length > 0" class="mt-4 p-4 bg-blue-50 rounded">
  <p>{{ selectedStudents.length }} estudiantes seleccionados</p>
  <button (click)="deleteSelected()" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">
    Eliminar Seleccionados
  </button>
</div>
```

---

## 5. Ejemplo: Alertas Personalizadas

```typescript
import { AlertBoxComponent } from '@shared/components';
import { AlertConfig } from '@shared/types';

export class NotificationsComponent {
  alerts: AlertConfig[] = [];

  ngOnInit() {
    this.alerts = [
      {
        type: 'success',
        title: 'Operación Exitosa',
        message: 'Los cambios se guardaron correctamente',
        icon: '✓',
        closable: true
      },
      {
        type: 'warning',
        title: 'Advertencia',
        message: '3 estudiantes no han pagado su matrícula',
        icon: '⚠️',
        closable: true,
        actions: [
          {
            label: 'Ver Estudiantes',
            onClick: () => this.viewUnpaidStudents(),
            variant: 'primary'
          },
          {
            label: 'Enviar Recordatorio',
            onClick: () => this.sendReminder(),
            variant: 'secondary'
          }
        ]
      },
      {
        type: 'danger',
        title: 'Error Crítico',
        message: 'No se pudo conectar con el servidor',
        icon: '✕',
        closable: true,
        actions: [
          {
            label: 'Reintentar',
            onClick: () => this.retry(),
            variant: 'danger'
          }
        ]
      }
    ];
  }

  viewUnpaidStudents() {
    // Navegar a lista de estudiantes sin pagar
  }

  sendReminder() {
    // Enviar recordatorio a estudiantes
  }

  retry() {
    // Reintentar conexión
  }
}
```

```html
<div class="space-y-4">
  <app-alert-box 
    *ngFor="let alert of alerts"
    [config]="alert"
    (closed)="alerts = alerts.filter(a => a !== alert)"
    (actionClicked)="handleAlertAction($event)">
  </app-alert-box>
</div>
```

---

## 6. Ejemplo: Actividad Reciente

```typescript
import { ActivityItemComponent } from '@shared/components';
import { ActivityItem } from '@shared/types';

export class ActivityFeedComponent {
  activities: ActivityItem[] = [];

  ngOnInit() {
    this.activities = [
      {
        id: 1,
        title: 'Calificación registrada',
        description: 'Electrónica Digital - Juan Pérez: 85',
        timestamp: new Date(Date.now() - 5 * 60000), // hace 5 minutos
        type: 'success',
        icon: '📝'
      },
      {
        id: 2,
        title: 'Pago confirmado',
        description: 'María López - Bs. 800',
        timestamp: new Date(Date.now() - 30 * 60000),
        type: 'success'
      },
      {
        id: 3,
        title: 'Estudiante inscrito',
        description: 'Carlos Mamani - 3er Semestre',
        timestamp: new Date(Date.now() - 2 * 3600000),
        type: 'info'
      },
      {
        id: 4,
        title: 'Período cerrado',
        description: 'Cierre de período académico 2-2025',
        timestamp: new Date(Date.now() - 24 * 3600000),
        type: 'warning'
      }
    ];
  }

  handleActivityClick(activity: ActivityItem) {
    console.log('Activity clicked:', activity.id);
  }
}
```

```html
<div class="space-y-3">
  <app-activity-item 
    *ngFor="let activity of activities"
    [item]="activity"
    (itemClicked)="handleActivityClick($event)">
  </app-activity-item>
</div>
```

---

## 7. Ejemplo: Layout Completo (Dashboard)

```typescript
import { DashboardLayoutComponent } from '@shared/components';
import { DashboardLayoutConfig, StatCardConfig } from '@shared/types';

@Component({
  selector: 'app-my-dashboard',
  standalone: true,
  imports: [DashboardLayoutComponent, StatCardComponent],
  template: `
    <app-dashboard-layout [config]="layoutConfig" (logout)="handleLogout()">
      <div class="space-y-6">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <app-stat-card *ngFor="let card of statCards" [config]="card"></app-stat-card>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg p-6">
          <h2 class="text-lg font-bold">Contenido Principal</h2>
          <!-- Tu contenido aquí -->
        </div>
      </div>
    </app-dashboard-layout>
  `
})
export class MyDashboardComponent implements OnInit {
  layoutConfig!: DashboardLayoutConfig;
  statCards: StatCardConfig[] = [];

  ngOnInit() {
    this.layoutConfig = {
      userRole: 'admin',
      userName: 'Juan Administrador',
      userTitle: 'Administrador del Sistema',
      showNotifications: true,
      notificationCount: 5,
      sidebarItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
        { id: 'users', label: 'Usuarios', icon: 'users' },
        { id: 'reports', label: 'Reportes', icon: 'reports' },
        { id: 'settings', label: 'Configuración', icon: 'settings' }
      ],
      onLogout: () => this.handleLogout()
    };

    this.statCards = [
      {
        value: 342,
        label: 'Estudiantes',
        icon: '👥',
        iconBgColor: 'primary'
      },
      {
        value: 28,
        label: 'Pagos Pendientes',
        icon: '💰',
        iconBgColor: 'warning'
      },
      {
        value: '1-2026',
        label: 'Período Activo',
        icon: '📅',
        iconBgColor: 'success'
      },
      {
        value: 3,
        label: 'Alertas',
        icon: '🔔',
        iconBgColor: 'danger'
      }
    ];
  }

  handleLogout() {
    console.log('Logout');
  }
}
```

---

## 8. Ejemplo: Usando Utilidades

```typescript
import { 
  calculateAverage, 
  calculateStudentStats,
  formatDate,
  getStatusLabel 
} from '@shared/utils';
import { GradeData } from '@shared/types';

export class GradesService {
  processGrades(studentGrades: any[]) {
    // Calcular promedios
    const gradesWithAverage = studentGrades.map(g => ({
      ...g,
      average: calculateAverage(g.parcial1, g.parcial2, g.finalExam)
    }));

    // Calcular estadísticas agregadas
    const stats = calculateStudentStats(gradesWithAverage as GradeData[]);
    
    console.log('Total estudiantes:', stats.totalStudents);
    console.log('Aprobados:', stats.approved);
    console.log('Promedio general:', stats.generalAverage);

    // Formatear fechas
    const formattedDate = formatDate(new Date(), 'short'); // "07/03/2026"
    const longDate = formatDate(new Date(), 'long'); // "viernes, 7 de marzo de 2026"

    // Obtener etiquetas
    const statusLabel = getStatusLabel('approved'); // "Aprobado"

    return gradesWithAverage;
  }
}
```

---

## 9. Ejemplo: Tabla con Filtrado y Búsqueda

```typescript
import { DataTableConfig } from '@shared/types';

export class SearchableTableComponent {
  searchTerm = '';
  
  tableConfig: DataTableConfig = {
    columns: [
      { 
        key: 'code', 
        header: 'Código',
        sortable: true,
        filterable: true,
        width: '120px'
      },
      { 
        key: 'name', 
        header: 'Nombre',
        sortable: true,
        filterable: true,
        width: '250px'
      },
      { 
        key: 'email', 
        header: 'Email',
        filterable: true,
        width: '250px'
      },
      { 
        key: 'phoneNumber', 
        header: 'Teléfono',
        filterable: true,
        width: '150px'
      }
    ],
    data: this.students,
    pageable: true,
    pageSize: 20,
    striped: true,
    hoverable: true,
    emptyMessage: 'No se encontraron estudiantes'
  };
}
```

```html
<!-- Búsqueda en la tabla (la tabla ya incluye búsqueda integrada) -->
<app-data-table [config]="tableConfig"></app-data-table>
```

---

## 10. Ejemplo: Integración Completa (Teacher Panel)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DashboardLayoutComponent,
  StatCardComponent,
  DataTableComponent,
  AlertBoxComponent
} from '@shared/components';
import {
  DashboardLayoutConfig,
  StatCardConfig,
  DataTableConfig,
  AlertConfig,
  GradeData
} from '@shared/types';
import {
  calculateAverage,
  calculateStudentStats,
  formatDate
} from '@shared/utils';

@Component({
  selector: 'app-teacher-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardLayoutComponent,
    StatCardComponent,
    DataTableComponent,
    AlertBoxComponent
  ],
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.css']
})
export class TeacherPanelComponent implements OnInit {
  layoutConfig!: DashboardLayoutConfig;
  statCards: StatCardConfig[] = [];
  tableConfig!: DataTableConfig;
  alerts: AlertConfig[] = [];

  selectedSubject = 'math';
  selectedDateStart = new Date(2026, 1, 9);
  selectedDateEnd = new Date(2026, 1, 19);

  ngOnInit() {
    this.initializeLayout();
    this.loadData();
  }

  private initializeLayout() {
    this.layoutConfig = {
      userRole: 'teacher',
      userName: 'Dr. Juan Pérez',
      userTitle: 'Docente de Matemáticas',
      showNotifications: true,
      notificationCount: 2,
      sidebarItems: [
        { id: 'portal', label: 'Portal', icon: 'dashboard', active: true },
        { id: 'students', label: 'Estudiantes', icon: 'users' },
        { id: 'grades', label: 'Calificaciones', icon: 'clipboard-list' }
      ]
    };
  }

  private loadData() {
    const mockGrades: GradeData[] = [
      {
        code: 'EST-001',
        studentName: 'Juan Pérez García',
        parcial1: 85,
        parcial2: 90,
        finalExam: 88,
        average: calculateAverage(85, 90, 88),
        status: 'approved'
      },
      {
        code: 'EST-002',
        studentName: 'María López',
        parcial1: 45,
        parcial2: 50,
        finalExam: 48,
        average: calculateAverage(45, 50, 48),
        status: 'failed'
      }
    ];

    const stats = calculateStudentStats(mockGrades);

    this.statCards = [
      { value: stats.totalStudents, label: 'Total Estudiantes', icon: '👥', iconBgColor: 'primary' },
      { value: stats.approved, label: 'Aprobados', icon: '✓', iconBgColor: 'success' },
      { value: stats.failed, label: 'Reprobados', icon: '✕', iconBgColor: 'danger' },
      { value: stats.generalAverage, label: 'Promedio', icon: '📊', iconBgColor: 'info' }
    ];

    this.tableConfig = {
      columns: [
        { key: 'code', header: 'Código', sortable: true },
        { key: 'studentName', header: 'Estudiante', sortable: true, filterable: true },
        { key: 'parcial1', header: 'Parcial 1', type: 'number' },
        { key: 'parcial2', header: 'Parcial 2', type: 'number' },
        { key: 'finalExam', header: 'Examen Final', type: 'number' },
        { key: 'average', header: 'Promedio', type: 'number' },
        { key: 'status', header: 'Estado', type: 'status' }
      ],
      data: mockGrades,
      pageable: true,
      pageSize: 10,
      striped: true,
      hoverable: true
    };

    this.alerts = [
      {
        type: 'warning',
        title: 'Fuera de Período',
        message: 'No puede registrar calificaciones. Período: 9/2/2026 - 19/2/2026',
        closable: true
      }
    ];
  }
}
```

---

## Consejos y Buenas Prácticas

1. **Siempre usa TypeScript:** Los tipos te ayudan a evitar errores
2. **Reutiliza funciones utilitarias:** No duplices lógica
3. **Mantén consistencia visual:** Usa los mismos colores y estilos
4. **Optimiza rendimiento:** Usa `OnPush` ChangeDetection
5. **Documenta componentes:** Agrega comentarios JSDoc
6. **Prueba responsiveness:** Verifica en móvil, tablet y desktop
7. **Accesibilidad:** Siempre agrega ARIA labels y semantic HTML
