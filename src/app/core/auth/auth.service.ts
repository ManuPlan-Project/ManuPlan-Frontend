import{Injectable,signal} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import{tap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type UserRole =
  | 'Planner' | 'Supervisor' | 'Operator' | 'Quality'
  | 'Material' | 'Maintenance' | 'Buyer' | 'Finance'
  | 'Admin' | 'Auditor';

export interface AuthUser{
    userId: string;
    name: string;
    email:string;
    role: UserRole;
    initials:string;
    token:string;
}

interface LoginResponse{
    data:{token:string};
    message:string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private readonly API = `${environment.api.iam}/auth`;
    private currentUser = signal<AuthUser | null>(
        this.loadFromStorage()
    );
    constructor(private http:HttpClient, private router: Router){}

    get user(){
        return this.currentUser;
    }
    get isLoggedIn(){
        return this.currentUser() !== null;
    }

    login(email: string, password: string) {
  return this.http.post<LoginResponse>(`${this.API}/login`, { email, password }).pipe(
    tap(response => {
      const token = response.data.token;
      const decoded = this.decodeJwt(token);

      const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const emailVal = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      // Pehle basic info set karo token ke saath
      const tempUser: AuthUser = {
        userId,
        email: emailVal,
        role,
        name: emailVal,
        initials: emailVal.substring(0, 2).toUpperCase(),
        token
      };
      this.setUser(tempUser);

      // Phir real name fetch karo
      this.http.get<any>(
        `${environment.api.iam}/users/details/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).subscribe({
        next: res => {
          if (res?.data?.name) {
            const fullUser: AuthUser = {
              ...tempUser,
              name: res.data.name,
              initials: res.data.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
            };
            this.setUser(fullUser);
          }
        },
        error: () => {
          // Name fetch fail — tempUser (email as name) use karo, login still works
        }
      });

      this.router.navigate(['/dashboard']);
    })
  );
}
    logout() {
    this.http.post(`${this.API}/logout`, {}).subscribe({
      complete: () => {
        this.currentUser.set(null);
        localStorage.removeItem('mp-user');
        this.router.navigate(['/login']);
      },
      error: () => {
        // Even if API fails, logout locally
        this.currentUser.set(null);
        localStorage.removeItem('mp-user');
        this.router.navigate(['/login']);
      }
    });
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  }

  private getInitials(email: string): string {
    return email.substring(0, 2).toUpperCase();
  }

  private setUser(user: AuthUser): void {
    this.currentUser.set(user);
    localStorage.setItem('mp-user', JSON.stringify(user));
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem('mp-user');
      if (!raw) return null;
      const user: AuthUser = JSON.parse(raw);
      // Token expiry check
      if (user?.token && this.isTokenExpired(user.token)) {
        localStorage.removeItem('mp-user');
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeJwt(token);
      const exp = decoded['exp'];
      if (!exp) return false;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }
}

