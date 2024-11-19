import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = environment.apiUrl;  // Usamos environment.apiUrl como la URL base

  constructor(private http: HttpClient) {}

  registrarProducto(productoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/productos/crear`, productoData);
  }

  listarProductosPorUsuario(usuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/productos/listar?createdBy=${usuario}`);
  }

  listarProductosPorUsuario1(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/productos/listarAll`);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/productos/${id}`);
  }

  adicionarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    const body = {
      usuarioId,
      productoId,
      cantidad
    };
    return this.http.post(`${this.baseUrl}/api/carrito/adicionar`, body);
  }
}
