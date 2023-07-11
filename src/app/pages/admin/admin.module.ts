import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
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
    AdminComponent
  ],
  exports: [
    AdminComponent
  ],
})
export class AdminModule { }
