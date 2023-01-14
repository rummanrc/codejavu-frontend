import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject, catchError, map, Observable, share, tap} from 'rxjs';
import {Router} from '@angular/router';
import {RestService} from "../rest/rest.service";
import {RestRoute} from "../rest/rest-route";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class AuthService implements HttpInterceptor{
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

  logIn(user: User): Observable<AuthenticationData> {
    const request_body = {'email': user.email, 'password': user.password};
    const api = this._rest.url(RestRoute.LOGIN);
    return this._rest.post<any>(api, request_body).pipe(
      map( (data) => {
        return {token: data.token, userId: data.user_id} as AuthenticationData
      }),
      tap( (authData) => {
        this.storeData(authData);
      }),
      catchError( (err) => {
        throw  err;
      })
    )
  }
  private storeData(data: AuthenticationData): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user-id', data.userId.toString());
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-id');
  }
  doLogout() {
    this.clearLocalStorage();
    //TODO: call backend logout
  }
  getToken(): string|null {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

export interface AuthenticationData {
  userId: number,
  token: string
}
