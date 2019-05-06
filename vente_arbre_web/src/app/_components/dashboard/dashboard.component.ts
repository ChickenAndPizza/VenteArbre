import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { Router } from '@angular/router';

import { TreeService, TreeCategoryService, DashboardDescriptionService } from 'app/_services';
import { DialogComponent, DialogDashboardDescriptionComponent } from 'app/_directives';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  admin: boolean = false;
  currentUser: any;

  randomTrees: any[];
  imagesToShow: (string | IImage)[] = [
    { url: './assets/img/environment/Diapositive5.JPG' },
    { url: './assets/img/environment/Diapositive6.JPG' },
    { url: './assets/img/environment/Diapositive2.JPG' },
    { url: './assets/img/environment/Diapositive8.JPG' },
  ];
  descriptionTitle: any;
  descriptionText: any;
  descriptionId: any;

  dialogRef: MatDialogRef<DialogComponent>;
  dialogDashboardDescriptionRef: MatDialogRef<DialogDashboardDescriptionComponent>;

  constructor(
    private dashboardDescriptionService: DashboardDescriptionService,
    private treeCategoryService: TreeCategoryService,
    private treeService: TreeService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isAdmin();
    this.loadDescription();
    this.loadRandomTrees();
  }

  modifyDashboardDescription() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = {
      id: this.descriptionId,
      title: this.descriptionTitle,
      description: this.descriptionText,
    };
    this.dialogDashboardDescriptionRef = this.dialog.open(DialogDashboardDescriptionComponent, dialogConfig);
    this.dialogDashboardDescriptionRef.afterClosed()
      .pipe(c => c)
      .subscribe(c => {
        if (captureEvents && c) {
          if (this.dashboardDescriptionService) {
            this.loadDescription();
          }
        }
      });
  }

  loadDescription() {
    this.dashboardDescriptionService.getDashboardDescription().subscribe(
      text => {
        this.descriptionId = text.id;
        this.descriptionTitle = text.title;
        this.descriptionText = text.description;
      }
    );
  }

  loadRandomTrees() {
    this.treeService.getRandomTrees().subscribe(
      categories => {
        this.randomTrees = categories;
      }
    );
  }

  viewTree(categoryId: string, treeId: string) {
    this.treeCategoryService.getCategoryDescription(categoryId).subscribe(categoryDescr => {
      this.router.navigate(['/tree-info'], { queryParams: { id: treeId, categ: categoryId, descr: categoryDescr } });
    });
  }

  isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;

    return this.admin;
  }

}
