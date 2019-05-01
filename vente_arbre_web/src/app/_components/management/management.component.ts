import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { DialogComponent, DialogAdministratorComponent, DialogSupplierComponent } from 'app/_directives';
import { CustomerService, SupplierService } from 'app/_services';
import { Supplier } from 'app/_models/supplier/supplier';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  administrators: any[];
  suppliers: any[];

  dialogRef: MatDialogRef<DialogComponent>;
  dialogAdministratorRef: MatDialogRef<DialogAdministratorComponent>;
  dialogSupplierRef: MatDialogRef<DialogSupplierComponent>;

  constructor(
    private customerService: CustomerService,
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.LoadAdministrators();
    this.LoadSuppliers();
  }

  LoadAdministrators() {
    this.customerService.getAdministrators().subscribe(
      admins => {
        this.administrators = admins;
      });
  }

  LoadSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      suppliers => {
        this.suppliers = suppliers;
      });
  }

  public AddAdministrator() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    this.dialogAdministratorRef = this.dialog.open(DialogAdministratorComponent, dialogConfig);
    this.dialogAdministratorRef.afterClosed()
      .pipe(filter(email => email))
      .subscribe(email => {
        if (email) {
          if (this.customerService) {
            this.customerService.setNewAdmin(email).subscribe(c => {
              this.LoadAdministrators();
            });
          }
        }
      });
  }

  public DeleteAdministrator(id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title: 'Voulez-vous vraiment supprimer cet administrateur?'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.customerService.deleteAdmin(id).subscribe(c => {
              this.LoadAdministrators();
            });
        }
    });
  }

  public AddSupplier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = { };
    this.dialogSupplierRef = this.dialog.open(DialogSupplierComponent, dialogConfig);
    this.dialogSupplierRef.afterClosed()
      .pipe(c => c)
      .subscribe(c => {
        if (captureEvents && c) {
          if (this.supplierService) {
            let supplier = new Supplier(c.name, c.email, c.phoneNumber);
            this.supplierService.addOrUpdateSupplier(supplier).subscribe(c => {
              this.LoadSuppliers();
            });
          }
        }
      });
  }

  public ModifySupplier(supplier: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = { 
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
    };
    this.dialogSupplierRef = this.dialog.open(DialogSupplierComponent, dialogConfig);
    this.dialogSupplierRef.afterClosed()
      .pipe(c => c)
      .subscribe(c => {
        if (captureEvents && c) {
          if (this.supplierService) {
            this.supplierService.addOrUpdateSupplier(c).subscribe(c => {
              this.LoadSuppliers();
            });
          }
        }
      });
  }

  public DeleteSupplier(id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment supprimer ce fournisseur?',
      precisions: 'Il ne sera plus affiché parmis la liste des choix'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.supplierService) {
          this.supplierService.delete(id).subscribe(c => {
            this.LoadSuppliers();
          })
        }
      }
    });
  }
}
