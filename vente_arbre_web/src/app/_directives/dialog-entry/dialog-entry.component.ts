import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html'
})
export class DialogEntryComponent implements OnInit {

  modalTitle: string;
  modalPrecisions: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.modalTitle = data.title;
    this.modalPrecisions = data.precisions;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: this.data ? this.data.name : ''
    })
  }

  submit(form) {
    this.dialogRef.close(`${form.value.description}`);
  }
}
