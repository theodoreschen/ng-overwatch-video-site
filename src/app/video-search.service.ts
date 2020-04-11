import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { VideoMetadata } from './video-metadata';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoSearchService {
  private dbUrl = "http://localhost:5000";

  constructor(
    private log: LoggerService,
    private http: HttpClient
  ) { }

  getVideosBySearch (startDate: string, endDate: string, hero: string): Observable<VideoMetadata[]> {
    let query = {
      "start_date": startDate? startDate : '',
      "end_date": endDate? endDate : '',
      "hero": hero? hero : ''
    };
    return this.http.get<VideoMetadata[]>(`${this.dbUrl}/retrieve`, {params: query})
      .pipe(
        tap((retrievedVideos: VideoMetadata[]) => {
          retrievedVideos.forEach( video => {
            this.log.DEBUG('VideoSearchService.getVideosBySearch', `retrieved video URL: ${video.video_url}`);
          });
        }),
        catchError(this.handleError<VideoMetadata[]>('VideoSearchService.getVideosBySearch'))
      );
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log.ERROR(operation, `Failed with error '${error.message}'`);
      return of(result as T);
    };
  }
}
