import { NgModule } from '@angular/core';
import { TransactionComponent } from './transaction.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TransactionComponent,
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
    TransactionComponent
  ],
  exports: [
    TransactionComponent
  ],
})
export class TransactionModule { }
