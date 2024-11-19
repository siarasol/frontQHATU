import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service'; // Asegúrate de que la ruta sea correcta
import { MessageService } from 'primeng/api';
import { VerProductosPedidoComponent } from '../modals/ver-productos-pedido/ver-productos-pedido.component'; // Asegúrate de que la ruta sea correcta
import { PagoPedidoComponent } from '../modals/pago-pedido/pago-pedido.component'
import { RegistrarDeliveryComponent } from '../modals/registrar-delivery/registrar-delivery.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-seguimiento-compras',

  templateUrl: './seguimiento-compras.component.html',
  styleUrls: ['./seguimiento-compras.component.css'],
  providers: [DialogService]

 // providers: [MessageService] // Inyectamos el servicio de mensajes
})
export class SeguimientoComprasComponent implements OnInit {
  pedidos: any[] = [];
  loading: boolean = true;
  totalRecords: number = 0;
  userData: any;
  bsModalRef: BsModalRef | undefined;

  usuarioId: any | null = null; // Suponemos que obtendrás el ID del usuario desde el storage
  ref?: DynamicDialogRef;

  constructor(private modalService: BsModalService, private dialogService: DialogService,  private pedidoService: PedidoService, private messageService: MessageService) {}
  ngOnInit() {
    this.loadUserData();
    if (this.userData && this.userData.id) {
      this.usuarioId = this.userData.id;
      this.cargarPedidos(this.usuarioId);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario no identificado.' });
    }
  }

  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontró información del usuario.' });
    }
  }

  obtenerUsuarioId(): number | null {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser).id : null;
  }
  // Llama al servicio para abrir el modal de detalle del pedido
  verDetalle(pedidoId: number) {
    this.ref = this.dialogService.open(VerProductosPedidoComponent, {
      header: 'Detalle del Pedido',
      width: '50%',
      data: { pedidoId: pedidoId },
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  cargarPedidos(usuarioId: number) {
    this.pedidoService.obtenerPedidosPorUsuario(usuarioId).subscribe(
      (response: any) => {
        if (response.success) {
          this.pedidos = response.result;
          this.totalRecords = this.pedidos.length; // Actualizamos el total de registros
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: response.message });
        }
        this.loading = false; // Fin del loading
      },
      (error) => {
        console.error('Error al cargar pedidos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar los pedidos.' });
        this.loading = false; // Fin del loading
      }
    );
  }

  formatearFecha(fecha: string): string {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' } as const;
    return new Date(fecha).toLocaleString('es-ES', options);
  }

  pagar(pedidoId: number, total: number) {
    const ref = this.dialogService.open(PagoPedidoComponent, {
      data: {
        pedidoId: pedidoId,
        total: total
      },
      header: 'Realizar Pago',
      width: '50%'
    });

    ref.onClose.subscribe((result: any) => {

      if (result) {
        this.cargarPedidos(this.usuarioId);
      }
    });
  }
  registrarDelivery(pedidoId: number) {
    this.bsModalRef = this.modalService.show(RegistrarDeliveryComponent, {
      initialState: { pedidoId },
      class: 'modal-lg', // Ajusta el tamaño si es necesario
    });
  }
}
