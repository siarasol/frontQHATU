import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms'; // Asegúrate de que esto esté importado
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service'; // Asegúrate de ajustar la ruta
import { ComunidadesService } from '../../services/comunidad.service';

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
  usuarioForm: any = {
    usuario: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    nombre: '',
    paterno: '',
    materno: '',
    rol: '',
    comunidad: ''
  };
  comunidades: any[] = [];


  constructor(private http: HttpClient,private usuarioService: UsuarioService, private router: Router, private messageService: MessageService, private comunidadesService: ComunidadesService) {}
  ngOnInit(): void {
    this.cargarComunidades();
  }

  cargarComunidades(): void {
    this.comunidadesService.obtenerComunidades().subscribe((data) => {
      this.comunidades = data;
    });
  }
  onRolChange(event: any): void {
    if (this.usuarioForm.rol === '3') {
      // Si selecciona Vendedor, cargamos las comunidades
      this.cargarComunidades();
    } else {
      // Si cambia a Comprador, limpiamos la comunidad
      this.usuarioForm.comunidad = '';
    }
  }
  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }
  
    const payload = {
      ...this.usuarioForm,
      rol: { id: parseInt(this.usuarioForm.rol, 10) },
      comunidad: this.usuarioForm.rol === '3' ? { id: parseInt(this.usuarioForm.comunidad, 10) } : null
    };
  
    // Llama al servicio de registro
    this.usuarioService.registrarUsuario(payload).subscribe(
      (response: any) => {
        if (response.success) {
          // Mostrar mensaje de éxito del backend
          const message = response.message || 'Tu cuenta ha sido creada exitosamente.';
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: message,
          });
  
          // Redirige al login tras un breve tiempo
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          // Manejar caso donde success sea false
          this.messageService.add({
            severity: 'error',
            summary: 'Error en el registro',
            detail: response.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.',
          });
        }
      },
      (error: any) => {
        // Mostrar mensaje de error del backend
        const errorMessage = error.error?.message || 'Hubo un error al registrar tu cuenta. Inténtalo de nuevo.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: errorMessage,
        });
      }
    );
  }
  
  
  
}
