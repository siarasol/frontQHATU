import { Component,EventEmitter, OnInit,Input,  Output } from '@angular/core';
import { DynamicDialogConfig,DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pago-pedido',
  templateUrl: './pago-pedido.component.html',
  styleUrls: ['./pago-pedido.component.css']
})
export class PagoPedidoComponent implements OnInit {
  pedidoId!: number; // ID del pedido
  total!: number;    // Total del pedido
  form: FormGroup;
  archivo!: File;
  isDialogVisible: boolean = true;
  @Output() pagoProcesado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient, public config: DynamicDialogConfig,    public ref: DynamicDialogRef) {
    this.form = this.fb.group({
      tipo: ['QR', Validators.required],
      archivo: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Aquí recibimos el pedidoId y total del diálogo
    this.pedidoId = this.config.data.pedidoId; // Asegúrate de que esto esté bien
    this.total = this.config.data.total;        // Asegúrate de que esto esté bien
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.archivo = file;
        this.form.patchValue({ archivo: file });
      } else {
        Swal.fire('Error', 'Solo se permiten archivos JPG o PNG.', 'error');
      }
    }
  }

  procesarPago() {
    if (this.form.invalid || !this.archivo) {
      Swal.fire('Error', 'Complete el formulario y cargue un archivo.', 'error');
      return;
    }
    // Pregunta de confirmación
    Swal.fire({
      title: '¿Está seguro de procesar el pago?',
      text: "Una vez procesado, no podrá revertir la acción.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, procesar pago',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('pedidoId', String(this.pedidoId));
        formData.append('archivo', this.archivo);
        formData.append('total', String(this.total));
        formData.append('tipo', this.form.get('tipo')?.value);

        // Realiza la solicitud HTTP para procesar el pago
        this.http.post('${environment.apiUrl}/api/pagos/registrar', formData).subscribe(
          (response: any) => {
            if (response.success) {
              Swal.fire('Éxito', 'Pago procesado correctamente. Mientras un administrados procesa su pago por favor registre sus datos para el delivery.', 'success').then(() => {
                // Ocultar el modal y actualizar la tabla de pedidos
                this.pagoProcesado.emit();
                this.ref.close(true);
              });
            } else {
              Swal.fire('Error', 'Hubo un problema al procesar el pago.', 'error');
            }
          },
          (error) => {
            Swal.fire('Error', 'Error al procesar el pago.', 'error');
          }
        );
      }
});

  }
}
