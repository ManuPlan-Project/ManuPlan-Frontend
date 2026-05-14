import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IconShield, IconSearch, IconReload, IconFilter } from '@tabler/icons-angular';
import { TablerIconComponent } from '@tabler/icons-angular';
import { PageHeader }  from '../../shared/components/page-header/page-header';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';
import { Pagination }  from '../../shared/components/pagination/pagination';
import { environment } from '../../../environments/environment';

export interface AuditEntry {
  auditId: string;
  userId: string | null;
  action: string;
  resourceType: string;
  resourceID: string;
  detailsJSON: string;
  timestamp: string;
}

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, TablerIconComponent, PageHeader, StatusBadge, Pagination]
})
export class AuditLog implements OnInit {
  private http = inject(HttpClient);

  IconShield = IconShield;
  IconSearch = IconSearch;
  IconReload = IconReload;
  IconFilter = IconFilter;

  entries       = signal<AuditEntry[]>([]);
  isLoading     = signal(true);
  searchQuery   = signal('');
  selectedAction = signal('all');
  currentPage   = signal(1);
  pageSize      = 15;

  actions = ['all', 'Created', 'Updated', 'Deleted', 'Login', 'Logout', 'PasswordChanged', 'RoleChanged', 'StatusChanged'];

  filtered = computed(() => {
    let data = this.entries();
    const q = this.searchQuery().toLowerCase();
    const action = this.selectedAction();

    if (q) {
      data = data.filter(e =>
        e.action.toLowerCase().includes(q) ||
        e.resourceType.toLowerCase().includes(q) ||
        e.resourceID.toLowerCase().includes(q) ||
        (e.detailsJSON ?? '').toLowerCase().includes(q)
      );
    }
    if (action !== 'all') data = data.filter(e => e.action === action);
    return data;
  });

  totalPages = computed(() => Math.ceil(this.filtered().length / this.pageSize));

  paginated = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.isLoading.set(true);
    this.http.get<any>(`${environment.api.iam}/auditlogs/all`).subscribe({
      next: res => {
        this.entries.set(res.data ?? []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onSearch(val: string) {
    this.searchQuery.set(val);
    this.currentPage.set(1);
  }

  onActionFilter(val: string) {
    this.selectedAction.set(val);
    this.currentPage.set(1);
  }

  formatDate(ts: string): string {
    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '—';
    }
  }

  getActionColor(action: string): string {
    const map: Record<string, string> = {
      Login: 'green', Logout: 'gray', Created: 'blue',
      Updated: 'yellow', Deleted: 'red',
      StatusChanged: 'purple', RoleChanged: 'purple',
      PasswordChanged: 'orange'
    };
    return map[action] ?? 'gray';
  }
}