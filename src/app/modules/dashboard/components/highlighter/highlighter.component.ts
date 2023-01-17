import {Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import hljs from 'highlight.js'

@Component({
  selector: 'highlight, [highlight]',
  templateUrl: './highlighter.component.html',
  styleUrls: ['./highlighter.component.css']
})
export class HighlighterComponent implements OnChanges {
  @Input() code: string|undefined;
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['code'].currentValue){
        const code = changes['code'].currentValue
        const html =  hljs.highlightAuto(code).value;
        this.el.nativeElement.innerHTML = html;
    }
  }

}
