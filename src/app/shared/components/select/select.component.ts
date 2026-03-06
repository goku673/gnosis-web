import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/icon.types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export type SelectVariant = 'default' | 'filled' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() selectId: string = '';
  @Input() errorMessage: string = '';
  @Input() variant: SelectVariant = 'default';
  @Input() size: SelectSize = 'md';
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;

  value = signal('');
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: string): void {
    this.value.set(v ?? '');
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean): void {
    this.disabled = d;
  }

  handleChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  private readonly sizeClasses: Record<SelectSize, string> = {
    sm: 'pl-3 pr-8 py-1.5 text-sm',
    md: 'pl-4 pr-10 py-2 text-sm',
    lg: 'pl-4 pr-10 py-3 text-base',
  };

  // Fix: Record<SelectSize, IconSize> en lugar de Record<SelectSize, number>
  private readonly iconSizeMap: Record<SelectSize, IconSize> = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  get iconSize(): IconSize {
    return this.iconSizeMap[this.size];
  }

  get selectClasses(): string {
    const variantClasses: Record<SelectVariant, string> = {
      default: this.errorMessage
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-300 focus:border-naranja',
      filled: this.errorMessage
        ? 'border-red-400 bg-red-50'
        : 'border-transparent bg-gray-100 focus:bg-white focus:border-naranja',
      ghost: this.errorMessage
        ? 'border-b-red-400 border-x-transparent border-t-transparent rounded-none'
        : 'border-b-gray-300 border-x-transparent border-t-transparent rounded-none focus:border-b-naranja',
    };
    return [
      'w-full rounded-lg border-2 outline-none transition-colors appearance-none bg-transparent cursor-pointer',
      this.sizeClasses[this.size],
      variantClasses[this.variant],
      this.disabled ? 'opacity-50 cursor-not-allowed' : '',
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
