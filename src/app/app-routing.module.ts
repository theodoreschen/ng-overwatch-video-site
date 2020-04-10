import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { VideoUpdateComponent } from './video-update/video-update.component';
import { VideoAddComponent } from './video-add/video-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/video-viewer', pathMatch: 'full' },
  { path: 'video-viewer', component: VideoViewerComponent },
  { path: 'video-update', component: VideoUpdateComponent },
  { path: 'video-add', component: VideoAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
