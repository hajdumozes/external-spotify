import { MaterialModule } from './material/material.module';
import { DragAndDropBoxComponent } from './local-tags/drag-and-drop-box/drag-and-drop-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpotifyUriCallbackComponent } from './spotify-uri-callback/spotify-uri-callback.component';
import { LocalTagsComponent } from './local-tags/local-tags.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LikeIconComponent } from './local-tags/icons/like-icon/like-icon.component';
import { RemoveIconComponent } from './local-tags/icons/remove-icon/remove-icon.component';
import { AlbumIconComponent } from './local-tags/icons/album-icon/album-icon.component';
import { FollowArtistIconComponent } from './local-tags/icons/follow-artist-icon/follow-artist-icon.component';
import { ExactMatchesTableComponent } from './local-tags/tables/exact-matches-table/exact-matches-table.component';
import { MultipleResultsTableComponent } from './local-tags/tables/multiple-results-table/multiple-results-table.component';
import { NoResultsTableComponent } from './local-tags/tables/no-results-table/no-results-table.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import {
  PlaylistIconComponent,
  PlaylistModal,
} from './local-tags/icons/playlist-icon/playlist-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyUriCallbackComponent,
    LocalTagsComponent,
    DragAndDropBoxComponent,
    LikeIconComponent,
    RemoveIconComponent,
    AlbumIconComponent,
    FollowArtistIconComponent,
    ExactMatchesTableComponent,
    MultipleResultsTableComponent,
    NoResultsTableComponent,
    PlaylistIconComponent,
    PlaylistModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
