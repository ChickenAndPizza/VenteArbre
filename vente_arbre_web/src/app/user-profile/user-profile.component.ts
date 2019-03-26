import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../_directives/dialog/dialog.component';
import { AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { existingEmailValidator } from 'app/shared/email-validator.directive';
import { CustomerService } from 'app/service/customer/customer.service';
import { ConnectionInfo } from 'app/_models/connectionInfo.model';
import { decodeToken } from 'app/_helpers/jwt.decoder';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    currentUser: any;
    users: User[] = [];
    dialogRef: MatDialogRef<DialogComponent>;
    profile: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private customerService: CustomerService,
        private dialog: MatDialog,
        private authenticationService: AuthenticationService
    ) {
        console.log();
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = decodeToken(this.currentUser);
        this.profile = this.formBuilder.group({
            id: [this.currentUser.id],
            firstName: [this.currentUser.firstName, [Validators.required]],
            lastName: [this.currentUser.lastName, [Validators.required]],
            phoneNumber: [this.currentUser.phoneNumber, [Validators.required]],
            email: [this.currentUser.email, [Validators.required, Validators.email], existingEmailValidator(this.currentUser.id, this.customerService)],
            password: ['', ,]
        });

    }

    get email() { return this.profile.get('email'); }
    get phoneNumber() { return this.profile.get('phoneNumber'); }
    get lastName() { return this.profile.get('lastName'); }
    get firstName() { return this.profile.get('firstName'); }
    get password() { return this.profile.get('password'); }
    get pristineEmail() { return this.currentUser.email }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

    public onModify() {
        if(this.customerService){
            if(this.password.value === '') {
                this.password.setValue(this.currentUser.password);
            }
            let customer: any;
            this.customerService.addOrUpdateCustomer(this.profile.value).subscribe(c => {
              customer = c;
              this.authenticationService.logout();
              const login = new ConnectionInfo(customer.email, customer.password);
              this.authenticationService.login({email: customer.email, password: customer.password})
              .pipe(first())
              .subscribe(c => {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.currentUser = decodeToken(this.currentUser);
                this.password.setValue('');
              });
            });
      
          }
    }

    public logout() {
        this.authenticationService.logout();
    }

    deleteValidation() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = false;
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: 'Voulez-vous supprimer ce compte?',
            precisions: 'Une fois supprimé, ce compte et ses données ne pourront plus jamais être récupérés.'
        };
        this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.delete(decodeToken(this.currentUser).id).subscribe()
                this.logout();
                location.reload(true);
            }
        });
    }
}
