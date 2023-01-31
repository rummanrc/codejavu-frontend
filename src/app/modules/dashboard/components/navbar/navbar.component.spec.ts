import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {route} from "../../../../constants";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let httpMock: HttpTestingController;
  let auth: AuthService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
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
    fixture = TestBed.createComponent(NavbarComponent);
    auth = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', fakeAsync(() => {
    spyOn(auth, 'doLogout');
    spyOn(component, 'logout').and.callThrough();
    fixture.detectChanges();
    let router = fixture.debugElement.injector.get(Router);
    // let auth = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    const logout_el = fixture.nativeElement.querySelector("a.button.is-primary");
    expect(logout_el).toBeTruthy();

    logout_el.click();

    fixture.detectChanges();

    expect(component.logout).toHaveBeenCalled();
    expect(auth.doLogout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([route.LOGIN]);


  }));

});
