import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetComponent } from './snippet.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RestService} from "../../../services/rest/rest.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

describe('SnippetComponent', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;
  let auth: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestService,
        { provide: Router, useClass: class {
            navigate = jasmine.createSpy("navigate").and.resolveTo(true);
          }}
      ],
      declarations: [SnippetComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
