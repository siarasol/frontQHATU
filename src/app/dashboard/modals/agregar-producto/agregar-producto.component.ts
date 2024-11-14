import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
//import { FormsModule } from '@angular/forms';

//import { BrowserModule } from '@angular/platform-browser';
import { ProductoService } from 'src/app/services/producto.service';
import { MessageService } from 'primeng/api'; // Importar el servicio de mensajes
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  providers: [MessageService],
  //standalone:true,
  //imports: [FormsModule,BrowserModule,CommonModule],
})
export class AgregarProductoComponent {
  usuario: string = '';
  producto = {
    nombre: '',
    descripcion: '',
    precio: null || '',
    createdBy:  '',
    stock:0

  };
  @Output() productoRegistrado = new EventEmitter<void>();
  fotos: File[] = [];
  fotosInvalid = false;
  fotoUrls: string[] = [];
  labelText: string = 'Escoge las imágenes...';

  categorias = [
    { id: 1, nombre: 'Electrónica' },
    { id: 2, nombre: 'Ropa' },
    { id: 3, nombre: 'Hogar' },
  ]; // Lista de categorías simuladas

  categoriaId: string = '1'; // Default para la categoría
  userData: any;
  constructor(
    public bsModalRef: BsModalRef,
    private productoService: ProductoService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loadUserData();
  }
  loadUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('componente', this.userData);


      // Asignar el usuario al objeto producto
      this.producto.createdBy = this.userData.usuario || ''; // Obtener el usuario
    }
  }
  agregarProducto() {
    if (this.fotos.length === 0) {
      this.fotosInvalid = true;
      return;
    }

    const formData = new FormData();
    formData.append('categoriaId', this.categoriaId); // Usar el valor de la categoría seleccionada
    formData.append('producto', JSON.stringify(this.producto));

    this.fotos.forEach((foto) => {
      formData.append('archivos', foto);
    });

    this.productoService.registrarProducto(formData).subscribe(
      (response: any) => {
        // Validar si el registro fue exitoso
        if (response.success) {
          // Mostrar alerta de éxito con SweetAlert2
          Swal.fire({
            title: '¡Correcto!',
            text: 'El producto ha sido registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.productoRegistrado.emit();
          this.bsModalRef.hide(); // Cerrar el modal tras el registro exitoso

        }
      },
      (error) => {
        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el producto. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onFileSelect(event: any) {
    console.log('imagenes');
    const files = event.target.files;
    this.fotos = []; // Reiniciar el array de fotos
    this.fotoUrls = []; // Reiniciar el array de URLs

    if (files.length > 0) {
      this.fotosInvalid = false;
      this.labelText = `${files.length} imagen(es) seleccionada(s)`;
      for (let file of files) {
        if (file.type === 'image/jpeg') {
          // Verificar si la imagen ya fue añadida
          if (!this.fotos.some(existingFile => existingFile.name === file.name)) {
            this.fotos.push(file);
            this.fotoUrls.push(URL.createObjectURL(file));
          }
        } else {
          this.fotosInvalid = true;
          alert('Solo se permiten imágenes en formato JPG.');
        }
      }
    } else {
      this.labelText = 'No hay imágenes seleccionadas';
      this.fotosInvalid = true;
    }
  }
  clearFiles() {
    this.fotos = [];
    this.fotoUrls = [];
    this.labelText = 'Escoge las imágenes...';
  }
  triggerFileInput() {
    const fileInput: HTMLElement | null = document.getElementById('file-input');
    fileInput?.click();
  }
}
