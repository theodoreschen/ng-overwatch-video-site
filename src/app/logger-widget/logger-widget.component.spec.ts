import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerWidgetComponent } from './logger-widget.component';

describe('LoggerWidgetComponent', () => {
  let component: LoggerWidgetComponent;
  let fixture: ComponentFixture<LoggerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
