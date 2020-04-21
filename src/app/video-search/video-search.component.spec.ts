import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSearchComponent } from './video-search.component';
import { VideoService } from '../video.service';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('VideoSearchComponent', () => {
  let mockVideoService, mockVideoSearchCache, mockLog;
  let component: VideoSearchComponent;
  let fixture: ComponentFixture<VideoSearchComponent>;
  const videoData: VideoMetadata[] = [
    <VideoMetadata>{ "description": null, "hero": "widowmaker", "tags": ["#sharpshooter"], "type": "highlight", "video_date": "2018-05-23", "video_title": "20180523_widowmaker", "video_url": "https://www.youtube.com/embed/Tk_S1nlAvyY", "youtube_iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Tk_S1nlAvyY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" },
    <VideoMetadata>{ "description": "Popped off, then stole the kill from my ulting Doomfist teammate. This (along with an earlier kill) cause the opposing Widow to switch off.", "hero": "widowmaker", "tags": ["#3k", "#killsteal"], "type": "highlight", "video_date": "2019-05-18", "video_title": "20190518_widowmaker", "video_url": "https://www.youtube.com/embed/EOX9BTyf6hY", "youtube_iframe": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/EOX9BTyf6hY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" }
  ];

  beforeEach(async(() => {
    mockVideoService = jasmine.createSpyObj(["getVideosBySearch"]);
    mockVideoSearchCache = jasmine.createSpyObj(["cachedResults"]);
    mockLog = jasmine.createSpyObj(["DEBUG"]);

    TestBed.configureTestingModule({
      declarations: [VideoSearchComponent],
      providers: [
        { provide: VideoService, useValue: mockVideoService },
        { provide: VideoSearchCacheService, useValue: mockVideoSearchCache },
        { provide: LoggerService, useValue: mockLog }
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    mockVideoSearchCache.cachedResults.and.returnValue([]);
    fixture = TestBed.createComponent(VideoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.videoSearchResults.length).toEqual(0);
  });

  it('should populate with cached results', () => {
    mockVideoSearchCache.cachedResults = videoData;
    fixture = TestBed.createComponent(VideoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    

    expect(component.videoSearchResults.length).toEqual(2);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      mockVideoSearchCache.cachedResults = [];
      fixture = TestBed.createComponent(VideoSearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should populate with search results', () => {
      mockVideoService.getVideosBySearch.and.returnValue(of(videoData));
      let startDate = fixture.debugElement.query(By.css("#start-date"));
      let endDate = fixture.debugElement.query(By.css("#end-date"));
      let hero = fixture.debugElement.query(By.css("#hero-select"));

      startDate.nativeElement.value = "2017-01-01";
      endDate.nativeElement.value = "2020-04-20";
      hero.nativeElement.value = "widowmaker";
      fixture.detectChanges();

      let submitButton = fixture.debugElement.query(By.css("form"));
      submitButton.triggerEventHandler("ngSubmit", null);

      expect(component.videoSearchResults.length).toEqual(2);
      expect(mockVideoSearchCache.cachedResults.length).toEqual(2);
    });
  });

  describe('selectVideo', () => {
    beforeEach(() => {
      mockVideoSearchCache.cachedResults = videoData;
      fixture = TestBed.createComponent(VideoSearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit when video is selected', () => {
      spyOn(component.videoSelectEvent, "emit");
      let videoSearchEntries = fixture.debugElement.queryAll(By.css("ul.video-search-entries li a"));

      videoSearchEntries[0].triggerEventHandler("click", null);
  
      expect(component.videoSelectEvent.emit).toHaveBeenCalledWith(videoData[0]);
    });
  });
});
