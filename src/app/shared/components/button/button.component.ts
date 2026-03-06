import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { IconName, IconSize } from '../icon/icon.types';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="computedClass"
      (click)="onClick.emit($event)"
    >
      @if (loading) {
        <svg
          class="animate-spin"
          [attr.width]="iconSize"
          [attr.height]="iconSize"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      }
      @if (iconLeft && !loading) {
        <app-icon [name]="iconLeft" [size]="iconSize"></app-icon>
      }
      @if (!iconOnly) {
        <span><ng-content></ng-content></span>
      }
      @if (iconRight && !loading && !iconOnly) {
        <app-icon [name]="iconRight" [size]="iconSize"></app-icon>
      }
      @if (iconOnly && !loading) {
        <app-icon [name]="iconOnly" [size]="iconSize"></app-icon>
      }
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() iconLeft?: IconName;
  @Input() iconRight?: IconName;
  @Input() iconOnly?: IconName;
  @Input() fullWidth: boolean = false;
  @Input() pill: boolean = false;
  @Input() customClass: string = '';
  @Output() onClick = new EventEmitter<MouseEvent>();

  
  private readonly iconSizeMap: Record<ButtonSize, IconSize> = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };

  get iconSize(): IconSize {
    return this.iconSizeMap[this.size];
  }

  private readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  private readonly iconOnlySizeClasses: Record<ButtonSize, string> = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };

  private readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-naranja text-white hover:bg-orange-600 shadow-sm hover:shadow-md',
    secondary: 'bg-azul text-white hover:bg-blue-900 shadow-sm hover:shadow-md',
    outline:
      'border-2 border-naranja text-naranja bg-transparent hover:bg-naranja hover:text-white',
    ghost: 'bg-transparent text-azul hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md',
  };

  get computedClass(): string {
    return [
      'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
      this.iconOnly ? this.iconOnlySizeClasses[this.size] : this.sizeClasses[this.size],
      this.variantClasses[this.variant],
      this.pill ? 'rounded-full' : 'rounded-lg',
      this.fullWidth ? 'w-full' : '',
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
