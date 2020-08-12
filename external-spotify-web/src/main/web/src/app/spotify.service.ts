import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Id3Tag } from './id3-tag-parser.service';
import { Injectable } from '@angular/core';
import { SpotifyTrack } from './local-tags/spotify-track.model';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  public getTrackFromSpotify(id3Tag: Id3Tag) {
    return this.http
      .post<any[]>('/track', id3Tag)
      .pipe(
        map((response) =>
          response.map(
            (item) =>
              new SpotifyTrack(
                item.album,
                item.albumId,
                item.title,
                item.trackId,
                item.year,
                item.artists,
                item.url
              )
          )
        )
      );
  }
}
