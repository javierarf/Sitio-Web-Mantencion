import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth/jwt/create/';
  private tokenKey = 'access_token';
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedIn.next(this.hasToken());
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string) {
  return this.http
    .post<{ access: string }>(
      this.apiUrl,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access);
        this.isLoggedIn.next(true);
      })
    );
}

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }
}
