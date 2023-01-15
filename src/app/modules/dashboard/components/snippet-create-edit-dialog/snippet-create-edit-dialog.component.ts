import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Snippet } from "../../snippet/snippet.component";

@Component({
  selector: 'app-snippet-create-edit-dialog',
  templateUrl: './snippet-create-edit-dialog.component.html',
  styleUrls: ['./snippet-create-edit-dialog.component.css']
})
export class SnippetCreateEditDialogComponent {
  @Input() modalActive: boolean = false;
  @Input() snippet: Snippet = {};
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();

  constructor() { }
  get isModalActive(): boolean {
    return this.modalActive;
  }

  saveCodeSnippet(): void {

  }

  closeSnippetModal(): void {
    this.modalDeactivateEvent.emit(false);
  }

  clearSnippet(): void {
    // TODO: clear code snippets
  }
}
