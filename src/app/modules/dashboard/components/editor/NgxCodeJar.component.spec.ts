import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCodeJarComponent } from './NgxCodeJar.component';

describe('NgxCodeJarComponent', () => {
  let component: NgxCodeJarComponent;
  let fixture: ComponentFixture<NgxCodeJarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCodeJarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCodeJarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
