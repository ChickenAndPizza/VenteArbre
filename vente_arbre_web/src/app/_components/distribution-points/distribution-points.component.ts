import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogDistributionPointComponent } from 'app/_directives';
import { existingDistributionPointValidator } from 'app/_shared';
import { DistributionPointService } from 'app/_services';
import { DistributionPoint } from 'app/_models';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-distribution-points',
  templateUrl: './distribution-points.component.html',
  styleUrls: ['./distribution-points.component.scss']
})
export class DistributionPointsComponent implements OnInit {

  admin: boolean = false;
  currentUser: any;

  newDistributionPoint: FormGroup;
  showNewDistributionPoint: boolean = false;

  dialogRef: MatDialogRef<DialogComponent>;
  dialogDistributionPointRef: MatDialogRef<DialogDistributionPointComponent>;

  constructor(
    private distributionPointService: DistributionPointService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  public distributionPoints: any[];

  ngOnInit() {
    this.loadDistributionPoint();
    this.isAdmin();

    this.newDistributionPoint = this.formBuilder.group({
      mapLink: ['', Validators.required,],
      webLink: ['', ,],
      webName: ['', Validators.required, existingDistributionPointValidator('', this.distributionPointService)],
      description: ['', Validators.required,],
    });
  }

  get mapLink() { return this.newDistributionPoint.get('mapLink'); }
  get webName() { return this.newDistributionPoint.get('webName'); }
  get description() { return this.newDistributionPoint.get('description'); }

  private isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;

    return this.admin;
  }

  loadDistributionPoint() {
    this.distributionPointService.getDistributionPoint().subscribe(
      distributionPoints => {
        this.distributionPoints = distributionPoints;
      });
  }

  addNewDistributionPoint() {
    if (this.distributionPointService) {
      this.distributionPointService.addOrUpdateDistributionPoint(this.newDistributionPoint.value).subscribe(c => {
        this.loadDistributionPoint();
        this.newDistributionPoint.get('mapLink').setValue('');
        this.newDistributionPoint.get('webLink').setValue('');
        this.newDistributionPoint.get('webName').setValue('');
        this.newDistributionPoint.get('description').setValue('');
        this.newDistributionPoint.markAsPristine();
        this.newDistributionPoint.markAsUntouched();
        this.newDistributionPoint.updateValueAndValidity();
      });
    }
  }

  modifyDistributionPoint(id: string, point: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = {
      title: 'Modifier le point de distribution',
      precisions: '',
      mapLink: point.mapLink,
      webLink: point.webLink,
      webName: point.webName,
      description: point.description,
      id: id
    };
    this.dialogDistributionPointRef = this.dialog.open(DialogDistributionPointComponent, dialogConfig);
    this.dialogDistributionPointRef.afterClosed()
      .pipe(c => c)
      .subscribe(c => {
        if (captureEvents && c) {
          if (this.distributionPointService) {
            let distributionPoint = new DistributionPoint(id, c.mapLink, c.webLink, c.webName, c.description);
            this.distributionPointService.addOrUpdateDistributionPoint(distributionPoint).subscribe(c => {
              this.loadDistributionPoint();
              this.newDistributionPoint.get('id').setValue('');
              this.newDistributionPoint.get('mapLink').setValue('');
              this.newDistributionPoint.get('webLink').setValue('');
              this.newDistributionPoint.get('webName').setValue('');
              this.newDistributionPoint.get('description').setValue('');
            });
          }
        }
      });
  }

  deleteDistributionPointValidation(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment supprimer ce point de distribution?',
      precisions: 'Il ne sera plus affiché parmis la liste des choix'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.distributionPointService) {
          this.distributionPointService.delete(id).subscribe(c => {
            this.loadDistributionPoint();
          })
        }
      }
    });
  }
}
