// Componentes atómicos compartidos
// Importa desde aquí para mayor comodidad:
// import { InputComponent, ButtonComponent, ... } from '@shared/components';

export { LabelComponent } from './label/label.component';
export type { LabelSize } from './label/label.component';

export { InputComponent } from './input/input.component';
export type { InputSize, InputType, InputVariant } from './input/input.component';

export { SelectComponent } from './select/select.component';
export type { SelectOption, SelectSize, SelectVariant } from './select/select.component';

export { ButtonComponent } from './button/button.component';
export type { ButtonSize, ButtonType, ButtonVariant } from './button/button.component';

export { TextComponent } from './text/text.component';
export type { TextSize, TextTag, TextVariant, TextWeight } from './text/text.component';

export { BadgeComponent } from './badge/badge.component';
export type { BadgeSize, BadgeVariant } from './badge/badge.component';

export { FormFieldComponent } from './form-field/form-field.component';

export { IconComponent } from './icon/icon.component';
export type { IconName, IconSize } from './icon/icon.types';

// Dashboard Components - Reutilizables
export { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
export { StatCardComponent } from './stat-card/stat-card.component';
export { DataTableComponent } from './data-table/data-table.component';
export { AlertBoxComponent } from './alert-box/alert-box.component';
export { ActivityItemComponent } from './activity-item/activity-item.component';
