import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { DashboardDescriptionService } from 'app/_services';

@Component({
  selector: 'app-dialog-dashboard-description',
  templateUrl: './dialog-dashboard-description.component.html'
})
export class DialogDashboardDescriptionComponent implements OnInit {

  modalValue: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogDashboardDescriptionComponent>,
    private dashboardDescriptionService: DashboardDescriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.modalValue = data.value;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data ? this.data.id : '', ,],
      title: [this.data ? this.data.title : '', Validators.required,],
      description: [this.data ? this.data.description : '', Validators.required,],
    });
  }

  get id() { return this.form.get('id'); }
  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }

  submit(form) {
    this.dashboardDescriptionService.addOrUpdateDashboardDescription(form.value).subscribe(c => {
      this.dialogRef.close(form.value);
    });
  }
}
