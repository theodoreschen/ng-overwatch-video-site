import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerWidgetComponent } from './logger-widget.component';
import { By } from '@angular/platform-browser';
import { LoggerService } from '../logger.service';

describe('LoggerWidgetComponent', () => {
  let mockLogService: any;
  let component: LoggerWidgetComponent;
  let fixture: ComponentFixture<LoggerWidgetComponent>;

  beforeEach(async(() => {
    mockLogService = jasmine.createSpyObj(["setLevel"]);

    TestBed.configureTestingModule({
      declarations: [LoggerWidgetComponent],
      providers: [
        { provide: LoggerService, useValue: mockLogService }
      ]
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

  describe('setGlobalLogLevel', () => {
    it('should set global log level to correct level', () => {
      let loggerWidget = fixture.debugElement.query(By.css("#log-level-setter"));
      loggerWidget.triggerEventHandler("ngModelChange", "3")
      fixture.detectChanges();

      expect(mockLogService.setLevel).toHaveBeenCalledWith(3);
    });
  });
});
