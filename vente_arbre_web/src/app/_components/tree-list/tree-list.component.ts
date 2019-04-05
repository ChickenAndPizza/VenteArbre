import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent, DialogEntryComponent } from 'app/_directives';
import { TreeService, TreeCategoryService } from 'app/_services';
import { existingTreeCategoryValidator } from 'app/_shared';
import { decodeToken } from 'app/_helpers';
import { TreeCategory } from 'app/_models';

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
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTreeCategories();
    this.isAdmin();

    this.newCategory = this.formBuilder.group({
      description: ['', , existingTreeCategoryValidator(this.treeCategoryService, null)]
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
    this.treeCategoryService.getCategoriesWithTrees().subscribe(
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

  public ModifyCategoryDescription(id: string, value: string) {
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
            let category = new TreeCategory(id,description);
            this.treeCategoryService.addOrUpdateCategory(category).subscribe(c => {
              this.loadTreeCategories();
              this.newCategory.get('description').setValue('');
            });
          }
        }
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

  public AddTreeOfCategory(id: string, description: string,) {
    let category = new TreeCategory(id,description);
    this.treeCategoryService.setCurrentCategory(category);
    this.router.navigate(['/tree-add'], { queryParams: { returnUrl: 'tree-list', addstate: true}});
  }

  public ModifyTreeOfCategory(categoryId: string, description: string, treeId: string) {
    let category = new TreeCategory(categoryId,description);
    this.treeCategoryService.setCurrentCategory(category);
    this.treeService.setCurrentTree(treeId);
    this.router.navigate(['/tree-add'], { queryParams: { returnUrl: 'tree-list', addstate: false}});
  }

  public DeleteTreeValidation(id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment supprimer cet arbre?',
      precisions: 'Cet arbre ne sera plus affichée parmis la liste des choix.'
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

  public ViewTree(categoryId: string, description: string, treeId: string){
    let category = new TreeCategory(categoryId,description);
    this.treeCategoryService.setCurrentCategory(category);
    this.treeService.setCurrentTree(treeId);
    this.router.navigate(['/tree-info']);
  }
}
