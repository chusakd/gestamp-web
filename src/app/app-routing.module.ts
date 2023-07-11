import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { Error1Component } from './shared/components/error1/error1.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthGuard]},
  { path: 'batch', loadChildren: () => import('./pages/batch/batch.module').then((m) => m.BatchModule), canActivate: [AuthGuard]},
  { path: 'transaction', loadChildren: () => import('./pages/transaction/transaction.module').then((m) => m.TransactionModule), canActivate: [AuthGuard]},
  { path: 'paperstamp', loadChildren: () => import('./pages/paperstamp/paperstamp.module').then((m) => m.PaperStampModule), canActivate: [AuthGuard]},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule), canActivate: [AuthGuard]},
  { path: 'error', component: Error1Component },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'error', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
