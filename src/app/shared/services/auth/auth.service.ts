import { Injectable } from '@angular/core';
import { User } from './user';
import {BehaviorSubject, Observable, share} from 'rxjs';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";
import {RestRoute} from "../rest/rest-route";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class AuthService implements HttpInterceptor{
  private _token: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(private _rest: RestService, public router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken,
        Accept: "application/json" // TODO: It will cause problem  if any external api doesnt accept json
      }

    });

    return next.handle(req);
  }

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
        this._token.next(res.token);
      },
    () => {
      this._token.next('');
    }
    )
  }

  doLogout() {
    this._token.next('');
    //TODO: call backend logout
  }
  getToken(){
    return this._token.getValue();
  }
  get isLoggedIn(): boolean {
    return !this.getToken().length;
  }
}
