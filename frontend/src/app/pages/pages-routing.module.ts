import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // Dashboard en la raíz de "pages"
  { path: '', component: DashboardComponent },

  // Módulos por rol (lazy)
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./funcionario/funcionario.module').then((m) => m.FuncionarioModule),
  },
  {
    path: 'mantencion',
    loadChildren: () =>
      import('./mantencion/mantencion.module').then((m) => m.MantencionModule),
  },

  // Fallback dentro de pages: si no coincide, redirige a dashboard
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
