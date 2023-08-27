import {ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {SearchResult, SnippetComponent} from './snippet.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RestService} from "../../../services/rest/rest.service";
import {AuthService} from "../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {DashboardModule} from "../dashboard.module";
import {restAPI, route} from "../../../constants";
import {AppConfig} from "../../../app-config";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {ErrorService} from "../../../services/error/error.service";
import {SnippetService} from "../services/snippet/snippet.service";
import {HttpErrorResponse} from '@angular/common/http';

describe('SnippetComponent', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;
  let auth: AuthService;
  let rest: RestService;
  let mockRouter = {navigate: jasmine.createSpy('navigate')};
  const fakeActivatedRoute = {
    queryParams: new Observable((observer) => {
      observer.next({});
    })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardModule, ClipboardModule],
      providers: [
        ErrorService,
        RestService,
        SnippetService,
        // {
        //   provide: Router, useClass: class {
        //     navigate = jasmine.createSpy("navigate").and.resolveTo(true);
        //   }
        // },
        {
          provide: Router, useValue: mockRouter
        },
        {
          provide: ActivatedRoute, useValue: fakeActivatedRoute
        }
      ],
      declarations: [SnippetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    rest = TestBed.inject(RestService);
    // router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  function createUrl(path: string): string {
    return AppConfig.BASE_URL + path;
  }

  function fakeGet(url: string): Observable<any> | undefined {

    switch (url) {
      case createUrl(restAPI.LANGUAGES): {
        return of(languageList);
      }
      case createUrl(restAPI.TAGS): {
        return of(tagList);
      }
      case createUrl(restAPI.SNIPPETS): {
        return of(snippets);
      }
      case createUrl(`${restAPI.SNIPPETS}/1`): {
        return of(snippet);
      }
      case createUrl(`${restAPI.SEARCH_QUERY}query=title&limit=4`): {
        return of(searchResultMetaInfo);
      }
      default: {
        break;
      }
    }
  }

  function fakePost(url: string, data: any): Observable<any> | undefined {

    switch (url) {
      case createUrl(restAPI.SEARCH): {
        return of(searchResult);
      }
      default: {
        break;
      }
    }
  }

  let snippet = {
    "id": 2,
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
  const snippets = [
    {
      "id": 1,
      "title": "title 1",
      "language": "php",
      "tags": []
    },
    {
      "id": 2,
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
  const searchResultMetaInfo = [
    {id: 1, title: "title 1"},
    {id: 2, title: "title 2"},
    {id: 3, title: "title 3"},
    {id: 4, title: "title 4"},
  ];
  const searchResult = [
    {
      "id": 1,
      "title": "title 1",
      "language": "php",
      "tags": []
    },
    {
      "id": 2,
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
  ];
  let showModal: boolean = false;
  let showEditModal: boolean = false;


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message on failed to load snippet', fakeAsync(() => {
    const api = 'http://localhost/api/v1/snippets/1';
    const errorResponse = new HttpErrorResponse({
      error: 'Invalid request parameters',
      status: 422,
      statusText: 'Unprocessable Entity',
      url: api
    });
    const data = 'Invalid request parameters';
    const httpMock = fixture.debugElement.injector.get(HttpTestingController);
    let errorServ = fixture.debugElement.injector.get(ErrorService);
    spyOn(errorServ, 'insertMessage');
    fixture.detectChanges();

    component.showCodeSnippet(1);
    httpMock.expectOne(api).flush(data, errorResponse);
    expect(errorServ.insertMessage).toHaveBeenCalledWith('Failed to load code snippet', errorResponse);
  }));

  it('should show error message on failed fetching list of tags', () => {
    const tagApi = 'http://localhost/api/v1/tags';
    const errorTagApiResponse = new HttpErrorResponse({
      error: 'Invalid request parameters',
      status: 422,
      statusText: 'Unprocessable Entity',
      url: tagApi
    });
    const errorServ = fixture.debugElement.injector.get(ErrorService);
    spyOn(Object.getPrototypeOf(rest), 'get').and.returnValue(throwError(errorTagApiResponse));
    spyOn(errorServ, 'insertMessage');
    fixture.detectChanges();

    component['loadTagList']();

    expect(errorServ.insertMessage).toHaveBeenCalledWith("Tag list load error.", errorTagApiResponse);
  });
  it('should show error message on failed fetching list of languages', () => {
    const languageApi = 'http://localhost/api/v1/languages';
    const errorLanguageApiResponse = new HttpErrorResponse({
      error: 'Invalid request parameters',
      status: 422,
      statusText: 'Unprocessable Entity',
      url: languageApi
    });
    const errorServ = fixture.debugElement.injector.get(ErrorService);
    spyOn(Object.getPrototypeOf(rest), 'get').and.returnValue(throwError(errorLanguageApiResponse));
    spyOn(errorServ, 'insertMessage');
    fixture.detectChanges();

    component['loadLanguageList']();

    expect(errorServ.insertMessage).toHaveBeenCalledWith("Language list load error.", errorLanguageApiResponse);
  });

  it('should show error message on failed fetching list of snippets', () => {
    const snippetsApi = 'http://localhost/api/v1/snippets';
    const errorSnippetsApiResponse = new HttpErrorResponse({
      error: 'Invalid request parameters',
      status: 422,
      statusText: 'Unprocessable Entity',
      url: snippetsApi
    });
    const errorServ = fixture.debugElement.injector.get(ErrorService);
    spyOn(Object.getPrototypeOf(rest), 'get').and.returnValue(throwError(errorSnippetsApiResponse));
    spyOn(errorServ, 'insertMessage');
    fixture.detectChanges();

    component['loadSnippetList']();
    expect(errorServ.insertMessage).toHaveBeenCalledWith("Snippet list load error.", errorSnippetsApiResponse);
  });

  it('should show list of the snippets', fakeAsync(() => {
    const spyLoadSnippet = spyOn<any>(component, 'loadSnippetList').and.callThrough();
    const spyLoadLanguage = spyOn<any>(component, 'loadLanguageList').and.callThrough();
    const spyLoadTag = spyOn<any>(component, 'loadTagList').and.callThrough();
    spyOn(Object.getPrototypeOf(rest), 'get').and.callFake(fakeGet);
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
    discardPeriodicTasks();
  }));

  it('should show new snippet', fakeAsync(() => {
    const spyLoadSnippet = spyOn<any>(component, 'loadSnippetList').and.callThrough();
    const spyLoadLanguage = spyOn<any>(component, 'loadLanguageList').and.callThrough();
    const spyLoadTag = spyOn<any>(component, 'loadTagList').and.callThrough();
    spyOn(Object.getPrototypeOf(rest), 'get').and.callFake(fakeGet);
    component.ngOnInit();
    expect(spyLoadSnippet).toHaveBeenCalled();
    expect(spyLoadLanguage).toHaveBeenCalled();
    expect(spyLoadTag).toHaveBeenCalled();
    fixture.detectChanges();

    const el_snippet_show_dialog = fixture.nativeElement.querySelector("app-snippet-show-dialog");
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_snippet_edit_dialog = fixture.nativeElement.querySelector("app-snippet-create-edit-dialog");
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_create = fixture.nativeElement.querySelector("a.button.is-success");
    expect(el_create).toBeTruthy();

    el_create.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('true');
    discardPeriodicTasks();
  }));


  it('should show the snippet', fakeAsync(() => {
    spyOn(Object.getPrototypeOf(rest), 'get').and.callFake(fakeGet);
    component.ngOnInit();
    fixture.detectChanges();

    const el_snippet = fixture.nativeElement.querySelector("table.table>tbody>tr:first-child>td:first-child");
    expect(el_snippet).toBeTruthy();
    el_snippet.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    let el_snippet_show_dialog = fixture.nativeElement.querySelector("app-snippet-show-dialog");
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('true');

    const el_snippet_edit_dialog = fixture.nativeElement.querySelector("app-snippet-create-edit-dialog");
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_title = el_snippet_show_dialog.querySelector("p.modal-card-title");
    expect(el_title.innerText.trim()).toBe('title 1');

    const el_close = el_snippet_show_dialog.querySelector("button.delete");
    expect(el_close).toBeTruthy();

    el_close.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
    discardPeriodicTasks();
  }));

  it('should show the snippet edit', fakeAsync(() => {
    spyOn(Object.getPrototypeOf(rest), 'get').and.callFake(fakeGet);
    component.ngOnInit();
    fixture.autoDetectChanges();

    const el_snippet = fixture.nativeElement.querySelector("table.table>tbody>tr:first-child>td:first-child");
    expect(el_snippet).toBeTruthy();
    el_snippet.dispatchEvent(new Event('click'));
    tick();

    fixture.autoDetectChanges();

    let el_snippet_show_dialog = fixture.nativeElement.querySelector("app-snippet-show-dialog");
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('true');

    let el_snippet_edit_dialog = fixture.nativeElement.querySelector("app-snippet-create-edit-dialog");
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');

    const el_title = el_snippet_show_dialog.querySelector("p.modal-card-title");
    expect(el_title.innerText.trim()).toBe('title 1');

    const el_edit = el_snippet_show_dialog.querySelector("footer>button.is-warning");
    expect(el_edit).toBeTruthy();

    el_edit.dispatchEvent(new Event('click'));
    tick();
    fixture.autoDetectChanges();

    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('true');

    const el_edit_title = el_snippet_edit_dialog.querySelector("p.modal-card-title");
    expect(el_edit_title).toBeTruthy();
    // expect(el_edit_title.innerText.trim()).toBe('title 1');
    const el_close = el_snippet_edit_dialog.querySelector("button.delete");
    expect(el_close).toBeTruthy();

    el_close.dispatchEvent(new Event('click'));
    tick();
    fixture.autoDetectChanges();
    expect(el_snippet_show_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
    expect(el_snippet_edit_dialog.getAttribute("ng-reflect-modal-active")).toBe('false');
    flush();
    discardPeriodicTasks();
  }));
  it('should show search query', fakeAsync(() => {
    spyOn(Object.getPrototypeOf(rest), 'get').and.callFake(fakeGet);
    const spyQuerySnippet = spyOn<any>(component, 'getSearchSnippetQuery').and.callThrough();
    const spyOnSearchInputChange = spyOn<any>(component, 'onSearchChange').and.callThrough();
    component.ngOnInit();
    const el_snippet_search = fixture.nativeElement.querySelector("#search-snippet");
    expect(el_snippet_search).toBeTruthy();
    el_snippet_search.value = "title";
    el_snippet_search.dispatchEvent(new Event('input'));
    tick(1000);
    fixture.detectChanges();
    expect(spyOnSearchInputChange).toHaveBeenCalled();
    expect(spyQuerySnippet).toHaveBeenCalled();
    discardPeriodicTasks();
  }));
  it('should show search search result', fakeAsync(() => {
    spyOn(Object.getPrototypeOf(rest), 'post').and.callFake(fakePost);
    const spyShowSearchResult = spyOn<any>(component, 'showSearchResult').and.callThrough();
    component['_searchResult'] = searchResultMetaInfo as SearchResult[];
    component.ngOnInit();
    const el_snippet_search_btn = fixture.nativeElement.querySelector("#search-btn");
    el_snippet_search_btn.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    expect(spyShowSearchResult).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith([route.SNIPPETS],
      {
        queryParams: {search: true},
        queryParamsHandling: 'merge',
      });
    discardPeriodicTasks();
  }));
});

describe('SnippetComponentSearch', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;
  let auth: AuthService;
  let rest: RestService;
  let mockRouter = {navigate: jasmine.createSpy('navigate')};
  const fakeActivatedRoute = {
    queryParams: new Observable((observer) => {
      observer.next({search: true});
    })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardModule, ClipboardModule],
      providers: [
        ErrorService,
        RestService,
        SnippetService,
        {
          provide: Router, useValue: mockRouter
        },
        {
          provide: ActivatedRoute, useValue: fakeActivatedRoute
        }
      ],
      declarations: [SnippetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    rest = TestBed.inject(RestService);
    fixture.detectChanges();
  });


  function createUrl(path: string): string {
    return AppConfig.BASE_URL + path;
  }

  function fakeGet(url: string): Observable<any> | undefined {

    switch (url) {
      case createUrl(restAPI.LANGUAGES): {
        return of(languageList);
      }
      case createUrl(restAPI.TAGS): {
        return of(tagList);
      }
      case createUrl(restAPI.SNIPPETS): {
        return of(snippets);
      }
      case createUrl(`${restAPI.SNIPPETS}/1`): {
        return of(snippet);
      }
      default: {
        break;
      }
    }
  }

  let snippet = {
    "id": 2,
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
  const snippets = [
    {
      "id": 1,
      "title": "title 1",
      "language": "php",
      "tags": []
    },
    {
      "id": 2,
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

  it('should create search', () => {
    const spy = spyOnProperty(component, 'snippets', 'get').and.callThrough();
    expect(component.snippets).toEqual([{}]);
    expect(spy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should close search result page', () => {
    component.closeSearchMode();
    expect(mockRouter.navigate).toHaveBeenCalledWith([route.SNIPPETS]);
  });
});
