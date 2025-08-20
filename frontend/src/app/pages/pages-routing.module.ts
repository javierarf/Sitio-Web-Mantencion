import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Módulos por rol (lazy)
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin'}
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./funcionario/funcionario.module').then((m) => m.FuncionarioModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'funcionario'}
  },
  {
    path: 'mantencion',
    loadChildren: () =>
      import('./mantencion/mantencion.module').then((m) => m.MantencionModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'mantencion'}
  },

  // Dashboard general (también protegido)
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
