import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {
  productos: any[] = [];
  totalGeneral: number = 0;
  userData: any;
  constructor(private carritoService: CarritoService, public ref: DynamicDialogRef,) {}

  ngOnInit(): void {
    //this.obtenerCarritoDetalles();
    this.loadUserData();
  }

  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log(this.userData.id);

      // Una vez que se carguen los datos del usuario, obtener los detalles del carrito
      this.obtenerCarritoDetalles();
    } else {
      console.log('No hay datos de usuario en el almacenamiento.');
    }
  }
  obtenerCarritoDetalles(): void {
    const usuarioId = this.userData.id; // ID del usuario, puedes obtenerlo del almacenamiento local
    this.carritoService.obtenerCarritoDetalles(usuarioId).subscribe(
      (response: any) => {
        if (response.success) {
          this.productos = response.carrito.productos;
          this.calcularTotalGeneral(); // Llama a la función para calcular el total
        }
      },
      (error) => {
        console.error('Error al obtener los detalles del carrito', error);
      }
    );
  }

  calcularTotalGeneral(): void {
    this.totalGeneral = this.productos.reduce((total, producto) => total + producto.totalProd, 0);
  }

  cerrarModal(): void {
    this.ref.close();
  }
  eliminarProductoDelCarrito(productoId: number): void {
    const usuarioId = this.userData.id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este producto del carrito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-zindex-top' // Clase para ajustar el z-index de la alerta
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminarProductoDelCarrito(usuarioId, productoId).subscribe(
          (response: any) => {
            if (response.success) {
              Swal.fire({
                title: '¡Eliminado!',
                text: 'El producto ha sido eliminado del carrito.',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: {
                  popup: 'swal2-zindex-top'  // Mismo ajuste para z-index alto
                }
              });
              this.obtenerCarritoDetalles();
            }
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el producto.',
              icon: 'error',
              confirmButtonText: 'Ok',
              customClass: {
                popup: 'swal2-zindex-top'
              }
            });
          }
        );
      }
    });


  }

  confirmarCarrito() {
    const usuarioId = this.userData.id;

      Swal.fire({
        title: '¿Confirmar la compra del carrito?',
        text: '¿Estás seguro de que quieres concluir la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carritoService.concluirCarrito(usuarioId).subscribe(
            (response: any) => {
              if (response.success) {
                Swal.fire('¡Compra Confirmada!', 'Tu carrito ha sido concluido exitosamente.', 'success');
                this.ref.close();
              }
            },
            (error) => {
              Swal.fire('Error', 'Hubo un problema al confirmar el carrito. Intenta nuevamente.', 'error');
            }
          );
        }
      });

  }
}
