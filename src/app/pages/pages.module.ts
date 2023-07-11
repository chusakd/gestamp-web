import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { BatchModule } from './batch/batch.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaperStampModule } from './paperstamp/paperstamp.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardModule,
    AdminModule,
    BatchModule,
    TransactionModule,
    PaperStampModule
  ],
  declarations: [
    
  ],
  exports: [
    DashboardModule,
    AdminModule,
    BatchModule,
    TransactionModule,
    PaperStampModule
  ],
})
export class PagesModule { }
