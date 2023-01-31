import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
// import hljs from "highlight.js";
import {CodeJar} from "codejar";
import {Position} from "codejar/codejar";

// import {withLineNumbers} from "codejar/linenumbers";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-codejar',
  templateUrl: './NgxCodeJar.component.html',
  styleUrls: ['./NgxCodeJar.component.css']
})
export class NgxCodeJarComponent implements AfterViewInit {
  @Output() update: EventEmitter<string>;
  @Output() codeChange = new EventEmitter<string>();
  @Input() highlighter: 'prism' | 'hljs' = 'hljs';
  @ViewChild('editor') editor: ElementRef | undefined;

  // @Input() showLineNumbers = false;
  // Events
  /**
   * is triggered after highlighting
   */
  private codeJar: CodeJar | undefined;
  private _code = '';

  constructor() {
    this.update = new EventEmitter<string>();
  }

  @Input() set code(value: string) {
    if (this._code !== value) {
      this._code = value;
      this.updateCode(value);
    }
  }

  @Input() highlightMethod: (editor: CodeJarContainer, pos?: Position)=> void = () => {
  };


  ngAfterViewInit(): void {
    if (this.editor !== undefined) {

      // const highlightMethod = (this.showLineNumbers) ? withLineNumbers(this.highlightMethod) : this.highlightMethod;

      this.codeJar = CodeJar(this.editor.nativeElement, this.highlightMethod, {tab: '\t'});
      this.codeJar.onUpdate((newCode: string) => {
        this._code = newCode;
        this.codeChange.emit(newCode);
        this.update.emit(newCode);
      });
      this.updateCode(this._code);
      this.update.emit(this._code);
    }
  }

  public updateCode(newCode: string): void {
    if (this.codeJar) {
      this.codeJar.updateCode(newCode);
    }
  }
}

export interface CodeJarContainer extends HTMLElement {
  textContent: string | null;
}
