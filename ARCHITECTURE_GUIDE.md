# Guía de Arquitectura - Sistema GNOSIS

## Estructura General

```
src/app/
├── shared/                          # Código compartido
│   ├── types/
│   │   ├── dashboard.types.ts      # Interfaces y tipos reutilizables
│   │   └── index.ts                # Exportaciones centralizadas
│   │
│   ├── utils/
│   │   ├── dashboard.utils.ts      # Funciones utilitarias compartidas
│   │   └── index.ts                # Exportaciones centralizadas
│   │
│   └── components/
│       ├── dashboard-layout/       # Layout base con sidebar
│       ├── stat-card/              # Tarjetas de estadísticas
│       ├── data-table/             # Tabla reutilizable
│       ├── alert-box/              # Alertas
│       ├── activity-item/          # Items de actividad
│       └── index.ts                # Exportaciones centralizadas
│
└── features/
    ├── teachers/
    │   └── components/
    │       └── teacher-dashboard/  # Panel del docente
    │
    └── admin/
        └── components/
            └── admin-dashboard/    # Panel del administrador
```

## Componentes Reutilizables

### 1. Nivel de Tipos (dashboard.types.ts)
- Define todas las interfaces TypeScript
- Garantiza type-safety en toda la aplicación
- Permite autocompletar en IDE

### 2. Nivel de Utilidades (dashboard.utils.ts)
- Funciones puras sin estado
- Lógica de negocio compartida
- Cálculos y transformaciones

### 3. Componentes Base (components/)
Cada componente es **totalmente reutilizable y personalizable**:

#### DashboardLayoutComponent
- **Propósito:** Estructura visual base
- **Personalizable:** Colores, items de sidebar, información de usuario
- **Reutilización:** Usada en Teacher y Admin dashboards

#### StatCardComponent
- **Propósito:** Mostrar métrica única
- **Personalizable:** Icono, color, tendencia, acciones
- **Reutilización:** Usable en cualquier panel que necesite estadísticas

#### DataTableComponent
- **Propósito:** Mostrar datos tabulares
- **Personalizable:** Columnas, ordenamiento, búsqueda, paginación, renderizadores custom
- **Reutilización:** Calificaciones, estudiantes, usuarios, reportes, etc.

#### AlertBoxComponent
- **Propósito:** Mostrar notificaciones/alertas
- **Personalizable:** Tipo, título, mensaje, acciones
- **Reutilización:** Mensajes de éxito, error, advertencia, información

#### ActivityItemComponent
- **Propósito:** Mostrar item de actividad reciente
- **Personalizable:** Título, descripción, avatar, tipo, timestamp
- **Reutilización:** Feed de actividades, historial, notificaciones

## Patrones de Diseño

### 1. Configuración por Props
```typescript
// En lugar de múltiples props, usamos objetos de configuración
// ✅ BUENO
<app-data-table [config]="tableConfig"></app-data-table>

// ❌ EVITAR
<app-data-table 
  [columns]="cols"
  [data]="data"
  [sortBy]="sort"
  [sortOrder]="order"
  [pageable]="true"
  [pageSize]="10"
  ...>
</app-data-table>
```

### 2. Separación de Responsabilidades
- **Component:** Solo renderiza y maneja eventos
- **Service:** Obtiene datos
- **Util:** Procesa datos

```typescript
// ✅ BUENO - Separación clara
const processedGrades = calculateStudentStats(rawGrades);
const tableConfig: DataTableConfig = {
  data: processedGrades,
  // ...
};

// ❌ EVITAR - Lógica en el componente
ngOnInit() {
  this.data = this.processData(this.rawData);
}
```

### 3. Type-Safety
```typescript
// ✅ BUENO - Type safe
const alert: AlertConfig = { /* ... */ };

// ❌ EVITAR - Sin tipos
const alert: any = { /* ... */ };
```

### 4. OnPush Change Detection
Todos los componentes usan `ChangeDetectionStrategy.OnPush` para mejor rendimiento.

## Flujo de Datos

### Teacher Dashboard
```
TeacherDashboardComponent
├── layoutConfig (DashboardLayoutComponent)
├── statCards (StatCardComponent[])
├── tableConfig (DataTableComponent)
└── alerts (AlertBoxComponent[])
```

