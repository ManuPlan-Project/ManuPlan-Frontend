import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:16px;color:var(--text-muted)">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
      <h2 style="font-size:18px;font-weight:700;color:var(--text-primary);margin:0">Module Under Construction</h2>
      <p style="font-size:13px;margin:0">Your teammate is building this module</p>
      <button (click)="router.navigate(['/dashboard'])"
        style="padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;margin-top:8px">
        Back to Dashboard
      </button>
    </div>
  `
})
export class Placeholder {
  router = inject(Router);
}