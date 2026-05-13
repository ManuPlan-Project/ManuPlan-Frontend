import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService, UserRole } from "../../core/auth/auth.service";
import { TablerIconComponent, IconDashboard, IconBox, IconPackage, IconSettings, IconChartBar, IconClipboardList, IconTool, IconChartLine, IconShieldCheck, IconSparkles, IconBolt, IconCalendarTime, IconUsers, IconRefresh, IconListCheck, IconRoute, IconAlertTriangle, IconChecklist, IconBinaryTree, IconHistory, IconShield, IconBuilding, IconClipboardData, IconArrowsExchange, IconMapPin, IconCalendar, IconChartPie, IconFileExport, IconBuildingBank, IconCoin, IconFileCertificate, IconReport, IconClockExclamation, IconEye } from '@tabler/icons-angular';

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
    const role = this.auth.user()?.role;
    return this.getNavForRole(role);
  }

  get user() {
    return this.auth.user();
  }

  private getNavForRole(role: UserRole | undefined): NavItem[] {
    switch (role) {
      case 'Admin':
        return [
          { section: 'Access' },
          { label: 'Dashboard',  route: '/dashboard',  icon: IconDashboard },
          { label: 'Users',      route: '/users',       icon: IconUsers },
          { label: 'Roles',      route: '/roles',       icon: IconShield },
          { section: 'Master Data' },
          { label: 'BOMs',       route: '/product-bom', icon: IconBinaryTree },
          { label: 'Routings',   route: '/routings',    icon: IconRoute },
          { label: 'Work Centers', route: '/work-centers', icon: IconBuilding },
          { section: 'System' },
          { label: 'Audit Log',  route: '/audit-log',   icon: IconHistory, badge: 'New', badgeColor: 'purple' },
          { label: 'Settings',   route: '/settings',    icon: IconSettings },
        ];

      case 'Planner':
        return [
          { section: 'Planning' },
          { label: 'Dashboard',      route: '/dashboard',      icon: IconDashboard },
          { label: 'MPS Editor',     route: '/mps-mrp',        icon: IconCalendarTime },
          { label: 'MRP Runs',       route: '/mrp-runs',       icon: IconRefresh, badge: '7', badgeColor: 'purple' },
          { label: 'Planned Orders', route: '/planned-orders', icon: IconListCheck },
          { section: 'Master Data' },
          { label: 'Products',       route: '/product-bom',    icon: IconPackage },
          { label: 'BOMs',           route: '/boms',           icon: IconBinaryTree },
          { label: 'Routings',       route: '/routings',       icon: IconRoute },
          { section: 'Insights' },
          { label: 'Exceptions',     route: '/exceptions',     icon: IconAlertTriangle, badge: '2', badgeColor: 'red' },
        ];

      case 'Supervisor':
        return [
          { section: 'Floor' },
          { label: 'Dashboard',     route: '/dashboard',     icon: IconDashboard },
          { label: 'Work Orders',   route: '/work-execution', icon: IconClipboardList, badge: '24', badgeColor: 'purple' },
          { label: 'Work Centers',  route: '/work-centers',  icon: IconBuilding },
          { section: 'Capacity' },
          { label: 'Capacity Plan', route: '/capacity-planning', icon: IconChartLine },
          { section: 'Issues' },
          { label: 'Open Issues',   route: '/issues',        icon: IconAlertTriangle, badge: '3', badgeColor: 'red' },
        ];

      case 'Operator':
        return [
          { section: 'My Work' },
          { label: 'Dashboard',  route: '/dashboard',      icon: IconDashboard },
          { label: 'My Tasks',   route: '/my-tasks',       icon: IconChecklist, badge: '5', badgeColor: 'purple' },
          { label: 'Active WO',  route: '/work-execution', icon: IconTool },
          { section: 'Quality' },
          { label: 'Quick QC',   route: '/quality-management', icon: IconShieldCheck },
          { section: 'History' },
          { label: 'My Output',  route: '/my-output',      icon: IconHistory },
        ];

      case 'Quality':
        return [
          { section: 'Inspections' },
          { label: 'Dashboard',        route: '/dashboard',          icon: IconDashboard },
          { label: 'Inspection Plans', route: '/inspection-plans',   icon: IconClipboardData },
          { label: 'Results',          route: '/quality-management', icon: IconChecklist, badge: '18', badgeColor: 'purple' },
          { section: 'Issues' },
          { label: 'NC Queue',         route: '/nc-queue',           icon: IconAlertTriangle, badge: '9', badgeColor: 'red' },
          { section: 'Output' },
          { label: 'Certificates',     route: '/certificates',       icon: IconFileCertificate },
          { label: 'Yield Trends',     route: '/yield-trends',       icon: IconChartLine },
        ];

      case 'Material':
        return [
          { section: 'Inventory' },
          { label: 'Dashboard',    route: '/dashboard',  icon: IconDashboard },
          { label: 'Inventory',    route: '/inventory',  icon: IconPackage },
          { label: 'Lot Tracking', route: '/lot-tracking', icon: IconHistory },
          { section: 'Movements' },
          { label: 'Movements',    route: '/movements',  icon: IconArrowsExchange, badge: '12', badgeColor: 'purple' },
          { label: 'Cycle Counts', route: '/cycle-counts', icon: IconClipboardData, badge: '4', badgeColor: 'red' },
          { section: 'Setup' },
          { label: 'Locations',    route: '/locations',  icon: IconMapPin },
        ];

      case 'Maintenance':
        return [
          { section: 'Schedule' },
          { label: 'Dashboard',      route: '/dashboard',   icon: IconDashboard },
          { label: 'PM Calendar',    route: '/pm-calendar', icon: IconCalendar },
          { label: 'Maintenance WOs', route: '/maintenance', icon: IconListCheck, badge: '14', badgeColor: 'purple' },
          { section: 'Reliability' },
          { label: 'Breakdown Log',  route: '/breakdowns',  icon: IconAlertTriangle, badge: '2', badgeColor: 'red' },
          { label: 'MTTR / MTBF',   route: '/reliability', icon: IconChartBar },
          { section: 'Assets' },
          { label: 'Work Centers',   route: '/work-centers', icon: IconBuilding },
        ];

      case 'Finance':
        return [
          { section: 'Costs' },
          { label: 'Dashboard',        route: '/dashboard',  icon: IconDashboard },
          { label: 'Production Costs', route: '/costs',      icon: IconCoin },
          { label: 'Scrap Analysis',   route: '/scrap',      icon: IconChartBar },
          { section: 'Reporting' },
          { label: 'Variance Reports', route: '/variance',   icon: IconChartPie },
          { label: 'GL Export',        route: '/gl-export',  icon: IconFileExport },
          { section: 'Setup' },
          { label: 'Cost Centers',     route: '/cost-centers', icon: IconBuildingBank },
        ];

      case 'Auditor':
        return [
          { section: 'Audit' },
          { label: 'Dashboard',       route: '/dashboard',   icon: IconDashboard },
          { label: 'Audit Log',       route: '/audit-log',   icon: IconHistory },
          { label: 'Audit Packages',  route: '/packages',    icon: IconFileCertificate, badge: '3', badgeColor: 'purple' },
          { section: 'Compliance' },
          { label: 'Compliance KPIs', route: '/compliance',  icon: IconShieldCheck },
          { label: 'Open NCs > 30d',  route: '/nc-queue',    icon: IconClockExclamation, badge: '5', badgeColor: 'red' },
          { section: 'Reports' },
          { label: 'Reports',         route: '/reports',     icon: IconReport },
        ];

      default:
        return [
          { section: 'Main' },
          { label: 'Dashboard', route: '/dashboard', icon: IconDashboard },
          { label: 'Settings',  route: '/settings',  icon: IconSettings },
        ];
    }
  }

  sparklesIcon = IconSparkles;
  boltIcon = IconBolt;
}