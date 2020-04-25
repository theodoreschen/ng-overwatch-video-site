import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewerComponent } from './video-viewer.component';
import { VideoService } from '../video.service';

describe('VideoViewerComponent', () => {
  let mockVideo: VideoService;
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;

  beforeEach(async(() => {
    mockVideo = jasmine.createSpyObj(["getVideosBySearch", "getVideosByTag"]);

    TestBed.configureTestingModule({
      declarations: [ VideoViewerComponent ],
      providers: [
        { provide: VideoService, useValue: mockVideo }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
