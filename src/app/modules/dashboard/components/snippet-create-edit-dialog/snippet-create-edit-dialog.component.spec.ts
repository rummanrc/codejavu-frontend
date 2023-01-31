import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SnippetCreateEditDialogComponent} from "./snippet-create-edit-dialog.component";
import {RestService} from "../../../../services/rest/rest.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {DashboardModule} from "../../dashboard.module";
import {By} from "@angular/platform-browser";
import {restAPI} from "../../../../constants";
import {Observable, of} from "rxjs";
import {AppConfig} from "../../../../app-config";

describe('SnippetCreateEditDialogComponent', () => {
  let component: SnippetCreateEditDialogComponent;
  let fixture: ComponentFixture<SnippetCreateEditDialogComponent>;
  let rest: RestService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardModule],
      providers: [RestService],
      declarations: [SnippetCreateEditDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetCreateEditDialogComponent);
    component = fixture.componentInstance;
    rest = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
    component.modalActive = true;
    component.tags = [
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
    component.languages = [
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
    component.code = "<?php echo 'hello'; ?>";
    fixture.detectChanges();
  });

  function createUrl(path: string): string {
    return AppConfig.BASE_URL + path;
  }

  function fakePost(url: string): Observable<any> | undefined {

    switch (url) {
      case createUrl(restAPI.SNIPPETS): {
        return of(snippetResponse);
      }
      default: {
        break;
      }
    }
  }

  let snippetResponse = {
    "id": 1,
    "title": "test",
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
    ],
    "snippet": "<?php echo 'yoo' ?>",
    "urls": [
      "https://url-1.com",
      "https://url-2.com",
      "https://url-3.com"
    ]
  };
  let snippet = {
    "title": "test",
    "language_id": 2,
    "tags": [
      1, 3
    ],
    "snippet": "<?php echo 'hello'; ?>",
    "urls": [
      "https://url-1.com",
      "https://url-2.com",
      "https://url-3.com"
    ]
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight syntax', () => {
    let el_code = fixture.debugElement.query(By.css('ngx-codejar>pre'));
    expect(el_code.children.length).toEqual(4);
    expect(el_code.nativeElement.innerText).toEqual("<?php echo 'hello'; ?>");
  });

  it('should edit title', () => {
    let el_title = fixture.nativeElement.querySelector("header>p");
    let el_title_input = fixture.nativeElement.querySelector("input[placeholder='Snippet name']");
    el_title_input.value = "title test";
    el_title_input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(el_title.innerText).toEqual("title test");
  });

  it('should add remove url', () => {
    let el_url_input = fixture.nativeElement.querySelector("input[placeholder='Add url']");
    let el_url_btn = fixture.nativeElement.querySelector("#add_url");

    el_url_input.value = "url 1";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();
    el_url_input.value = "url 1";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();
    el_url_input.value = "url 2";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();
    el_url_input.value = "url 3";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();

    let el_url_list = fixture.nativeElement.querySelector("#url_list");
    expect(el_url_list.children.length).toEqual(3);
    expect(el_url_list.children[0].querySelector('span').innerText).toEqual("url 1" + "\u2026");
    expect(el_url_list.children[1].querySelector('span').innerText).toEqual("url 2" + "\u2026");
    expect(el_url_list.children[2].querySelector('span').innerText).toEqual("url 3" + "\u2026");

    let el_last_url_remove_btn = el_url_list.children[2].querySelector("a");
    let el_first_url_remove_btn = el_url_list.children[0].querySelector("a");

    el_last_url_remove_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el_url_list.children.length).toEqual(2);
    expect(el_url_list.children[0].querySelector('span').innerText).toEqual("url 1" + "\u2026");
    expect(el_url_list.children[1].querySelector('span').innerText).toEqual("url 2" + "\u2026");

    el_first_url_remove_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el_url_list.children.length).toEqual(1);
    expect(el_url_list.children[0].querySelector('span').innerText).toEqual("url 2" + "\u2026");
  });

  it('should add remove tag', () => {
    let el_tag_select: HTMLSelectElement = fixture.nativeElement.querySelector("#tag");
    let el_tag_btn = fixture.nativeElement.querySelector("#add_tag");

    el_tag_select.value = el_tag_select.options[0].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();
    el_tag_select.value = el_tag_select.options[0].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();
    el_tag_select.value = el_tag_select.options[1].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();
    el_tag_select.value = el_tag_select.options[2].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();


    let el_tag_list = fixture.nativeElement.querySelector("#tag_list");

    expect(el_tag_list.children.length).toEqual(3);
    expect(el_tag_list.children[0].querySelector('a.is-link').innerText).toEqual("general");
    expect(el_tag_list.children[1].querySelector('a.is-link').innerText).toEqual("world");
    expect(el_tag_list.children[2].querySelector('a.is-link').innerText).toEqual("auth");

    let el_last_tag_remove_btn = el_tag_list.children[2].querySelector("a.is-delete");
    let el_first_tag_remove_btn = el_tag_list.children[0].querySelector("a.is-delete");

    el_last_tag_remove_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el_tag_list.children.length).toEqual(2);
    expect(el_tag_list.children[0].querySelector('a.is-link').innerText).toEqual("general");
    expect(el_tag_list.children[1].querySelector('a.is-link').innerText).toEqual("world");

    el_first_tag_remove_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el_tag_list.children.length).toEqual(1);
    expect(el_tag_list.children[0].querySelector('a.is-link').innerText).toEqual("world");
  });

  it('should clear code', () => {
    let el_code = fixture.debugElement.query(By.css('ngx-codejar>pre'));
    expect(el_code.children.length).toEqual(4);
    expect(el_code.nativeElement.innerText).toEqual("<?php echo 'hello'; ?>");
    const el_clear_btn = fixture.nativeElement.querySelector("#clear");
    el_clear_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el_code.children.length).toEqual(0);
    expect(el_code.nativeElement.innerText).toEqual("");
  });

  it('should save snippet', () => {

    spyOn(Object.getPrototypeOf(rest), 'post').and.callFake(fakePost);
    const spyCloseSnippetModal = spyOn<any>(component, 'closeSnippetModal');
    // title

    let el_title_input = fixture.nativeElement.querySelector("input[placeholder='Snippet name']");
    el_title_input.value = "test";
    el_title_input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //language

    let el_lang_select: HTMLSelectElement = fixture.nativeElement.querySelector("#lang");
    el_lang_select.value = el_lang_select.options[1].value;
    el_lang_select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // url

    let el_url_input = fixture.nativeElement.querySelector("input[placeholder='Add url']");
    let el_url_btn = fixture.nativeElement.querySelector("#add_url");

    el_url_input.value = "https://url-1.com";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();
    el_url_input.value = "https://url-2.com";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();
    el_url_input.value = "https://url-3.com";
    el_url_input.dispatchEvent(new Event('input'));
    el_url_btn.click();
    fixture.detectChanges();

    // tag

    let el_tag_select: HTMLSelectElement = fixture.nativeElement.querySelector("#tag");
    let el_tag_btn = fixture.nativeElement.querySelector("#add_tag");

    el_tag_select.value = el_tag_select.options[0].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();
    el_tag_select.value = el_tag_select.options[1].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();
    el_tag_select.value = el_tag_select.options[2].value;
    el_tag_select.dispatchEvent(new Event('change'));
    el_tag_btn.click();
    fixture.detectChanges();

    // save

    const el_clear_btn = fixture.nativeElement.querySelector("#save");
    el_clear_btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //ToDo: check the response and request

    expect(spyCloseSnippetModal).toHaveBeenCalled();

  });


});
