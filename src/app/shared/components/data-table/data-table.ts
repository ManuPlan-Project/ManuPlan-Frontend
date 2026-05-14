import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  mono?: boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss'
})
export class DataTable {
  @Input() columns: TableColumn[] = [];
  @Input() rows: Record<string, any>[] = [];

  getValue(row: Record<string, any>, key: string): any {
    return row[key] ?? '—';
  }
}