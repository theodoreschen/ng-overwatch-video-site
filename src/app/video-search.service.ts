import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoSearchService {
  private dbUrl = "http://localhost:5000";

  constructor() { }
}
