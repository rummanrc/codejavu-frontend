import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject, catchError, map, Observable, share, tap} from 'rxjs';
import {Router} from '@angular/router';
import {RestService} from "../rest/rest.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {RestAPIs} from "../rest/restAPIs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private _rest: RestService, public router: Router) {}


  signUp(user: User): Observable<any> {
    let api = this._rest.url(RestAPIs.SIGN_UP);
    return this._rest.post(api, user);
  }

  logIn(user: User): Observable<AuthenticationData> {
    const request_body = {'email': user.email, 'password': user.password};
    const api = this._rest.url(RestAPIs.LOGIN);
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
