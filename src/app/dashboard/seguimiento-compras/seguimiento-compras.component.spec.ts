import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoComprasComponent } from './seguimiento-compras.component';

describe('SeguimientoComprasComponent', () => {
  let component: SeguimientoComprasComponent;
  let fixture: ComponentFixture<SeguimientoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguimientoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
