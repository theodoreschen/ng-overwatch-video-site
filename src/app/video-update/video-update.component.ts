import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { dummyVideoCache } from './dummy-video-cache';

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
    /**Actual Code */
    // this.videoSearchResults = this.videoSearchCache.cachedResults;
    /**Dummy code so I don't have to keep running queries */
    this.videoSearchResults = dummyVideoCache;
    this.videoSearchCache.cachedResults = dummyVideoCache;
    this.selectedVideo = this.videoSearchResults[0];
  }

  onSubmit(): void {
    this.log.DEBUG("VideoUpdateComponent.onSubmit", JSON.stringify(this.selectedVideo));
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoUpdateComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
  }
}
