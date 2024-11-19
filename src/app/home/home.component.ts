import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = [
    'assets/imagen5.jpg',
    'assets/imagen6.jpg',
    'assets/imagen3.jpg',
    'assets/imagen4.jpg'
  ];
}
