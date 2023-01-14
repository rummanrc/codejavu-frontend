import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-snippet-show-dialog',
  templateUrl: './snippet-show-dialog.component.html',
  styleUrls: ['./snippet-show-dialog.component.css']
})
export class SnippetCreateDialogComponent implements OnInit {
  @Input() modalActive: boolean = false
  @Input() codeStr: string = ""
  @Output() modalDeactivateEvent = new EventEmitter<boolean>();

  private _codeHTML: string = "";
  private _isModalActive: boolean = false;
  constructor(private _clipboard: Clipboard) {
  }
  get codeHTML(): string {
    return this._codeHTML;
  }
  get isModalActive(): boolean {
    return this.modalActive
  }

  closeSnippetModal() {
      this.modalDeactivateEvent.emit(false);
  }
  copyCodeClipboard(){
    const pending = this._clipboard.beginCopy(this.codeStr);
    let remainingAttempts = 3;
    const attempt = () => {
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
  ngOnInit(): void {}

}
