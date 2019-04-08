import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionPointsComponent } from './distribution-points.component';

describe('DistributionPointsComponent', () => {
  let component: DistributionPointsComponent;
  let fixture: ComponentFixture<DistributionPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
