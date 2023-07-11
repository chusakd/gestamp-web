import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, delay, interval, of, Subscription } from 'rxjs';
import { BatchModel } from '../batch.model';
import { RestApi } from 'src/app/shared/rest-api';
import { Alert } from 'src/app/shared/components/alert/alert';

@Component({
  selector: 'app-download-task',
  templateUrl: './download-task.component.html',
  styleUrls: ['./download-task.component.scss']
})
export class DownloadTaskComponent implements OnInit, OnDestroy {

  header: string = 'You are going to download proof of payment';
  msg: string = 'Ready to start..';
  batchDetail: string = '';
  @Input() selection = new SelectionModel<BatchModel>(true, []);
  onProcess: boolean = false;
  onCompress: boolean = false;
  isFinish: boolean = false;
  canDownload: boolean = false;
  busy: boolean = false;
  isError: boolean = false;
  taskId: number = 0;
  companyId: number;
  private subscriptions: Subscription[] = [];
  
  constructor(public modal: NgbActiveModal, private service: RestApi, private alert: Alert, private router: Router) {
    this.companyId = Number.parseInt(localStorage.getItem("companyId") as string);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  cancel(): void {
    this.modal.close({ event: 'cancel' });
  }

  confirm(): void {
    this.modal.close({ event: 'confirm' });
  }

  displayStatus(){
    if (this.busy) {
      this.header = "Your files are being prepared";
      this.msg = "Please, wait patiently until they are ready.";
    }
  }

  startCheckInterval(){
    const sb = interval(3*1000).subscribe(() => {
      this.service.get(`downloads/taskstatus/${this.taskId}`)
      .subscribe(res => {
        //console.log([res]);
        if(res){
          this.onProcess = res.onProcess;
          this.onCompress = res.onCompress;
          this.isFinish = res.finish;
        }
        else{
          this.isError = true;
          this.msg = "Error, please try again later";
        }
        this.displayStatus();
      });
    });
    this.subscriptions.push(sb);
  }

  checkStatus(){
    if(this.selection.selected.length == 0) return;
    //console.log([this.selection.selected]);
    let batchs = "";
    let i=0;
    this.selection.selected.forEach(e => {
      if(i==0){
        batchs = e.batchId.toString();
        i++;
      }
      else {
        batchs += ", " + e.batchId;
      }
    });
    this.batchDetail ="Batch: " + batchs; 
    if(!this.taskId){ 
      this.canDownload = true;
      this.displayStatus();
      return;
    }

    this.service.get(`downloads/taskstatus/${this.taskId}`)
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
      else{
        this.isError = true;
        this.msg = "Error, please try again later";
      }
      this.displayStatus();
      if(this.onProcess || this.onCompress){
        this.startCheckInterval();
      }
    });
  }

  startProcessDownload(): void {
    this.busy = true;
    this.service.post(`downloads/downloadtask/${this.companyId}`, this.selection.selected).pipe(catchError(err => {
      this.msg = err.message;
      this.isError = true;
      return of(err);
    }))
    .subscribe(res => {
      //console.log([res]);
      if(res){
        this.onProcess = true;
        if(res.taskId){
          this.taskId = Number(res.taskId);
          //console.log("TaskID: ", res.taskId);
          delay(1000);
          this.download();
        }
        this.busy = false;
      }
      //this.displayStatus();
    });
    //this.startCheckInterval();
  }

  download(): void {
    this.router.navigate(['/downloads'])
    this.cancel();
    // this.busy = true;
    // this.displayStatus();
    // this.service.downloadL(`downloads/downloadtaskfile/${this.taskId}`)
    // .pipe(catchError(err => {
    //   this.msg = err;
    //   this.isError = true;
    //   this.busy = false;
    //   this.isFinish = true;
    //   return of(err);
    // }))
    // .subscribe((response: any) => {
    //   this.downloadFile(response);
    //   this.busy = false;
    //   this.isFinish = true;
    // })
  }

  ngOnInit() {
    this.checkStatus();
  }

  
  downloadFile(response: { headers: { get: (arg0: string) => any; }; body: BlobPart; }) {
    let header_content = response.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(0, file.length); //(file);
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