import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  header: string;
  msg: string;
  isInnerTag: boolean;
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  header: string | undefined;
  msg: string = '';
  isInnerTag: boolean;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isInnerTag = data.isInnerTag;
    this.msg = data.msg;
  }

  close(): void {
    this.dialogRef.close();
  }
}
