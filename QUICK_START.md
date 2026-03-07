# Quick Start - Componentes Reutilizables GNOSIS

## 🚀 Inicio Rápido

Aquí encontrarás todo lo que necesitas para empezar a usar los componentes reutilizables.

---

## 📁 Dónde Están los Componentes

```
src/app/shared/
├── types/dashboard.types.ts          ← Interfaces TypeScript
├── utils/dashboard.utils.ts          ← Funciones utilitarias
└── components/
    ├── dashboard-layout/             ← Layout base con sidebar
    ├── stat-card/                    ← Tarjetas de estadísticas
    ├── data-table/                   ← Tabla reutilizable
    ├── alert-box/                    ← Alertas
    └── activity-item/                ← Items de actividad
```

---

## 🎯 Los 5 Componentes Principales

### 1️⃣ DashboardLayoutComponent
**Para:** Estructura base con sidebar y header
```html
<app-dashboard-layout [config]="layoutConfig">
  <!-- Tu contenido aquí -->
</app-dashboard-layout>
```

### 2️⃣ StatCardComponent
**Para:** Mostrar métrica/estadística
```html
<app-stat-card [config]="{ value: 342, label: 'Estudiantes' }"></app-stat-card>
```

### 3️⃣ DataTableComponent
**Para:** Mostrar tabla de datos
```html
<app-data-table [config]="tableConfig"></app-data-table>
```

### 4️⃣ AlertBoxComponent
**Para:** Mostrar notificaciones/alertas
```html
<app-alert-box [config]="{ type: 'warning', message: 'Texto' }"></app-alert-box>
```

### 5️⃣ ActivityItemComponent
**Para:** Mostrar actividad reciente
```html
<app-activity-item [item]="activity"></app-activity-item>
```

---

## 📋 Ejemplo Básico (5 minutos)

### Paso 1: Importar tipos y componentes
```typescript
import { 
  DashboardLayoutComponent, 
  StatCardComponent 
} from '@shared/components';
import { DashboardLayoutConfig, StatCardConfig } from '@shared/types';
```

### Paso 2: Crear configuración
```typescript
export class MyDashboardComponent {
  layoutConfig: DashboardLayoutConfig = {
    userRole: 'admin',
    userName: 'Juan Admin',
    userTitle: 'Administrador',
    showNotifications: true,
    notificationCount: 3,
    sidebarItems: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
      { id: 'users', label: 'Usuarios', icon: 'users' }
    ]
  };

  statCard: StatCardConfig = {
    value: 342,
    label: 'Estudiantes Activos',
    icon: '👥',
    iconBgColor: 'primary'
  };
}
```

### Paso 3: Usar en template
```html
<app-dashboard-layout [config]="layoutConfig">
  <div class="grid grid-cols-4 gap-4">
    <app-stat-card [config]="statCard"></app-stat-card>
  </div>
</app-dashboard-layout>
```

✅ ¡Listo! Tienes un dashboard funcional.

---

## 🔗 Importaciones Convenientes

### Opción 1: Importar todo junto (Recomendado)
```typescript
import { DashboardLayoutComponent, StatCardComponent, DataTableComponent, AlertBoxComponent, ActivityItemComponent } from '@shared/components';
import { DashboardLayoutConfig, StatCardConfig, DataTableConfig, AlertConfig, ActivityItem } from '@shared/types';
import { calculateAverage, formatDate, calculateStudentStats } from '@shared/utils';
```

### Opción 2: Importar desde índices
```typescript
// Desde src/app/shared/components/index.ts
import { DashboardLayoutComponent } from '@shared/components';

// Desde src/app/shared/types/index.ts
import { DashboardLayoutConfig } from '@shared/types';

// Desde src/app/shared/utils/index.ts
import { calculateAverage } from '@shared/utils';
```

---

## 🎨 Colores Disponibles

Para `iconBgColor` en StatCard:
- `'primary'` - Azul
- `'warning'` - Amarillo
- `'success'` - Verde
- `'danger'` - Rojo
- `'info'` - Azul claro
- `'custom'` - Usa `customIconBgColor`

---

## 📊 Tipos de Datos en Tabla

```typescript
// En columnas de tabla, puedes usar estos tipos:
type: 'text' | 'number' | 'status' | 'badge' | 'action' | 'custom'

// Ejemplos:
{ key: 'name', header: 'Nombre', type: 'text' }
{ key: 'average', header: 'Promedio', type: 'number' }
{ key: 'status', header: 'Estado', type: 'status' }
{ key: 'grade', header: 'Calificación', type: 'custom', 
  customRenderer: (value) => `<strong>${value}</strong>` }
```

---

## 🛠️ Utilidades Más Usadas

