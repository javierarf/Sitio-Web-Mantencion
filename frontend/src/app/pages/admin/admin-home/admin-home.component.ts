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
  template: `
    <app-navbar></app-navbar>
    <h2>Panel de administrador</h2>

    <div *ngIf="solicitudes.length === 0">Cargando solicitudes...</div>

    <div *ngFor="let s of solicitudes" style="border:1px solid #ccc; padding:12px; margin-bottom:8px;">
      <div style="display:flex; justify-content: space-between; align-items: start;">
        <div>
          <strong>{{ s.resumen }}</strong> — {{ s.descripcion }}
          <div>Creada: {{ s.fecha_creacion | date:'short' }}</div>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <div>
            Prioridad:
            <select [(ngModel)]="s.prioridad" (change)="cambiarPrioridad(s)">
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div>
            Asignada a:
            <select [(ngModel)]="s.asignada_a" (change)="asignar(s)">
              <option [ngValue]="null">— sin asignar —</option>
              <option *ngFor="let u of usuarios" [value]="u.id">
                {{ u.username }}
              </option>
            </select>
          </div>

          <div>
            <label>
              <input type="checkbox" [checked]="s.completada" (change)="toggleCompleta(s)" />
              Completada
            </label>
          </div>
        </div>
      </div>
    </div>
  `
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
    // Ajustá la URL si tenés otro endpoint para usuarios
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
