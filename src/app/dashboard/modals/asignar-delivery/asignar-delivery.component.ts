import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asignar-delivery',
  templateUrl: './asignar-delivery.component.html',
  styleUrls: ['./asignar-delivery.component.css']
})
export class AsignarDeliveryComponent implements OnInit {
  pedidoId!: number;
  usuariosDelivery: any[] = [];
  usuarioSeleccionado: number | null = null; // ID del usuario seleccionado

  constructor(
    public bsModalRef: BsModalRef,
    private usuariosService: UsuarioService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.cargarUsuariosDelivery();
  }

  cargarUsuariosDelivery(): void {
    this.usuariosService.obtenerUsuariosDelivery().subscribe(
      (data) => {
        this.usuariosDelivery = data;
      },
      (error) => {
        console.error('Error al obtener usuarios de delivery:', error);
      }
    );
  }


  confirmarAsignacion(): void {
    if (!this.usuarioSeleccionado) return;

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres asignar este usuario como delivery?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, asignar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.pedidoService.asignarDelivery(this.pedidoId, this.usuarioSeleccionado!).subscribe(
        () => {
          Swal.fire('Asignado', 'El delivery ha sido asignado exitosamente.', 'success');
          this.bsModalRef.hide();
        },
        (error) => {
          console.error('Error al asignar el delivery:', error);
          Swal.fire('Error', 'Hubo un problema al asignar el delivery.', 'error');
        }
      );
    }
  });
  }
}
