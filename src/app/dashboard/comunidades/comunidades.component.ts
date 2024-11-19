import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComunidadesService } from '../../services/comunidad.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css'],
})
export class ComunidadesComponent implements OnInit {
  comunidades: any[] = [];
  nuevaComunidad: any = {
    nombre: '',
    localidad: '',
    descripcion: '',
  };

  constructor(private comunidadesService: ComunidadesService) {}

  ngOnInit(): void {
    this.listarComunidades();
  }

  listarComunidades(): void {
    this.comunidadesService.obtenerComunidades().subscribe((data) => {
      this.comunidades = data;
    });
  }

  agregarComunidad(): void {
    this.comunidades.unshift({ ...this.nuevaComunidad, isNew: true, editing: true });
  }

  activarEdicion(comunidad: any): void {
    comunidad.editing = true; // Activa el modo de edición
  }

  guardarComunidad(comunidad: any): void {
    if (comunidad.isNew) {
      this.comunidadesService.crearComunidad(comunidad).subscribe(
        () => {
          Swal.fire('¡Éxito!', 'Comunidad creada correctamente.', 'success');
          this.listarComunidades();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo crear la comunidad.', 'error');
        }
      );
    } else {
      this.comunidadesService.editarComunidad(comunidad.id, comunidad).subscribe(
        () => {
          Swal.fire('¡Éxito!', 'Comunidad actualizada correctamente.', 'success');
          comunidad.editing = false; // Salir del modo de edición
          this.listarComunidades();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo actualizar la comunidad.', 'error');
        }
      );
    }
  }

  eliminarComunidad(comunidad: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la comunidad de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comunidadesService.eliminarComunidad(comunidad.id).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'La comunidad ha sido eliminada.', 'success');
            this.listarComunidades();
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la comunidad.', 'error');
          }
        );
      }
    });
  }
}
