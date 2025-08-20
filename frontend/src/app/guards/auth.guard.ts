import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    const expectedRole = route.data['expectedRole'];
    if (expectedRole) {
      const userRole = this.auth.getCurrentUserRole();
      if (userRole !== expectedRole) {
        // Redirigir al módulo correspondiente de su rol
        this.redirectToRoleModule(userRole);
        return false;
      }
    }

    return true;
  }

  private redirectToRoleModule(role: string | null) {
    switch (role) {
      case 'admin': this.router.navigate(['/admin']); break;
      case 'mantencion': this.router.navigate(['/mantencion']); break;
      case 'funcionario': this.router.navigate(['/funcionario']); break;
      default: this.router.navigate(['/dashboard']); break;
    }
  }
}