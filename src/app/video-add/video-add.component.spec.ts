import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddComponent } from './video-add.component';
import { VideoService } from '../video.service';
import { LoggerService } from '../logger.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('VideoAddComponent', () => {
  let mockLogService, mockVideoService;
  let component: VideoAddComponent;
  let fixture: ComponentFixture<VideoAddComponent>;

  beforeEach(async(() => {
    mockLogService = jasmine.createSpyObj(["DEBUG"]);
    mockVideoService = jasmine.createSpyObj(["uploadVideo"]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VideoAddComponent],
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
    it('should change nothing', () => {
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

    it('should leave video_url as is', () => {
      let dummyUrl = "https://youtube.com/embed/fakevideo";
      let dummyIframe = `<iframe dummy-tag another-tag="something"></iframe>`;
      component.videoEntry.youtube_iframe = dummyIframe;
      component.videoEntry.video_url = dummyUrl;

      const videoIFrameText = fixture.debugElement.query(By.css("#db-form-video-iframe"));
      videoIFrameText.triggerEventHandler("blur", {});
      fixture.detectChanges();

      expect(component.videoEntry.video_url).toEqual(dummyUrl);
    });
  });

  describe('addTag', () => {
    it("should change nothing", () => {
      component.videoEntry.tags = ["#test1", "#test2", "#test3"];
      component.newTagValue = "test1";

      component.addTag();

      expect(mockLogService.DEBUG).toHaveBeenCalledWith(
        "VideoAddComponent.addTag",
        `Tag "#test1" already exists`
      );
      expect(component.newTagValue).toBeNull();
    });

    it("should add new tag", () => {
      component.videoEntry.tags = ["#test1", "#test2", "#test3"];
      component.newTagValue = "test4";

      component.addTag();

      expect(component.videoEntry.tags.length).toEqual(4);
    });
  });

  describe('removeTag', () => {
    it("should remove specified tag", () => {
      component.videoEntry.tags = ["#test1", "#test2", "#test3"];

      component.removeTag(1);

      expect(component.videoEntry.tags).toEqual(["#test1", "#test3"]);
    });
  });

  describe('clearForm', () => {
    it("should clear form", () => {
      component.videoEntry.tags = ["#test1", "#test2"];
      component.videoEntry.video_url = "https://youtube.com/embed/dummy";

      component.clearForm();

      expect(component.videoEntry.tags.length).toEqual(0);
      expect(component.videoEntry.video_url).toBeNull();
    });
  });

  describe('onSubmit', () => {
    it("should clear form", () => {
      component.videoEntry.video_url = "https://youtube.com/embed/dummy";
      component.videoEntry.hero = "dva";
      component.videoEntry.youtube_iframe = "<iframe />";
      component.videoEntry.video_date = "2020-02-02";
      mockVideoService.uploadVideo.and.returnValue(of({}));
      fixture.detectChanges();

      component.onSubmit();

      expect(component.videoEntry.video_url).toBeNull();
    });
  });
});
