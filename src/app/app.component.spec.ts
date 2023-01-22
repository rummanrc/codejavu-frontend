import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";
import createSpyObj = jasmine.createSpyObj;
import {By} from "@angular/platform-browser";
import {combineLatestAll} from "rxjs";
import createSpy = jasmine.createSpy;


describe('AppComponent with user logged in', () => {
  // let authMock: Partial<AuthService>
  let authMock = jasmine.createSpyObj('AuthService', ['isLoggedIn','doLogout','getToken']);
  //
  //  authMock = {getToken: jasmine.createSpy('getToken').and.returnValue('ytuuy'),
  //   doLogout: jasmine.createSpy('doLogout')};
  let routerMock = {navigate: jasmine.createSpy('navigate')}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authMock }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges()
    expect(app).toBeTruthy();
    expect(app.isLoggedInComp).toBeTrue();
  });

  // describe('user is not logged in', () => {
  //   let componentNL: AppComponent;
  //   let fixtureNL: ComponentFixture<AppComponent>;
  //   let authMockNL = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'doLogout']);
  //   let routerMockNL = {navigate: jasmine.createSpy('navigate')}
  //   let authService: Partial<AuthService>;
  //   beforeEach(async () => {
  //     authMockNL.isLoggedIn = false;
  //     await TestBed.configureTestingModule({
  //       providers: [
  //         { provide: Router, useValue: routerMockNL },
  //         { provide: AuthService, useValue: authMockNL }
  //       ],
  //       declarations: [
  //         AppComponent
  //       ],
  //     });
  //     // authService = TestBed.inject(AuthService);
  //   });
  //
  //   beforeEach(() => {
  //     fixtureNL = TestBed.createComponent(AppComponent);
  //     componentNL = fixtureNL.componentInstance;
  //   })
  //   it('should create', () => {
  //     expect(componentNL).toBeTruthy();
  //   });
  //   it('should not render logout in navbar', () => {
  //     fakeAsync(()=>{
  //       fixtureNL.detectChanges();
  //       tick(4000);
  //     })
  //
  //     console.log("$######################################################");
  //     console.log(fixtureNL);
  //     const selector = "#navbar";
  //     const elem = fixtureNL.debugElement.query(By.css(selector)).nativeElement;
  //     expect(elem.innerHTML).toEqual("zd");
  //     // expect(fixtureNL).toBeTruthy();
  //     // expect(componentNL.isLoggedInComp).toBeFalse();
  //   });
  //
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('codejavu');
  // });

});
