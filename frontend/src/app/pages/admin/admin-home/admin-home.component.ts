// src/app/pages/admin/admin-home/admin-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService, Solicitud } from '../../../services/solicitud.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar.component';
import { AuthService } from '../../../auth/auth.service';

interface UsuarioMinimal {
  id: number;
  username: string;
  rol?: string;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  usuarios: UsuarioMinimal[] = [];

  constructor(
    private solicitudSvc: SolicitudService,
    private http: HttpClient,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.cargarSolicitudes();
    this.cargarUsuarios();
  }

  cargarSolicitudes() {
    this.solicitudSvc.listar().subscribe({
      next: (data) => (this.solicitudes = data),
      error: (e) => console.error('Error al cargar solicitudes', e),
    });
  }

  cargarUsuarios() {
    this.http.get<UsuarioMinimal[]>('http://localhost:8000/auth/users/').subscribe({
      next: (data) => (this.usuarios = data),
      error: (e) => console.error('Error al cargar usuarios', e),
    });
  }

  cambiarPrioridad(s: Solicitud) {
    if (!s.id) return;
    this.solicitudSvc.actualizar(s.id, { prioridad: s.prioridad }).subscribe({
      next: () => {},
      error: (e) => console.error('Error al cambiar prioridad', e),
    });
  }

  asignar(s: Solicitud) {
    if (!s.id) return;
    this.solicitudSvc.actualizar(s.id, { asignada_a: s.asignada_a }).subscribe({
      next: () => {},
      error: (e) => console.error('Error al asignar', e),
    });
  }

  toggleCompleta(s: Solicitud) {
    if (!s.id) return;
    this.solicitudSvc.actualizar(s.id, { completada: !s.completada }).subscribe({
      next: () => this.cargarSolicitudes(),
      error: (e) => console.error('Error al actualizar completada', e),
    });
  }
}
