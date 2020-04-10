import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { VideoUpdateComponent } from './video-update/video-update.component';
import { VideoAddComponent } from './video-add/video-add.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoViewerComponent,
    VideoUpdateComponent,
    VideoAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
