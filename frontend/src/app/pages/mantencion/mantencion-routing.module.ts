// pages/mantencion/mantencion-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantencionHomeComponent } from './mantencion-home/mantencion-home.component';

const routes: Routes = [
  { path: '', component: MantencionHomeComponent }, // Ruta principal de mantención
  // { path: 'tareas', component: TareasMantencionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantencionRoutingModule { }