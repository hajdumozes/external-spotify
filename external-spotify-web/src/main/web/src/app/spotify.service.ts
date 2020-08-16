import { Id3Tag } from './local-tags/id3-tag.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { SpotifyTrack } from './local-tags/spotify-track.model';
import { AuthService, AuthResponseData } from './auth/auth.service';

interface SpotifyTracksCredential {
  userCredentials: AuthResponseData;
  tracks: SpotifyTrack[];
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getTrackFromSpotify(id3Tag: Id3Tag) {
    return this.http.post<SpotifyTracksCredential>('/track', id3Tag).pipe(
      map((response) => {
        const tracks = response.tracks;
        const credentials = response.userCredentials;
        this.authService.saveUserCredentials(credentials);
        return tracks.map(
          (track) =>
            new SpotifyTrack(
              track.album,
              track.albumId,
              track.title,
              track.trackId,
              track.year,
              track.artists,
              track.url
            )
        );
      })
    );
  }

  public likeTracks(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<AuthResponseData>('/like-track', { params })
      .pipe(tap((authResp) => this.authService.saveUserCredentials(authResp)));
  }

  public saveAlbums(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<AuthResponseData>('/save-album', { params })
      .pipe(tap((authResp) => this.authService.saveUserCredentials(authResp)));
  }

  public followArtists(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<AuthResponseData>('/follow-artist', { params })
      .pipe(tap((authResp) => this.authService.saveUserCredentials(authResp)));
  }
}
