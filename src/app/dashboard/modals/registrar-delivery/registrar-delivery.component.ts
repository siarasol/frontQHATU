import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { DeliveryService } from 'src/app/services/delivery.service';

import Swal from 'sweetalert2';


declare const google: any;

@Component({
  selector: 'app-registrar-delivery',
  templateUrl: './registrar-delivery.component.html',
  styleUrls: ['./registrar-delivery.component.css']
})
export class RegistrarDeliveryComponent implements AfterViewInit {
  deliveryForm: FormGroup;
  pedidoId!: number;
  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private deliveryService: DeliveryService
  ) {
    this.deliveryForm = this.fb.group({
      direccion: [''],
      indicaciones: [''],
      latitud: [''],
      longitud: ['']
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const laPazLocation = new google.maps.LatLng(-16.5000, -68.1500);
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: laPazLocation,
      zoom: 14
    });

    if (this.map) {
      this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          this.placeMarker(event.latLng);
        }
      });
    }
  }

  placeMarker(location: google.maps.LatLng): void {
    if (this.marker) {
      this.marker.setPosition(location);
    } else {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
    }

    this.deliveryForm.patchValue({
      latitud: location.lat(),
      longitud: location.lng()
    });
  }

  submitDelivery(): void {
    const data = {
      pedidoId: this.pedidoId,
      direccion: this.deliveryForm.value.direccion,
      indicaciones: this.deliveryForm.value.indicaciones,
      latitud: this.deliveryForm.value.latitud,
      longitud: this.deliveryForm.value.longitud
    };

    this.deliveryService.registrarDelivery(data).subscribe(
      (response: any) => {
        Swal.fire('Éxito', 'Registro de delivery exitoso', 'success');
        this.bsModalRef.hide();
      },
      (error: any) => {
        Swal.fire('Error', 'Hubo un problema al registrar el delivery', 'error');
        console.error('Error al registrar el delivery:', error);
      }
    );
  }
}
