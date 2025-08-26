// src/app/shared/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <!-- Izquierda: Brand -->
        <div class="brand-section">
          <div class="brand">
            <span class="logo"><img src="assets/logo-sna-educa.jpg"></span>
            Gestión Mantención
          </div>
        </div>

        <!-- Derecha: Botones -->
        <div class="buttons-section">
          <div class="nav-buttons">
            <button *ngIf="auth.isAuthenticated()" (click)="navigate('funcionario')" class="nav-btn">Funcionario</button>
            <button *ngIf="auth.isAuthenticated()" (click)="navigate('admin')" class="nav-btn">Admin</button>
            <button *ngIf="auth.isAuthenticated()" (click)="navigate('mantencion')" class="nav-btn">Mantención</button>
            <button *ngIf="auth.isAuthenticated()" (click)="logout()" class="logout-btn">Cerrar sesión</button>
          </div>
        </div>

        <!-- Menú hamburguesa para móvil -->
        <button class="menu-toggle" (click)="toggleMenu()" *ngIf="auth.isAuthenticated()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Menú desplegable para móvil -->
      <div class="mobile-menu" [class.active]="isMenuOpen">
        <button (click)="navigate('funcionario')" class="mobile-btn">Funcionario</button>
        <button (click)="navigate('admin')" class="mobile-btn">Admin</button>
        <button (click)="navigate('mantencion')" class="mobile-btn">Mantención</button>
        <button (click)="logout()" class="mobile-logout">Cerrar sesión</button>
      </div>
    </nav>
  `,
  styles: [`
    /* Host element styles */
    :host {
      display: block;
      width: 100vw;
      margin: 0;
      padding: 0;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .navbar {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .nav-container {
    display: flex;
    justify-content: space-between; /* Esto está bien */
    align-items: center;
    padding: 12px 16px;
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
    width: 100%; /* Asegura que ocupe todo el ancho disponible */
    }

    /* Sección izquierda - Ocupa solo el espacio necesario */
    .brand-section {
      display: flex;
      align-items: center;
      flex-shrink: 0; /* No se reduce */
      margin-right: auto; /* Empuja todo a la derecha */
    }

    /* Sección derecha - Ocupa solo el espacio necesario */
    .buttons-section {
      display: flex;
      align-items: center;
      flex-shrink: 0; /* No se reduce */
      margin-left: auto; /* Se mantiene a la derecha */
    }
    

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #9fce4dff;
      white-space: nowrap;
    }

    .logo {
      font-size: 1.8rem;
    }
    
    .logo img {
  height: 50px; /* o el tamaño que necesites */
  width: auto;
  display: block;
}

    .nav-buttons {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    /* Botones principales */
    .nav-btn {
      padding: 10px 20px;
      border: 2px solid #c8e6c9;
      background-color: transparent;
      color: #c8e6c9;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .nav-btn:hover {
      background-color: #c8e6c9;
      color: #2e7d32;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    /* Botón de cerrar sesión */
    .logout-btn {
      padding: 10px 20px;
      border: 2px solid #ffebee;
      background-color: transparent;
      color: #ffebee;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .logout-btn:hover {
      background-color: #ffebee;
      color: #d32f2f;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    /* Menú hamburguesa (oculto en desktop) */
    .menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      gap: 4px;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background-color: #ffffff;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    /* Menú móvil (oculto en desktop) */
    .mobile-menu {
      display: none;
      flex-direction: column;
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      padding: 16px;
      gap: 12px;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .mobile-menu.active {
      display: flex;
    }

    .mobile-btn, .mobile-logout {
      padding: 12px 16px;
      border: 2px solid #c8e6c9;
      background-color: transparent;
      color: #c8e6c9;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      transition: all 0.3s ease;
    }

    .mobile-btn:hover {
      background-color: #c8e6c9;
      color: #2e7d32;
    }

    .mobile-logout {
      border-color: #ffebee;
      color: #ffebee;
    }

    .mobile-logout:hover {
      background-color: #ffebee;
      color: #d32f2f;
    }

    /* RESPONSIVE DESIGN */
    /* Tablet */
    @media (max-width: 1024px) {
      .brand {
        font-size: 1.3rem;
      }

      .nav-btn, .logout-btn {
        padding: 8px 16px;
        font-size: 13px;
      }
    }

    /* Móvil - Cambia a menú hamburguesa */
    @media (max-width: 768px) {
      .buttons-section {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .brand {
        font-size: 1.2rem;
        gap: 8px;
      }

      .logo {
        font-size: 1.5rem;
      }

      .nav-container {
        padding: 10px 16px;
      }
    }

    /* Móvil pequeño */
    @media (max-width: 480px) {
      .brand {
        font-size: 1.1rem;
      }

      .logo {
        font-size: 1.3rem;
      }
    }

    /* Efectos de focus para accesibilidad */
    .nav-btn:focus,
    .logout-btn:focus,
    .menu-toggle:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(200, 230, 201, 0.5);
    }

    .logout-btn:focus {
      box-shadow: 0 0 0 3px rgba(255, 235, 238, 0.5);
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.isMenuOpen = false;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
}