import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';
import { VideoSearchCacheService } from '../video-search-cache.service';

@Component({
  selector: 'app-video-update',
  templateUrl: './video-update.component.html',
  styleUrls: ['./video-update.component.css']
})
export class VideoUpdateComponent implements OnInit {
  selectedVideo: VideoMetadata;
  videoSearchResults: VideoMetadata[];

  constructor(
    private log: LoggerService,
    private videoSearchCache: VideoSearchCacheService,
  ) { }

  ngOnInit(): void {
    this.videoSearchResults = this.videoSearchCache.cachedResults;
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoUpdateComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
  }
}
