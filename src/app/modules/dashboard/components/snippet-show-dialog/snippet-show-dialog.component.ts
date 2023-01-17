import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
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
  @Output() editCodeSnippetEvent = new EventEmitter<Snippet>();

  constructor(private _clipboard: Clipboard) {
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

  editCodeSnippet(): void {
    this.editCodeSnippetEvent.emit(this.snippet);
  }

  deleteCodeSnippet(): void {
    // TODO: delete code snippetss
  }
}
