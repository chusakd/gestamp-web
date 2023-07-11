import { NgModule } from '@angular/core';
import { PaperstampComponent } from './paperstamp.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PaperstampComponent,
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
    PaperstampComponent
  ],
  exports: [
    PaperstampComponent
  ],
})
export class PaperStampModule { }
