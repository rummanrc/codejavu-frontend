import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetCreateEditDialogComponent } from './snippet-create-edit-dialog.component';

describe('SnippetCreateEditDialogComponent', () => {
  let component: SnippetCreateEditDialogComponent;
  let fixture: ComponentFixture<SnippetCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetCreateEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
