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
  templateUrl: './funcionario-home.component.html',
  styleUrls: ['./funcionario-home.component.css'],
})
export class FuncionarioHomeComponent implements OnInit {
  resumen = '';
  descripcion = '';
  solicitudes: Solicitud[] = [];
  imagenes: File[] = [];
  imagenesPreview: string[] = [];
  imagenAmpliada: string | null = null;


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

    if (this.imagenes.length > 0) {
    formData.append('imagen', this.imagenes[0]); // Solo la primera imagen
    }

    this.solicitudSvc.crear(formData).subscribe({
      next: () => {
        this.resumen = '';
        this.descripcion = '';
        this.imagenes = [];
        this.imagenesPreview = [];
        this.cargar();
      },
      error: (e) => console.error('Error al crear solicitud', e),
    });
  }

  abrirImagen(url: string) {
    this.imagenAmpliada = url;
  }

  cerrarImagen() {
    this.imagenAmpliada = null;
  }
}
