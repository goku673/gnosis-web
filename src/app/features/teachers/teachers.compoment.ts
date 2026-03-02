import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TeacherDashboardComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent {
  isLoggedIn = signal(false);
  showPassword = signal(false);
  loginError = signal('');

  form = signal<LoginForm>({
    username: '',
    password: '',
  });

  demoCredentials = {
    username: 'docente',
    password: '123',
  };

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  updateUsername(value: string): void {
    this.form.update((form) => ({
      ...form,
      username: value,
    }));
    this.loginError.set('');
  }

  updatePassword(value: string): void {
    this.form.update((form) => ({
      ...form,
      password: value,
    }));
    this.loginError.set('');
  }

  handleLogin(): void {
    const currentForm = this.form();
    if (!currentForm.username || !currentForm.password) {
      this.loginError.set('Por favor, complete todos los campos.');
      return;
    }
    if (
      currentForm.username === this.demoCredentials.username &&
      currentForm.password === this.demoCredentials.password
    ) {
      this.isLoggedIn.set(true);
      this.loginError.set('');
    } else {
      this.loginError.set('Credenciales incorrectas. Intente nuevamente.');
    }
  }

  handleLogout(): void {
    this.isLoggedIn.set(false);
    this.form.set({ username: '', password: '' });
    this.loginError.set('');
  }
}
