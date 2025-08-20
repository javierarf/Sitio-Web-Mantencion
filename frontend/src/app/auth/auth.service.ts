import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Importar librería para decodificar JWT

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth/jwt/create/';
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUserEmail = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  /**
   * Inicializa el estado de autenticación al cargar el servicio
   */
  private initializeAuthState(): void {
    const token = this.getToken();
    this.isLoggedIn.next(!!token);
    
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.currentUserEmail.next(decoded.email || null);
      } catch (e) {
        console.error('Error decoding token:', e);
        this.clearAuthData();
      }
    }
  }

  /**
   * Realiza el login con email y contraseña
   */
  login(email: string, password: string): Observable<{ access: string, refresh?: string }> {
    return this.http.post<{ access: string, refresh?: string }>(
      this.apiUrl,
      { email, password },  // Cambiado de username a email
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      tap((res) => {
        this.storeAuthData(res.access, res.refresh);
        this.isLoggedIn.next(true);
        
        const decoded: any = jwtDecode(res.access);
        this.currentUserEmail.next(decoded.email);
      })
    );
  }

  /**
   * Almacena los tokens y actualiza el estado
   */
  private storeAuthData(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  /**
   * Cierra la sesión y limpia los datos
   */
  logout(): void {
    this.clearAuthData();
    this.isLoggedIn.next(false);
    this.currentUserEmail.next(null);
  }

  /**
   * Limpia los datos de autenticación almacenados
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  /**
   * Obtiene el token de acceso
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene el email del usuario actual desde el token
   */
  getCurrentUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded: any = jwtDecode(token);
      return decoded.email;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }

    /**
   * Obtiene el rol del usuario actual desde el token
   */
  getCurrentUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded: any = jwtDecode(token);
      return decoded.rol || null; // Asume que el JWT incluye el campo 'rol'
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}