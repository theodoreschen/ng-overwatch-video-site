import { Component, OnInit } from '@angular/core';
import { OverwatchHeroes } from '../heroes';
import { Hero } from '../hero';
import { VideoSearchService } from '../video-search.service';
import { LoggerService } from '../logger.service';
import { VideoMetadata } from '../video-metadata';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {
  overwatchHeroes: Hero[] = OverwatchHeroes;
  videoSearchResults: VideoMetadata[] = [];
  selectedHero: string = null;
  startDate: string = null;
  endDate: string = null;

  constructor(
    private log: LoggerService,
    private videoSearch: VideoSearchService,
  ) { }

  ngOnInit (): void {
  }

  onSubmit (): void {
    let query = {
      hero: this.selectedHero,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.log.DEBUG("VideoSearchComponent", `query: ${JSON.stringify(query)}`);
  }

}
