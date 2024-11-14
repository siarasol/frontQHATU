import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms'; // Asegúrate de que esto esté importado
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service'; // Asegúrate de ajustar la ruta
import { ToastModule } from 'primeng/toast';

import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ToastModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuarioForm: Usuario = {
    active: true,
    createdBy: '  ',
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    usuario: '',
    materno: '',
    paterno: ''
  };

  constructor(private http: HttpClient,private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) {}
  onSubmit(registerForm: NgForm) {
    console.log('gaaa');
    if (registerForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    // Llama al servicio de registro
    this.usuarioService.registrarUsuario(this.usuarioForm).subscribe(
      (response) => {
        // Si el registro fue exitoso
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Tu cuenta ha sido creada exitosamente.',
        });

        // Redirige al login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        // Si hubo un error en el registro
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: 'Hubo un error al registrar tu cuenta. Inténtalo de nuevo.',
        });
      }
    );
  }
}
