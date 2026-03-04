import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

interface LoginForm {
  username: string;
  password: string;
  roleType: string;
}

@Component({
  selector: 'app-authorities',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, AdminDashboardComponent],
  templateUrl: './authorities.component.html',
  styleUrl: './authorities.component.css',
})
export class AuthoritiesComponent {
  isLoggedIn = signal(false);
  showPassword = signal(false);
  loginError = signal('');

  form = signal<LoginForm>({
    username: '',
    password: '',
    roleType: 'super-admin',
  });

  roles = [
    { value: 'super-admin', label: 'Super Admin' },
    { value: 'academic-admin', label: 'Administrador Academico' },
    { value: 'secretary', label: 'Secretaria' },
  ];

  demoCredentials: { [key: string]: { username: string; password: string } } = {
    'super-admin': { username: 'admin', password: '123' },
    'academic-admin': { username: 'academic', password: '123' },
    secretary: { username: 'secretary', password: '123' },
  };

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  updateRoleType(value: string): void {
    this.form.update((form) => ({
      ...form,
      roleType: value,
    }));
    this.loginError.set('');
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

    const demoCredential = this.demoCredentials[currentForm.roleType];
    if (
      currentForm.username === demoCredential.username &&
      currentForm.password === demoCredential.password
    ) {
      this.isLoggedIn.set(true);
      this.loginError.set('');
    } else {
      this.loginError.set('Credenciales incorrectas. Intente nuevamente.');
    }
  }

  getRoleLabelByValue(value: string): string {
    const role = this.roles.find((r) => r.value === value);
    return role ? role.label : value;
  }

  handleLogout(): void {
    this.isLoggedIn.set(false);
    this.form.set({ username: '', password: '', roleType: 'super-admin' });
    this.loginError.set('');
  }
}
