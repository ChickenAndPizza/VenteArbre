import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeCategoryService, TreeService, AlertService } from 'app/_services';
import { existingTreeOfCategoryValidator } from 'app/_shared';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

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
  image: File;

  constructor(
    private treeService: TreeService,
    private TreeCategoryService: TreeCategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.addstate = this.route.snapshot.queryParams['addstate'] || true;
    this.category = this.TreeCategoryService.getCurrentCategory().description;

    this.newtree = this.formBuilder.group({
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService, this.TreeCategoryService, null)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ["", Validators.required,],
      idTreeCategory: [this.TreeCategoryService.getCurrentCategory().id, ,]
    });

    if (this.addstate == 'false') {

      this.newtree = this.formBuilder.group({
        id: ["", ,],
        name: ["", Validators.required,],
        zone: ["", Validators.required,],
        price: ["", Validators.required,],
        ageHeight: ["", Validators.required,],
        description: ['', Validators.required,],
        idTreeCategory: [this.TreeCategoryService.getCurrentCategory().id, ,]
      });

      this.treeService.getTree().subscribe(tree => {
        this.id.setValue(tree.id);
        this.name.setValue(tree.name);
        this.zone.setValue(tree.zone);
        this.price.setValue(tree.price);
        this.ageHeight.setValue(tree.ageHeight);
        this.description.setValue(tree.description);

        this.name.setAsyncValidators(existingTreeOfCategoryValidator(this.treeService, this.TreeCategoryService, this.id.value));

      });
    }
  }

  get id() { return this.newtree.get('id'); }
  get name() { return this.newtree.get('name'); }
  get zone() { return this.newtree.get('zone'); }
  get price() { return this.newtree.get('price'); }
  get ageHeight() { return this.newtree.get('ageHeight'); }
  get description() { return this.newtree.get('description'); }

  addState() { return (this.addstate == 'true'); }

  onSubmit() {
    if (this.treeService) {
      this.treeService.addOrUpdateTree(this.newtree.value).subscribe(c => {
        let treeId = c.id;
        this.treeService.postImage(this.image, treeId).subscribe();//.map(() => { return true; });
        //.catch(e => this.alertService.error(e));

        this.router.navigate([this.returnUrl]);
      });
    }
  }

  fileChangeEvent(files:any[]) {
    if (files && files.length > 0) {
      let file = files[0];
      this.image = file;
    }
  }
}
