import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DataTableConfig,
  TableColumn,
  TableData,
} from '../../types/dashboard.types';
import {
  sortData,
  filterData,
  paginateData,
  getStatusBadgeClass,
  getStatusLabel,
} from '../../utils/dashboard.utils';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() config!: DataTableConfig;
  @Input() customClasses?: string;
  @Output() rowClicked = new EventEmitter<TableData>();
  @Output() selectionChanged = new EventEmitter<TableData[]>();

  displayedData: TableData[] = [];
  sortedData: TableData[] = [];
  filteredData: TableData[] = [];
  selectedRows: Set<string | number> = new Set();
  currentPage: number = 1;
  totalPages: number = 1;
  searchTerm: string = '';

  ngOnInit(): void {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      this.initializeTable();
    }
  }

  private initializeTable(): void {
    this.sortedData = [...this.config.data];

    if (this.config.sortBy) {
      const column = this.config.columns.find(c => c.key === this.config.sortBy);
      if (column) {
        this.sortedData = sortData(
          this.sortedData,
          this.config.sortBy as keyof TableData,
          this.config.sortOrder || 'asc'
        );
      }
    }

    this.updatePagination();
  }

  private updatePagination(): void {
    this.filteredData = this.applySearch();

    if (this.config.pageable) {
      const paginated = paginateData(
        this.filteredData,
        this.currentPage,
        this.config.pageSize || 10
      );
      this.displayedData = paginated.data;
      this.totalPages = paginated.totalPages;
    } else {
      this.displayedData = this.filteredData;
    }
  }

  private applySearch(): TableData[] {
    if (!this.searchTerm.trim()) {
      return this.sortedData;
    }

    return filterData(
      this.sortedData,
      this.searchTerm,
      this.config.columns.map(c => c.key as keyof TableData)
    );
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.config.sortBy === column.key) {
      this.config.sortOrder =
        this.config.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.config.sortBy = column.key;
      this.config.sortOrder = 'asc';
    }

    this.sortedData = sortData(
      this.config.data,
      column.key as keyof TableData,
      this.config.sortOrder
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.updatePagination();
  }

  onRowClick(row: TableData): void {
    if (this.config.onRowClick) {
      this.config.onRowClick(row);
    }
    this.rowClicked.emit(row);
  }

  onSelectRow(row: TableData, event: Event): void {
    event.stopPropagation();
    const id = row.id || JSON.stringify(row);

    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }

    const selected = this.displayedData.filter(r =>
      this.selectedRows.has(r.id || JSON.stringify(r))
    );

    if (this.config.onSelectionChange) {
      this.config.onSelectionChange(selected);
    }
    this.selectionChanged.emit(selected);
  }

  onSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.displayedData.forEach(row => {
        this.selectedRows.add(row.id || JSON.stringify(row));
      });
    } else {
      this.displayedData.forEach(row => {
        this.selectedRows.delete(row.id || JSON.stringify(row));
      });
    }

    const selected = Array.from(this.selectedRows);
    const selectedRows = this.displayedData.filter(r =>
      selected.includes(r.id || JSON.stringify(r))
    );

    if (this.config.onSelectionChange) {
      this.config.onSelectionChange(selectedRows);
    }
    this.selectionChanged.emit(selectedRows);
  }

  isRowSelected(row: TableData): boolean {
    return this.selectedRows.has(row.id || JSON.stringify(row));
  }

  isAllSelected(): boolean {
    return (
      this.displayedData.length > 0 &&
      this.displayedData.every(row =>
        this.selectedRows.has(row.id || JSON.stringify(row))
      )
    );
  }

  getCellValue(row: TableData, column: TableColumn): any {
    return row[column.key];
  }

  formatCellValue(value: any, column: TableColumn, row: TableData): string {
    if (column.customRenderer) {
      return column.customRenderer(value, row) as string;
    }

    if (column.type === 'status' || column.type === 'badge') {
      return getStatusLabel(value);
    }

    if (column.type === 'number') {
      return Number(value).toFixed(1);
    }

    return String(value);
  }

  getCellClass(column: TableColumn, row: TableData): string {
    let classes = 'px-6 py-4 whitespace-nowrap';

    if (this.config.customCellClassName) {
      classes += ' ' + this.config.customCellClassName(column, row);
    }

    return classes;
  }

  getStatusBadgeClass(value: any): string {
    return getStatusBadgeClass(value);
  }

  getRowClass(row: TableData): string {
    let classes = this.config.striped ? 'hover:bg-gray-50' : '';

    if (this.config.hoverable) {
      classes += ' cursor-pointer transition-colors duration-200';
    }

    if (this.config.customRowClassName) {
      classes += ' ' + this.config.customRowClassName(row);
    }

    return classes;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
