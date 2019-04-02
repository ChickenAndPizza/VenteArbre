import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tree } from 'app/_models';
import { TreeService, TreeCategoryService } from 'app/service';
import { existingTreeOfCategoryValidator } from 'app/shared';

@Component({
  selector: 'app-tree-add',
  templateUrl: './tree-add.component.html',
  styleUrls: ['./tree-add.component.scss']
})
export class TreeAddComponent implements OnInit {

  returnUrl: string;
  addstate: boolean;
  newtree: FormGroup;
  category: String;
  categoryId: String;
  currentTree: Tree;

  constructor(
    private treeService: TreeService,
    private TreeCategoryService: TreeCategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.addstate = this.route.snapshot.queryParams['addstate'] || true;

    if (this.addstate){

    }
    else{

    }

    this.newtree = this.formBuilder.group({
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService, this.TreeCategoryService)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ['', Validators.required,],
      treeCategoryDescr: [this.TreeCategoryService.getCurrentCategory().description, ,],
      idTreeCategory: [this.TreeCategoryService.getCurrentCategory().id, ,]
    });

    
  }

  get name() { return this.newtree.get('name'); }
  get zone() { return this.newtree.get('zone'); }
  get price() { return this.newtree.get('price'); }
  get ageHeight() { return this.newtree.get('ageHeight'); }
  get description() { return this.newtree.get('description'); }
  get treeCategoryDescr() { return this.newtree.get('treeCategoryDescr'); }

  onSubmit(){
    if (this.treeService) {
      this.treeService.addOrUpdateTree(this.newtree.value).subscribe(c => { });
      this.router.navigate([this.returnUrl]);
    }
  }
}
