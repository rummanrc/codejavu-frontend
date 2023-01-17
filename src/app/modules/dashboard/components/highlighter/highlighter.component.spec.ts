import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighterComponent } from './highlighter.component';

describe('HighlighterComponent', () => {
  let component: HighlighterComponent;
  let fixture: ComponentFixture<HighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlighterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
