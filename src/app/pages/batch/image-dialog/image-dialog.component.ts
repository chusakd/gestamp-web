import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FileModel } from '../batch.model';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  imagePath: any;
  obj: FileModel;

  constructor(@Inject(MAT_DIALOG_DATA) public inp: FileModel, private sanitizer: DomSanitizer) {
    this.obj = inp;
    if (inp.base64String !== undefined && inp.base64String !== '') {
      this.imagePath = sanitizer.bypassSecurityTrustResourceUrl('data:' + inp.type + ';base64,' + inp.base64String);
    }
    else {
      this.imagePath = 'assets/dist/img/logo.png';
    }
  }

  download(): void {
    const byteArray = new Uint8Array(atob(this.obj.base64String).split('').map(char => char.charCodeAt(0)));
    const blob = new Blob([byteArray], { type: this.obj.type });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = this.obj.name;
    downloadLink.click();
  }
}
