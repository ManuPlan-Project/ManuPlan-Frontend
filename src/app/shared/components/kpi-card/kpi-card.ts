import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type KpiVariant = 'k1' | 'k2' | 'k3' | 'k4';
export type KpiDelta = 'up' | 'dn' | 'nu';

@Component({
  selector: 'app-kpi-card',
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss'
})
export class KpiCard {
  @Input() label    = '';
  @Input() value    = '';
  @Input() delta    = '';
  @Input() deltaType: KpiDelta = 'nu';
  @Input() icon     = '';
  @Input() variant: KpiVariant = 'k1';
}