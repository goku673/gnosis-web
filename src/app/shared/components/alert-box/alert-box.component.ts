import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfig } from '../../types/dashboard.types';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBoxComponent {
  @Input() config!: AlertConfig;
  @Input() customClasses?: string;
  @Output() closed = new EventEmitter<void>();
  @Output() actionClicked = new EventEmitter<string>();

  isVisible = true;

  getAlertClasses(): string {
    const baseClasses = 'rounded-lg p-4 border flex items-start gap-4';
    const typeClasses: Record<string, string> = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    };
    return `${baseClasses} ${typeClasses[this.config.type]}`;
  }

  getIconClass(): string {
    const iconClasses: Record<string, string> = {
      info: 'text-blue-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
      success: 'text-green-500',
    };
    return iconClasses[this.config.type];
  }

  getIconContent(): string {
    if (this.config.icon) return this.config.icon;

    const iconMap: Record<string, string> = {
      info: 'ℹ️',
      warning: '⚠️',
      danger: '✕',
      success: '✓',
    };
    return iconMap[this.config.type];
  }

  close(): void {
    this.isVisible = false;
    this.closed.emit();
  }

  onActionClick(actionId: string): void {
    this.actionClicked.emit(actionId);
  }
}
