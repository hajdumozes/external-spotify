import { SpotifyTrack } from './local-tags/models/spotify-track.model';
import { SpotifyPlaylist } from './local-tags/models/spotify-playlist.model';
import { ObjectMapperService } from './object-mapper.service';
import { Id3Tag } from './local-tags/id3-tag.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AuthService, AuthResponseData } from './auth/auth.service';

interface SpotifyTracksCredential {
  userCredentials: AuthResponseData;
  tracks: SpotifyTrack[];
}

interface CheckedLikedTracksCredential {
  userCredentials: AuthResponseData;
  liked: boolean[];
}

interface SpotifyPlaylistsCredential {
  userCredentials: AuthResponseData;
  playlists: SpotifyPlaylist[];
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private objectMapperService: ObjectMapperService
  ) {}

  public getTrackFromSpotify(id3Tag: Id3Tag) {
    return this.http.post<SpotifyTracksCredential>('/track', id3Tag).pipe(
      map((response) => {
        const tracks = response.tracks;
        const credentials = response.userCredentials;
        this.authService.saveUserCredentials(credentials);
        return tracks.map((track) =>
          this.objectMapperService.mapToSpotifyTrack(track)
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

  public checkLikedTracks(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<CheckedLikedTracksCredential>('/check-liked-tracks', { params })
      .pipe(
        map((response) => {
          const liked = response.liked;
          const credentials = response.userCredentials;
          this.authService.saveUserCredentials(credentials);
          return liked;
        })
      );
  }

  public checkSavedAlbums(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<CheckedLikedTracksCredential>('/check-saved-albums', { params })
      .pipe(
        map((response) => {
          const liked = response.liked;
          const credentials = response.userCredentials;
          this.authService.saveUserCredentials(credentials);
          return liked;
        })
      );
  }

  public checkFollowedArtists(ids: string) {
    const params = new HttpParams().set('ids', ids);
    return this.http
      .get<CheckedLikedTracksCredential>('/check-followed-artists', { params })
      .pipe(
        map((response) => {
          const liked = response.liked;
          const credentials = response.userCredentials;
          this.authService.saveUserCredentials(credentials);
          return liked;
        })
      );
  }

  public getUserPlaylists() {
    return this.http.get<SpotifyPlaylistsCredential>('/user-playlists').pipe(
      map((response) => {
        const playlists = response.playlists;
        const credentials = response.userCredentials;
        this.authService.saveUserCredentials(credentials);
        return playlists.map(
          (playlist) =>
            new SpotifyPlaylist(playlist.id, playlist.name, playlist.url)
        );
      })
    );
  }

  public addToPlaylist(playlistId: string, trackIds: string) {
    const params = new HttpParams()
      .set('playlistId', playlistId)
      .set('trackIds', trackIds);
    return this.http
      .get<AuthResponseData>('/add-to-playlist', { params })
      .pipe(tap((authResp) => this.authService.saveUserCredentials(authResp)));
  }
}
