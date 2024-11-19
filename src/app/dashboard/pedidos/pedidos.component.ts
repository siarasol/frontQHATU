import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoService } from 'src/app/services/pedido.service';
import { AsignarDeliveryComponent } from '../modals/asignar-delivery/asignar-delivery.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',


  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  pedidos: any[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  bsModalRef: BsModalRef | undefined;
  constructor(private pedidoService: PedidoService, private http: HttpClient, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerEstadosPedidos().subscribe(
      (data) => {
        this.pedidos = data;
        this.totalRecords = data.length;
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  descargarArchivo(url: string, nombreArchivo: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = nombreArchivo;
      a.click();
      URL.revokeObjectURL(objectUrl); // Liberar el objeto URL después de la descarga
    });
  }

  confirmarPedido(pedidoId: number): void {
    Swal.fire({
      title: 'Avertencia!',
      text: '¿Deseas confirmar este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.confirmarPago(pedidoId).subscribe(
          () => {
            Swal.fire('¡Confirmado!', 'El pedido ha sido confirmado.', 'success');
            this.cargarPedidos(); // Actualizar la lista
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al confirmar el pedido.', 'error');
            console.error('Error al confirmar el pedido:', error);
          }
        );
      }
    });
  }
  rechazarPedido(pedidoId: number): void {
    console.log(`Rechazar pedido con ID: ${pedidoId}`);
  }
  abrirModalAsignarDelivery(pedidoId: number): void {
    const initialState = { pedidoId };
    this.bsModalRef = this.modalService.show(AsignarDeliveryComponent, { initialState });

    this.bsModalRef.onHide?.subscribe(() => {
      this.cargarPedidos(); // Recargar la lista de pedidos al cerrar el modal
    });
  }
}
