import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { IconName, IconSize } from '../icon/icon.types';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel';
export type InputVariant = 'default' | 'filled' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() inputId: string = '';
  @Input() iconLeft?: IconName;
  @Input() iconRight?: IconName;
  @Input() errorMessage: string = '';
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() customClass: string = '';
  @Input() disabled: boolean = false;

  value = signal('');
  isFocused = signal(false);
  showPassword = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  handleBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }
  handleFocus(): void {
    this.isFocused.set(true);
  }
  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  get resolvedType(): string {
    return this.type === 'password' ? (this.showPassword() ? 'text' : 'password') : this.type;
  }

  private readonly sizeClasses: Record<InputSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  private readonly iconSizeMap: Record<InputSize, IconSize> = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  get iconSize(): IconSize {
    return this.iconSizeMap[this.size];
  }

  get inputClasses(): string {
    const paddingLeft = this.iconLeft ? 'pl-10' : '';
    const paddingRight = this.type === 'password' || this.iconRight ? 'pr-10' : '';
    const variantClasses: Record<InputVariant, string> = {
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
      'w-full rounded-lg border-2 outline-none transition-colors bg-transparent',
      this.sizeClasses[this.size],
      paddingLeft,
      paddingRight,
      variantClasses[this.variant],
      this.disabled ? 'opacity-50 cursor-not-allowed' : '',
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
