import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewerComponent } from './video-viewer.component';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
