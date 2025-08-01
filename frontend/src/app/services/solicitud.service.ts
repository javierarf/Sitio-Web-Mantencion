// src/app/services/solicitud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Solicitud {
  id?: number;
  resumen: string;
  descripcion: string;
  prioridad?: 'alta' | 'media' | 'baja';
  completada?: boolean;
  creada_por?: number;
  asignada_a?: number | null;
  fecha_creacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private base = 'http://localhost:8000/api/solicitudes/';

  constructor(private http: HttpClient) {}

  listar(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.base);
  }

  crear(payload: FormData): Observable<Solicitud> {
  return this.http.post<Solicitud>(this.base, payload);
}

  actualizar(id: number, payload: Partial<Solicitud>): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${this.base}${id}/`, payload);
  }
}
