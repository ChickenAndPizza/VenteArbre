import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrdersSupplierComponent } from './previous-orders-supplier.component';

describe('PreviousOrdersSupplierComponent', () => {
  let component: PreviousOrdersSupplierComponent;
  let fixture: ComponentFixture<PreviousOrdersSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousOrdersSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousOrdersSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
