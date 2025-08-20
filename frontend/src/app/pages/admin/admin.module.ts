// pages/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component'; // Solo importar, NO declarar

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminHomeComponent  // ← Importar el componente standalone
  ]
})
export class AdminModule { }