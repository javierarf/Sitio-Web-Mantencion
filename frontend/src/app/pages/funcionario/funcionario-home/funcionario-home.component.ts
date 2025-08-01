// src/app/pages/funcionario/funcionario-home/funcionario-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService, Solicitud } from '../../../services/solicitud.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-funcionario-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-4" style="max-width: 600px;">
      <h2 class="mb-4 text-center">Funcionario: Crear solicitud</h2>

      <form (ngSubmit)="crear()" style="display: flex; flex-direction: column; gap: 12px;">
        <!-- Asunto / resumen -->
        <input
          [(ngModel)]="resumen"
          name="resumen"
          placeholder="Asunto"
          required
          class="form-control"
        />

        <!-- Descripción -->
        <textarea
          [(ngModel)]="descripcion"
          name="descripcion"
          placeholder="Descripción"
          required
          rows="4"
          class="form-control"
        ></textarea>

        <!-- Prioridad -->
        <select [(ngModel)]="prioridad" name="prioridad" class="form-control">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <!-- Subir imágenes -->
        <input
          type="file"
          (change)="onImagenesSeleccionadas($event)"
          multiple
          accept="image/*"
          class="form-control"
        />

        <!-- Previsualización -->
        <div *ngIf="imagenesPreview.length > 0" class="d-flex flex-wrap gap-2">
          <img
            *ngFor="let img of imagenesPreview"
            [src]="img"
            alt="Vista previa"
            style="width: 100px; height: auto; border: 1px solid #ccc; padding: 2px;"
          />
        </div>

        <!-- Botón -->
        <button type="submit" class="btn btn-primary w-100">Crear solicitud</button>
      </form>

      <h3 class="mt-5">Mis solicitudes</h3>
      <ul>
        <li *ngFor="let s of solicitudes">
          <strong>{{ s.resumen }}</strong> — {{ s.descripcion }} —
          Prioridad: {{ s.prioridad }} —
          Completada: {{ s.completada ? 'Sí' : 'No' }}
        </li>
      </ul>
    </div>
  `,
})
export class FuncionarioHomeComponent implements OnInit {
  resumen = '';
  descripcion = '';
  prioridad: 'alta' | 'media' | 'baja' = 'media';
  solicitudes: Solicitud[] = [];
  imagenes: File[] = [];
  imagenesPreview: string[] = [];

  constructor(private solicitudSvc: SolicitudService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.solicitudSvc.listar().subscribe({
      next: (data) => (this.solicitudes = data),
      error: (e) => console.error('Error al cargar solicitudes', e),
    });
  }

  onImagenesSeleccionadas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imagenes = Array.from(input.files);

      // Previsualización
      this.imagenesPreview = [];
      for (let file of this.imagenes) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagenesPreview.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  crear() {
    if (!this.resumen || !this.descripcion) return;

    const formData = new FormData();
    formData.append('resumen', this.resumen);
    formData.append('descripcion', this.descripcion);
    formData.append('prioridad', this.prioridad);

    for (let img of this.imagenes) {
      formData.append('imagenes', img);
    }

    this.solicitudSvc.crear(formData).subscribe({
      next: () => {
        this.resumen = '';
        this.descripcion = '';
        this.prioridad = 'media';
        this.imagenes = [];
        this.imagenesPreview = [];
        this.cargar();
      },
      error: (e) => console.error('Error al crear solicitud', e),
    });
  }
}
