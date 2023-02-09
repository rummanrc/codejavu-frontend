import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';
import {AuthenticationData, AuthService} from "../../../services/auth/auth.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ErrorService} from "../../../services/error/error.service";
import {HttpErrorResponse} from "@angular/common/http";


describe("Successful Login (Isolate)", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService, useClass: class {
            logIn = jasmine.createSpy("logIn").and.returnValue(of({token: "token", userId: 1} as AuthenticationData));
          }
        },
        {
          provide: Router, useClass: class {
            navigate = jasmine.createSpy("navigate").and.resolveTo(true);
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form', async () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("form");
    expect(el).toBeTruthy();
  });

  it("should login successfully", fakeAsync(() => {
    spyOn(component, 'loginUser').and.callThrough();
    let router = fixture.debugElement.injector.get(Router);
    let auth = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    const email_el = fixture.nativeElement.querySelector("input[type = email]");
    const password_el = fixture.nativeElement.querySelector("input[type = password]");
    const button_el = fixture.nativeElement.querySelector("div>div>button.button");

    expect(email_el).toBeTruthy();
    expect(password_el).toBeTruthy();
    expect(button_el).toBeTruthy();

    email_el.value = "test@email.com";
    email_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    password_el.value = "12345678";
    password_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.loginForm.get("email")?.value).toEqual("test@email.com");
    expect(component.loginForm.get("password")?.value).toEqual("12345678");

    button_el.click();
    tick();
    fixture.detectChanges();

    expect(component.loginUser).toHaveBeenCalled();
    expect(auth.logIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  }));
});

describe('Failed Login (Isolated)', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpMock: HttpTestingController;
  const errorResponse = new HttpErrorResponse({
    error: {"errors": ["Sorry, incorrect email or password"]},
    status: 422,
    statusText: 'Unprocessable Entity',
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService, useClass: class {
            logIn = jasmine.createSpy("logIn").and.returnValue(throwError(errorResponse));
          }
        },
        ErrorService,
        {
          provide: Router, useClass: class {
            navigate = jasmine.createSpy("navigate").and.resolveTo(false);
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  it("should login falied", fakeAsync(() => {
    let router = fixture.debugElement.injector.get(Router);
    let auth = fixture.debugElement.injector.get(AuthService);
    let errorServ = fixture.debugElement.injector.get(ErrorService);
    spyOn(component, 'loginUser').and.callThrough();
    spyOn(errorServ, 'insertMessage');

    fixture.detectChanges();
    const email_el = fixture.nativeElement.querySelector("input[type = email]");
    const password_el = fixture.nativeElement.querySelector("input[type = password]");
    const button_el = fixture.nativeElement.querySelector("div>div>button.button");

    expect(email_el).toBeTruthy();
    expect(password_el).toBeTruthy();
    expect(button_el).toBeTruthy();

    email_el.value = "test@email.com";
    email_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    password_el.value = "12345678";
    password_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.loginForm.get("email")?.value).toEqual("test@email.com");
    expect(component.loginForm.get("password")?.value).toEqual("12345678");

    button_el.click();
    tick();
    fixture.detectChanges();
    expect(component.loginUser).toHaveBeenCalled();
    
    expect(auth.logIn).toHaveBeenCalled();
    expect(errorServ.insertMessage).toHaveBeenCalledWith("Login Failed. Try Again.", errorResponse);
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
