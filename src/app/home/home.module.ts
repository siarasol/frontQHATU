// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ButtonModule } from 'primeng/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'primeng/carousel';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonsModule.forRoot(),
    ButtonModule,
    BsDropdownModule,
    CarouselModule,
  ]
})
export class HomeModule { }
