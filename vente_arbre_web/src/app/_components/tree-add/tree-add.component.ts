import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tree } from 'app/_models';
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
    this.category = this.TreeCategoryService.getCurrentCategory().description;

    this.newtree = this.formBuilder.group({
      name: ["", Validators.required, existingTreeOfCategoryValidator(this.treeService, this.TreeCategoryService, null)],
      zone: ["", Validators.required,],
      price: ["", Validators.required,],
      ageHeight: ["", Validators.required,],
      description: ['', Validators.required,],
      idTreeCategory: [this.TreeCategoryService.getCurrentCategory().id, ,]
    });

    if (this.addstate == 'false') {

      this.newtree = this.formBuilder.group({
        id: ["",,],
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

      //this.LoadPhoto();
      //this.SetData();

      this.treeService.addOrUpdateTree(this.newtree.value).subscribe(c => {
        this.router.navigate([this.returnUrl]);
      });
    }
  }

  LoadPhoto() {
    var input = (<HTMLInputElement>document.getElementsByName('image')[0]);
    if (input.files && input.files[0]) {

      //Create a canvas and draw image on Client Side to get the byte[] equivalent
      var canvas = document.createElement("canvas");
      var imageElement = document.createElement("img");

      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      var context = canvas.getContext("2d");
      context.drawImage(imageElement, 0, 0);
      var base64Image = canvas.toDataURL("image/jpeg");

      this.currentTree.image = base64Image.replace(/data:image\/jpeg;base64,/g, '');
    }
    else {
      //this.currentTree.image = this.image.value;
    }
  }

  SetData(){
    this.currentTree.id = this.id.value;
    this.currentTree.name = this.name.value;
    this.currentTree.zone = this.zone.value;
    this.currentTree.price = this.price.value;
    this.currentTree.ageHeight = this.ageHeight.value;
    this.currentTree.description = this.description.value;
    this.currentTree.idTreeCategory = this.TreeCategoryService.getCurrentCategory().id;
    console.log(this.currentTree);
    console.log(this.newtree.value);
  }
}