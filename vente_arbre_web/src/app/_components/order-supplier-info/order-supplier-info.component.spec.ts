import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupplierInfoComponent } from './order-supplier-info.component';

describe('OrderSupplierInfoComponent', () => {
  let component: OrderSupplierInfoComponent;
  let fixture: ComponentFixture<OrderSupplierInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupplierInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupplierInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
