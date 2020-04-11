import { TestBed } from '@angular/core/testing';

import { VideoSearchCacheService } from './video-search-cache.service';

describe('VideoSearchCacheService', () => {
  let service: VideoSearchCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSearchCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
