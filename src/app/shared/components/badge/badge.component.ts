import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconName, IconSize } from '../icon/icon.types';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span [class]="computedClass">
      @if (icon) {
        <app-icon [name]="icon" [size]="iconSize"></app-icon>
      }
      @if (dot) {
        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() icon?: IconName;
  @Input() dot: boolean = false;
  @Input() pill: boolean = true;
  @Input() customClass: string = '';

  // ✅ Fix: Record<BadgeSize, IconSize>
  private readonly iconSizeMap: Record<BadgeSize, IconSize> = {
    sm: 10,
    md: 12,
    lg: 14,
  };

  get iconSize(): IconSize {
    return this.iconSizeMap[this.size];
  }

  private readonly sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  private readonly variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-naranja/10 text-naranja border border-naranja/20',
    secondary: 'bg-azul/10 text-azul border border-azul/20',
    success: 'bg-green-100 text-green-700 border border-green-200',
    danger: 'bg-red-100 text-red-700 border border-red-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    info: 'bg-blue-100 text-blue-700 border border-blue-200',
    ghost: 'bg-gray-100 text-gray-600 border border-gray-200',
  };

  get computedClass(): string {
    return [
      'inline-flex items-center font-medium',
      this.pill ? 'rounded-full' : 'rounded',
      this.sizeClasses[this.size],
      this.variantClasses[this.variant],
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
