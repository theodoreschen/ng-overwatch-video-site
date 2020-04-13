import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { VideoMetadata } from './video-metadata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dbUrl } from './external-urls';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private dbUrl = dbUrl;
  jsonHttpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

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
            this.log.DEBUG('VideoService.getVideosBySearch', `retrieved video URL: ${video.video_url}`);
          });
        }),
        catchError(this.handleError<VideoMetadata[]>('VideoService.getVideosBySearch'))
      );
  }

  getVideosByTag (tag: string): Observable<VideoMetadata[]> {
    let query = {"label": tag};
    return this.http.get<VideoMetadata[]>(`${this.dbUrl}/retrieve/tag`, {params: query})
    .pipe(
      tap((retrievedVideos: VideoMetadata[]) => {
        retrievedVideos.forEach( video => {
          this.log.DEBUG('VideoService.getVideosByTag', `retrieved video URL: ${video.video_url}`);
        });
      }),
      catchError(this.handleError<VideoMetadata[]>('VideoService.getVideosByTag'))
    );
  }

  updateVideo (updatedVideo: VideoMetadata): Observable<any> {
    return this.http.post(`${this.dbUrl}/update-db`, updatedVideo, this.jsonHttpOptions)
      .pipe(
        tap(_ => this.log.DEBUG("VideoService.updateVideo", `Updating ${JSON.stringify(updatedVideo)}`)),
        catchError(this.handleError<any>("VideoService.updateVideo"))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log.ERROR(operation, `Failed with error '${error.message}'`);
      return of(result as T);
    };
  }
}
