import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { VideoUpdateComponent } from './video-update/video-update.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoSearchComponent } from './video-search/video-search.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoViewerComponent,
    VideoUpdateComponent,
    VideoAddComponent,
    VideoSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
