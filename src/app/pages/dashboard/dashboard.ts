import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TablerIconComponent,
  IconUsers, IconHeartbeat, IconHistory, IconShieldX,
  IconUserPlus, IconDownload, IconEdit, IconTrash,
  IconActivity, IconAlertTriangle } from '@tabler/icons-angular';
import { environment } from '../../../environments/environment';

export interface DashboardUser {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
  imports: [TablerIconComponent, CommonModule, DatePipe]
})
export class Dashboard implements OnInit {

  private http   = inject(HttpClient);
  private router = inject(Router);
  public  auth   = inject(AuthService);

  usersIcon    = IconUsers;
  healthIcon   = IconHeartbeat;
  historyIcon  = IconHistory;
  shieldIcon   = IconShieldX;
  userPlusIcon = IconUserPlus;
  downloadIcon = IconDownload;
  editIcon     = IconEdit;
  trashIcon    = IconTrash;
  activityIcon = IconActivity;
  alertIcon    = IconAlertTriangle;

  users       = signal<DashboardUser[]>([]);
  auditEvents = signal<AuditEntry[]>([]);
  isLoading   = signal(true);
  auditLoading = signal(true);

  // KPI — real values from API
  totalUsers    = signal(0);
  activeUsers   = signal(0);
  auditCount24h = signal(0);
  failedLogins  = signal(0);

  ngOnInit() {
    this.fetchUsers();
    this.fetchAuditLog();
  }

  fetchUsers() {
    this.isLoading.set(true);
    this.http.get<any>(`${environment.api.iam}/users/all`).subscribe({
      next: res => {
        const data: DashboardUser[] = res.data ?? [];
        this.users.set(data);
        this.totalUsers.set(data.length);
        this.activeUsers.set(data.filter(u => u.status === 'Active').length);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  fetchAuditLog() {
    this.auditLoading.set(true);
    this.http.get<any>(`${environment.api.iam}/auditlogs/all`).subscribe({
      next: res => {
        const all: AuditEntry[] = res.data ?? [];
        // Last 4 events for dashboard preview
        this.auditEvents.set(all.slice(0, 4));

        // Count 24h audit events
        const since = Date.now() - 24 * 60 * 60 * 1000;
        this.auditCount24h.set(
          all.filter(e => new Date(e.timestamp).getTime() > since).length
        );
        // Count failed logins (last 24h)
        this.failedLogins.set(
          all.filter(e =>
            e.action === 'Login' &&
            new Date(e.timestamp).getTime() > since
          ).length
        );
        this.auditLoading.set(false);
      },
      error: () => this.auditLoading.set(false)
    });
  }

  goToUsers()    { this.router.navigate(['/users']); }
  goToAuditLog() { this.router.navigate(['/audit-log']); }

  getActionColor(action: string): string {
    const map: Record<string, string> = {
      Login: 'purple', Logout: 'gray', Created: 'green',
      Updated: 'yellow', Deleted: 'red',
      StatusChanged: 'purple', RoleChanged: 'purple',
      PasswordChanged: 'orange'
    };
    return map[action] ?? 'gray';
  }

  formatRelativeTime(ts: string): string {
    try {
      const diff = Date.now() - new Date(ts).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1)  return 'just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs  < 24) return `${hrs}h ago`;
      return `${Math.floor(hrs / 24)}d ago`;
    } catch { return '—'; }
  }

  get greeting() {
    const hour = new Date().getHours();
    const name = this.auth.user()?.name ?? '';
    if (hour < 12) return `Good morning, ${name} 👋`;
    if (hour < 17) return `Good afternoon, ${name} 👋`;
    return `Good evening, ${name} 👋`;
  }

  get today() {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric',
      month: 'long', year: 'numeric'
    }).toUpperCase();
  }

  systemHealth = [
    { name: 'Database',       status: 'Healthy',  latency: '4ms',   color: 'green'  },
    { name: 'Redis cache',    status: 'Healthy',  latency: '1ms',   color: 'green'  },
    { name: 'Message bus',    status: 'Healthy',  latency: '',      color: 'green'  },
    { name: 'Object storage', status: 'Degraded', latency: '120ms', color: 'yellow' },
  ];
}
