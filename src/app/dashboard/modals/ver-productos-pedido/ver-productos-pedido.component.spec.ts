import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosPedidoComponent } from './ver-productos-pedido.component';

describe('VerProductosPedidoComponent', () => {
  let component: VerProductosPedidoComponent;
  let fixture: ComponentFixture<VerProductosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerProductosPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerProductosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
