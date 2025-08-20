// pages/funcionario/funcionario-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioHomeComponent } from './funcionario-home/funcionario-home.component';

const routes: Routes = [
  { path: '', component: FuncionarioHomeComponent }, // Ruta principal del funcionario
  // { path: 'solicitudes', component: MisSolicitudesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }