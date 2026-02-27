export type IconName =
  // ── Dashboard ────────────────────────────────────────────────────────────
  | 'home' | 'dashboard' | 'chart-bar' | 'chart-line' | 'chart-pie' | 'trending-up' | 'trending-down'
  // ── Usuarios / Personas ───────────────────────────────────────────────────
  | 'user' | 'user-circle' | 'user-plus' | 'user-minus' | 'user-check' | 'users'
  // ── Autenticación ─────────────────────────────────────────────────────────
  | 'login' | 'logout' | 'lock' | 'unlock' | 'eye' | 'eye-off' | 'shield' | 'key'
  // ── Documentos / Archivos ─────────────────────────────────────────────────
  | 'file' | 'file-text' | 'file-plus' | 'file-minus' | 'file-check' | 'folder' | 'folder-open' | 'upload' | 'download' | 'paperclip'
  // ── Navegación vertical (sidebar/menú) ────────────────────────────────────
  | 'menu' | 'menu-close' | 'chevron-up' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right' | 'external-link'
  // ── Navegación horizontal (tabs / tipo Excel) ─────────────────────────────
  | 'tab-add' | 'tab-remove' | 'tab-next' | 'tab-prev' | 'grid' | 'columns' | 'rows' | 'table' | 'sheet'
  // ── Notificaciones ────────────────────────────────────────────────────────
  | 'bell' | 'bell-off' | 'bell-dot' | 'info' | 'alert-triangle' | 'alert-circle' | 'check-circle' | 'x-circle'
  // ── Configuración / Settings ──────────────────────────────────────────────
  | 'settings' | 'sliders' | 'toggle-left' | 'toggle-right' | 'sun' | 'moon'
  // ── Acciones generales ────────────────────────────────────────────────────
  | 'search' | 'filter' | 'sort' | 'edit' | 'trash' | 'save' | 'copy' | 'paste' | 'plus' | 'minus' | 'x' | 'check' | 'refresh' | 'more-vertical' | 'more-horizontal' | 'print' | 'share' | 'link';

export type IconSize = 12 | 16 | 20 | 24 | 32 | 48;