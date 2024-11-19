import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`; // URL base para carrito
  private baseUrl = `${environment.apiUrl}/api/pedidos`; // URL base para pedidos

  constructor(private http: HttpClient) {}

  obtenerCarritoDetalles(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalles/${usuarioId}`);
  }

  eliminarProductoDelCarrito(usuarioId: number, productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar`, {
      body: {
        usuarioId: usuarioId,
        productoId: productoId
      }
    });
  }

  concluirCarrito(usuarioId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/concluir?usuarioId=${usuarioId}`, {});
  }

  obtenerDetallesPedido(pedidoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pedidoId}/detalle`);
  }
}
