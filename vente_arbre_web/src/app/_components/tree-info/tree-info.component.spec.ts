import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInfoComponent } from './tree-info.component';

describe('TreeInfoComponent', () => {
  let component: TreeInfoComponent;
  let fixture: ComponentFixture<TreeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
