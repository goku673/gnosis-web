import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardConfig } from '../../types/dashboard.types';
import { getStatCardIconColorClass, getStatusLabel } from '../../utils/dashboard.utils';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  @Input() config!: StatCardConfig;
  @Input() customClasses?: string;
  @Output() cardClicked = new EventEmitter<void>();

  getIconBgColor(): string {
    if (this.config.customIconBgColor) {
      return this.config.customIconBgColor;
    }
    return getStatCardIconColorClass(this.config.iconBgColor || 'primary');
  }

  getTrendIcon(): string {
    if (!this.config.trend) return '';
    return this.config.trend.direction === 'up' ? '↑' : '↓';
  }

  getTrendClass(): string {
    if (!this.config.trend) return '';
    return this.config.trend.direction === 'up' ? 'text-green-600' : 'text-red-600';
  }

  onCardClick(): void {
    if (this.config.onClick) {
      this.config.onClick();
    }
    this.cardClicked.emit();
  }

  getDefaultIcon(): string {
    const iconMap: Record<string, string> = {
      primary: '📊',
      warning: '⚠️',
      success: '✓',
      danger: '✕',
      info: 'ℹ️',
    };
    return iconMap[this.config.iconBgColor || 'primary'];
  }
}
