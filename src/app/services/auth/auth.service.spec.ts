import { TestBed } from '@angular/core/testing';

import {AuthenticationData, AuthService} from './auth.service';
import {RestService} from "../rest/rest.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {restAPI} from "../../constants";

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter: Router;
  let restService: RestService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        RestService,
        {provide: HTTP_INTERCEPTORS, useClass: RestService, multi: true},
      ]
    });
    service = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);

    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
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

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be signed up a user', () => {
    const userSignUpData = {
        name: "dummy",
        email: "user@email.com",
        password: "123456"
    };
    const userSignUpResponseData = {
      "user": {
        "id": 1,
        "email": "abc@qwe.com",
        "password_digest": "$2a$12$HADZloR0kj624eB4I..zBO/Mm.aVL9NtaVIPnDSh2k33RRZQrimEG",
        "created_at": "2023-01-20T14:40:05.041Z",
        "updated_at": "2023-01-20T14:40:05.041Z"
      },
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Ejb7AG8Ypnli3kC33FHO7KUvIR5Xd3-g67BhsEahGCY"
    }
    const signUpApi = restService.url(restAPI.SIGN_UP);
    service.signUp(userSignUpData).subscribe( (data) => {
      expect(data).toBe(userSignUpResponseData);
    });
    const req = httpMock.expectOne(signUpApi);
    req.flush(userSignUpResponseData);
  });

  it('should be logged in a user', () => {
    const userSignInData = {
      "email": "user@email.com",
      "password": "123456"
    };
    const userSignInResponseData = {
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Ejb7AG8Ypnli3kC33FHO7KUvIR5Xd3-g67BhsEahGCY",
      "userId": 1
    }

    const signInApi = restService.url(restAPI.LOGIN);
    service.logIn(userSignInData).subscribe( (data) => {
      expect(data).toBe(userSignInResponseData as AuthenticationData);
    });
    const req = httpMock.expectOne(signInApi);
    req.flush(userSignInResponseData);
    expect(service.isLoggedIn).toEqual(true);
    expect(service.getToken()).toEqual("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Ejb7AG8Ypnli3kC33FHO7KUvIR5Xd3-g67BhsEahGCY");
  });

  it('should be logged out a user', () => {
    service.doLogout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user-id')).toBeNull();
  });

});
