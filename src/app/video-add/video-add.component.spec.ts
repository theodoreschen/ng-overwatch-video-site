import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddComponent } from './video-add.component';
import { VideoService } from '../video.service';
import { LoggerService } from '../logger.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('VideoAddComponent', () => {
  let mockLogService, mockVideoService;
  let component: VideoAddComponent;
  let fixture: ComponentFixture<VideoAddComponent>;

  beforeEach(async(() => {
    mockLogService = jasmine.createSpyObj(["DEBUG"]);
    mockVideoService = jasmine.createSpy();

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ VideoAddComponent ],
      providers: [
        { provide: VideoService, useValue: mockVideoService },
        { provide: LoggerService, useValue: mockLogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('htmlIframeOnBlur', () => {
    it('should do nothing', () => {
      component.videoEntry.video_url = "dummy url";
      component.videoEntry.youtube_iframe = "<invalid iframe tag />";

      const videoIFrameText = fixture.debugElement.query(By.css("#db-form-video-iframe"));
      videoIFrameText.triggerEventHandler("blur", {});
      fixture.detectChanges();

      expect(component.videoEntry.video_url).toEqual("dummy url");
    });

    it('should auto-populate video_url', () => {
      let dummyUrl = "https://youtube.com/embed/dummy"
      let dummyIframe = `<iframe src="${dummyUrl}" dummy-tag
        another-tag="something"></iframe>`;
      component.videoEntry.youtube_iframe = dummyIframe;

      const videoIFrameText = fixture.debugElement.query(By.css("#db-form-video-iframe"));
      videoIFrameText.triggerEventHandler("blur", {});
      fixture.detectChanges();

      expect(component.videoEntry.video_url).toEqual(dummyUrl);
    });
  });
});
