import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupplierInfoCustomersComponent } from './order-supplier-info-customers.component';

describe('OrderSupplierInfoCustomersComponent', () => {
  let component: OrderSupplierInfoCustomersComponent;
  let fixture: ComponentFixture<OrderSupplierInfoCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupplierInfoCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupplierInfoCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
