import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogService } from 'primeng/dynamicdialog';
import { VerProductoComponent } from '../modals/ver-producto/ver-producto.component';
import { VerCarritoComponent } from '../modals/ver-carrito/ver-carrito.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [DialogService]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  responsiveOptions: any;
  userData: any;
  totalRecords: number=0;
  rowsPerPage: number = 6;
  currentPage: number = 0;
  ref: DynamicDialogRef | undefined;

  constructor(private productoService: ProductoService, public dialogService: DialogService,) {

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
    this.loadUserData();
    this.listarProductos();
  }
  abrirCarrito() {

    this.ref = this.dialogService.open(VerCarritoComponent, {
      header: 'Mi Carrito',
      width: '50%'
    });
  }
  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  listarProductos() {
    this.productoService.listarProductosPorUsuario1().subscribe(
      (response: any) => {
        if (response.success) {
          this.productos = response.response;
          this.totalRecords = this.productos.length;
        }
      },
      (error) => {
        console.error('Error al listar productos', error);
      }
    );
  }


  onPageChange(event: any) {
    this.currentPage = event.page;
  }


  verProducto(productoId: number) {
    const ref = this.dialogService.open(VerProductoComponent, {
      header: 'Detalles del Producto',
      width: '50%',
      data: { id: productoId }
    });
  }
}
