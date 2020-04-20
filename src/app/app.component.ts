import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  debugEnabled: boolean;

  constructor(private logService: LoggerService) { }

  ngOnInit() {
    this.debugEnabled = this.logService.develMode;
  }

  // Bind to the class attribute of the nav-links for CSS styling
}
