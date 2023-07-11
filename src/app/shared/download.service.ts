import { RestApi } from './rest-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alert } from './components/alert/alert';
import { Confirmation } from './components/confirmation/confirmation.component';


@Injectable({ providedIn: 'root' })
export class DownloadService {
   constructor(private restApi: RestApi, private alert: Alert, private confirm: Confirmation) {

   }

   downloadL(api: string, body?: any, options: any = {}): Observable<any> {
    return this.restApi.post(api, body, options);
 }

   downloadFile(resp: any, fileName?: string) : void {
    let header_content = resp.headers.get('content-disposition');
    let file = header_content.split('=')[1];
    file = file.substring(0, file.length); 
    //let extension = file.split('.')[1].toLowerCase();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([resp.body], { type: resp.body.type })
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
       return 1;
    }, 400);
    return file;  
 }

openDialogDownload(task: Observable<any>){
    const options = {
      title: 'You are going to download file.',
      contentClass: 'text-center',
      message: `Please, wait patiently until they are ready.`,
      close: 'Close',
      disableClose: true,
      submit: {
        label: 'Confirm',
        observable: task,
        complete: (res: any) => {
          //console.log([res]);
          if (res)
            this.downloadFile(res);
          else
             this.alert.error('Error');
        }
      }
    };
    this.confirm.info(options);
  }
}