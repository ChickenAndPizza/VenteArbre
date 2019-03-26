import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../_directives/dialog/dialog.component';
import { AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { existingEmailValidator } from 'app/shared/email-validator.directive';
import { CustomerService } from 'app/service/customer/customer.service';

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
        this.currentUser = this.decodeToken(this.currentUser)
        this.profile = this.formBuilder.group({
            firstName: [this.currentUser.firstName, [Validators.required]],
            lastName: [this.currentUser.lastName, [Validators.required]],
            phoneNumber: [this.currentUser.phoneNumber, [Validators.required]],
            email: [this.currentUser.email, [Validators.required, Validators.email], existingEmailValidator(this.customerService)],
            password: [this.currentUser.password, [Validators.required]]
        });
    }

    get email() { return this.profile.get('email'); }
    get phoneNumber() { return this.profile.get('phoneNumber'); }
    get lastName() { return this.profile.get('lastName'); }
    get firstName() { return this.profile.get('firstName'); }
    get password() { return this.profile.get('password'); }
    get pristineEmail() { return this.currentUser.email }

    public decodeToken(token: string = '') {
        if (token === null || token === '') { return { 'upn': '' }; }
        const parts = token.split('.');
        if (parts.length !== 3) {

            throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }

    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
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
                this.userService.delete(this.decodeToken(this.currentUser).id).subscribe()
                this.logout();
                location.reload(true);
            }
        });
    }
}
