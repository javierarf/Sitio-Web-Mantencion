// src/app/pages/mantencion/mantencion-home/mantencion-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService, Solicitud } from '../../../services/solicitud.service';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-mantencion-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <h2>Área de mantención: Tareas asignadas</h2>
    <ul>
      <li *ngFor="let s of tareas">
        <strong>{{ s.resumen }}</strong> — Prioridad: {{ s.prioridad }} —
        Completada:
        <input type="checkbox" [checked]="s.completada" (change)="toggle(s)" />
      </li>
    </ul>
  `
})
export class MantencionHomeComponent implements OnInit {
  tareas: Solicitud[] = [];

  constructor(private solicitudSvc: SolicitudService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.solicitudSvc.listar().subscribe({
      next: (data) => {
        // Aquí podrías filtrar por asignada a este usuario si el backend lo sugiere
        this.tareas = data;
      },
      error: (e) => console.error('Error cargar tareas', e),
    });
  }

  toggle(s: Solicitud) {
    this.solicitudSvc
      .actualizar(s.id!, { completada: !s.completada })
      .subscribe({
        next: () => this.cargar(),
        error: (e) => console.error('Error actualizar', e),
      });
  }
}
