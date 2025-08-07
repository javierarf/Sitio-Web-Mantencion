// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService, Solicitud } from '../../services/solicitud.service';
import { NavbarComponent } from '../../shared/navbar.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  total = 0;
  pendientes = 0;
  completadas = 0;
  alta = 0;
  media = 0;
  baja = 0;

  constructor(private solicitudSvc: SolicitudService, private auth: AuthService) {}

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.solicitudSvc.listar().subscribe({
      next: (list) => {
        this.total = list.length;
        this.completadas = list.filter(s => s.completada).length;
        this.pendientes = this.total - this.completadas;
        this.alta = list.filter(s => s.prioridad === 'alta').length;
        this.media = list.filter(s => s.prioridad === 'media').length;
        this.baja = list.filter(s => s.prioridad === 'baja').length;
      },
      error: (e) => console.error('Error cargando resumen', e),
    });
  }

  logout() {
    this.auth.logout();
  }
}
