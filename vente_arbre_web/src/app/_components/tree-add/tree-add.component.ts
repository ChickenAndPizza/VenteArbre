import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { existingTreeOfCategoryValidator, treeImageFormatValidator } from 'app/_shared';
import { TreeService, AlertService } from 'app/_services';

@Component({
  selector: 'app-tree-add',
  templateUrl: './tree-add.component.html',
  styleUrls: ['./tree-add.component.scss']
})
export class TreeAddComponent implements OnInit {

  returnUrl: string;

  treeId: string;
  categoryId: string;
  categoryDescr: string;

  newtree: FormGroup;
  imageToAdd: File;

  constructor(
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.setValuesFromUrl();

    this.newtree = this.formBuilder.group({
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService, this.categoryId, null)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ["", Validators.required,],
      maximum: ["", Validators.required,],
      image: ["", ,],
      addingImage: ["", treeImageFormatValidator,],
      idTreeCategory: [this.categoryId, ,]
    });

    this.image.setValue("");

    if (this.treeId !== "") {

      this.newtree = this.formBuilder.group({
        id: ["", ,],
        name: ["", Validators.required,],
        zone: ["", Validators.required,],
        price: ["", Validators.required,],
        ageHeight: ["", Validators.required,],
        description: ['', Validators.required,],
        maximum: ["", Validators.required,],
        image: ["", ,],
        addingImage: ["", treeImageFormatValidator,],
        idTreeCategory: [this.categoryId, ,]
      });

      this.treeService.getTree(this.treeId).subscribe(tree => {
        this.id.setValue(tree.id);
        this.name.setValue(tree.name);
        this.zone.setValue(tree.zone);
        this.price.setValue(tree.price);
        this.ageHeight.setValue(tree.ageHeight);
        this.description.setValue(tree.description);
        this.maximum.setValue(tree.maximum);
        this.image.setValue("data:image/jpeg;base64," + tree.image);

        this.name.setAsyncValidators(existingTreeOfCategoryValidator(this.treeService, this.categoryId, this.id.value));

      });
    }
  }

  get id() { return this.newtree.get('id'); }
  get name() { return this.newtree.get('name'); }
  get zone() { return this.newtree.get('zone'); }
  get price() { return this.newtree.get('price'); }
  get ageHeight() { return this.newtree.get('ageHeight'); }
  get description() { return this.newtree.get('description'); }
  get maximum() { return this.newtree.get('maximum'); }
  get image() { return this.newtree.get('image'); }
  get addingImage() { return this.newtree.get('addingImage'); }

  addState() { return (this.treeId == ""); }

  onSubmit() {
    if (this.treeService) {
      this.image.setValue(null);
      this.treeService.addOrUpdateTree(this.newtree.value).subscribe(c => {
        let treeId = c.id;

        if (this.imageToAdd) {
          this.treeService.postImage(this.imageToAdd, treeId).subscribe(c => {
            this.router.navigate([this.returnUrl]);
          });
        }
        else
          this.router.navigate([this.returnUrl]);

      });
    }
  }

  fileChangeEvent(files: any[]) {
    if (files && files.length > 0) {
      let file = files[0];
      this.imageToAdd = file;

      var reader = new FileReader();
      reader.onloadend = (e) => {
        let tempImage = reader.result;
        this.image.setValue(tempImage);
      }
      reader.readAsDataURL(file);
    }
  }

  setValuesFromUrl() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.treeId = this.route.snapshot.queryParams['id'] || "";
    this.categoryId = this.route.snapshot.queryParams['categ'] || "";
    this.categoryDescr = this.route.snapshot.queryParams['descr'] || "";
  }
}
