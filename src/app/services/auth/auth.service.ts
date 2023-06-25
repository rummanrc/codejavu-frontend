import {Injectable} from '@angular/core';
import {User} from './user';
import {catchError, map, Observable, tap} from 'rxjs';
import {RestService} from "../rest/rest.service";
import {restAPI} from "../../constants";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private _rest: RestService) {
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signUp(user: User): Observable<any> {
    let api = this._rest.url(restAPI.SIGN_UP);
    return this._rest.post(api, user);
  }

  logIn(user: User): Observable<AuthenticationData> {
    // const request_body = {'email': user.email, 'password': user.password};
    let formData: FormData = new FormData();
    // @ts-ignore
    formData.append('username', user.email);
    // @ts-ignore
    formData.append('password', user.password);
    const api = this._rest.url(restAPI.LOGIN);
    return this._rest.post<any>(api, formData).pipe(
      map((data) => {
        return {token: data.token, userId: data.user_id} as AuthenticationData;
      }),
      tap((authData) => {
        console.log(authData);
        this.storeData(authData);
      }),
      catchError((err) => {
        throw  err;
      })
    );
  }

  doLogout(): void {
    this.clearLocalStorage();
    //TODO: call backend logout
  }

  private storeData(data: AuthenticationData): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user-id', data.userId.toString());
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-id');
  }
}

export interface AuthenticationData {
  userId: number,
  token: string
}
