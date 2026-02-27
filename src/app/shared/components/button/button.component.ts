import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Si el botón necesita un icono en el futuro, importamos el IconComponent
import { IconComponent } from '../icon/icon.component'; 

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button 
      [ngClass]="getButtonClasses()"
      class="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
      
      @if (icon) {
        <app-icon [name]="icon" [size]="20"></app-icon>
      }
      
      {{ text }}
    </button>
  `
})
export class ButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() icon?: any; // Recibe el IconName si quieres icono

  // Lógica para cambiar los colores según la variante
  getButtonClasses(): string {
    if (this.variant === 'primary') {
      return 'bg-[var(--color-naranja)] text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30';
    }
    if (this.variant === 'outline') {
      return 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-azul)]';
    }
    return '';
  }
}