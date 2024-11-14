import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = `${environment.apiUrl}/api/delivery`;

  constructor(private http: HttpClient) {}

  registrarDelivery(data: { pedidoId: number; direccion: string; indicaciones: string; latitud: number; longitud: number }): Observable<any> {
    const url = `${this.apiUrl}/registrar`;
    return this.http.post(url, data);
  }
}
