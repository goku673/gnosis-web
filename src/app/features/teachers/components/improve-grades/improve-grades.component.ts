import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import type { Materia } from '../my-subjects/my-subjects.component';
import * as XLSX from 'xlsx';

export interface CalificacionRow {
  carnet: string;
  nombreCompleto: string;
  tp1: number | string;
  tp2: number | string;
  tp3: number | string;
  p1: number | string;
  p2: number | string;
  examenFinal: number | string;
  promedioFinal: number | string;
}

interface SavedUpload {
  materia: string;
  fecha: string;
  archivo: string;
  registros: number;
  data: CalificacionRow[];
}

@Component({
  selector: 'app-improve-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './improve-grades.component.html',
  styleUrls: ['./improve-grades.component.css'],
})
export class ImproveGradesComponent {
  activeTab = signal<'masiva' | 'editar'>('masiva');
  selectedMateria = signal<string>('');
  uploadedFile = signal<File | null>(null);
  parsedData = signal<CalificacionRow[]>([]);
  isDragging = signal(false);
  fileError = signal('');
  showConfirmSave = signal(false);
  showSuccessMessage = signal(false);
  savedUploads = signal<SavedUpload[]>([]);
  viewingSavedData = signal<SavedUpload | null>(null);

  materias: Materia[] = [
    {
      nombre: 'Electrónica Automotriz',
      semestre: '4to Semestre',
      grupo: 'Grupo A',
      turno: 'Turno Mañana',
      estudiantes: 28,
    },
    {
      nombre: 'Sistemas de Inyección',
      semestre: '4to Semestre',
      grupo: 'Grupo A',
      turno: 'Turno Mañana',
      estudiantes: 28,
    },
    {
      nombre: 'Diagnóstico Automotriz',
      semestre: '5to Semestre',
      grupo: 'Grupo B',
      turno: 'Turno Tarde',
      estudiantes: 24,
    },
  ];

  columnHeaders = [
    'Carnet',
    'Nombre Completo',
    'TP1',
    'TP2',
    'TP3',
    'P1',
    'P2',
    'Examen Final',
    'Promedio Final',
  ];

  setTab(tab: 'masiva' | 'editar'): void {
    this.activeTab.set(tab);
  }

  onMateriaChange(value: string): void {
    this.selectedMateria.set(value);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  processFile(file: File): void {
    this.fileError.set('');
    this.parsedData.set([]);

    // Validate file extension
    const validExtensions = ['.xlsx', '.xls'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(ext)) {
      this.fileError.set('Formato no permitido. Solo se aceptan archivos .xlsx o .xls');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      this.fileError.set('El archivo excede el tamaño máximo de 10MB.');
      return;
    }

    this.uploadedFile.set(file);

    // Read and parse Excel
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

        if (jsonData.length < 2) {
          this.fileError.set('El archivo no contiene datos suficientes.');
          return;
        }

        // Skip header row, map data
        const rows: CalificacionRow[] = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (row && (row as unknown[]).length >= 9) {
            rows.push({
              carnet: String(row[0] || ''),
              nombreCompleto: String(row[1] || ''),
              tp1: row[2] as number | string,
              tp2: row[3] as number | string,
              tp3: row[4] as number | string,
              p1: row[5] as number | string,
              p2: row[6] as number | string,
              examenFinal: row[7] as number | string,
              promedioFinal: row[8] as number | string,
            });
          }
        }

        if (rows.length === 0) {
          this.fileError.set(
            'No se pudieron leer los datos. Verifique que el formato sea correcto.'
          );
          return;
        }

        this.parsedData.set(rows);
      } catch {
        this.fileError.set('Error al procesar el archivo. Verifique que sea un archivo Excel válido.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  removeFile(): void {
    this.uploadedFile.set(null);
    this.parsedData.set([]);
    this.fileError.set('');
  }

  canSave(): boolean {
    return this.selectedMateria() !== '' && this.parsedData().length > 0;
  }

  requestSave(): void {
    if (!this.selectedMateria()) {
      this.fileError.set('Debe seleccionar una materia antes de guardar.');
      return;
    }
    if (this.parsedData().length === 0) {
      this.fileError.set('Debe cargar un archivo Excel con datos.');
      return;
    }
    this.showConfirmSave.set(true);
  }

  confirmSave(): void {
    const upload: SavedUpload = {
      materia: this.selectedMateria(),
      fecha: new Date().toLocaleDateString('es-BO'),
      archivo: this.uploadedFile()?.name || 'archivo.xlsx',
      registros: this.parsedData().length,
      data: [...this.parsedData()],
    };

    this.savedUploads.update((uploads) => [...uploads, upload]);
    this.showConfirmSave.set(false);
    this.showSuccessMessage.set(true);

    // Reset form
    this.uploadedFile.set(null);
    this.parsedData.set([]);
    this.selectedMateria.set('');

    // Auto-hide success message
    setTimeout(() => this.showSuccessMessage.set(false), 4000);
  }

  cancelSave(): void {
    this.showConfirmSave.set(false);
  }

  viewSavedUpload(upload: SavedUpload): void {
    this.viewingSavedData.set(upload);
  }

  closeSavedView(): void {
    this.viewingSavedData.set(null);
  }

  getRowValues(row: CalificacionRow): (string | number)[] {
    return [
      row.carnet,
      row.nombreCompleto,
      row.tp1,
      row.tp2,
      row.tp3,
      row.p1,
      row.p2,
      row.examenFinal,
      row.promedioFinal,
    ];
  }
}
