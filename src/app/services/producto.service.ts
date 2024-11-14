import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos/crear';
  private apiUrl1 = 'http://localhost:8080/api/productos';
  private apiUrl2 = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  registrarProducto(productoData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productoData);
  }
  listarProductosPorUsuario(usuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}/listar?createdBy=${usuario}`);
  }
  listarProductosPorUsuario1(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/listarAll`);
  }
  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl1}/${id}`);
  }
  adicionarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    const body = {
      usuarioId,
      productoId,
      cantidad
    };
    return this.http.post(`${this.apiUrl2}/carrito/adicionar`, body);
  }
}
