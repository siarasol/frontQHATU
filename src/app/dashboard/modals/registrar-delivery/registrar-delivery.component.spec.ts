import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDeliveryComponent } from './registrar-delivery.component';

describe('RegistrarDeliveryComponent', () => {
  let component: RegistrarDeliveryComponent;
  let fixture: ComponentFixture<RegistrarDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
