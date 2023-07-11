import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { RestApi } from '../shared/rest-api';
import { Observable } from 'rxjs';
import { Alert } from '../shared/components/alert/alert';

export interface User {
  id: number;
  token: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdDate: Date;
  lastLoginDate: Date;
  lockedOut: boolean;
}

const USER_KEY = 'gestamp-web';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private _user: User | null;

  constructor(private rest: RestApi, private router: Router, private alert: Alert) {
    this._user = null;
    try {
      const json = localStorage.getItem(USER_KEY);
      if (json) {
        this._user = JSON.parse(json);
      }
    } catch (e) { }
    this.rest.token = this._user?.token;
    this.rest.unauthorized.subscribe(() => this.unauthorize());
  }

  get user(): User | null { return this._user; }
  set user(user: User | null) {
    this._user = user;
    this.rest.token = this._user?.token;
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }

  canActivate(): 
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._user === null) {
      this.alert.warn("Please Sign In!");
      this.router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    console.log('Logged In!');
    return true;
  }

  unauthorize(): void {
    this.user = null;
    if (location.pathname !== '/login' && location.pathname !== '/resetpw') {
      this.router.navigateByUrl('/login');
    }
  }
}
