import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AgregarProductoComponent } from '../modals/agregar-producto/agregar-producto.component';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css'],
})
export class MisProductosComponent implements OnInit {
  bsModalRef: BsModalRef | undefined;
  productos: any[] = [];
  responsiveOptions: any;
  userData: any;

  ngOnInit() {
    // Cargar los productos al iniciar
    this.loadUserData();
    this.listarProductos();
  }

  constructor(
    private modalService: BsModalService,
    private productoService: ProductoService
  ) {
    this.loadUserData();
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

  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }
  agregarProducto() {
    // Abre el modal de agregar producto
    this.bsModalRef = this.modalService.show(AgregarProductoComponent);

    // Escuchar el evento 'productoRegistrado' para refrescar la lista de productos
    this.bsModalRef.content.productoRegistrado.subscribe(() => {
      this.listarProductos();  // Actualiza la lista de productos
    });
  }


  listarProductos() {
    const createdBy = this.userData?.usuario; // Cambia a tu lógica de usuario actual
    this.productoService.listarProductosPorUsuario(createdBy).subscribe(
      (response: any) => {
        if (response.success) {
          this.productos = response.response;
        }
      },
      (error) => {
        console.error('Error al listar productos', error);
      }
    );
  }

}
