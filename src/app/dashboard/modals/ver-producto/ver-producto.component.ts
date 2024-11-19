import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductoService } from 'src/app/services/producto.service';
import { MessageService } from 'primeng/api'; // Para notificaciones
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css'],
  providers: [MessageService] // Añadimos el MessageService para manejar notificaciones
})
export class VerProductoComponent implements OnInit {
  producto: any;
  cantidad: number = 1;  // Definimos el valor de la cantidad por defecto
  responsiveOptions: any;
  userData: any;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private productoService: ProductoService,
    private router: Router,
    private messageService: MessageService // Inyectamos el servicio de mensajes
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    const productoId = this.config.data.id;
    this.obtenerProducto(productoId);
    this.loadUserData(); // Cargamos los datos del usuario desde el localStorage
  }

  // Método para cargar el usuario desde el localStorage
  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  // Método para obtener los detalles del producto
  obtenerProducto(id: number) {
    this.productoService.obtenerProductoPorId(id).subscribe(
      (response: any) => {
        if (response.success) {
          this.producto = response.response;
        }
      },
      (error) => {
        console.error('Error al obtener el producto', error);
      }
    );
  }


 // Método para agregar el producto al carrito
  // Método para agregar el producto al carrito
  agregarAlCarrito() {
      const usuarioId = this.userData?.id;
      const productoId = this.producto.id;

      // Validar que la cantidad sea un entero positivo
      if (this.cantidad < 1 || !Number.isInteger(this.cantidad)) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La cantidad debe ser un valor entero positivo.' });
          this.ref.close(); // Cierra el modal
          this.router.navigate(['/productos']);
          return;
      }

      if (!usuarioId) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario no identificado' });
          this.ref.close(); // Cierra el modal
          this.router.navigate(['/productos']);
          return;
      }

      this.productoService.adicionarProductoAlCarrito(usuarioId, productoId, this.cantidad).subscribe({
          next: (response: any) => {
              console.log('Respuesta del servidor:', response); // Muestra la respuesta en la consola

              if (response.success) {
                  Swal.fire({
                      title: '¡Correcto!',
                      text: response.message,
                      icon: 'success',
                      confirmButtonText: 'Ok',
                  });
                      this.ref.close(); // Cierra el modal
                      this.router.navigate(['/productos']); // Redirige a la página de productos

              } else {
                  Swal.fire({
                      title: 'Error',
                      text: response.message || 'Hubo un problema al añadir el producto.',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                  });
              }
          },
          error: (error) => {
              console.error('Error en la solicitud', error);
              Swal.fire({
                  title: 'Error',
                  text: 'Hubo un problema al comunicarse con el servidor.',
                  icon: 'error',
                  confirmButtonText: 'Ok',
              });
          }
      });
  }

}
