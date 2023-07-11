import { NgModule } from '@angular/core';
import { BatchComponent } from './batch.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { DownloadTaskComponent } from './download-task/download-task.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BatchComponent,
      },
      // {
      //   path: 'batch-detail/:id',
      //   component: BatchDetailComponent,
      // },
      // {
      //   path: 'batch-edit/:id',
      //   component: BatchEditComponent,
      // }
    ])
  ],
  declarations: [
    BatchComponent,
    ImageDialogComponent,
    DownloadDialogComponent,
    DownloadTaskComponent
  ],
  exports: [
    BatchComponent,
    ImageDialogComponent,
    DownloadDialogComponent,
    DownloadTaskComponent
  ],
})
export class BatchModule { }
