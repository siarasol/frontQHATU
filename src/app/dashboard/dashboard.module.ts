import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { ProductosComponent } from './productos/productos.component';
import { SeguimientoComprasComponent } from './seguimiento-compras/seguimiento-compras.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AgregarProductoComponent } from './modals/agregar-producto/agregar-producto.component';
import { VerCarritoComponent } from './modals/ver-carrito/ver-carrito.component';
import { VerProductoComponent } from './modals/ver-producto/ver-producto.component';
import { VerProductosPedidoComponent } from './modals/ver-productos-pedido/ver-productos-pedido.component';
import { PagoPedidoComponent } from './modals/pago-pedido/pago-pedido.component';
import { RegistrarDeliveryComponent } from './modals/registrar-delivery/registrar-delivery.component';
import { AsignarDeliveryComponent } from './modals/asignar-delivery/asignar-delivery.component';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog'; // Importa el DialogModule
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';






import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [

    DashboardComponent,
    ComunidadesComponent,
    MisProductosComponent,
    AgregarProductoComponent,
    ProductosComponent,
    VerProductoComponent,
    VerCarritoComponent,
    SeguimientoComprasComponent,
    VerProductosPedidoComponent,
    PagoPedidoComponent,
    RegistrarDeliveryComponent,
    PedidosComponent,
    AsignarDeliveryComponent

  ],
  imports: [
    TableModule,
    BsDropdownModule,
    DialogModule,
    ReactiveFormsModule,

    //BrowserModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    //BroadcastChannel,
    MessageModule,
    CommonModule,
    CarouselModule,
    ButtonModule,
    RouterModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastModule,
    PaginatorModule
  ],
  providers: [MessageService,DialogService,BsModalService],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
