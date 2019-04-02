import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeService } from 'app/service/tree/tree.service';
import { existingTreeOfCategoryValidator } from 'app/shared/tree-validator';
import { TreeCategoryService } from 'app/service/tree-category/tree-category.service';

@Component({
  selector: 'app-tree-add',
  templateUrl: './tree-add.component.html',
  styleUrls: ['./tree-add.component.scss']
})
export class TreeAddComponent implements OnInit {

  addtree: FormGroup;
  category: String;
  categoryId: String;

  constructor(
    private treeService: TreeService,
    private TreeCategoryService: TreeCategoryService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.addtree = this.formBuilder.group({
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ['', Validators.required,],
      treeCategoryDescr: [this.TreeCategoryService.getCurrentCategory().description, ,],
      treeCategoryId: [this.TreeCategoryService.getCurrentCategory().id, ,]
  });
  }
  get name() { return this.addtree.get('name'); }
  get zone() { return this.addtree.get('zone'); }
  get price() { return this.addtree.get('price'); }
  get ageHeight() { return this.addtree.get('ageHeight'); }
  get description() { return this.addtree.get('description'); }
  get treeCategoryDescr() { return this.addtree.get('treeCategoryDescr'); }


  onSubmit(){

  }
}
