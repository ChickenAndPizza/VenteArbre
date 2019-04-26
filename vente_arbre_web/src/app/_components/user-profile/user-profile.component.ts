import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { DialogComponent } from 'app/_directives';
import { UserService, CustomerService, AuthenticationService } from 'app/_services';
import { User, ConnectionInfo } from 'app/_models';

import { decodeToken } from 'app/_helpers';
import { existingEmailValidator } from 'app/_shared';


function checkPasswords(form: FormGroup): { [key: string]: boolean} | null {
    const password = form.get('password');
    const confirmPassword = form.get('passwordConfirm');
 
    return password && confirmPassword && password.value !== confirmPassword.value ?
     {'notSame': true} : null;
    }

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    animations: [
        fadeInOnEnterAnimation(),
        fadeOutOnLeaveAnimation(),
      ]
})
export class UserProfileComponent implements OnInit {

    currentUser: any;
    users: User[] = [];
    dialogRef: MatDialogRef<DialogComponent>;
    profile: FormGroup;
    save = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private customerService: CustomerService,
        private dialog: MatDialog,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = decodeToken(this.currentUser);
        this.profile = this.formBuilder.group({
            id: [this.currentUser.id],
            firstName: [this.currentUser.firstName, [Validators.required]],
            lastName: [this.currentUser.lastName, [Validators.required]],
            phoneNumber: [this.currentUser.phoneNumber, [Validators.required]],
            email: [this.currentUser.email, [Validators.required, Validators.email], existingEmailValidator(this.currentUser.id, this.customerService)],
            password: ['', ,],
            passwordConfirm: ['', ,],
            isAdmin: [this.currentUser.isAdmin, ,]
        });

        this.onChanges();
    }

    onChanges(): void {
        this.profile.get('password').valueChanges.subscribe(value => {
            if(value) {
                this.profile.setValidators(checkPasswords);
            } else {
                this.profile.clearValidators();
            }
        });
    }

    get id() { return this.profile.get('id'); }
    get email() { return this.profile.get('email'); }
    get phoneNumber() { return this.profile.get('phoneNumber'); }
    get lastName() { return this.profile.get('lastName'); }
    get firstName() { return this.profile.get('firstName'); }
    get password() { return this.profile.get('password'); }
    get passwordConfirm() { return this.profile.get('passwordConfirm'); }
    get isAdmin() { return this.profile.get('isAdmin'); }

    public onModify() {
        if(this.customerService){
            let customer = new User(
                this.id.value,
                this.email.value,
                this.password.value,
                this.firstName.value,
                this.lastName.value,
                this.phoneNumber.value,
                this.isAdmin.value
            );
            if(this.password.value === '') {
                customer.password = this.currentUser.password;
            }
            this.customerService.addOrUpdateCustomer(customer).subscribe(c => {
              customer = c;
              this.password.setValue('');
              this.authenticationService.logout();
              const login = new ConnectionInfo(customer.email, customer.password);
              this.authenticationService.login({email: customer.email, password: customer.password})
              .pipe(first())
              .subscribe(c => {
                this.save = true;
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.currentUser = decodeToken(this.currentUser);
                this.password.setValue('');
                this.passwordConfirm.setValue('');
                if(this.profile.validator) {
                    this.profile.clearValidators();
                }
         
              });
            });
      
          }
          setTimeout( () => {
              this.save = false;
          }, 3000);
    }

    public logout() {
        this.authenticationService.logout();
        if(this.ifIsAdmin())
            window.location.reload(true);
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
            }
        });
    }

    ifIsAdmin(): boolean {
        if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
          return true;
        else
          return false;
    }
}
