import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FormsModule } from '@angular/forms';

// Aquí agregarás los componentes de funcionario
import { FuncionarioHomeComponent } from './funcionario-home/funcionario-home.component';

@NgModule({
  declarations: [FuncionarioHomeComponent],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FormsModule
  ]
})
export class FuncionarioModule { }
