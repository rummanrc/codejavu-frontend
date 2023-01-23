import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {AuthenticationData, AuthService} from "../../../services/auth/auth.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {of} from "rxjs";


describe("Failed Logging (Isolate)", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {provide: AuthService, useClass: class {
            logIn = jasmine.createSpy("logIn").and.returnValue(of({token: "token", userId: 1} as AuthenticationData))
        }},
        {provide: Router, useClass: class {
          navigate = jasmine.createSpy("navigate").and.resolveTo(true);
          }}
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

  it( 'should render the login form', async () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("form");
    expect(el).toBeTruthy();
  });

  it("should login successfully", fakeAsync( () => {
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

describe('SignInComponent (Isolated)', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {provide: AuthService, useClass: class {
            logIn = jasmine.createSpy("logIn").and.throwError("Sorry, incorrect email or password")
          }},
        {provide: Router, useClass: class {
            navigate = jasmine.createSpy("navigate").and.resolveTo(false);
          }}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should login falied", fakeAsync( () => {
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
    expect(component.loginUser).toThrowError()
    expect(auth.logIn).toThrowError('Sorry, incorrect email or password');
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
