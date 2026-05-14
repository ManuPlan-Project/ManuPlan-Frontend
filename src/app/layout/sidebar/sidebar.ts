import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService, UserRole } from "../../core/auth/auth.service";
import { TablerIconComponent } from '@tabler/icons-angular';
import {
  IconDashboard, IconUsers, IconHistory, IconSettings,
  IconPackage, IconBinaryTree, IconRoute,
  IconCalendarTime, IconReload, IconListCheck,
  IconClipboardList, IconTool, IconChartLine,
  IconPackages, IconArrowsExchange, IconMapPin, IconClipboardData,
  IconCalendar, IconAlertTriangle, IconBuilding,
  IconShieldCheck, IconChecklist, IconFileCertificate,
  IconBuildingBank, IconCoin, IconChartBar, IconChartPie,
  IconFileExport, IconReport, IconShield,
  IconSparkles, IconBolt, IconEye, IconClockExclamation
} from '@tabler/icons-angular';

export interface NavItem {
  label?: string;
  route?: string;
  icon?: any;
  section?: string;
  badge?: string;
  badgeColor?: 'red' | 'purple';
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TablerIconComponent]
})
export class Sidebar {

  constructor(public auth: AuthService) {}

  get navItems(): NavItem[] {
    return this.getNavForRole(this.auth.user()?.role);
  }

  get user() {
    return this.auth.user();
  }

