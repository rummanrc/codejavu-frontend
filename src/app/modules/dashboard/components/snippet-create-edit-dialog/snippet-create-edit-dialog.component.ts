import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Language, Snippet, Tag} from "../../snippet/snippet.component";
import {RestService} from "../../../../services/rest/rest.service";
import {RestAPIs} from "../../../../services/rest/restAPIs";
import {CodeJarContainer} from "../editor/NgxCodeJar.component";
import hljs from "highlight.js";

@Component({
  selector: 'app-snippet-create-edit-dialog',
  templateUrl: './snippet-create-edit-dialog.component.html',
  styleUrls: ['./snippet-create-edit-dialog.component.css']
})
export class SnippetCreateEditDialogComponent implements OnChanges {
  @Input() modalActive: boolean = false;
  @Input() languages: Language[] = [];
  @Input() tags: Tag[] = [];
  @Input() snippet?: Snippet
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();
  title: string = "Untitled";
  langId: number = 0;
  tagIds: number[] = [];
  urls: string[] = [];
  code: string = "";

  constructor(private _rest: RestService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['snippet'] && changes['snippet'].previousValue !== changes['snippet'].currentValue){
      //No-Op
    }
  }

  get isModalActive(): boolean {
    return this.modalActive;
  }

  saveCodeSnippet(): void {
    const api = this._rest.url(RestAPIs.SNIPPETS);
    this._rest.post(api, { language_id: this.langId,
      title:this.title,
      snippet: this.code,
      tags: this.tagIds,
      urls: this.urls
    }).subscribe( {
      next: (data) => {
        if(data as Snippet){
          this.closeSnippetModal();
        }
      },
      error: err => {
        //No-Op
      }
    })
  }

  closeSnippetModal(): void {
    this.modalDeactivateEvent.emit(false);
  }

  clearSnippet(): void {
    this.code = "";
  }
  highlightMethod(editor: CodeJarContainer): void {
    if( editor.textContent!== null && editor.textContent !== undefined){
      editor.innerHTML = hljs.highlightAuto(editor.textContent).value;
    }
  }
}
