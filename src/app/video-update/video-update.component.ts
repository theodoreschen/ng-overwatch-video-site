import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { VideoMetadata, initializeVideoMetadata } from '../video-metadata';
import { VideoSearchCacheService } from '../video-search-cache.service';
import { dummyVideoCache } from '../dummy-video-cache';
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
  deleteCardIsCollapsed: boolean;

  constructor(
    private log: LoggerService,
    private videoService: VideoService,
    private videoSearchCache: VideoSearchCacheService,
  ) { }

  ngOnInit(): void {
    this.deleteCardIsCollapsed = true;
    this.overwatchHeroes = OverwatchHeroes;
    /**Actual Code */
    if (!this.log.develMode) this.videoSearchResults = this.videoSearchCache.cachedResults;
    /**Dummy code so I don't have to keep running queries */
    else {
      this.videoSearchResults = dummyVideoCache;
      this.videoSearchCache.cachedResults = dummyVideoCache;
      this.selectedVideo = this.videoSearchResults[0];
    }
  }

  onSubmit(): void {
    this.log.DEBUG(
      "VideoUpdateComponent.onSubmit",
      JSON.stringify(this.selectedVideo)
    );
    this.videoService.updateVideo(this.selectedVideo)
      .subscribe(() => {
        /**Refresh the appropriate entry in this.videoSearchResults
         * and this.videoSearchCache by this.videoSearch.getVideoByUrl()
         */
        this.videoService.getVideoByUrl(this.selectedVideo.video_url)
          .subscribe(result => {
            /**Should only be one result */
            if (result.length !== 1) {
              this.log.WARN("VideoUpdateComponent.onSubmit", "Multiple results returned when only one was expected");
              result.forEach(entry => {
                this.log.WARN("VideoUpdateComponent.onSubmit", `URL Query fetched result: ${JSON.stringify(entry)}`);
              });
            }
            let idx = this.videoSearchResults.findIndex(value => value.video_url === this.selectedVideo.video_url);
            this.videoSearchResults[idx] = result[0];
            idx = this.videoSearchCache.cachedResults.findIndex(value => value.video_url === this.selectedVideo.video_url);
            this.videoSearchCache.cachedResults[idx] = result[0];
          });
        // clear selectedVideo
        this.selectedVideo = initializeVideoMetadata();
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

  videoSelectHandler(video: VideoMetadata): void {
    this.log.DEBUG("VideoUpdateComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
  }

  deleteVideo(url: string): void {
    this.log.DEBUG("VideoUpdateComponent.deleteVideo", `Deleting ${url}`);
    this.videoService.deleteVideoByUrl(url).subscribe(() => {
      // Cleaning up search results and cached results without doing another query
      let idx = this.videoSearchResults.findIndex(value => value.video_url === this.selectedVideo.video_url);
      this.videoSearchResults.splice(idx, 1);
      idx = this.videoSearchCache.cachedResults.findIndex(value => value.video_url === this.selectedVideo.video_url);
      this.videoSearchCache.cachedResults.splice(idx, 1);
      this.selectedVideo = initializeVideoMetadata();
      this.deleteCardIsCollapsed = true;
    });
  }
}
