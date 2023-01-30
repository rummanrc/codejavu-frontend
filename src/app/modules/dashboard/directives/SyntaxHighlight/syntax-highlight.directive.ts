import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import hljs from "highlight.js";

@Directive({
  selector: '[appSyntaxHighlight]'
})
export class SyntaxHighlightDirective implements OnChanges{
  @Input() code: string|undefined;
  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['code'].currentValue){
      const code = changes['code'].currentValue
      const html =  hljs.highlightAuto(code).value;
      this.el.nativeElement.innerHTML = html;
    }
  }

}
