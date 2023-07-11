import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RestApi } from '../../shared/rest-api';
import { getParams } from '../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Confirmation } from '../../shared/components/confirmation/confirmation.component';
import { Alert } from '../../shared/components/alert/alert';
import { DecimalPipe } from '@angular/common';
import { MessageDialogComponent } from 'src/app/shared/components/message-dialog/message-dialog.component';
import { BatchModel, FileModel } from './batch.model';
import { DownloadService } from 'src/app/shared/download.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { DownloadTaskComponent } from './download-task/download-task.component';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageEvent: PageEvent | undefined;
  loading = false;
  search = '';
  totalJob = 0;
  totalDocument = 0;
  totalAmount = 0;
  totalStampDuty = 0;
  length = 0;
  pageIndex = 0;
  pageSize = 50;
  items: any[] = [];
  selection = new SelectionModel<BatchModel>(true, []);

  constructor(private rest: RestApi, private route: Router, private dialog: MatDialog, private dl: DownloadService, private modalService: NgbModal, private alert: Alert, private confirm: Confirmation) { }

  ngOnInit() {
  }

  onSearch() {

  }

  clear() {

  }

  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize != undefined ? e.pageSize : this.pageSize;
    //this.iterator();
    //this.loadData(e);
    return e;
  }

  onStatusChange(): void {
    //this.iterator();
    this.items = [];
    // this.setValueToLocalStorage();
    // if(this.status === ''){
    //   this.disabled = true;
    //   localStorage.setItem("BatchViewStatus", "");
    //   this.loadAllData();
    // }
    // else{
    //   this.disabled = false;
    //   this.isLoadAll = false;
    //   this.loadData();
    // }
    // if(this.status === 'Uploading'){
    //   this.allowCheckAll = false;
    // }
    // else {
    //   this.allowCheckAll = true;
    // }
  }

  gotoBatchDetail(e: Event, id: any): void {
    e.stopPropagation();
    this.route.navigate(['/batch/batch-detail/'+ id]);
  }

  openErrorDialog(e: Event, message: string, isInnerTag: boolean) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(MessageDialogComponent, {
        height: '500px',
        width: '800px',
        data: { header: "Error", msg: message, isInnerTag: isInnerTag}
    });
  }

  getRejectReason(item: BatchModel): string {
    let msg = '';
    if(item.rejectReason && item.rejectReason !== '') {
      msg = item.rejectReason;
    }
    if(item.rejectMessage && item.rejectMessage !== '') {
      if (msg.length > 0) {
        msg += '<br>' + item.rejectMessage;
      } else {
        msg = item.rejectMessage;
      }
    }
    return msg;
  }

  exportFixExcel(e: Event, item: any): void {
    e.stopPropagation();
    const obj = [item];
    let url = `batch/exportfixexcel2`;
    if(item.status == 'Input Error'){
      url = `batch/exportfixexcel`;
    }
    this.dl.openDialogDownload(this.dl.downloadL(url, obj));
    setTimeout(() => this.onStatusChange(), 2000);
  }

  exportFixCsv(e: Event, item: any): void {
    e.stopPropagation();
    const obj = [item];
    let url = `batch/exportfixcsv2`;
    if(item.status == 'Input Error'){
      url = `batch/exportfixcsv`;
    }
    this.dl.openDialogDownload(this.dl.downloadL(url, obj));
    setTimeout(() => this.onStatusChange(), 2000);
  }

  viewQRcodeDialog(e: Event, path: any): void {
    e.stopPropagation();
    if (path === undefined || path === '' || path === null) {
      this.alert.error("Path Not found")
    }
    else {
      const file = this.getFileModel(path);
      this.rest.post(`batch/download`, file).subscribe(res => {
        this.dialog.open(ImageDialogComponent, { data: res });
      });
    }
  }

  downloadQrPayment(e: Event): void {
    e.stopPropagation();
    if(this.selection.selected.length <= 0) {
      return;
    }
    //this.service.download(`batch/download/qrpayment`, this.selection.selected, undefined, "qrPayment.zip");
    this.dl.openDialogDownload(this.dl.downloadL(`batch/download/qrpayment`, this.selection.selected));
  }

  downloadPayinSlip(e: Event): void {
    e.stopPropagation();
    if(this.selection.selected.length <= 0) {
      return;
    }
    //this.service.download(`batch/download/payinslip`, this.selection.selected, undefined, "payinSlip.zip");
    this.dl.openDialogDownload(this.dl.downloadL(`batch/download/payinslip`, this.selection.selected));
  }

  download(e: Event, path: string): void {
    e.stopPropagation();
    if (path === undefined || path === '' || path === null) {
      this.alert.error("Path Not found")
    }
    else {
      const file = this.getFileModel(path);
      this.rest.post(`batch/download`, file).subscribe(res => {
        const byteArray = new Uint8Array(atob(res.base64String).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArray], { type: res.type });
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = res.name;
        downloadLink.click();

      });
    }
  }

  downloadPayment(e : Event, batchId: number): void {
    e.stopPropagation();
    const modalRef = this.modalService.open(DownloadDialogComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.batchId = batchId;

  }

  downloadPayments(e : Event): void {
    e.stopPropagation();
    if(this.selection.selected.length <= 0) {
      return;
    }
    const modalRef = this.modalService.open(DownloadTaskComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.selection = this.selection;
  }

  private getFileModel(path: string): FileModel {
    const o = new FileModel();
    if (path !== undefined) {
      o.path = path;
      o.name = o.path.split('/').pop() as string;
      o.ext = o.path.split('.').pop() as string;
    }
    return o;
  }

  delete(e: Event,batchId: number): void{
    e.stopPropagation();
    const options = {
      title: 'Do you want to delete batch?',
      contentClass: 'text-center',
      message: ``,
      accept: {
        label: 'Confirm',
        observable: this.rest.delete(`batch/${batchId}`),
        complete: (res: any) => {
          //console.log([res]);
          if (res > 0)
            this.alert.success('Delete Success');
          else
            this.alert.error('Delete Error: ' + res);

          //this.loadData();
        }
      },
    };
    this.confirm.warn(options);
  }
}
