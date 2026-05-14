import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'active' | 'inactive'
  | 'pending' | 'approved' | 'rejected'
  | 'open'   | 'closed'   | 'in-progress'
  | 'low'    | 'medium'   | 'high' | 'critical'
  | string;

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl:    './status-badge.scss'
})
export class StatusBadge {
  label   = input.required<string>();
  variant = input<BadgeVariant>('active');

  cssClass = computed(() => `badge badge--${this.variant().toLowerCase().replace(/\s+/g, '-')}`);
}
