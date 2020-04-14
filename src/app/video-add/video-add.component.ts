import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from '../video-metadata';
import { LoggerService } from '../logger.service';
import { Hero } from '../hero';
import { OverwatchHeroes } from '../heroes';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {
  overwatchHeroes: Hero[];
  videoEntry: VideoMetadata;

  constructor(
    private log: LoggerService
  ) { }

  ngOnInit(): void {
    this.videoEntry = <VideoMetadata>{};
    this.overwatchHeroes = OverwatchHeroes;
  }

  onSubmit(): void {
    this.log.DEBUG(
      "VideoAddComponent.onSubmit",
      `${JSON.stringify(this.videoEntry)} sent to DB`
    );
  }
}
