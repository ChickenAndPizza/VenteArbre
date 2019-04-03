import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreeCategoryService } from 'app/_services';
import { existingTreeCategoryValidator } from 'app/_shared';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html'
})
export class DialogEntryComponent implements OnInit {

  modalTitle: string;
  modalPrecisions: string;
  modalField: string;
  modalValue: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    private treeCategoryService: TreeCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.modalTitle = data.title;
    this.modalPrecisions = data.precisions;
    this.modalField = data.field;
    this.modalValue = data.value;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: [this.data ? this.data.value : '', , existingTreeCategoryValidator(this.treeCategoryService)]
    })
  }

  get description() { return this.form.get('description'); }

  submit(form) {
    this.dialogRef.close(`${form.value.description}`);
  }
}
