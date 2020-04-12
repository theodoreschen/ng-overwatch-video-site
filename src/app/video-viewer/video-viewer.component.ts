import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from '../video-metadata';
import { LoggerService } from '../logger.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoSearchService } from '../video-search.service';
import { VideoSearchCacheService } from '../video-search-cache.service';

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
    private videoSearch: VideoSearchService,
    private videoSearchCache: VideoSearchCacheService,
  ) { }

  ngOnInit(): void {
    this.videoSearchResults = this.videoSearchCache.cachedResults;
  }

  videoSearchByHero (hero: string) {
    this.videoSearch.getVideosBySearch('', '', hero)
      .subscribe(results => {
        this.videoSearchResults = results;
        this.videoSearchCache.cachedResults = results;
      });
  }

  videoSearchByTag (tag: string) {
    
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoVewerComponent.videoSelectHandler", JSON.stringify(video));
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
        `${this.selectedVideo.video_url}?autoplay=1`
      );
    }
  }  
}
