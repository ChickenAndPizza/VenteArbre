import { TestBed, inject } from '@angular/core/testing';

import { TreeCategoryService } from './tree-category.service';

describe('TreeCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeCategoryService]
    });
  });

  it('should be created', inject([TreeCategoryService], (service: TreeCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
