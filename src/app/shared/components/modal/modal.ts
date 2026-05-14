import {
  Component, Input, Output, EventEmitter,
  OnInit, OnDestroy, ElementRef, inject, PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TablerIconComponent, IconX } from '@tabler/icons-angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: true,
  imports: [TablerIconComponent]
})
export class AppModal implements OnInit, OnDestroy {

  @Input() title  = '';
  @Input() maxWidth = '440px';
  @Output() closed = new EventEmitter<void>();

  closeIcon  = IconX;

  private el         = inject(ElementRef);
  private doc        = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // Move host element to document.body so position:fixed works correctly
    // (avoids stacking context issues from parent overflow:hidden / backdrop-filter)
    if (isPlatformBrowser(this.platformId)) {
      this.doc.body.appendChild(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    // Clean up when @if removes this component
    const el = this.el.nativeElement;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  onOverlayClick() {
    this.closed.emit();
  }
}
