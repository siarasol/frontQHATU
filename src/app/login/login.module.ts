import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto si usas directivas comunes de Angular.
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component'; // Importa el RegisterComponent
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  { path: '', component: LoginComponent },   // Ruta para login
  { path: 'register', component: RegisterComponent },  // Ruta para registro
];
@NgModule({
  declarations: [
      LoginComponent,
      // Declara RegisterComponent aquí
  ],
  imports: [
    CommonModule,  // Importa CommonModule para funcionalidades básicas de Angular
    FormsModule,
    LoginRoutingModule,
    ToastModule,
    RegisterComponent,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginModule { }
