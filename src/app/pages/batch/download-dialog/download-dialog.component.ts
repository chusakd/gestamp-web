import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, delay, finalize, interval, Observable, of, Subscription } from 'rxjs';
import { Alert } from 'src/app/shared/components/alert/alert';
import { DownloadService } from 'src/app/shared/download.service';
import { RestApi } from 'src/app/shared/rest-api';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent implements OnInit, OnDestroy {

  header: string = 'You are going to download proof of payment';
  msg: string = '';
  batchDetail: string = '';
  @Input() batchId: number | undefined;
  onProcess: boolean = false;
  onCompress: boolean = false;
  isFinish: boolean = false;
  canDownload: boolean = true;
  busy: boolean = false;
  isError: boolean = false;
  private subscriptions: Subscription[] = [];
  taskId: number | undefined;
  companyId: number  = 0;
  constructor(public modal: NgbActiveModal, private service: RestApi, private alert: Alert, private router: Router, private dl: DownloadService) {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    let comId = localStorage.getItem("companyId") as string;
    this.companyId = Number.parseFloat(comId);
    this.displayStatus();
  }

  cancel(): void {
    this.modal.close({ event: 'cancel' });
  }

  confirm(): void {
    this.modal.close({ event: 'confirm' });
  }

  displayStatus(){
    if(this.busy){
      this.header = "Your files are being prepared";
      this.msg = "Please, wait patiently until they are ready.";
    }
  }

  startCheckInterval(){
    const sb = interval(3*1000).subscribe(() => {
      this.service.get(`downloads/dlstatus/${this.batchId}`)
      .subscribe(res => {
        //console.log([res]);
        if(res){
          this.onProcess = res.onProcess;
          this.onCompress = res.onCompress;
          this.isFinish = res.finish;
        }
        this.displayStatus();
      });
    });
    this.subscriptions.push(sb);
  }

  checkStatus(){
    if(!this.batchId) return;
    this.batchDetail ="Batch: " + this.batchId; 
    this.service.get(`downloads/dlstatus/${this.batchId}`)
    .pipe(catchError(err => {
      this.msg = err.message;
      this.isError = true;
      return of(err);
    }))
    .subscribe(res => {
      //console.log([res]);
      if(res){
        this.onProcess = res.onProcess;
        this.onCompress = res.onCompress;
        this.isFinish = res.finish;
      }
      this.displayStatus();
      if(this.onProcess || this.onCompress){
        this.startCheckInterval();
      }
    });
  }

  startProcessDownload(): void {
    this.canDownload = false;
    //this.displayStatus();
    const obj = {
      company_id: this.companyId,
      batchId: this.batchId
    }
    this.busy = true;
    this.service.post(`downloads/downloadbatch`, obj).pipe(catchError(err => {
      this.msg = err;
      this.busy = true;
      return of(err);
    }))
    .subscribe(res => {
      //console.log([res]);
      if(res){
        this.onProcess = true;
        if (res.taskId) {
          this.taskId = Number(res.taskId);
          delay(1000);
          this.router.navigate(["/downloads"]);
          this.cancel();
        }
      }
      this.busy = false;
      this.displayStatus();
    });
    //this.startCheckInterval();
  }

  download(): void {
    const obj = {
      orsor9: true,
      receipt: true,
      qr: true,
      fineReceipt: true,
      batchId: this.batchId
    }
    this.busy = true;
    this.displayStatus();
    this.dl.downloadL(`batch/downloadfile/${this.batchId}`, obj)
    .pipe(catchError(err => {
      this.msg = err;
      this.busy = true;
      return of(err);
    }))
    .subscribe((response: any) => {
      this.downloadFile(response);
    })
  }
  
  downloadFile(response: { headers: { get: (arg0: string) => any; }; body: BlobPart; }) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(0, file.length); //console.log(file);
    let extension = file.split('.')[1].toLowerCase();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([response.body], { type: this.createFileType(extension) })
    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = file;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 400)
  }

  createFileType(e: string): string {
    let fileType: string = "";
    if (e == 'pdf' || e == 'csv') {
      fileType = `application/${e}`;
    }
    else if (e == 'jpeg' || e == 'jpg' || e == 'png') {
      fileType = `image/${e}`;
    }
    else if (e == 'txt') {
      fileType = 'text/plain';
    }

    else if (e == 'ppt' || e == 'pot' || e == 'pps' || e == 'ppa') {
      fileType = 'application/vnd.ms-powerpoint';
    }
    else if (e == 'pptx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    else if (e == 'doc' || e == 'dot') {
      fileType = 'application/msword';
    }
    else if (e == 'docx') {
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    else if (e == 'xls' || e == 'xlt' || e == 'xla') {
      fileType = 'application/vnd.ms-excel';
    }
    else if (e == 'xlsx') {
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return fileType;
  }

}

export interface DialogData {
  batchId: number;
  type: string;
}