import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { existingTreeOfCategoryValidator } from 'app/_shared';
import { TreeCategoryService, TreeService } from 'app/_services';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-info.component.html',
  styleUrls: ['./tree-info.component.scss']
})
export class TreeInfoComponent implements OnInit {

  treeInfo: FormGroup;
  category: String;

  constructor(
    private treeCategoryService: TreeCategoryService,
    private treeService: TreeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.category = this.treeCategoryService.getCurrentCategory().description;

    this.treeInfo = this.formBuilder.group({
      name: ["", , ],
      zone: [{value: "", disabled: true}, ,],
      price: [{value: "", disabled: true}, ,],
      ageHeight: [{value: "", disabled: true}, ,],
      description: [{value: "", disabled: true}, ,],
      idTreeCategory: [this.treeCategoryService.getCurrentCategory().id, ,]
    });

    this.treeService.getTree().subscribe(tree => {
        this.name.setValue(tree.name);
        this.zone.setValue(tree.zone);
        this.price.setValue(tree.price);
        this.ageHeight.setValue(tree.ageHeight);
        this.description.setValue(tree.description);
    });
  }

  get name() { return this.treeInfo.get('name'); }
  get zone() { return this.treeInfo.get('zone'); }
  get price() { return this.treeInfo.get('price'); }
  get ageHeight() { return this.treeInfo.get('ageHeight'); }
  get description() { return this.treeInfo.get('description'); }

}
