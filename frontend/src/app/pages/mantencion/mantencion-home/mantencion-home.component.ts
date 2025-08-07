// src/app/pages/mantencion/mantencion-home/mantencion-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService, Solicitud } from '../../../services/solicitud.service';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-mantencion-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mantencion-home.component.html',
  styleUrls: ['./mantencion-home.component.css'],
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
        // Podrías filtrar por asignada_a si tenés el usuario actual
        this.tareas = data;
      },
      error: (e) => console.error('Error cargar tareas', e),
    });
  }

  toggle(s: Solicitud) {
    if (!s.id) return;
    this.solicitudSvc
      .actualizar(s.id, { completada: !s.completada })
      .subscribe({
        next: () => this.cargar(),
        error: (e) => console.error('Error actualizar', e),
      });
  }
}