```typescript
import { 
  calculateAverage,        // Calcula promedio de 3 notas
  calculateStudentStats,   // Obtiene estadísticas agregadas
  formatDate,              // Formatea fechas
  formatRelativeTime,      // "hace 5 minutos"
  getStatusLabel,          // Traduce estados
  sortData,                // Ordena arrays
  filterData,              // Filtra arrays
  paginateData             // Pagina arrays
} from '@shared/utils';
```

---

## 📚 Documentación Completa

Para documentación más detallada:
- **Componentes:** [DASHBOARD_COMPONENTS.md](./DASHBOARD_COMPONENTS.md)
- **Ejemplos:** [COMPONENT_EXAMPLES.md](./src/app/shared/components/COMPONENT_EXAMPLES.md)
- **Arquitectura:** [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md)

---

## 💡 Tips Profesionales

### 1. Siempre usa interfaces
```typescript
// ✅ BUENO
const config: DataTableConfig = { /* ... */ };

// ❌ EVITAR
const config: any = { /* ... */ };
```

### 2. Reutiliza funciones utilitarias
```typescript
// ✅ BUENO
const average = calculateAverage(p1, p2, final);

// ❌ EVITAR
const average = (p1 + p2 + final) / 3;
```

### 3. Usa eventos para comunicación
```typescript
// ✅ BUENO
<app-data-table (rowClicked)="handleClick($event)"></app-data-table>

// ❌ EVITAR (No hagas cambios globales en el componente)
```

### 4. Mantén componentes simples
Si un componente hace más de una cosa, divídelo.

### 5. Documenta props complejas
```typescript
/**
 * Configuración de tabla
 * @param columns - Definición de columnas
 * @param data - Datos a mostrar
 * @param pageable - Habilita paginación
 */
config: DataTableConfig;
```

---

## 🚨 Errores Comunes

### ❌ Error: "No puedo ver los componentes"
**Solución:** Asegúrate de importarlos en el componente
```typescript
import { StatCardComponent } from '@shared/components';

@Component({
  imports: [StatCardComponent],
  // ...
})
```

### ❌ Error: "Config no se actualiza"
**Solución:** Usa `OnPush` y actualiza la referencia del objeto
```typescript
// En lugar de:
this.config.data = newData;

// Usa:
this.config = { ...this.config, data: newData };
```

### ❌ Error: "Tipo 'any' no es permitido"
**Solución:** Usa las interfaces correctas
```typescript
// ✅ CORRECTO
const config: DataTableConfig = { /* ... */ };

// ❌ INCORRECTO
const config: any = { /* ... */ };
```

---

## ✅ Checklist para Nuevo Componente

Cuando uses componentes en un panel nuevo:

- [ ] Importé el componente en `imports: []`
- [ ] Definí las interfaces de configuración
- [ ] Pasé las props correctas con `[config]`
- [ ] Usé paréntesis para eventos `(evento)="manejador()"`
- [ ] Documenté la configuración
- [ ] Probé en móvil y desktop
- [ ] Agregué ARIA labels si es necesario
- [ ] Usé funciones utilitarias compartidas
- [ ] No dejé datos hardcodeados (excepto mock data)
- [ ] Validé los tipos con TypeScript

---

## 🎓 Ejemplos de Uso

### Dashboard Simple
```typescript
// Ver COMPONENT_EXAMPLES.md - Ejemplo 1
```

### Tabla con Datos
```typescript
// Ver COMPONENT_EXAMPLES.md - Ejemplo 2
```

### Panel Completo
```typescript
// Ver COMPONENT_EXAMPLES.md - Ejemplo 10
```

---

## 🔍 Debugging

### Ver qué data tiene una tabla
```typescript
@ViewChild(DataTableComponent) table!: DataTableComponent;

ngAfterViewInit() {
  console.log(this.table.displayedData);
}
```

### Log en utilidades
```typescript
const result = calculateStudentStats(grades);
console.log('Stats:', result);
```

---

## 📞 Soporte

Si tienes dudas:

1. **Revisa DASHBOARD_COMPONENTS.md** - Documentación detallada
2. **Mira COMPONENT_EXAMPLES.md** - Ejemplos específicos
3. **Lee ARCHITECTURE_GUIDE.md** - Conceptos arquitectónicos
4. **Busca en el código** - Hay ejemplos en teacher-dashboard y admin-dashboard

---

## 🎯 Próximos Pasos

1. ✅ Lee este archivo (ya lo hiciste 🎉)
2. 📖 Lee DASHBOARD_COMPONENTS.md
3. 💻 Mira los ejemplos en COMPONENT_EXAMPLES.md
4. 🏗️ Crea tu primer panel usando los componentes
5. 🚀 Domina la arquitectura leyendo ARCHITECTURE_GUIDE.md

---

**¡Bienvenido a componentes reutilizables profesionales! 🚀**
