import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItem } from '../../types/dashboard.types';
import { formatRelativeTime } from '../../utils/dashboard.utils';

@Component({
  selector: 'app-activity-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityItemComponent {
  @Input() item!: ActivityItem;
  @Input() customClasses?: string;
  @Output() itemClicked = new EventEmitter<ActivityItem>();

  getTypeColor(): string {
    const colorMap: Record<string, string> = {
      success: 'text-green-600 bg-green-50',
      warning: 'text-yellow-600 bg-yellow-50',
      info: 'text-blue-600 bg-blue-50',
      danger: 'text-red-600 bg-red-50',
    };
    return colorMap[this.item.type || 'info'];
  }

  getTypeIcon(): string {
    const iconMap: Record<string, string> = {
      success: '✓',
      warning: '⚠️',
      info: 'ℹ️',
      danger: '✕',
    };
    return iconMap[this.item.type || 'info'];
  }

  getRelativeTime(): string {
    return formatRelativeTime(this.item.timestamp);
  }

  onClick(): void {
    if (this.item.onClick) {
      this.item.onClick();
    }
    this.itemClicked.emit(this.item);
  }
}
