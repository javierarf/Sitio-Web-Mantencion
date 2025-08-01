import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // ajusta el path según tu estructura
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card class="login-card">
      <h2>Iniciar sesión</h2>
      <form (ngSubmit)="login()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Usuario</mat-label>
          <input matInput [(ngModel)]="username" name="username" required />
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" [(ngModel)]="password" name="password" required />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">Entrar</button>
      </form>
    </mat-card>
  `,
  styles: [`
    .login-card {
      width: 100%;
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
    }
    .full-width {
      width: 100%;
    }
    h2 {
      text-align: center;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  login() {
  // ⚠️ Solo para pruebas
  localStorage.setItem('token', 'FAKE_TOKEN');
  localStorage.setItem('rol', 'funcionario'); // o 'admin', según lo que necesités

  this.router.navigate(['/funcionario']); // o la ruta que querás
}

  /*login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // Redirigir al home o dashboard
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }*/
}
