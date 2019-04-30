import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-orders-in-process',
  templateUrl: './dialog-orders-in-process.component.html'
})
export class DialogOrdersInProcessComponent implements OnInit {

  modalTitle: string;
  modalPrecisions: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalPrecisions = data.precisions;
  }

  ngOnInit() {
  }

}
