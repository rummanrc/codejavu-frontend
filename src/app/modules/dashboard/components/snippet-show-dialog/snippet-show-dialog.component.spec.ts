import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SnippetShowDialogComponent} from './snippet-show-dialog.component';
import {Clipboard, ClipboardModule} from "@angular/cdk/clipboard";

describe('SnippetShowDialogComponent', () => {
  let component: SnippetShowDialogComponent;
  let fixture: ComponentFixture<SnippetShowDialogComponent>;
  let clipboard: Clipboard;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardModule],
      providers: [Clipboard],
      declarations: [SnippetShowDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetShowDialogComponent);
    component = fixture.componentInstance;
    clipboard = TestBed.inject(Clipboard);
    fixture.detectChanges();
    component.snippet = snippet;
    component.modalActive = true;
  });
  let snippet = {
    "id": 2,
    "title": "title 1",
    "language": "java",
    "tags": [
      {
        "id": 1,
        "name": "general"
      }
    ],
    "snippet": "<?php echo \"jjjjjjjjjjjjjj\">",
    "urls": [
      "asdsd"
    ]
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy snippet', () => {
    const spyBeginCopy = spyOn<any>(clipboard,"beginCopy").and.callThrough();
    fixture.detectChanges();
    component.copyCodeClipboard();
    expect(spyBeginCopy).toHaveBeenCalled();
  });
});
