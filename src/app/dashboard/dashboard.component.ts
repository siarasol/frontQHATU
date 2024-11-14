import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrección aquí
})
export class DashboardComponent implements OnInit {
  userData: any; // Almacenará los datos del usuario
  sidebarCollapsed = false;  // Estado inicial del sidebar
  isAdmin = false;    // Bandera para saber si es admin
  isVendedor = false; // Bandera para saber si es vendedor
  isComprador = false; // Bandera para saber si es comprador

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  ngOnInit() {
    // Recuperar datos del usuario desde localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('componente', this.userData);

      // Verificar el rol del usuario
      const userRole = this.userData?.rol?.nombre;

      // Ajustar banderas según el rol del usuario
      if (userRole === 'Administrador') {
        this.isAdmin = true;
      } else if (userRole === 'Vendedor') {
        this.isVendedor = true;
      } else if (userRole === 'Comprador') {
        this.isComprador = true;
      }

    } else {
      // Manejar caso donde no hay datos (usuario no está autenticado)
      console.log('No hay datos del usuario en el almacenamiento.');
    }
  }
}
