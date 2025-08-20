// pages/funcionario/funcionario.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioHomeComponent } from './funcionario-home/funcionario-home.component';

@NgModule({
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FuncionarioHomeComponent  // ← Importar, NO declarar
  ]
})
export class FuncionarioModule { }