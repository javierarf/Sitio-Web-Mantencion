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
    <div class="navbar">
      <div class="brand">Gestión Mantención</div>
      <div style="display:flex; gap:12px; align-items:center;">
        <button *ngIf="auth.isAuthenticated()" (click)="navigate('funcionario')">Funcionario</button>
        <button *ngIf="auth.isAuthenticated()" (click)="navigate('admin')">Admin</button>
        <button *ngIf="auth.isAuthenticated()" (click)="navigate('mantencion')">Mantención</button>
        <button *ngIf="auth.isAuthenticated()" (click)="logout()">Cerrar sesión</button>
      </div>
    </div>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
