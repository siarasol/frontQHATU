import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPedidoComponent } from './pago-pedido.component';

describe('PagoPedidoComponent', () => {
  let component: PagoPedidoComponent;
  let fixture: ComponentFixture<PagoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
