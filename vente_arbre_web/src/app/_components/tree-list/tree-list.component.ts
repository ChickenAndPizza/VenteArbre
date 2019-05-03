import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DialogComponent, DialogEntryComponent } from 'app/_directives';
import { TreeService, TreeCategoryService } from 'app/_services';
import { existingTreeCategoryValidator } from 'app/_shared';
import { decodeToken } from 'app/_helpers';
import { TreeCategory } from 'app/_models';


@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit {

  admin: boolean = false;
  currentUser: any;

  newCategory: FormGroup;
  treeCategories: any[];

  dialogRef: MatDialogRef<DialogComponent>;
  dialogEntryRef: MatDialogRef<DialogEntryComponent>;

  showNewCategory: boolean = false;

  constructor(
    private treeCategoryService: TreeCategoryService,
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadTreeCategories();
    this.isAdmin();

    this.newCategory = this.formBuilder.group({
      description: ['', , existingTreeCategoryValidator(this.treeCategoryService, null)]
    });
  }

  get description() { return this.newCategory.get('description') }

  addNewCategory() {
    if (this.treeCategoryService) {
      this.treeCategoryService.addOrUpdateCategory(this.newCategory.value).subscribe(c => {
        this.loadTreeCategories();
        this.newCategory.get('description').setValue('');
      });

    }
  }

  modifyCategoryDescription(id: string, value: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Modifier la catégorie',
      precisions: '',
      field: 'Description',
      value: value,
      id: id
    };
    this.dialogEntryRef = this.dialog.open(DialogEntryComponent, dialogConfig);
    this.dialogEntryRef.afterClosed()
      .pipe(filter(description => description))
      .subscribe(description => {
        if (description) {
          if (this.treeCategoryService) {
            let category = new TreeCategory(id, description);
            this.treeCategoryService.addOrUpdateCategory(category).subscribe(c => {
              this.loadTreeCategories();
              this.newCategory.get('description').setValue('');
            });
          }
        }
      });
  }

  deleteCategoryValidation(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment supprimer cette catégorie?',
      precisions: 'Cette catégorie ne sera plus affichée parmis la liste des choix.'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.treeCategoryService) {
          this.treeCategoryService.delete(id).subscribe(c => {
            this.loadTreeCategories();
          })
        }
      }
    });
  }

  addTreeOfCategory(categoryId: string, categoryDescr: string, ) {
    this.router.navigate(['/tree-add'], { queryParams: { returnUrl: 'tree-list', categ: categoryId, descr: categoryDescr } });
  }

  modifyTreeOfCategory(categoryId: string, categoryDescr: string, treeId: string) {
    this.router.navigate(['/tree-add'], { queryParams: { returnUrl: 'tree-list', id: treeId, categ: categoryId, descr: categoryDescr } });
  }

  deleteTreeValidation(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment supprimer cet arbre?',
      precisions: 'Cet arbre ne sera plus affiché parmis la liste des choix.'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) { // if true
        if (this.treeService) {
          this.treeService.delete(id).subscribe(c => {
            this.loadTreeCategories();
          })
        }
      }
    });
  }

  viewTree(categoryId: string, categoryDescr: string, treeId: string) {
    this.router.navigate(['/tree-info'], { queryParams: { id: treeId, categ: categoryId, descr: categoryDescr } });
  }

  isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;

    return this.admin;
  }

  loadTreeCategories() {
    this.treeCategoryService.getCategoriesWithTrees().subscribe(
      categories => {
        this.treeCategories = categories;
      }
    );
  }
}
