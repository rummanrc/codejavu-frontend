import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Language, Snippet, Tag} from "../../snippet/snippet.component";
import {RestService} from "../../../../services/rest/rest.service";
import {CodeJarContainer} from "../editor/NgxCodeJar.component";
import hljs from "highlight.js";
import {restAPI} from "../../../../constants";

@Component({
  selector: 'app-snippet-create-edit-dialog',
  templateUrl: './snippet-create-edit-dialog.component.html',
  styleUrls: ['./snippet-create-edit-dialog.component.css']
})
export class SnippetCreateEditDialogComponent implements OnChanges {
  @Input() modalActive: boolean = false;
  @Input() languages: Language[] = [];
  @Input() tags: Tag[] = [];
  @Input() snippet?: Snippet;
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();
  title: string = "Untitled";
  langId: number = 0;
  tag: Tag = {id: 0, name: ""};
  tagListMap: Map<string, Tag> = new Map<string, Tag>();
  tagList: Tag[] = [];
  urls: string[] = [];
  code: string = "";

  url: string = "";

  constructor(private _rest: RestService) {
  }

  get isModalActive(): boolean {
    return this.modalActive;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['snippet'] && changes['snippet'].previousValue !== changes['snippet'].currentValue) {
      //No-Op
    }
  }

  saveCodeSnippet(): void {
    const tagIds = this.getTagIds();
    const api = this._rest.url(restAPI.SNIPPETS);
    this._rest.post(api, {
      language_id: this.langId,
      title: this.title,
      snippet: this.code,
      tags: tagIds,
      urls: this.urls
    }).subscribe({
      next: (data) => {
        if (data as Snippet) {
          this.closeSnippetModal();
        }
      },
      error: err => {
        //No-Op
      }
    });
  }

  getTagIds(): number[] {
    let ids: number[] = [];
    this.tagList.forEach((tag) => {
      ids.push(tag.id);
    });
    return ids;
  }

  closeSnippetModal(): void {
    this.modalDeactivateEvent.emit(false);
  }

  clearSnippet(): void {
    this.code = "";
  }

  highlightMethod(editor: CodeJarContainer): void {
    if (editor.textContent !== null && editor.textContent !== undefined) {
      editor.innerHTML = hljs.highlightAuto(editor.textContent).value;
    }
  }

  addUrlList(): void {
    if (!!this.url) {
      this.urls.push(this.url);
      this.urls = [...new Set(this.urls)];
      this.url = "";
    }
  }

  truncate(str: string): string {
    return str.slice(0, 20) + "\u2026";
  }

  removeUrlfromList(str: string): void {
    const index = this.urls.indexOf(str);
    this.urls.splice(index, 1);
  }

  addTagList(): void {
    if (!!this.tag && this.tag.id !== 0) {
      const hash = this.createTagHash(this.tag);
      this.tagListMap.set(hash, this.tag);
      this.populateTagList();
    }
  }

  createTagHash(tag: Tag): string {
    return `${tag.id}${tag.name}`;
  }

  removeTagFromTagList(tag: Tag): void {
    this.tagListMap.delete(this.createTagHash(tag));
    this.populateTagList();
  }

  private populateTagList(): void {
    this.tagList = [];
    this.tagListMap.forEach((value: Tag) => {
      this.tagList.push(value);
    });
  }
}
