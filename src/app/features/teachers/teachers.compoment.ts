import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { TextComponent } from '../../shared/components/text/text.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    FormFieldComponent,
    BadgeComponent,
    TextComponent,
    IconComponent,
    TeacherDashboardComponent,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent {
  isLoggedIn = signal(false);
  isLoading = signal(false);
  loginError = signal('');

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });

  demoCredentials = {
    username: 'docente',
    password: '123',
  };

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

    const { username, password } = this.form.value;

    setTimeout(() => {
      this.isLoading.set(false);
      if (
        username === this.demoCredentials.username &&
        password === this.demoCredentials.password
      ) {
        this.isLoggedIn.set(true);
      } else {
        this.loginError.set('Credenciales incorrectas. Intente nuevamente.');
      }
    }, 600);
  }

  handleLogout(): void {
    this.isLoggedIn.set(false);
    this.form.reset();
    this.loginError.set('');
  }
}
