import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small' | 'strong';
export type TextVariant =
  | 'default'
  | 'muted'
  | 'primary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'warning';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (tag) {
      @case ('h1') {
        <h1 [class]="computedClass"><ng-content></ng-content></h1>
      }
      @case ('h2') {
        <h2 [class]="computedClass"><ng-content></ng-content></h2>
      }
      @case ('h3') {
        <h3 [class]="computedClass"><ng-content></ng-content></h3>
      }
      @case ('h4') {
        <h4 [class]="computedClass"><ng-content></ng-content></h4>
      }
      @case ('h5') {
        <h5 [class]="computedClass"><ng-content></ng-content></h5>
      }
      @case ('h6') {
        <h6 [class]="computedClass"><ng-content></ng-content></h6>
      }
      @case ('span') {
        <span [class]="computedClass"><ng-content></ng-content></span>
      }
      @case ('small') {
        <small [class]="computedClass"><ng-content></ng-content></small>
      }
      @case ('strong') {
        <strong [class]="computedClass"><ng-content></ng-content></strong>
      }
      @default {
        <p [class]="computedClass"><ng-content></ng-content></p>
      }
    }
  `,
})
export class TextComponent {
  /** Tag HTML a renderizar */
  @Input() tag: TextTag = 'p';

  /** Variante de color predefinida */
  @Input() variant: TextVariant = 'default';

  /** Tamaño de fuente */
  @Input() size: TextSize = 'md';

  /** Peso de fuente */
  @Input() weight: TextWeight = 'normal';

  /** Clases extra para sobreescribir o extender */
  @Input() customClass: string = '';

  private readonly variantClasses: Record<TextVariant, string> = {
    default: 'text-gris-oscuro',
    muted: 'text-gray-500',
    primary: 'text-azul',
    accent: 'text-naranja',
    danger: 'text-red-500',
    success: 'text-green-600',
    warning: 'text-amarillo',
  };

  private readonly sizeClasses: Record<TextSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  private readonly weightClasses: Record<TextWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  get computedClass(): string {
    return [
      this.variantClasses[this.variant],
      this.sizeClasses[this.size],
      this.weightClasses[this.weight],
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
