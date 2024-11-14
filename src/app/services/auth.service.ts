import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/usuarios/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, password: string): Observable<any> {
    console.log('ya esta esto');
    return this.http.post<any>(`${this.apiUrl}?usuario=${usuario}&password=${password}`, {}).pipe(
      tap(response => {
        if (response.success) {
          // Almacena los datos del usuario en el localStorage
          localStorage.setItem('userData', JSON.stringify(response.response));
          // Redirigir al usuario a la página principal o dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Manejo de errores
          console.error('Error en el login:', response.message);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData'); // Retorna true si hay usuario logueado
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}
