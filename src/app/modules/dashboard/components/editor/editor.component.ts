import {Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, Output, SimpleChanges} from '@angular/core';
import hljs from "highlight.js";
import {CodeJar} from "codejar";
import {CodeSyntaxService} from "../../services/code-syntax.service";
@Component({
  selector: 'editor, [editor]',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  private _codeJar: CodeJar;
  code: string = ""
  constructor(private el: ElementRef, private _codeSyntaxService: CodeSyntaxService) {

    _codeSyntaxService.getCodeStrObservable().subscribe( {
      next: (code) => {
        this.code = code;
      }
    })
    this._codeJar = CodeJar(this.el.nativeElement, this.highlighter());

    this._codeJar.onUpdate( code => {
      _codeSyntaxService.setCodeStr(code);
    })
  }

  private highlighter() {
    return (editor: HTMLElement) => {
      const html =  hljs.highlightAuto(this.code).value;
      editor.innerHTML = html
    };
  }
}
