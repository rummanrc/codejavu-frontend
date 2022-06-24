import { Injectable } from '@angular/core';
import { User } from './user';
import {BehaviorSubject, Observable, share} from 'rxjs';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";
import {RestRoute} from "../rest/rest-route";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private _token: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(private _rest: RestService, public router: Router) {}
  signUp(user: User): Observable<any> {
    let api = this._rest.url(RestRoute.USERS);
    return this._rest.post(api, user);
  }
  logIn(user: User) {
    const request_body = {'email': user.email, 'password': user.password};
    const api = this._rest.url(RestRoute.LOGIN);
    const result = this._rest.post<any>(api, request_body).pipe(share());
    result.subscribe(
      (res) => {
        this._token.next(res.token)
      }
    )
  }

  doLogout() {
    this._token.next('');
    //TODO: call backend logout
  }
}
