import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let mockLogService;
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    mockLogService = jasmine.createSpyObj(["develMode"]);

    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
  }));

  it('should exist', () => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Debug enabled', () => {
    it('should create logger widget', () => {
      mockLogService.develMode = true;
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      let loggerWidget = fixture.debugElement.query(By.css(".logger-widget"));

      !expect(loggerWidget).toBeNull();
    });
  });
  
  describe('Debug disabled', () => {
    it('should create logger widget', () => {
      mockLogService.develMode = false;
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      let loggerWidget = fixture.debugElement.query(By.css(".logger-widget"));

      expect(loggerWidget).toBeNull();
    });
  });
});
