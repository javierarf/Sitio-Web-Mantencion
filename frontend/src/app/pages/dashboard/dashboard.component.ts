import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <p>Bienvenido al área protegida.</p>
    <button (click)="logout()">Cerrar sesión</button>
  `,
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access_token');  // o usa AuthService
    this.router.navigate(['/login']);
  }
}
