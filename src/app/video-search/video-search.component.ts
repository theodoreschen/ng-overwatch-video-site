import { Component, OnInit } from '@angular/core';
import { OverwatchHeroes } from '../heroes';
import { Hero } from '../hero';
import { VideoSearchService } from '../video-search.service';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {
  overwatchHeroes: Hero[] = OverwatchHeroes;
  videoSearchResults = [];

  constructor(private videoSearch: VideoSearchService ) { }

  ngOnInit(): void {
  }

}
