import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from '../video-metadata';
import { LoggerService } from '../logger.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../video.service';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { dummyVideoCache } from '../dummy-video-cache';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css']
})
export class VideoViewerComponent implements OnInit {
  videoSearchResults: VideoMetadata[];
  selectedVideo: VideoMetadata;
  trustedVideoUrl: SafeResourceUrl;
  isYoutube: boolean = false;
  isVimeo: boolean = false;

  constructor(
    private log: LoggerService,
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private videoSearchCache: VideoSearchCacheService,
  ) { }

  ngOnInit(): void {
    if (!this.log.develMode) this.videoSearchResults = this.videoSearchCache.cachedResults;
    else {
      this.videoSearchResults = dummyVideoCache;
      this.videoSearchCache.cachedResults = dummyVideoCache;
      this.selectedVideo = this.videoSearchResults[0];
    }
  }

  videoSearchByHero (hero: string) {
    this.videoService.getVideosBySearch('', '', hero)
      .subscribe(results => {
        this.videoSearchResults = results;
        this.videoSearchCache.cachedResults = results;
      });
  }

  videoSearchByTag (tag: string) {
    this.videoService.getVideosByTag(tag)
      .subscribe(results => {
        this.videoSearchResults = results;
        this.videoSearchCache.cachedResults = results;
      });
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoViewerComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
    if (this.selectedVideo.video_url.includes("youtube")) {
      this.isYoutube = true;
      this.isVimeo = false;
      this.trustedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.selectedVideo.video_url}?start=3&autoplay=1`
      );
    }
    else if (this.selectedVideo.video_url.includes("vimeo")) {
      this.isYoutube = false;
      this.isVimeo = true;
      this.trustedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.selectedVideo.video_url}?autoplay=1&t=3`
      );
    }
  }  
}
