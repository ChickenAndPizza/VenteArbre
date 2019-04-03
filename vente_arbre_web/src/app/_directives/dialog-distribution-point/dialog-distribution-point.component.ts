import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-distribution-point',
  templateUrl: './dialog-distribution-point.component.html',
})
export class DialogDistributionPointComponent implements OnInit {

  modalTitle: string;
  modalPrecisions: string;
  modalField: string;
  modalValue: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogDistributionPointComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.modalTitle = data.title;
    this.modalPrecisions = data.precisions;
    this.modalField = data.field;
    this.modalValue = data.value;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      mapLink: [this.data  ? this.data.mapLink : '', ,],
      webLink: [this.data ? this.data.webLink : '', ,],
      webName: [this.data ? this.data.webName : '', ,],
      description: [this.data ? this.data.description : '', ,],
    })
  }

  get description() { return this.form.get('description'); }

  submit(form) {
    console.log(form);
    this.dialogRef.close(form.value);
  }
}
