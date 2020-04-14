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
  newTagValue: string;
  videoEntry: VideoMetadata;

  constructor(
    private log: LoggerService
  ) { }

  ngOnInit(): void {
    this.videoEntry = <VideoMetadata>{tags: []};
    this.overwatchHeroes = OverwatchHeroes;
  }

  addTag(): void {
    if (!this.newTagValue.startsWith("#")) this.newTagValue = `#${this.newTagValue}`;
    if (this.videoEntry.tags.findIndex(value => value === this.newTagValue) === -1) {
      this.log.DEBUG("VideoAddComponent.addTag", `Adding tag "${this.newTagValue}"`);
      this.videoEntry.tags.push(this.newTagValue);
    } else {
      this.log.DEBUG("VideoAddComponent.addTag", `Tag "${this.newTagValue}" already exists`);
    }
    this.newTagValue = null;
  }

  removeTag(index: number): void {
    this.log.DEBUG("VideoAddComponent.removeTag", `Removing tag at ${index}`);
    this.videoEntry.tags.splice(index, 1);
  }

  clearForm(): void {
    this.videoEntry = <VideoMetadata>{tags: []};
  }

  onSubmit(): void {
    this.log.DEBUG(
      "VideoAddComponent.onSubmit",
      `${JSON.stringify(this.videoEntry)} sent to DB`
    );
    this.clearForm();
  }
}
