import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {SignupComponent} from './signup.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService, useClass: class {
            signUp = jasmine.createSpy("signUp").and.returnValue(of({
              "user": {
                "id": 1,
                "email": "test@email.com",
                "password_digest": "sign_up_password",
                "created_at": "2023-01-21T14:12:59.799Z",
                "updated_at": "2023-01-21T14:12:59.799Z"
              },
              "token": "sign_up_token"
            }));
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should signup successfully", fakeAsync(() => {
    spyOn(component, 'registerUser').and.callThrough();
    let router = fixture.debugElement.injector.get(Router);
    let auth = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    const name_el = fixture.nativeElement.querySelector("input[type = text][formControlName = name]");
    const email_el = fixture.nativeElement.querySelector("input[type = email]");
    const password_el = fixture.nativeElement.querySelector("input[type = password]");
    const button_el = fixture.nativeElement.querySelector("button[type=submit]");

    expect(name_el).toBeTruthy();
    expect(email_el).toBeTruthy();
    expect(password_el).toBeTruthy();
    expect(button_el).toBeTruthy();

    name_el.value = "firstnameLastName";
    name_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    email_el.value = "test@email.com";
    email_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    password_el.value = "12345678";
    password_el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.signupForm.get("name")?.value).toEqual("firstnameLastName");
    expect(component.signupForm.get("email")?.value).toEqual("test@email.com");
    expect(component.signupForm.get("password")?.value).toEqual("12345678");

    button_el.click();
    tick();
    fixture.detectChanges();

    expect(component.registerUser).toHaveBeenCalled();
    expect(auth.signUp).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
