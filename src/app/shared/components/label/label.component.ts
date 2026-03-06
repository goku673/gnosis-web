import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type LabelSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [for]="for" [class]="computedClass">
      <ng-content></ng-content>
      @if (required) {
        <span class="text-red-500 ml-1">*</span>
      }
    </label>
  `,
})
export class LabelComponent {
  /** Vincula el label a un input por ID */
  @Input() for: string = '';

  /** Muestra asterisco rojo si el campo es requerido */
  @Input() required: boolean = false;

  /** Tamaño predefinido */
  @Input() size: LabelSize = 'md';

  /** Clases extra para sobreescribir o extender estilos */
  @Input() customClass: string = '';

  private readonly sizeClasses: Record<LabelSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  get computedClass(): string {
    const base = 'block font-bold text-azul';
    const size = this.sizeClasses[this.size];
    return [base, size, this.customClass].filter(Boolean).join(' ');
  }
}
