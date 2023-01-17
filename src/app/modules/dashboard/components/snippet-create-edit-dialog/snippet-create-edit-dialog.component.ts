import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Language, Snippet, Tag} from "../../snippet/snippet.component";
import {CodeSyntaxService} from "../../services/code-syntax.service";
import {RestService} from "../../../../services/rest/rest.service";
import {RestAPIs} from "../../../../services/rest/restAPIs";

@Component({
  selector: 'app-snippet-create-edit-dialog',
  templateUrl: './snippet-create-edit-dialog.component.html',
  styleUrls: ['./snippet-create-edit-dialog.component.css']
})
export class SnippetCreateEditDialogComponent implements OnChanges{
  @Input() modalActive: boolean = false;
  @Input() languages: Language[] = [];
  @Input() tags: Tag[] = [];
  @Input() snippet: Snippet = {}
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();
  title: string = "Untitled";
  langId: number = 0;
  tagIds: number[] = [];
  urls: string[] = [];
  code: string = "";
  constructor(private _codeSyntax: CodeSyntaxService, private _rest: RestService) {
  }

  get isModalActive(): boolean {
    return this.modalActive;
  }

  saveCodeSnippet(): void {
    this.code = this._codeSyntax.getCodeStr();
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
    // TODO: clear code snippets
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