### Admin Dashboard
```
AdminDashboardComponent
├── layoutConfig (DashboardLayoutComponent)
├── statCards (StatCardComponent[])
├── quickAccessButtons (button[])
├── recentActivityItems (ActivityItemComponent[])
└── alerts (AlertBoxComponent[])
```

## Guía de Extensión

### Agregar un nuevo componente reutilizable

1. **Define el tipo en `dashboard.types.ts`:**
```typescript
export interface MyComponentConfig {
  prop1: string;
  prop2: number;
  onAction?: () => void;
}
```

2. **Crea el componente:**
```bash
src/app/shared/components/my-component/
├── my-component.component.ts
├── my-component.component.html
└── my-component.component.css
```

3. **Usa el mismo patrón:**
```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponentComponent {
  @Input() config!: MyComponentConfig;
  @Output() action = new EventEmitter<void>();
}
```

4. **Exporta desde `index.ts`:**
```typescript
export * from './my-component/my-component.component';
```

5. **Usa en paneles:**
```html
<app-my-component [config]="config" (action)="handleAction()"></app-my-component>
```

### Agregar funciones utilitarias

1. En `dashboard.utils.ts`:
```typescript
export function myUtilFunction(param: string): string {
  // implementación
}
```

2. Usar donde sea necesario:
```typescript
import { myUtilFunction } from '@shared/utils';

const result = myUtilFunction('input');
```

## Paleta de Colores

### Colores Principales
- **Azul Principal:** `#1f3a6d` (Sidebar, headers)
- **Naranja Secundario:** `#f57c00` (Botones, highlights, sidebar items activos)

### Estados
- **Éxito (Verde):** `#22c55e`
- **Error (Rojo):** `#ef4444`
- **Advertencia (Amarillo):** `#eab308`
- **Información (Azul):** `#3b82f6`

### Grises (Neutral)
- **Gris 50:** `#f9fafb`
- **Gris 100:** `#f3f4f6`
- **Gris 200:** `#e5e7eb`
- **Gris 500:** `#6b7280`
- **Gris 900:** `#111827`

## Variables CSS Recomendadas

```css
:root {
  --color-primary: #1f3a6d;
  --color-secondary: #f57c00;
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #eab308;
  --color-info: #3b82f6;
  
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## Performance

### Optimizaciones Implementadas
1. **OnPush ChangeDetection:** Detecta cambios solo cuando hay nuevas referencias
2. **Standalone Components:** Más ligeros y sin overhead de módulos
3. **TrackBy en *ngFor:** Manejo eficiente de listas
4. **Lazy Loading:** Componentes cargados bajo demanda
5. **Memoización:** Funciones puras reutilizables

## Testing

### Estructura recomendada para tests
```typescript
describe('MyComponent', () => {
  let component: MyComponentComponent;
  let fixture: ComponentFixture<MyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponentComponent);
    component = fixture.componentInstance;
  });

  it('should render with config', () => {
    component.config = { /* test config */ };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
```

## Buenas Prácticas

### ✅ HACER
- Usar interfaces TypeScript para todo
- Crear funciones puras y reutilizables
- Separar lógica de presentación
- Documentar componentes complejos
- Usar semantic HTML
- Agregar ARIA labels
- Optimizar para mobile-first

### ❌ NO HACER
- Usar `any` type
- Mezclar lógica con presentación
- Repetir código entre componentes
- Usar clases CSS directamente (usar Tailwind)
- Modificar DOM directamente (usar Angular)
- Crear componentes monolíticos

## Recursos Útiles

- [DASHBOARD_COMPONENTS.md](./DASHBOARD_COMPONENTS.md) - Documentación detallada de componentes
- [COMPONENT_EXAMPLES.md](./src/app/shared/components/COMPONENT_EXAMPLES.md) - Ejemplos de uso
- [Angular Docs](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Próximas Mejoras

1. **Temas:** Sistema de temas completo (claro/oscuro)
2. **Internacionalización:** Soporte multi-idioma
3. **Paginación Avanzada:** URLs con estados de paginación
4. **Filtros Avanzados:** Sistema de filtros reutilizable
5. **Exportación de Datos:** CSV, PDF, Excel desde tablas
6. **Gráficos:** Componentes de charts reutilizables
7. **Validación:** Sistema centralizado de validación
