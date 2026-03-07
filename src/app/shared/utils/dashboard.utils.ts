import { GradeData } from '../types/dashboard.types';

/**
 * Determina el estado de una calificación basado en el promedio
 */
export function getGradeStatus(average: number): 'approved' | 'failed' | 'pending' {
  if (average < 0 || average > 100) return 'pending';
  if (average >= 60) return 'approved';
  if (average < 60) return 'failed';
  return 'pending';
}

/**
 * Calcula el promedio de calificaciones
 */
export function calculateAverage(parcial1: number, parcial2: number, finalExam: number): number {
  const sum = parcial1 + parcial2 + finalExam;
  const average = sum / 3;
  return Math.round(average * 10) / 10; // Redondea a un decimal
}

/**
 * Formatea una fecha en formato legible
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
  
  return dateObj.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Formatea una hora relativa (ej: "hace 5 minutos")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `hace ${Math.floor(interval)} años`;

  interval = seconds / 2592000;
  if (interval > 1) return `hace ${Math.floor(interval)} meses`;

  interval = seconds / 86400;
  if (interval > 1) return `hace ${Math.floor(interval)} días`;

  interval = seconds / 3600;
  if (interval > 1) return `hace ${Math.floor(interval)} horas`;

  interval = seconds / 60;
  if (interval > 1) return `hace ${Math.floor(interval)} minutos`;

  return 'hace unos segundos';
}

/**
 * Mapea un número a una clase CSS para el icono de fondo
 */
export function getStatCardIconColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    primary: 'bg-blue-500',
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    info: 'bg-cyan-500',
    orange: 'bg-orange-500',
  };
  return colorMap[color] || 'bg-blue-500';
}

/**
 * Mapea un estado a una clase CSS
 */
export function getStatusBadgeClass(status: string): string {
  const statusMap: Record<string, string> = {
    approved: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Obtiene el texto legible del estado
 */
export function getStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    approved: 'Aprobado',
    failed: 'Reprobado',
    pending: 'Pendiente',
    success: 'Éxito',
    warning: 'Advertencia',
    danger: 'Peligro',
    info: 'Información',
  };
  return labelMap[status] || status;
}

/**
 * Calcula estadísticas de estudiantes
 */
export function calculateStudentStats(grades: GradeData[]): {
  totalStudents: number;
  approved: number;
  failed: number;
  pending: number;
  generalAverage: number;
} {
  const totalStudents = grades.length;
  const approved = grades.filter(g => g.status === 'approved').length;
  const failed = grades.filter(g => g.status === 'failed').length;
  const pending = grades.filter(g => g.status === 'pending').length;
  const generalAverage = Math.round(
    (grades.reduce((sum, g) => sum + g.average, 0) / totalStudents) * 10
  ) / 10;

  return { totalStudents, approved, failed, pending, generalAverage };
}

/**
 * Ordena un array de datos
 */
export function sortData<T>(
  data: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...data].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === 'string') {
      return order === 'asc'
        ? (valueA as string).localeCompare(valueB as string)
        : (valueB as string).localeCompare(valueA as string);
    }

    return order === 'asc'
      ? (valueA as number) - (valueB as number)
      : (valueB as number) - (valueA as number);
  });
}

/**
 * Filtra un array de datos por una búsqueda
 */
export function filterData<T extends Record<string, any>>(
  data: T[],
  searchTerm: string,
  searchKeys: (keyof T)[]
): T[] {
  const term = searchTerm.toLowerCase();
  return data.filter(item =>
    searchKeys.some(key =>
      String(item[key]).toLowerCase().includes(term)
    )
  );
}

/**
 * Pagina un array de datos
 */
export function paginateData<T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10
): { data: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: data.slice(start, end),
    totalPages,
    currentPage: page,
  };
}
