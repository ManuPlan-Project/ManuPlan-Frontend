import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TablerIconComponent, IconUsers, IconHeartbeat, IconHistory, IconShieldX, IconUserPlus, IconDownload, IconEdit, IconTrash } from '@tabler/icons-angular';

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
  imports: [TablerIconComponent, CommonModule]
})
export class Dashboard implements OnInit {

  usersIcon    = IconUsers;
  healthIcon   = IconHeartbeat;
  historyIcon  = IconHistory;
  shieldIcon   = IconShieldX;
  userPlusIcon = IconUserPlus;
  downloadIcon = IconDownload;
  editIcon     = IconEdit;
  trashIcon    = IconTrash;

  users = signal<User[]>([]);
  isLoading = signal(true);

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any>('http://localhost:5000/manuplan/iam/users/all').subscribe({
      next: (res) => {
        this.users.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
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

  kpis = [
    { label: 'Active users',      value: '247',  icon: IconUsers,     delta: '+12 this week', trend: 'up', cls: 'k1' },
    { label: 'System health',     value: '100%', icon: IconHeartbeat, delta: 'All green',      trend: 'up', cls: 'k3' },
    { label: 'Audit events 24h',  value: '1.2K', icon: IconHistory,   delta: 'Normal',         trend: 'nu', cls: 'k4' },
    { label: 'Failed logins 24h', value: '8',    icon: IconShieldX,   delta: '2 flagged',      trend: 'dn', cls: 'k2' },
  ];

  systemHealth = [
    { name: 'Database',       status: 'Healthy',  latency: '4ms',  color: 'green'  },
    { name: 'Redis cache',    status: 'Healthy',  latency: '1ms',  color: 'green'  },
    { name: 'Message bus',    status: 'Healthy',  latency: '',     color: 'green'  },
    { name: 'Object storage', status: 'Degraded', latency: '120ms',color: 'yellow' },
  ];

  auditLog = [
    { time: '2m ago',  type: 'LOGIN',            msg: 'Priya Sharma authenticated', color: 'purple' },
    { time: '5m ago',  type: 'CREATE_WO',        msg: 'Rohan M. · WO-8473',         color: 'green'  },
    { time: '12m ago', type: 'UPDATE_INVENTORY', msg: 'Sarah C. · LOT-2026-042',    color: 'yellow' },
    { time: '22m ago', type: 'LOGIN_FAILED',     msg: 'Unknown user · IP blocked',  color: 'red'    },
  ];
}