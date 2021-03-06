import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { VideoUpdateComponent } from './video-update/video-update.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { LoggerWidgetComponent } from './logger-widget/logger-widget.component';

import { NgbCollapseModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoViewerComponent,
    VideoUpdateComponent,
    VideoAddComponent,
    VideoSearchComponent,
    LoggerWidgetComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbPopoverModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
