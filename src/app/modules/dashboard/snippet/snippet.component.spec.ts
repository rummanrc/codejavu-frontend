import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SnippetComponent } from './snippet.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RestService} from "../../../services/rest/rest.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {DashboardModule} from "../dashboard.module";

describe('SnippetComponent', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;
  let auth: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardModule],
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

  const snippet = {
    "id": 1,
    "title": "title 1",
    "language": "java",
    "tags": [
      {
        "id": 1,
        "name": "general"
      }
    ],
    "snippet": "<?php echo \"jjjjjjjjjjjjjj\">",
    "urls": [
      "asdsd"
    ]
  };
  const languageList = [
    {
      "id": 1,
      "name": "java"
    },
    {
      "id": 2,
      "name": "php"
    },
    {
      "id": 3,
      "name": "c++"
    },
    {
      "id": 4,
      "name": "javascript"
    }
  ];
  const tagList = [
    {
      "id": 1,
      "name": "general"
    },
    {
      "id": 2,
      "name": "world"
    },
    {
      "id": 3,
      "name": "auth"
    }
  ];
  const snipets = [
    {
      "id": 2,
      "title": "title 1",
      "language": "php",
      "tags": []
    },
    {
      "id": 1,
      "title": "title 2",
      "language": "java",
      "tags": [
        {
          "id": 1,
          "name": "general"
        }
      ]
    },
    {
      "id": 3,
      "title": "title 3",
      "language": "c++",
      "tags": [
        {
          "id": 1,
          "name": "general"
        }
      ]
    },
    {
      "id": 4,
      "title": "title 4",
      "language": "php",
      "tags": [
        {
          "id": 1,
          "name": "general"
        }
      ]
    },
    {
      "id": 5,
      "title": "title 5",
      "language": "php",
      "tags": [
        {
          "id": 1,
          "name": "general"
        },
        {
          "id": 2,
          "name": "world"
        },
        {
          "id": 3,
          "name": "auth"
        }
      ]
    },
    {
      "id": 6,
      "title": "title 6",
      "language": "php",
      "tags": [
        {
          "id": 2,
          "name": "world"
        }
      ]
    }
  ];
  let showModal: boolean = false;
  let showEditModal: boolean = false;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list of the snippets', fakeAsync(() => {
    const spyLoadSnippet = spyOn<any>(component, 'loadSnippetList');
    const spyLoadLanguage = spyOn<any>(component, 'loadLanguageList');
    const spyLoadTag = spyOn<any>(component, 'loadTagList');

    spyOnProperty(component, "snippets", "get").and.returnValue(snipets);
    spyOnProperty(component, 'languages',"get").and.returnValue(languageList);
    spyOnProperty(component, 'tags', "get").and.returnValue(tagList);

    component.ngOnInit();

    expect(spyLoadSnippet).toHaveBeenCalled();
    expect(spyLoadLanguage).toHaveBeenCalled();
    expect(spyLoadTag).toHaveBeenCalled();
    fixture.detectChanges();

    const el_snippet_show_dialog = fixture.nativeElement.querySelector("app-snippet-show-dialog");
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_snippet_edit_dialog = fixture.nativeElement.querySelector("app-snippet-create-edit-dialog");
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_snippets = fixture.nativeElement.querySelectorAll("table.table>tbody>tr");
    expect(el_snippets.length).toEqual(6);
  }));

  it('should show the snippet', fakeAsync(() => {
    spyOn<any>(component, 'loadSnippetList');
    spyOn<any>(component, 'loadLanguageList');
    spyOn<any>(component, 'loadTagList');
    spyOn<any>(component, 'showCodeSnippet').and.callFake(() => {
      showModal = true;
    });

    spyOnProperty(component, "snippets", "get").and.returnValue(snipets);
    spyOnProperty(component, 'languages',"get").and.returnValue(languageList);
    spyOnProperty(component, 'tags', "get").and.returnValue(tagList);
    spyOnProperty(component, 'snippet', "get").and.returnValue(snippet);
    spyOnProperty(component, 'isModalCreateEditActive', "get").and.returnValue(false);
    spyOnProperty(component, 'isModalActive', "get").and.callFake(() => {
      return showModal;
    });
    spyOn(component, 'closeSnippetModal').and.callFake(() => {
      showModal = false;
    });
    spyOn(component, 'showAddEditCodeSnippet');

    component.ngOnInit();
    fixture.detectChanges();

    const el_snippet = fixture.nativeElement.querySelector("table.table>tbody>tr:first-child>td:first-child");
    expect(el_snippet).toBeTruthy();
    el_snippet.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    const el_snippet_show_dialog = fixture.nativeElement.querySelector("app-snippet-show-dialog");
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('true');

    const el_snippet_edit_dialog = fixture.nativeElement.querySelector("app-snippet-create-edit-dialog");
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
  }));

});
