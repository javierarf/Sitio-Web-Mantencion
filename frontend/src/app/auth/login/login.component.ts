import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder); // Inyección directa con inject()
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error = '';
  hidePassword = true;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

 login() {
  if (this.loginForm.invalid) return;

  const { email, password } = this.loginForm.value;
  
  this.authService.login(email!, password!).subscribe({
    next: () => {
      this.redirectBasedOnRole();
    },
    error: (err) => {
      this.error = err.error?.detail || 'Credenciales incorrectas';
      console.error('Error de autenticación:', err);
    }
  });
}

private redirectBasedOnRole() {
  const userRole = this.authService.getCurrentUserRole();
  const userEmail = this.authService.getCurrentUserEmail();
  
  console.log('Usuario autenticado:', userEmail, 'Rol:', userRole);
  
  switch (userRole) {
    case 'admin':
      this.router.navigate(['/admin']);
      break;
    case 'mantencion':
      this.router.navigate(['/mantencion']);
      break;
    case 'funcionario':
      this.router.navigate(['/funcionario']);
      break;
    default:
      console.error('Rol no reconocido:', userRole);
      // Redirigir a una página por defecto o mostrar error
      this.router.navigate(['/dashboard']);
      break;
  }
}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}