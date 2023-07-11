import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
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
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
})
export class DashboardModule { }
