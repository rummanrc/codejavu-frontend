import {fakeAsync, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {RestService} from "../rest/rest.service";
import {of} from "rxjs";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {restAPI} from "../../constants";
import {AppConfig} from "../../app-config";
import {HttpErrorResponse} from "@angular/common/http";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let rest: RestService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestService
      ]
    });
    service = TestBed.inject(AuthService);
    rest = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string): void => {
        store[key] = `${value}`;
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
      clear: (): void => {
        store = {};
      }
    };
    spyOn(Object.getPrototypeOf(localStorage), 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(Object.getPrototypeOf(localStorage), 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(Object.getPrototypeOf(localStorage), 'clear')
      .and.callFake(mockLocalStorage.clear);

    spyOn(Object.getPrototypeOf(rest), "url")
      .and.callThrough();
  });

  let userSignUpResponseData = {
    "user": {
      "id": 1,
      "email": "user@email.com",
      "password_digest": "user_password_digest",
      "created_at": "2023-01-20T14:40:05.041Z",
      "updated_at": "2023-01-20T14:40:05.041Z"
    },
    "token": "user_signup_response_token"
  };

  let userSignInResponseData = {
    "token": "user_signin_response_token",
    "user_id": 1
  };

  let processedSignInResponse = {
    "token": "user_signin_response_token",
    "userId": 1
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be signed up a user', () => {
    const userSignUpData = {
      name: "dummy",
      email: "user@email.com",
      password: "123456"
    };
    spyOn(Object.getPrototypeOf(rest), "post")
      .and.returnValue(of(userSignUpResponseData));
    service.signUp(userSignUpData).subscribe((data) => {
      expect(data).toEqual(userSignUpResponseData);
    });

    expect(rest.url).toHaveBeenCalled();
    expect(rest.post).toHaveBeenCalledWith(AppConfig.BASE_URL + restAPI.SIGN_UP, userSignUpData);
  });

  it('should be logged in a user', () => {
    const userSignInData = {
      "email": "user@email.com",
      "password": "123456"
    };
    
    spyOn(Object.getPrototypeOf(rest), "post")
      .and.returnValue(of(userSignInResponseData));

    service.logIn(userSignInData).subscribe((data) => {
      expect(data).toEqual(processedSignInResponse);
    });

    let formData = new FormData();
    formData.append('username', userSignInData.email);
    formData.append('password', userSignInData.password);

    expect(rest.post).toHaveBeenCalledWith(AppConfig.BASE_URL + restAPI.LOGIN, formData);

    expect(service.isLoggedIn).toEqual(true);
    expect(service.getToken()).toEqual("user_signin_response_token");
  });

  it('should be logged in failed', fakeAsync(() => {
    const userSignInData = {
      "email": "user@email.com",
      "password": "12345609"
    };
    const loginApi = `${AppConfig.BASE_URL}/login/access-token`;
    const errorResponse = new HttpErrorResponse({
      error: {"errors": ["Sorry, incorrect email or password"]},
      status: 422,
      statusText: 'Unprocessable Entity',
    });

    service.logIn(userSignInData).subscribe({
      next: value => {
      },
      error: err => {
        expect(err).toBeTruthy();
      }
    });
    httpMock.expectOne(loginApi).flush(errorResponse);
  }));

  it('should be logged out a user', () => {
    service.doLogout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user-id')).toBeNull();
  });

});
