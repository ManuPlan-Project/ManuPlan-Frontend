import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PillVariant = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-pill',
  imports: [CommonModule],
  templateUrl: './pill.html',
  styleUrl: './pill.scss'
})
export class Pill {
  @Input() label = '';
  @Input() variant: PillVariant = 'info';
}