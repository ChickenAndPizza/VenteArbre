import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrdersCustomerComponent } from './previous-orders-customer.component';

describe('PreviousOrdersCustomerComponent', () => {
  let component: PreviousOrdersCustomerComponent;
  let fixture: ComponentFixture<PreviousOrdersCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousOrdersCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousOrdersCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
