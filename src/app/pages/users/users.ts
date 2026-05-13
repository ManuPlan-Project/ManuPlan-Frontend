import { Component, OnInit, OnDestroy, signal, computed, ViewChild, TemplateRef, EmbeddedViewRef, ViewContainerRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablerIconComponent, IconUserPlus, IconTrash, IconSearch, IconShieldCheck, IconX } from '@tabler/icons-angular';
import { PageHeader }  from '../../shared/components/page-header/page-header';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';
import { Pagination }  from '../../shared/components/pagination/pagination';
import { environment } from '../../../environments/environment';

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, TablerIconComponent, PageHeader, StatusBadge, Pagination]
})
export class Users implements OnInit, OnDestroy {
  @ViewChild('modalTpl') modalTpl!: TemplateRef<any>;

  private http    = inject(HttpClient);
  private vcr     = inject(ViewContainerRef);
  private doc     = inject(DOCUMENT);
  private modalRef: EmbeddedViewRef<any> | null = null;

  userPlusIcon = IconUserPlus;
  trashIcon    = IconTrash;
  searchIcon   = IconSearch;
  shieldIcon   = IconShieldCheck;
  closeIcon    = IconX;

  users       = signal<User[]>([]);
  isLoading   = signal(true);
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize    = 15;

  roles = ['Planner', 'Supervisor', 'Operator', 'Quality', 'Material', 'Maintenance', 'Finance', 'Admin', 'Auditor'];

  newUser = { name: '', email: '', password: '', role: 'Planner' };

  filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.users();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  totalPages   = computed(() => Math.ceil(this.filteredUsers().length / this.pageSize));
  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredUsers().slice(start, start + this.pageSize);
  });

  ngOnInit() { this.fetchUsers(); }

  ngOnDestroy() { this.closeModal(); }

  fetchUsers() {
    this.http.get<any>(`${environment.api.iam}/users/all`).subscribe({
      next: res => { this.users.set(res.data); this.isLoading.set(false); },
      error: ()  => this.isLoading.set(false)
    });
  }

  openModal() {
    this.modalRef = this.vcr.createEmbeddedView(this.modalTpl);
    this.modalRef.detectChanges();
    this.modalRef.rootNodes.forEach((node: HTMLElement) => this.doc.body.appendChild(node));
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.rootNodes.forEach((node: HTMLElement) => node.remove());
      this.modalRef.destroy();
      this.modalRef = null;
    }
    this.newUser = { name: '', email: '', password: '', role: 'Planner' };
  }

  addUser() {
    if (!this.newUser.name.trim()) { alert('Name is required.'); return; }
    if (!this.newUser.email.trim() || !this.newUser.email.includes('@')) { alert('Valid email is required.'); return; }
    if (this.newUser.password.length < 8) { alert('Password must be at least 8 characters.'); return; }

    this.http.post<any>(`${environment.api.iam}/users/post`, this.newUser).subscribe({
      next: () => { this.closeModal(); this.fetchUsers(); }
    });
  }

  deleteUser(userId: string) {
    if (!confirm('Are you sure?')) return;
    this.http.delete(`${environment.api.iam}/users/delete/${userId}`).subscribe({
      next: () => this.fetchUsers()
    });
  }

  updateStatus(userId: string, status: string) {
    this.http.patch(`${environment.api.iam}/users/status/${userId}`, { status }).subscribe({
      next: () => this.fetchUsers()
    });
  }
}