# Componentes Reutilizables para Dashboard

Este documento describe los componentes reutilizables creados para los paneles de Docente y Administrador.

## Arquitectura General

La arquitectura está organizada en capas:

1. **Types** (`src/app/shared/types/dashboard.types.ts`) - Interfaces y tipos TypeScript
2. **Utils** (`src/app/shared/utils/dashboard.utils.ts`) - Funciones utilitarias compartidas
3. **Components** - Componentes reutilizables
4. **Features** - Paneles específicos que usan los componentes

## Componentes Base Reutilizables

### 1. DashboardLayoutComponent
Proporciona el layout base con sidebar, header y área de contenido principal.

**Ubicación:** `src/app/shared/components/dashboard-layout/`

**Props:**
```typescript
config: DashboardLayoutConfig {
  userRole: 'teacher' | 'admin' | 'student';
  userName: string;
  userTitle?: string;
  userAvatar?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  sidebarItems: SidebarItem[];
  onLogout?: () => void;
}
```

**Uso:**
```html
<app-dashboard-layout [config]="layoutConfig" (logout)="handleLogout()">
  <!-- Tu contenido aquí -->
</app-dashboard-layout>
```

**Características:**
- Sidebar colapsable con items de navegación
- Header con información del usuario y notificaciones
- Área principal con scroll automático
- Soporte para roles de usuario (teacher, admin, student)
- Temas visuales diferentes por rol

---

### 2. StatCardComponent
Tarjeta de estadística reutilizable para mostrar métricas.

**Ubicación:** `src/app/shared/components/stat-card/`

**Props:**
```typescript
config: StatCardConfig {
  value: string | number;
  label: string;
  subtitle?: string;
  icon?: string;
  iconBgColor?: 'primary' | 'warning' | 'success' | 'danger' | 'info' | 'custom';
  customIconBgColor?: string;
  trend?: { value: number; direction: 'up' | 'down' };
  onClick?: () => void;
}
```

**Uso:**
```html
<app-stat-card [config]="statCardConfig" (cardClicked)="handleCardClick()"></app-stat-card>
```

**Características:**
- Icono con fondo personalizable
- Indicador de tendencia (arriba/abajo)
- Subtítulo descriptivo
- Evento click personalizable
- Diseño responsive

---

### 3. DataTableComponent
Tabla de datos completamente personalizable y reutilizable.

**Ubicación:** `src/app/shared/components/data-table/`

**Props:**
```typescript
config: DataTableConfig {
  columns: TableColumn[];
  data: TableData[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  pageable?: boolean;
  pageSize?: number;
  striped?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  onRowClick?: (row: TableData) => void;
  onSelectionChange?: (selectedRows: TableData[]) => void;
  emptyMessage?: string;
  customRowClassName?: (row: TableData) => string;
  customCellClassName?: (column: TableColumn, row: TableData) => string;
}
```

**Ejemplo de uso:**
```typescript
const tableConfig: DataTableConfig = {
  columns: [
    { key: 'code', header: 'Código', sortable: true, width: '100px' },
    { key: 'name', header: 'Nombre', filterable: true, width: '200px' },
    { key: 'average', header: 'Promedio', type: 'number', sortable: true },
    { key: 'status', header: 'Estado', type: 'status', sortable: true },
  ],
  data: studentData,
  pageable: true,
  pageSize: 10,
  striped: true,
  hoverable: true,
  sortBy: 'name',
  sortOrder: 'asc',
};
```

```html
<app-data-table [config]="tableConfig" (rowClicked)="handleRowClick($event)"></app-data-table>
```

**Características:**
- Ordenamiento de columnas
- Filtrado por búsqueda
- Paginación automática
- Selección de filas
- Tipos de datos personalizados (texto, número, estado, badge, custom)
- Renderizadores personalizados por celda
- Clases CSS dinámicas por fila/celda

---

### 4. AlertBoxComponent
Componente de alerta reutilizable con múltiples estilos.

**Ubicación:** `src/app/shared/components/alert-box/`

**Props:**
```typescript
config: AlertConfig {
  type: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  message: string;
  icon?: string;
  closable?: boolean;
  actions?: AlertAction[];
}
```

**Uso:**
```html
<app-alert-box 
  [config]="alertConfig" 
  (closed)="handleAlertClose()"
  (actionClicked)="handleAction($event)">
</app-alert-box>
```

**Características:**
- 4 tipos de alerta (info, warning, danger, success)
- Botón de cerrar
- Acciones personalizadas
- Animación de entrada
- Iconos automáticos o personalizados

---

### 5. ActivityItemComponent
Componente para mostrar items de actividad reciente.

**Ubicación:** `src/app/shared/components/activity-item/`

**Props:**
```typescript
item: ActivityItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string | Date;
  icon?: string;
  avatar?: string;
  type?: 'success' | 'warning' | 'info' | 'danger';
  onClick?: () => void;
}
```

**Uso:**
```html
<app-activity-item 
  *ngFor="let activity of activities"
  [item]="activity"
  (itemClicked)="handleActivityClick($event)">
</app-activity-item>
```

