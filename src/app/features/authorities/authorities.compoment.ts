import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../shared/components/select/select.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { TextComponent } from '../../shared/components/text/text.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-authorities',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    FormFieldComponent,
    BadgeComponent,
    TextComponent,
    IconComponent,
  ],
  templateUrl: './authorities.component.html',
  styleUrl: './authorities.component.css',
})
export class AuthoritiesComponent {
  isLoading = signal(false);
  loginError = signal('');

  form = new FormGroup({
    roleType: new FormControl('super-admin', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });

  roles: SelectOption[] = [
    { value: 'super-admin', label: 'Super Admin' },
    { value: 'academic-admin', label: 'Administrador Académico' },
    { value: 'secretary', label: 'Secretaria' },
  ];

  demoCredentials: Record<string, { username: string; password: string }> = {
    'super-admin': { username: 'admin', password: '123' },
    'academic-admin': { username: 'academic', password: '123' },
    secretary: { username: 'secretary', password: '123' },
  };

  get currentDemo() {
    const role = this.form.get('roleType')?.value ?? 'super-admin';
    return this.demoCredentials[role];
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.invalid || !control.touched) return '';
    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('minlength'))
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    return 'Campo inválido.';
  }

  handleLogin(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.loginError.set('');

    const { roleType, username, password } = this.form.value;
    const demo = this.demoCredentials[roleType!];

    setTimeout(() => {
      this.isLoading.set(false);
      if (username === demo.username && password === demo.password) {
        console.log('Login exitoso como:', roleType);
        // this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set('Credenciales incorrectas. Intente nuevamente.');
      }
    }, 600);
  }
}
