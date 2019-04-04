import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { existingDistributionPointValidator } from 'app/_shared/distribution-validator/distribution-validator';
import { DistributionPointService } from 'app/_services';

@Component({
  selector: 'app-dialog-distribution-point',
  templateUrl: './dialog-distribution-point.component.html',
})
export class DialogDistributionPointComponent implements OnInit {

  id: string;
  modalTitle: string;
  modalPrecisions: string;
  modalField: string;
  modalValue: string;
  form: FormGroup;

  constructor(
    private distributionPointService: DistributionPointService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogDistributionPointComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      console.log(data);
    this.modalTitle = data.title;
    this.modalPrecisions = data.precisions;
    this.modalField = data.field;
    this.modalValue = data.value;
  }

  ngOnInit() {
    this.id = this.data ? this.data.id : ''
    this.form = this.formBuilder.group({
      mapLink: [this.data  ? this.data.mapLink : '', Validators.required, ],
      webLink: [this.data ? this.data.webLink : '', ,],
      webName: [this.data ? this.data.webName : '', Validators.required, existingDistributionPointValidator(this.id, this.distributionPointService)],
      description: [this.data ? this.data.description : '', Validators.required,],
    })
  }

  get mapLink() { return this.form.get('mapLink'); }
  get webName() { return this.form.get('webName'); }
  get description() { return this.form.get('description'); }

  submit(form) {
    console.log(form);
    this.dialogRef.close(form.value);
  }
}
