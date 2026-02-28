import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface LoginForm {
  username: string;
  password: string;
  roleType: string;
}

@Component({
  selector: 'app-authorities',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './authorities.component.html',
  styleUrl: './authorities.component.css'
})
export class AuthoritiesComponent {
  showPassword = signal(false);
  
  form = signal<LoginForm>({
    username: '',
    password: '',
    roleType: 'super-admin'
  });

  roles = [
    { value: 'super-admin', label: 'Super Admin' },
    { value: 'academic-admin', label: 'Administrador Académico' },
    { value: 'secretary', label: 'Secretaria' }
  ];

  demoCredentials: { [key: string]: { username: string; password: string } } = {
    'super-admin': { username: 'admin', password: '123' },
    'academic-admin': { username: 'academic', password: '123' },
    'secretary': { username: 'secretary', password: '123' }
  };

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  updateRoleType(value: string): void {
    this.form.update(form => ({
      ...form,
      roleType: value
    }));
  }

  updateUsername(value: string): void {
    this.form.update(form => ({
      ...form,
      username: value
    }));
  }

  updatePassword(value: string): void {
    this.form.update(form => ({
      ...form,
      password: value
    }));
  }

  handleLogin(): void {
    const currentForm = this.form();
    const demoCredential = this.demoCredentials[currentForm.roleType];
    
    console.log('Login attempt with role:', currentForm.roleType);
    console.log('Demo credentials:', demoCredential);
    // Add your login logic here
  }
}
