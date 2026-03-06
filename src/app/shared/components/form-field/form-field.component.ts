import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  template: `
    <div [class]="computedClass">
      <!-- Label -->
      @if (label) {
        <app-label [for]="fieldId" [required]="required" [size]="labelSize" customClass="mb-2">
          {{ label }}
        </app-label>
      }

      <!-- Hint text encima del input -->
      @if (hint && hintPosition === 'top') {
        <p class="text-xs text-gray-500 mb-1">{{ hint }}</p>
      }

      <!-- Slot para el control (input, select, etc.) -->
      <ng-content></ng-content>

      <!-- Hint text debajo del input -->
      @if (hint && hintPosition === 'bottom') {
        <p class="text-xs text-gray-500 mt-1">{{ hint }}</p>
      }
    </div>
  `,
})
export class FormFieldComponent {
  /** Texto del label */
  @Input() label: string = '';

  /** ID que vincula label con el control */
  @Input() fieldId: string = '';

  /** Marca el campo como requerido (asterisco en label) */
  @Input() required: boolean = false;

  /** Texto de ayuda */
  @Input() hint: string = '';

  /** Posición del hint */
  @Input() hintPosition: 'top' | 'bottom' = 'bottom';

  /** Tamaño del label */
  @Input() labelSize: 'sm' | 'md' | 'lg' = 'md';

  /** Espaciado inferior entre campos */
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Clases extra */
  @Input() customClass: string = '';

  private readonly spacingClasses = {
    none: '',
    sm: 'mb-3',
    md: 'mb-5',
    lg: 'mb-8',
  };

  get computedClass(): string {
    return ['w-full', this.spacingClasses[this.spacing], this.customClass]
      .filter(Boolean)
      .join(' ');
  }
}