**Características:**
- Avatar o icono personalizable
- Timestamp relativo (hace X minutos)
- Descripción de la actividad
- Click handler
- Estilos por tipo de actividad

---

## Funciones Utilitarias

Las funciones utilitarias están en `src/app/shared/utils/dashboard.utils.ts`:

### Funciones disponibles:

- `getGradeStatus(average: number)` - Determina si aprobó/reprobó
- `calculateAverage(p1, p2, final)` - Calcula promedio de calificaciones
- `formatDate(date, format)` - Formatea fechas
- `formatRelativeTime(date)` - Formatea tiempo relativo (hace X minutos)
- `getStatCardIconColorClass(color)` - Mapea colores a clases CSS
- `getStatusBadgeClass(status)` - Clases CSS para badges de estado
- `getStatusLabel(status)` - Etiqueta legible del estado
- `calculateStudentStats(grades)` - Calcula estadísticas agregadas
- `sortData(data, key, order)` - Ordena un array
- `filterData(data, term, keys)` - Filtra un array
- `paginateData(data, page, size)` - Pagina un array

---

## Paneles Implementados

### 1. Teacher Dashboard
**Ruta:** `src/app/features/teachers/components/teacher-dashboard/`

Muestra:
- Selector de materia y rango de fechas
- Tarjetas de estadísticas (Total, Aprobados, Reprobados, Pendientes, Promedio)
- Tabla de estudiantes con calificaciones
- Alertas de período

### 2. Admin Dashboard
**Ruta:** `src/app/features/admin/components/admin-dashboard/`

Muestra:
- Tarjetas de estadísticas (Estudiantes, Pagos, Período, Centralizadores)
- Botones de acceso rápido
- Actividad reciente
- Alertas y notificaciones
- Información del período académico activo

---

## Guía de Personalización

### Crear una tabla personalizada:

```typescript
// En tu componente
const customTableConfig: DataTableConfig = {
  columns: [
    {
      key: 'studentName',
      header: 'Estudiante',
      type: 'text',
      sortable: true,
      filterable: true,
      width: '250px'
    },
    {
      key: 'average',
      header: 'Promedio',
      type: 'number',
      customRenderer: (value, row) => {
        // Renderizador personalizado
        return `<strong>${value.toFixed(1)}</strong>`;
      },
      width: '100px'
    },
    {
      key: 'status',
      header: 'Estado',
      type: 'status',
      width: '120px'
    }
  ],
  data: myStudents,
  pageable: true,
  pageSize: 15,
  striped: true,
  hoverable: true,
  onRowClick: (row) => {
    console.log('Row clicked:', row);
  }
};
```

### Crear una alerta personalizada:

```typescript
const customAlert: AlertConfig = {
  type: 'warning',
  title: 'Acción Requerida',
  message: 'Hay 28 estudiantes con pagos pendientes',
  icon: '⚠️',
  closable: true,
  actions: [
    {
      label: 'Ver Estudiantes',
      onClick: () => this.viewPendingStudents(),
      variant: 'primary'
    },
    {
      label: 'Ignorar',
      onClick: () => {},
      variant: 'secondary'
    }
  ]
};
```

---

## Paleta de Colores

- **Azul Principal:** `#1f3a6d` (slate-900)
- **Naranja Secundario:** `#f57c00` (orange-600)
- **Verde Éxito:** `#22c55e` (green-500)
- **Rojo Peligro:** `#ef4444` (red-500)
- **Amarillo Advertencia:** `#eab308` (yellow-400)
- **Azul Info:** `#3b82f6` (blue-500)

---

## Notas Importantes

1. **Type Safety:** Todos los componentes usan interfaces TypeScript estrictas
2. **Reactividad:** Los componentes usan `signal` y `OnPush` para mejor rendimiento
3. **Standalone:** Todos son componentes standalone de Angular 17+
4. **Tailwind:** Usa Tailwind CSS para todos los estilos
5. **Responsive:** Diseño mobile-first y responsive
6. **Accesibilidad:** ARIA labels y semantic HTML

---

## Exportaciones Convenientes

Puedes importar todo desde índices centralizados:

```typescript
// Desde shared/components/index.ts
import { 
  DashboardLayoutComponent, 
  StatCardComponent, 
  DataTableComponent,
  AlertBoxComponent,
  ActivityItemComponent 
} from '@shared/components';

// Desde shared/types/index.ts
import { 
  DashboardLayoutConfig,
  StatCardConfig,
  DataTableConfig,
  // ... más tipos
} from '@shared/types';

// Desde shared/utils/index.ts
import { 
  calculateAverage,
  formatDate,
  calculateStudentStats,
  // ... más funciones
} from '@shared/utils';
```

---

## Próximos Pasos

Para agregar nuevos paneles o características:

1. Define las interfaces en `dashboard.types.ts`
2. Crea funciones utilitarias en `dashboard.utils.ts`
3. Reutiliza los componentes base
4. Mantén la consistencia visual con la paleta de colores
