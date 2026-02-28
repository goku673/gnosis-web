import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  showPassword = signal(false);
  
  form = signal<LoginForm>({
    username: '',
    password: ''
  });

  demoCredentials = {
    username: 'docente',
    password: '123'
  };

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
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
    console.log('Teacher login attempt:', currentForm);
    console.log('Demo credentials:', this.demoCredentials);
    // Add your login logic here
  }
}
