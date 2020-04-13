import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OverwatchHeroes } from '../heroes';
import { Hero } from '../hero';
import { VideoService } from '../video.service';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';
import { VideoSearchCacheService } from '../video-search-cache.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {
  overwatchHeroes: Hero[] = OverwatchHeroes;

  selectedHero: string = null;
  startDate: string = null;
  endDate: string = null;

  @Input() videoSearchResults: VideoMetadata[] = [];
  @Output() videoSelectEvent = new EventEmitter<VideoMetadata>();

  constructor(
    private log: LoggerService,
    private videoService: VideoService,
    private videoSearchCache: VideoSearchCacheService
  ) { }

  ngOnInit (): void {
    this.videoSearchResults = this.videoSearchCache.cachedResults;
  }

  onSubmit (): void {
    this.log.DEBUG(
      "VideoSearchComponent.onSubmit",
      `hero: ${this.selectedHero}; start date: ${this.startDate}; end date: ${this.endDate}`
    );
    this.videoService.getVideosBySearch(this.startDate, this.endDate, this.selectedHero)
      .subscribe(results => {
        this.videoSearchResults = results;
        this.videoSearchCache.cachedResults = results;
      });
  }

  selectVideo (idx: number) {
    this.log.DEBUG("VideoSearchComponent.selectVideo", `index ${idx} selected`);
    this.videoSelectEvent.emit(this.videoSearchResults[idx]);
  } 
}
