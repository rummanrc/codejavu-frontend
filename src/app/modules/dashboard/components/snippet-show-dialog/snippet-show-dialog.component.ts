import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {catchError, map, Observable, tap} from "rxjs";
import {RestAPIs} from "../../../../services/rest/restAPIs";
import {RestService} from "../../../../services/rest/rest.service";
import {Snippet} from "../../snippet/snippet.component";
@Component({
  selector: 'app-snippet-show-dialog',
  templateUrl: './snippet-show-dialog.component.html',
  styleUrls: ['./snippet-show-dialog.component.css']
})
export class SnippetCreateDialogComponent {
  @Input() modalActive: boolean = false;
  @Input() snippet: Snippet = {};
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();

  constructor(private _clipboard: Clipboard, private _rest: RestService) {
  }
  get isModalActive(): boolean {
    return this.modalActive;
  }

  closeSnippetModal(): void {
      this.modalDeactivateEvent.emit(false);
  }
  copyCodeClipboard(): void {
    const pending = this._clipboard.beginCopy(this.snippet.snippet?this.snippet.snippet: "");
    let remainingAttempts = 3;
    const attempt = (): void => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
  }
  deleteCodeSnippet(): void {
    // TODO: delete code snippetss
  }
}
