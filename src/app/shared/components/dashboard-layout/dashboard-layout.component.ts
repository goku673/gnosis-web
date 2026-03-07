import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardLayoutConfig, SidebarItem } from '../../types/dashboard.types';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  @Input() config!: DashboardLayoutConfig;
  @Input() customClasses?: string;
  @Output() logout = new EventEmitter<void>();
  @Output() sidebarItemClicked = new EventEmitter<SidebarItem>();

  sidebarOpen = true;
  expandedItems = new Map<string, boolean>();

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSidebarItem(item: SidebarItem): void {
    if (item.children && item.children.length > 0) {
      this.expandedItems.set(item.id, !this.expandedItems.get(item.id));
    }
  }

  onSidebarItemClick(item: SidebarItem): void {
    if (item.onClick) {
      item.onClick();
    }
    this.sidebarItemClicked.emit(item);
  }

  onLogout(): void {
    if (this.config.onLogout) {
      this.config.onLogout();
    }
    this.logout.emit();
  }

  getRoleColor(): string {
    const roleColors: Record<string, string> = {
      teacher: 'bg-blue-600',
      admin: 'bg-purple-600',
      student: 'bg-green-600',
    };
    return roleColors[this.config.userRole] || 'bg-blue-600';
  }

  getUserInitials(): string {
    return this.config.userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  isItemExpanded(itemId: string): boolean {
    return this.expandedItems.get(itemId) || false;
  }

  getItemIconChar(item: SidebarItem): string {
    const iconMap: Record<string, string> = {
      dashboard: '📊',
      students: '👥',
      grades: '📝',
      materials: '📚',
      calendar: '📅',
      settings: '⚙️',
      users: '👤',
      reports: '📈',
      default: '📌',
    };
    return iconMap[item.icon] || iconMap['default'];
  }
}
