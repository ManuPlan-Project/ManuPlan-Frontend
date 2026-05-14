import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: '',
    component: AppShell,
    canActivate: [authGuard],
    children: [

      // ── IAM ─────────────────────────────────────────
      { path: 'dashboard',   loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'users',       loadComponent: () => import('./pages/users/users').then(m => m.Users) },
      { path: 'audit-log',   loadComponent: () => import('./pages/audit-log/audit-log').then(m => m.AuditLog) },

      // ── Product & BOM ────────────────────────────────
      { path: 'products',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'boms',        loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'routings',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Planning ─────────────────────────────────────
      { path: 'mps',             loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'mrp-runs',        loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'planned-orders',  loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Work Execution ───────────────────────────────
      { path: 'work-orders',     loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'work-operations', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'production-logs', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Inventory ────────────────────────────────────
      { path: 'inventory',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'locations',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'movements',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'cycle-counts', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Maintenance ───────────────────────────────────
      { path: 'maintenance-plans',  loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'maintenance-orders', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Capacity Planning ─────────────────────────────
      { path: 'work-centers',        loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'resource-allocation', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Quality Management ────────────────────────────
      { path: 'inspection-plans',   loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'inspection-results', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'non-conformances',   loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Costing ───────────────────────────────────────
      { path: 'cost-centers',    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'production-costs',loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'scrap-records',   loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'costing-reports', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── Reporting & KPI ───────────────────────────────
      { path: 'kpis',           loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'reports',        loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },
      { path: 'audit-packages', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      // ── System ────────────────────────────────────────
      { path: 'settings', loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder) },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];