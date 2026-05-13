import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';
import { AuthService } from '../../core/auth/auth.service';
import { TablerIconComponent, IconMoon, IconSun, IconSearch, IconBell, IconMessage, IconHelp, IconLogout } from '@tabler/icons-angular';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  standalone: true,
  imports: [TablerIconComponent]
})
export class Topbar {
  moonIcon    = IconMoon;
  sunIcon     = IconSun;
  searchIcon  = IconSearch;
  bellIcon    = IconBell;
  messageIcon = IconMessage;
  helpIcon    = IconHelp;
  logoutIcon  = IconLogout;

  constructor(
    public themes: ThemeService,
    public auth: AuthService
  ) {}

  logout() {
    this.auth.logout();
  }
}