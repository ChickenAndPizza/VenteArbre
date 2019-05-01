import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-supplier',
  templateUrl: './dialog-supplier.component.html'
})
export class DialogSupplierComponent implements OnInit {

  id: string;
  modalValue: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.modalValue = data.value;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data && this.data.id ? this.data.id : null, ,],
      name: [this.data  ? this.data.name : '', Validators.required, ],
      email: [this.data ? this.data.email : '', Validators.required, ],
      phoneNumber: [this.data ? this.data.phoneNumber : '', [Validators.required]],
    })
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
