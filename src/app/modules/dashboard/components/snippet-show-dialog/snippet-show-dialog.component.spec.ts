import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetCreateDialogComponent } from './snippet-show-dialog.component';

describe('SnippetCreateDialogComponent', () => {
  let component: SnippetCreateDialogComponent;
  let fixture: ComponentFixture<SnippetCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
