import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeCategoryService, TreeService } from 'app/_services';
import { existingTreeOfCategoryValidator } from 'app/_shared';

@Component({
  selector: 'app-tree-add',
  templateUrl: './tree-add.component.html',
  styleUrls: ['./tree-add.component.scss']
})
export class TreeAddComponent implements OnInit {

  returnUrl: string;
  addstate: string;
  newtree: FormGroup;
  category: String;
  categoryId: String;

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

    this.newtree = this.formBuilder.group({
      id: ["",,],
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService, this.TreeCategoryService)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ['', Validators.required,],
      treeCategoryDescr: [this.TreeCategoryService.getCurrentCategory().description, ,],
      idTreeCategory: [this.TreeCategoryService.getCurrentCategory().id, ,]
    });

    if (this.addstate == 'false') {
      this.treeService.getTree().subscribe(tree => {
        this.id.setValue(tree.id);
        this.name.setValue(tree.name);
        this.zone.setValue(tree.zone);
        this.price.setValue(tree.price);
        this.ageHeight.setValue(tree.ageHeight);
        this.description.setValue(tree.description);
      });
    }
  }

  get id() { return this.newtree.get('id'); }
  get name() { return this.newtree.get('name'); }
  get zone() { return this.newtree.get('zone'); }
  get price() { return this.newtree.get('price'); }
  get ageHeight() { return this.newtree.get('ageHeight'); }
  get description() { return this.newtree.get('description'); }
  get treeCategoryDescr() { return this.newtree.get('treeCategoryDescr'); }
  addState(){ return (this.addstate == 'true'); }

  onSubmit() {
    if (this.treeService) {
      this.treeService.addOrUpdateTree(this.newtree.value).subscribe(c => { 
        this.router.navigate([this.returnUrl]);
      });
    }
  }
}
