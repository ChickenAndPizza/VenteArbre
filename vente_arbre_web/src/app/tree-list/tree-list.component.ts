import { Component, OnInit } from '@angular/core';
import { TreeCategoryService } from 'app/service/tree-category/tree-category.service';
import { decodeToken } from 'app/_helpers/jwt.decoder';
import { FormBuilder, FormGroup } from '@angular/forms';
import { existingTreeCategoryValidator } from 'app/shared/tree-category-validator';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { DialogComponent } from 'app/_directives/dialog/dialog.component';
import { DialogEntryComponent } from 'app/_directives/dialog-entry/dialog-entry.component';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {

  treeCategories: any[];
  currentUser: any;
  admin: boolean = false;
  newCategory: FormGroup;
  dialogRef: MatDialogRef<DialogComponent>;
  dialogEntryRef: MatDialogRef<DialogEntryComponent>;

  constructor(
    private treeCategoryService: TreeCategoryService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadTreeCategories();
    this.isAdmin();

    this.newCategory = this.formBuilder.group({
      description: ['', , existingTreeCategoryValidator(this.treeCategoryService)]
    });
  }

  get description() { return this.newCategory.get('description') }

  private isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;

    return this.admin;
  }

  private loadTreeCategories() {
    this.treeCategoryService.getCategoriesAndSubCategories().subscribe(
      categories => {
        this.treeCategories = categories;
      }
    );
  }

  public ShowNewCategory() {
    document.getElementById('newCategory').style.display = '';
  }

  public HideNewCategory() {
    this.newCategory.get('description').setValue('');
    document.getElementById('newCategory').style.display = 'none';
  }

  public AddNewCategory() {
    if (this.treeCategoryService) {
      this.treeCategoryService.addOrUpdateCategory(this.newCategory.value).subscribe(c => {
        this.loadTreeCategories();
        this.newCategory.get('description').setValue('');
      });

    }
  }

  public ModifyCategoryDescription() {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = false;
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'Modifier la catégorie',
            precisions: 'Description : '
        };
        this.dialogEntryRef = this.dialog.open(DialogEntryComponent, dialogConfig);
        this.dialogEntryRef.afterClosed().subscribe(result => {
          console.log(result);
         });
  }

  public DeleteCategoryValidation(id: string) {
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
      if (result) { // if true
        if (this.treeCategoryService) {
          this.treeCategoryService.delete(id).subscribe(c => {
            this.loadTreeCategories();
          })
        }
      }
    });
  }
}
