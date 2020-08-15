import { DragAndDropBoxComponent } from './local-tags/drag-and-drop-box/drag-and-drop-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyUriCallbackComponent } from './spotify-uri-callback/spotify-uri-callback.component';
import { LocalTagsComponent } from './local-tags/local-tags.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LikeIconComponent } from './local-tags/icons/like-icon/like-icon.component';
import { RemoveIconComponent } from './local-tags/icons/remove-icon/remove-icon.component';
import { AlbumIconComponent } from './local-tags/icons/album-icon/album-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyUriCallbackComponent,
    LocalTagsComponent,
    DragAndDropBoxComponent,
    LikeIconComponent,
    RemoveIconComponent,
    AlbumIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
