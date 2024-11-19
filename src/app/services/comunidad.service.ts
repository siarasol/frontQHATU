import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {
  private apiUrl = `${environment.apiUrl}/api/comunidades`;

  constructor(private http: HttpClient) {}


  obtenerComunidades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearComunidad(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  editarComunidad(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarComunidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
