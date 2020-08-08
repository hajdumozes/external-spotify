import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyUriCallbackComponent } from './spotify-uri-callback/spotify-uri-callback.component';
import { LocalTagsComponent } from './local-tags/local-tags.component';

@NgModule({
  declarations: [AppComponent, SpotifyUriCallbackComponent, LocalTagsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
