import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-logger-widget',
  templateUrl: './logger-widget.component.html',
  styleUrls: ['./logger-widget.component.css']
})
export class LoggerWidgetComponent implements OnInit {
  levels = [];
  selectedLevel: number;

  constructor(private logService: LoggerService) { }

  ngOnInit(): void {
    this.levels = this.logService.levels;
  }

  setGlobalLogLevel (event: string): void {
    this.logService.setLevel(+event);
  }

}
