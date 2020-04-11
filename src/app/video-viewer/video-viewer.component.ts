import { Component, OnInit } from '@angular/core';
import { VideoMetadata } from '../video-metadata';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css']
})
export class VideoViewerComponent implements OnInit {
  selectedVideo: VideoMetadata;

  constructor(private log: LoggerService) { }

  ngOnInit(): void {
  }

  videoSelectHandler (video: VideoMetadata) {
    this.log.DEBUG("VideoVewerComponent.videoSelectHandler", JSON.stringify(video));
    this.selectedVideo = video;
  }  
}
