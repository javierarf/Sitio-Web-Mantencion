// src/app/pages/mantencion/mantencion.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./mantencion-home/mantencion-home.component').then(
        (m) => m.MantencionHomeComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantencionModule {}
