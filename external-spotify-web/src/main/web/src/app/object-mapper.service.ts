import { AuthResponseDataStorage } from './auth/auth.service';
import { User } from './auth/user.model';
import { Id3Tag } from './local-tags/id3-tag.model';
import { SpotifyTrack } from './local-tags/spotify-track.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectMapperService {
  constructor() {}

  public mapToSpotifyTrack(track: SpotifyTrack) {
    return new SpotifyTrack(
      track.album,
      track.albumId,
      track.title,
      track.trackId,
      track.year,
      track.artists,
      track.url,
      track.uri,
      track.previewUrl
    );
  }

  public mapToSpotifyTrackArray(array: SpotifyTrack[]) {
    return array.map((track) => this.mapToSpotifyTrack(track));
  }

  public mapToId3Tag(tag: Id3Tag) {
    return new Id3Tag(
      tag.album,
      tag.albumArtist,
      tag.artist,
      tag.artists,
      tag.year,
      tag.title
    );
  }

  public mapToId3TagArray(array: Id3Tag[]) {
    return array.map((tag) => this.mapToId3Tag(tag));
  }

  public mapStorageDataToUser(data: AuthResponseDataStorage) {
    return new User(
      data._accessToken,
      data._refreshToken,
      data._tokenExpirationDate
    );
  }
}
