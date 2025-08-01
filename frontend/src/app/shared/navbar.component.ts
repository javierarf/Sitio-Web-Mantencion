// src/app/shared/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav style="display:flex; justify-content: space-between; padding:8px; border-bottom:1px solid #ccc;">
      <div><strong>Gestión</strong></div>
      <div>
        <button *ngIf="auth.isAuthenticated()" (click)="logout()">Cerrar sesión</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
