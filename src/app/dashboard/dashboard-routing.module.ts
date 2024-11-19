import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { ProductosComponent } from './productos/productos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { SeguimientoComprasComponent } from './seguimiento-compras/seguimiento-compras.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';  // Importamos el nuevo componente
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,  // Se muestra el layout principal del dashboard
    children: [
      { path: '', component: DefaultDashboardComponent },  // Dashboard vacío
      { path: 'mis-productos', component: MisProductosComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'comunidades', component: ComunidadesComponent },
      { path: 'seguimiento-compras', component: SeguimientoComprasComponent }, // Ruta opcional
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
