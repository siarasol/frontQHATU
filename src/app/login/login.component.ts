import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  onSubmit(form: NgForm) {
    console.log('gaaaaaa');
    if (form.valid) {
      this.authService.login(this.usuario, this.password).subscribe({
        next: (response) => {
          // Aquí puedes mostrar un mensaje de éxito
          if (response.success) {
            //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Login exitoso' });
            this.router.navigate(['/dashboard']); // Redirigir al dashboard
          } else {
            // Manejo de errores
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        },
        error: () => {
          // Manejo de errores en caso de fallo de la petición
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en la autenticación' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor complete el formulario correctamente' });
    }
  }

}
