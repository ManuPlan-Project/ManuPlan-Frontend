import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../core/auth/auth.service';
import { TablerIconComponent, IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight, IconKey, IconSparkles, IconCalendarTime, IconUsers, IconTool, IconShieldCheck, IconPackage, IconCoin, IconSettings, IconFileCheck } from '@tabler/icons-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  imports: [FormsModule, TablerIconComponent]
})
export class Login {
  email = signal('');
  password = signal('');
  rememberMe = signal(true);
  showPassword = signal(false);
  isLoading = signal(false);
  errorMsg = signal('');

  mailIcon = IconMail;
  lockIcon = IconLock;
  eyeIcon = IconEye;
  eyeOffIcon = IconEyeOff;
  arrowIcon = IconArrowRight;
  keyIcon = IconKey;
  sparklesIcon = IconSparkles;

  demoRoles = [
    { label: 'Planner',     icon: IconCalendarTime },
    { label: 'Supervisor',  icon: IconUsers },
    { label: 'Operator',    icon: IconTool },
    { label: 'Quality',     icon: IconShieldCheck },
    { label: 'Material',    icon: IconPackage },
    { label: 'Maintenance', icon: IconTool },
    { label: 'Finance',     icon: IconCoin },
    { label: 'Admin',       icon: IconSettings },
    { label: 'Auditor',     icon: IconFileCheck },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (!this.email() || !this.password()) {
      this.errorMsg.set('Email aur password dono chahiye.');
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    this.auth.login(this.email(), this.password()).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMsg.set('Invalid email or password.');
      }
    });
  }
}