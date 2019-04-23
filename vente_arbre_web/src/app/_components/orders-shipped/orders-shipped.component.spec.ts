import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersShippedComponent } from './orders-shipped.component';

describe('OrdersShippedComponent', () => {
  let component: OrdersShippedComponent;
  let fixture: ComponentFixture<OrdersShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
