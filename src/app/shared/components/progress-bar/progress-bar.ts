import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'purple' | 'green' | 'yellow' | 'red' | 'mint';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss'
})
export class ProgressBar {
  @Input() label = '';
  @Input() value = 0;
  @Input() max = 100;
  @Input() variant: ProgressVariant = 'purple';

  get percentage(): number {
    return Math.min(100, Math.round((this.value / this.max) * 100));
  }
}