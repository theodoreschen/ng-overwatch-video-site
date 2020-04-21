import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUpdateComponent } from './video-update.component';
import { LoggerService } from '../logger.service';
import { VideoService } from '../video.service';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { VideoMetadata } from '../video-metadata';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('VideoUpdateComponent', () => {
  let mockLog, mockVideo, mockVideoSearchCache;
  let component: VideoUpdateComponent;
  let fixture: ComponentFixture<VideoUpdateComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG", "WARN", "develMode"]);
    // we're not going to test prepopulating with dummy results
    mockLog.develMode = false;
    mockVideo = jasmine.createSpyObj(["updateVideo", "getVideoByUrl", "deleteVideoByUrl"]);
    mockVideo.updateVideo.and.returnValue(of({}));
    mockVideo.deleteVideoByUrl.and.returnValue(of({}));
    mockVideoSearchCache = jasmine.createSpyObj(["cachedResults"]);
    mockVideoSearchCache.cachedResults = [
      <VideoMetadata>{ "description": null, "hero": "widowmaker", "tags": ["#sharpshooter"], "type": "highlight", "video_date": "2018-05-23", "video_title": "20180523_widowmaker", "video_url": "https://www.youtube.com/embed/Tk_S1nlAvyY", "youtube_iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Tk_S1nlAvyY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" },
      <VideoMetadata>{ "description": "Popped off, then stole the kill from my ulting Doomfist teammate. This (along with an earlier kill) cause the opposing Widow to switch off.", "hero": "widowmaker", "tags": ["#3k", "#killsteal"], "type": "highlight", "video_date": "2019-05-18", "video_title": "20190518_widowmaker", "video_url": "https://www.youtube.com/embed/EOX9BTyf6hY", "youtube_iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/EOX9BTyf6hY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" }
    ];

    TestBed.configureTestingModule({
      declarations: [ VideoUpdateComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: VideoService, useValue: mockVideo },
        { provide: VideoSearchCacheService, useValue: mockVideoSearchCache }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pre-populate with cached results', () => {
    expect(component.videoSearchResults.length).toEqual(2);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.selectedVideo = component.videoSearchResults[0];
      component.selectedVideo.description = "dummy comment";
      component.selectedVideo.tags.push("#dummy");
      fixture.detectChanges();
    });

    it('should update search and cached results', () => {
      mockVideo.getVideoByUrl.and.returnValue(of([component.selectedVideo]));

      let submitForm = fixture.debugElement.query(By.css("form"));
      submitForm.triggerEventHandler("ngSubmit", null);

      expect(component.videoSearchResults[0].description).toEqual("dummy comment");
      expect(mockVideoSearchCache.cachedResults[0].tags.length).toEqual(2);
    });
  });
});
