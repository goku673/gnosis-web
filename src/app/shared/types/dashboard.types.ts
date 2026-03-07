// ============================================
// TIPOS Y INTERFACES PARA DASHBOARD
// ============================================

/**
 * Interfaz para las propiedades de una tarjeta de estadística
 */
export interface StatCardConfig {
  value: string | number;
  label: string;
  subtitle?: string;
  icon?: string; // nombre del icono o SVG
  iconBgColor?: 'primary' | 'warning' | 'success' | 'danger' | 'info' | 'custom';
  customIconBgColor?: string; // color personalizado en hex
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
}

/**
 * Interfaz para las columnas de la tabla
 */
export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  type?: 'text' | 'number' | 'status' | 'badge' | 'action' | 'custom';
  sortable?: boolean;
  filterable?: boolean;
  customRenderer?: (value: any, row: any) => string | JSX.Element;
}

/**
 * Interfaz para los datos de la tabla
 */
export interface TableData {
  [key: string]: any;
  id?: string | number;
}

/**
 * Interfaz para la configuración de la tabla
 */
export interface DataTableConfig {
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

/**
 * Interfaz para alertas y notificaciones
 */
export interface AlertConfig {
  type: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  message: string;
  icon?: string;
  closable?: boolean;
  actions?: AlertAction[];
}

/**
 * Interfaz para acciones en alertas
 */
export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Interfaz para items de actividad reciente
 */
export interface ActivityItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  icon?: string;
  avatar?: string;
  type?: 'success' | 'warning' | 'info' | 'danger';
  onClick?: () => void;
}

/**
 * Interfaz para botón de acceso rápido
 */
export interface QuickAccessButton {
  id: string;
  label: string;
  icon: string;
  backgroundColor?: string;
  textColor?: string;
  onClick: () => void;
}

/**
 * Interfaz para la configuración del panel docente
 */
export interface TeacherPanelConfig {
  subjects: { id: string; name: string }[];
  selectedSubjectId?: string;
  onSubjectChange?: (subjectId: string) => void;
  dateRange?: {
    start: Date;
    end: Date;
  };
  onDateRangeChange?: (start: Date, end: Date) => void;
}

/**
 * Interfaz para datos de calificaciones
 */
export interface GradeData {
  code: string;
  studentName: string;
  parcial1: number;
  parcial2: number;
  finalExam: number;
  average: number;
  status: 'approved' | 'failed' | 'pending';
  feedback?: string;
}

/**
 * Interfaz para datos del administrador
 */
export interface AdminDashboardData {
  activeStudents: number;
  pendingPayments: number;
  activePeriod: string;
  centralizers: number;
  studentTrend?: number;
  paymentTrend?: number;
  alerts: AlertConfig[];
  recentActivity: ActivityItem[];
  quickAccess: QuickAccessButton[];
}

/**
 * Interfaz para datos del docente
 */
export interface TeacherDashboardData {
  totalStudents: number;
  approved: number;
  failed: number;
  pending: number;
  generalAverage: number;
  studentsGrades: GradeData[];
  selectedSubject: string;
  subject?: {
    name: string;
    semester: string;
    shift: string;
  };
  alerts?: AlertConfig[];
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * Interfaz para la configuración del layout
 */
export interface DashboardLayoutConfig {
  userRole: 'teacher' | 'admin' | 'student';
  userName: string;
  userAvatar?: string;
  userTitle?: string;
  sidebarItems: SidebarItem[];
  onLogout?: () => void;
  showNotifications?: boolean;
  notificationCount?: number;
}

/**
 * Interfaz para items del sidebar
 */
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  onClick?: () => void;
  badge?: number | string;
  children?: SidebarItem[];
  active?: boolean;
}

/**
 * Interfaz para personalización de tema
 */
export interface ThemeConfig {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  dangerColor?: string;
  successColor?: string;
  warningColor?: string;
  infoColor?: string;
  borderRadius?: string;
}