  private getNavForRole(role: UserRole | undefined): NavItem[] {
    switch (role?.toLowerCase()) {

      case 'admin':
        return [
          { section: 'IAM' },
          { label: 'Dashboard',    route: '/dashboard',   icon: IconDashboard },
          { label: 'Users',        route: '/users',        icon: IconUsers },
          { label: 'Audit Log',    route: '/audit-log',    icon: IconHistory },

          { section: 'Product & BOM' },
          { label: 'Products',     route: '/products',     icon: IconPackage },
          { label: 'BOMs',         route: '/boms',         icon: IconBinaryTree },
          { label: 'Routings',     route: '/routings',     icon: IconRoute },

          { section: 'Planning' },
          { label: 'MPS',          route: '/mps',          icon: IconCalendarTime },
          { label: 'MRP Runs',     route: '/mrp-runs',     icon: IconReload },
          { label: 'Planned Orders', route: '/planned-orders', icon: IconListCheck },

          { section: 'Work Execution' },
          { label: 'Work Orders',  route: '/work-orders',     icon: IconClipboardList },
          { label: 'Operations',   route: '/work-operations', icon: IconTool },
          { label: 'Prod. Logs',   route: '/production-logs', icon: IconChartLine },

          { section: 'Inventory' },
          { label: 'Inventory',    route: '/inventory',    icon: IconPackages },
          { label: 'Movements',    route: '/movements',    icon: IconArrowsExchange },
          { label: 'Locations',    route: '/locations',    icon: IconMapPin },
          { label: 'Cycle Counts', route: '/cycle-counts', icon: IconClipboardData },

          { section: 'Maintenance' },
          { label: 'Plans',        route: '/maintenance-plans',  icon: IconCalendar },
          { label: 'Work Orders',  route: '/maintenance-orders', icon: IconAlertTriangle },

          { section: 'Capacity' },
          { label: 'Work Centers',       route: '/work-centers',        icon: IconBuilding },
          { label: 'Resource Allocation',route: '/resource-allocation',  icon: IconChartLine },

          { section: 'Quality' },
          { label: 'Inspection Plans',   route: '/inspection-plans',   icon: IconShieldCheck },
          { label: 'Results',            route: '/inspection-results', icon: IconChecklist },
          { label: 'Non-Conformances',   route: '/non-conformances',   icon: IconAlertTriangle, badge: '!', badgeColor: 'red' },

          { section: 'Costing' },
          { label: 'Cost Centers',     route: '/cost-centers',     icon: IconBuildingBank },
          { label: 'Production Costs', route: '/production-costs', icon: IconCoin },
          { label: 'Scrap Records',    route: '/scrap-records',    icon: IconChartBar },
          { label: 'Costing Reports',  route: '/costing-reports',  icon: IconChartPie },

          { section: 'Reporting' },
          { label: 'KPIs',          route: '/kpis',           icon: IconChartBar },
          { label: 'Reports',       route: '/reports',        icon: IconReport },
          { label: 'Audit Packages',route: '/audit-packages', icon: IconFileCertificate },

          { section: 'System' },
          { label: 'Settings',     route: '/settings',     icon: IconSettings },
        ];

      case 'auditor':
        return [
          { section: 'IAM' },
          { label: 'Dashboard',  route: '/dashboard',  icon: IconDashboard },
          { label: 'Users',      route: '/users',       icon: IconUsers },
          { label: 'Audit Log',  route: '/audit-log',  icon: IconHistory },

          { section: 'Product & BOM' },
          { label: 'Products',   route: '/products',   icon: IconPackage },
          { label: 'BOMs',       route: '/boms',       icon: IconBinaryTree },
          { label: 'Routings',   route: '/routings',   icon: IconRoute },

          { section: 'Planning' },
          { label: 'MPS',          route: '/mps',           icon: IconCalendarTime },
          { label: 'MRP Runs',     route: '/mrp-runs',      icon: IconReload },
          { label: 'Planned Orders', route: '/planned-orders', icon: IconListCheck },

          { section: 'Work Execution' },
          { label: 'Work Orders',  route: '/work-orders',     icon: IconClipboardList },
          { label: 'Operations',   route: '/work-operations', icon: IconTool },
          { label: 'Prod. Logs',   route: '/production-logs', icon: IconChartLine },

          { section: 'Inventory' },
          { label: 'Inventory',    route: '/inventory',    icon: IconPackages },
          { label: 'Movements',    route: '/movements',    icon: IconArrowsExchange },
          { label: 'Cycle Counts', route: '/cycle-counts', icon: IconClipboardData },

          { section: 'Maintenance' },
          { label: 'Work Orders',  route: '/maintenance-orders', icon: IconAlertTriangle },

          { section: 'Quality' },
          { label: 'Inspection Plans',   route: '/inspection-plans',   icon: IconShieldCheck },
          { label: 'Results',            route: '/inspection-results', icon: IconChecklist },
          { label: 'Non-Conformances',   route: '/non-conformances',   icon: IconAlertTriangle },

          { section: 'Costing' },
          { label: 'Production Costs', route: '/production-costs', icon: IconCoin },
          { label: 'Scrap Records',    route: '/scrap-records',    icon: IconChartBar },
          { label: 'Costing Reports',  route: '/costing-reports',  icon: IconChartPie },

          { section: 'Reporting' },
          { label: 'KPIs',           route: '/kpis',           icon: IconChartBar },
          { label: 'Reports',        route: '/reports',        icon: IconReport },
          { label: 'Audit Packages', route: '/audit-packages', icon: IconFileCertificate },
        ];

      case 'planner':
        return [
          { section: 'Planning' },
          { label: 'Dashboard',      route: '/dashboard',      icon: IconDashboard },
          { label: 'MPS',            route: '/mps',            icon: IconCalendarTime },
          { label: 'MRP Runs',       route: '/mrp-runs',       icon: IconReload, badge: '7', badgeColor: 'purple' },
          { label: 'Planned Orders', route: '/planned-orders', icon: IconListCheck },
          { section: 'Master Data' },
          { label: 'Products',       route: '/products',       icon: IconPackage },
          { label: 'BOMs',           route: '/boms',           icon: IconBinaryTree },
          { label: 'Routings',       route: '/routings',       icon: IconRoute },
          { label: 'Work Centers',   route: '/work-centers',   icon: IconBuilding },
          { section: 'Work Execution' },
          { label: 'Work Orders',    route: '/work-orders',    icon: IconClipboardList },
          { label: 'Planned Orders', route: '/planned-orders', icon: IconListCheck },
        ];

      case 'supervisor':
        return [
          { section: 'Floor' },
          { label: 'Dashboard',     route: '/dashboard',       icon: IconDashboard },
          { label: 'Work Orders',   route: '/work-orders',     icon: IconClipboardList, badge: '24', badgeColor: 'purple' },
          { label: 'Operations',    route: '/work-operations', icon: IconTool },
          { section: 'Capacity' },
          { label: 'Work Centers',  route: '/work-centers',    icon: IconBuilding },
          { label: 'Capacity Plan', route: '/resource-allocation', icon: IconChartLine },
          { section: 'Quality' },
          { label: 'Inspection Results', route: '/inspection-results', icon: IconChecklist },
          { label: 'Non-Conformances',   route: '/non-conformances',   icon: IconAlertTriangle },
          { section: 'Inventory' },
          { label: 'Movements',    route: '/movements',    icon: IconArrowsExchange },
          { label: 'Cycle Counts', route: '/cycle-counts', icon: IconClipboardData },
        ];

      case 'operator':
        return [
          { section: 'My Work' },
          { label: 'Dashboard',  route: '/dashboard',       icon: IconDashboard },
          { label: 'Work Orders',route: '/work-orders',     icon: IconClipboardList },
          { label: 'Operations', route: '/work-operations', icon: IconTool, badge: '5', badgeColor: 'purple' },
          { section: 'Quality' },
          { label: 'Inspections',route: '/inspection-results', icon: IconShieldCheck },
          { label: 'Non-Conformances', route: '/non-conformances', icon: IconAlertTriangle },
          { section: 'Production' },
          { label: 'Prod. Logs', route: '/production-logs', icon: IconChartLine },
        ];

      case 'quality':
        return [
          { section: 'Inspections' },
          { label: 'Dashboard',        route: '/dashboard',          icon: IconDashboard },
          { label: 'Inspection Plans', route: '/inspection-plans',   icon: IconShieldCheck },
          { label: 'Results',          route: '/inspection-results', icon: IconChecklist, badge: '18', badgeColor: 'purple' },
          { section: 'Issues' },
          { label: 'Non-Conformances', route: '/non-conformances',   icon: IconAlertTriangle, badge: '9', badgeColor: 'red' },
          { section: 'Costing' },
          { label: 'Scrap Records',    route: '/scrap-records',      icon: IconChartBar },
          { section: 'Reporting' },
          { label: 'Reports',          route: '/reports',            icon: IconReport },
        ];

      case 'material':
        return [
          { section: 'Inventory' },
          { label: 'Dashboard',    route: '/dashboard',    icon: IconDashboard },
          { label: 'Inventory',    route: '/inventory',    icon: IconPackages },
          { label: 'Locations',    route: '/locations',    icon: IconMapPin },
          { section: 'Movements' },
          { label: 'Movements',    route: '/movements',    icon: IconArrowsExchange, badge: '12', badgeColor: 'purple' },
          { label: 'Cycle Counts', route: '/cycle-counts', icon: IconClipboardData, badge: '4', badgeColor: 'red' },
        ];

      case 'maintenance':
        return [
          { section: 'Schedule' },
          { label: 'Dashboard',       route: '/dashboard',          icon: IconDashboard },
          { label: 'Plans',           route: '/maintenance-plans',  icon: IconCalendar },
          { label: 'Work Orders',     route: '/maintenance-orders', icon: IconListCheck, badge: '14', badgeColor: 'purple' },
          { section: 'Reliability' },
          { label: 'Breakdowns',      route: '/maintenance-orders', icon: IconAlertTriangle, badge: '2', badgeColor: 'red' },
          { section: 'Capacity' },
          { label: 'Work Centers',    route: '/work-centers',       icon: IconBuilding },
        ];

      case 'finance':
        return [
          { section: 'Costs' },
          { label: 'Dashboard',        route: '/dashboard',       icon: IconDashboard },
          { label: 'Production Costs', route: '/production-costs',icon: IconCoin },
          { label: 'Scrap Records',    route: '/scrap-records',   icon: IconChartBar },
          { label: 'Cost Centers',     route: '/cost-centers',    icon: IconBuildingBank },
          { section: 'Reports' },
          { label: 'Costing Reports',  route: '/costing-reports', icon: IconChartPie },
          { label: 'KPIs',             route: '/kpis',            icon: IconChartBar },
          { label: 'Reports',          route: '/reports',         icon: IconReport },
          { section: 'Inventory' },
          { label: 'Inventory',        route: '/inventory',       icon: IconPackages },
          { label: 'Movements',        route: '/movements',       icon: IconArrowsExchange },
        ];

      default:
        return [
          { section: 'Main' },
          { label: 'Dashboard', route: '/dashboard', icon: IconDashboard },
        ];
    }
  }

  sparklesIcon = IconSparkles;
  boltIcon = IconBolt;
}