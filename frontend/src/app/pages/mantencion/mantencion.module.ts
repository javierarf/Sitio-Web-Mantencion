// pages/mantencion/mantencion.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantencionRoutingModule } from './mantencion-routing.module';
import { MantencionHomeComponent } from './mantencion-home/mantencion-home.component';

@NgModule({
  imports: [
    CommonModule,
    MantencionRoutingModule,
    MantencionHomeComponent  // ← Importar, NO declarar
  ]
})
export class MantencionModule { }