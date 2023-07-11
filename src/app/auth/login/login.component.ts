import { HttpHeaders } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestApi } from 'src/app/shared/rest-api';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding() className = 'app-change-password';
  busy = false;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  popState?: Subscription;

  constructor(private fb: UntypedFormBuilder, private router: Router, private rest: RestApi, private auth: AuthGuard) {

    this.awarenessPopState();
  }

  ngOnInit(): void {
    document.body.classList.add('mat-background');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('mat-background');
    this.popState?.unsubscribe();
  }

  awarenessPopState() {
    this.popState = this.router.events.subscribe((res: any) => {
      if (res.navigationTrigger === 'popstate') {
        // if (!this.auth.user) {
        //   this.router.navigateByUrl('/login');
        // }
      }
    });
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.busy = true;
    const authorization = btoa(`${encodeURIComponent(this.form.value.username)}:${encodeURIComponent(this.form.value.password)}`);
    const headers = new HttpHeaders().set('Authorization', `Basic ${authorization}`);

    this.rest.post('/login', null, { headers }).subscribe(user => {
      console.log(user);
      this.auth.user = user;
      //if (user.lastPasswordChange === undefined) {
        // const dialogRef = this.dialog.open(ChangePasswordComponent, { disableClose: true });
        // dialogRef.afterClosed().subscribe((result) => {
        //   if (result) {
        //     this.auth.user = user;
        //     this.router.navigateByUrl('/main');
        //   } else {
        //     setTimeout(() => { this.auth.unauthorize() }, 500);
        //   }
        // });
      //} else {
        //this.auth.user = user;
        //this.router.navigateByUrl('/dashboard');
      //}
      this.router.navigateByUrl('/batch');
    }).add(() => this.busy = false);
  }

  forgot(): void {
    //const dialogRef = this.dialog.open(ForgotPasswordComponent, { data: this.form.value });
  }
}
