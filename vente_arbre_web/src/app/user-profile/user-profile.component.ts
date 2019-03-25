import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../_directives/dialog/dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    dialogRef: MatDialogRef<DialogComponent>;

    constructor(
        private userService: UserService,
        private dialog: MatDialog
        ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
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
            alert(result);
        });
    }

    public deleteValidation3() {


        this.deleteUser(this.currentUser.id);

    }

    deleteUser(id: string) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

}
