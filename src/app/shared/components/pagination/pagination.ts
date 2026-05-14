import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from '@tabler/icons-angular';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-angular';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  templateUrl: './pagination.html',
  styleUrl:    './pagination.scss'
})
export class Pagination {
  currentPage  = input.required<number>();
  totalPages   = input.required<number>();
  totalItems   = input<number>(0);
  pageSize     = input<number>(15);

  pageChange = output<number>();

  IconChevronLeft  = IconChevronLeft;
  IconChevronRight = IconChevronRight;

  start = computed(() => {
    if (this.totalItems() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  end = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.totalItems())
  );

  prev() {
    if (this.currentPage() > 1) this.pageChange.emit(this.currentPage() - 1);
  }

  next() {
    if (this.currentPage() < this.totalPages()) this.pageChange.emit(this.currentPage() + 1);
  }
}
