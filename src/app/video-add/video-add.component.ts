import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from '../video-metadata';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {
  videoEntry: VideoMetadata;

  constructor(
    private log: LoggerService
  ) { }

  ngOnInit(): void {
    this.videoEntry = <VideoMetadata>{};
  }

  onSubmit(): void {
    this.log.DEBUG(
      "VideoAddComponent.onSubmit",
      `${JSON.stringify(this.videoEntry)} sent to DB`
    );
  }
}
