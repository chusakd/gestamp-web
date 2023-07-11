import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AlertComponent } from './components/alert/alert.component';
import { Error1Component } from './components/error1/error1.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MoneyPipe, NumeralPipe, StringPipe, PositiveNumber } from './helper.pipe';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LoadingComponent,
    AlertComponent,
    Error1Component,
    ConfirmationComponent,
    MessageDialogComponent,
    PositiveNumber,
    MoneyPipe, 
    NumeralPipe, 
    StringPipe
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ToolbarComponent,
    LoadingComponent,
    AlertComponent,
    Error1Component,
    ConfirmationComponent,
    MessageDialogComponent
  ],
  providers: [
    NumeralPipe,
    MoneyPipe,
    StringPipe,
    PositiveNumber
 ],
})
export class SharedModule {}
