import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from 'app/_services';
import { existingEmailValidator } from 'app/_shared';

@Component({
  selector: 'app-dialog-administrator',
  templateUrl: './dialog-administrator.component.html'
})
export class DialogAdministratorComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogAdministratorComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", , existingEmailValidator(null, this.customerService)]
    })
  }

  get email() { return this.form.get('email'); }

  submit(form) {
    this.dialogRef.close(`${form.value.email}`);
  }
}
