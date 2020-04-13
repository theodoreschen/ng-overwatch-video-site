import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { dummyVideoCache } from './dummy-video-cache';
import { Hero } from '../hero';
import { OverwatchHeroes } from '../heroes';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-update',
  templateUrl: './video-update.component.html',
  styleUrls: ['./video-update.component.css']
})
export class VideoUpdateComponent implements OnInit {
  overwatchHeroes: Hero[];
  selectedVideo: VideoMetadata;
  videoSearchResults: VideoMetadata[];

  constructor(
    private log: LoggerService,
    private videoService: VideoService,
    private videoSearchCache: VideoSearchCacheService,
  ) { }

  ngOnInit(): void {
    this.overwatchHeroes = OverwatchHeroes;
    /**Actual Code */
    // this.videoSearchResults = this.videoSearchCache.cachedResults;
    /**Dummy code so I don't have to keep running queries */
    this.videoSearchResults = dummyVideoCache;
    this.videoSearchCache.cachedResults = dummyVideoCache;
    this.selectedVideo = this.videoSearchResults[0];
  }

  onSubmit(): void {
    this.log.DEBUG(
      "VideoUpdateComponent.onSubmit",
      JSON.stringify(this.selectedVideo)
    );
    this.videoService.updateVideo(this.selectedVideo)
      .subscribe( () => {
        /**TODO: refresh the appropriate entry in this.videoSearchResults
         * and this.videoSearchCache by this.videoSearch.getVideoByUrl()
         */
        this.videoService.getVideoByUrl(this.selectedVideo.video_url)
          .subscribe( result => {
            
          });
        // clear selectedVideo
        this.selectedVideo = <VideoMetadata>{};
      });
  }

  removeTagByIndex(index: number): void {
    this.log.DEBUG(
      "VideoUpdateComponent.removeTagByIndex",
      `Removing tag at ${index}`
    );
    this.selectedVideo.tags.splice(index, 1);
  }

  newTagValue: string;
  addNewTag(): void {
    if (!this.newTagValue.startsWith("#")) this.newTagValue = `#${this.newTagValue}`;
    if (this.selectedVideo.tags.findIndex(value => value === this.newTagValue) === -1) {
      this.log.DEBUG("VideoUpdateComponent.addNewTag", `Adding tag "${this.newTagValue}"`);
      this.selectedVideo.tags.push(this.newTagValue);
    } else {
      this.log.DEBUG("VideoUpdateComponent.addNewTag", `Tag "${this.newTagValue} already exists`);
    }
    this.newTagValue = null;
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoUpdateComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
  }
}
