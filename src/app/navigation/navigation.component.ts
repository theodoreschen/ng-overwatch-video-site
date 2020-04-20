import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  debugEnabled: boolean;

  constructor(private logService: LoggerService) { }

  ngOnInit(): void {
    this.debugEnabled = this.logService.develMode;
  }

}
