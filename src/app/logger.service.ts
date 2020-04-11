import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  // Level 5 (debug) to 1 (critical)
  private logLevel: number = 5;
  levels = [
    {name: "DEBUG", value: 5},
    {name: "INFO", value: 4},
    {name: "WARN", value: 3},
    {name: "ERROR", value: 2},
    {name: "CRIT", value: 1}
  ];

  constructor() { }

  private fmtMessage (ngSchematic: string, message: string) {
    console.log(`[${new Date()}] - ${ngSchematic} - ${message}`);
  }

  DEBUG (ngSchematic: string, message: string) {
    if (this.logLevel > 4) this.fmtMessage(ngSchematic, message);
  }

  INFO (ngSchematic: string, message: string) {
    if (this.logLevel > 3) this.fmtMessage(ngSchematic, message);
  }

  WARN (ngSchematic: string, message: string) {
    if (this.logLevel > 2) this.fmtMessage(ngSchematic, message);
  }

  ERROR (ngSchematic: string, message: string) {
    if (this.logLevel > 1) this.fmtMessage(ngSchematic, message);
  }

  CRIT (ngSchematic: string, message: string) {
    if (this.logLevel > 0) this.fmtMessage(ngSchematic, message);
  }

  setLevel (level: number) {
    this.logLevel = level;
    console.log(`global log level: ${this.logLevel}`);
  }
}
