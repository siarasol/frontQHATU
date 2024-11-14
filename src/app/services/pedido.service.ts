import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = `${environment.apiUrl}/api/pedidos`;  // URL base para pedidos

  constructor(private http: HttpClient) {}

  obtenerPedidosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  obtenerDetallesPedido(pedidoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pedidoId}/detalle`);
  }

  obtenerEstadosPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados`);
  }

  confirmarPago(pedidoId: number): Observable<any> {
    const url = `${this.baseUrl}/${pedidoId}/confirmar-pago`;
    return this.http.put(url, {});
  }

  asignarDelivery(pedidoId: number, usuarioId: number): Observable<any> {
    const url = `${this.baseUrl}/${pedidoId}/asignar-delivery/${usuarioId}`;
    return this.http.put(url, {});
  }
}
