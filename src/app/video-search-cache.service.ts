import { Injectable } from '@angular/core';
import { VideoMetadata } from './video-metadata';

@Injectable({
  providedIn: 'root'
})
export class VideoSearchCacheService {
  cachedResults: VideoMetadata[] = [];

  constructor() { }
}
