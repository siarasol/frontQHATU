import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl+'/api/usuarios'; // URL del backend

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(this.apiUrl, usuarioData); // Hace la petición POST al backend
  }
  obtenerUsuariosDelivery(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/delivery`);
  }
}
