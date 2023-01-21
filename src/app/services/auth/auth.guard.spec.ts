import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {route} from "../../constants";
function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authMock = {isLoggedIn: jasmine.createSpy('isLoggedIn')};
  let httpMock:HttpTestingController;
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('AuthGuard (isolated)', () => {
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const fakeUrls = [route.SNIPPETS, route.LOGIN, route.SIGNUP];

    describe('when the user is logged in', () => {
      beforeEach(() => {
        guard1 = new AuthGuard( authMock1, routerMock1);
      });
      let authMock1 = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
      let routerMock1 = jasmine.createSpyObj('Router', ['navigate']);
      let guard1: AuthGuard;
      authMock1.isLoggedIn = true;
      fakeUrls.forEach((fakeUrl) => {
        it('grants route access', () => {
          expect(authMock1.isLoggedIn).toBeTrue();
          const canActivate = guard1.canActivate(dummyRoute, fakeRouterState(fakeUrl));
          expect(canActivate).toBeTrue();
        });
      });

    });
    describe('when the user is logged out', () => {
      beforeEach(() => {
        guard1 = new AuthGuard( authMock1, routerMock1);
      });
      let authMock1 = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
      let routerMock1 = jasmine.createSpyObj('Router', ['navigate']);
      let guard1: AuthGuard;
      authMock1.isLoggedIn = false;
      fakeUrls.forEach((fakeUrl) => {
        it('grants route access', () => {
          const canActivate = guard1.canActivate(dummyRoute, fakeRouterState(fakeUrl));
          expect(canActivate).toBeFalse();
          expect(routerMock1.navigate).toHaveBeenCalledWith([route.LOGIN]);
        });
      });
    });
  });
});
