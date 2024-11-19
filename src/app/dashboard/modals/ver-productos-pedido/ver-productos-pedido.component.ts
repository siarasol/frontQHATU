import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ver-productos-pedido',
  templateUrl: './ver-productos-pedido.component.html',
  styleUrls: ['./ver-productos-pedido.component.css']
})
export class VerProductosPedidoComponent implements OnInit {
  productos: any[] = [];
  totalCarrito: number = 0;
  pedidoId: number;

  constructor(
    private pedidoService: PedidoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    // Obtener el pedidoId desde la configuración del modal
    this.pedidoId = this.config.data.pedidoId;
  }

  ngOnInit(): void {
    this.obtenerDetallePedido();
  }

  // Llama al servicio para obtener el detalle del pedido
  obtenerDetallePedido() {
    this.pedidoService.obtenerDetallesPedido(this.pedidoId).subscribe((response: any) => {
      if (response.success) {
        this.productos = response.result.productos;
        this.totalCarrito = response.result.totalCarrito;
      }
    });
  }

  // Cierra el modal
  cerrarModal() {
    this.ref.close();
  }
}
