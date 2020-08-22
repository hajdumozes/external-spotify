import { ObjectMapperService } from './../../object-mapper.service';
import { SpotifyPlaylist } from './../models/spotify-playlist.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlistsSubject = new BehaviorSubject<SpotifyPlaylist[]>(
    this.getFromStorage()
  );
  public playlists = this.playlistsSubject.asObservable();
  constructor(private objectMapperService: ObjectMapperService) {}

  getFromStorage() {
    const exactMatchesData = JSON.parse(localStorage.getItem('playlists'));
    return exactMatchesData
      ? this.objectMapperService.mapToSpotifyPlaylistArray(exactMatchesData)
      : [];
  }

  updateStorage(playlists: SpotifyPlaylist[]) {
    this.playlistsSubject.next(playlists);
    localStorage.setItem(
      'playlists',
      JSON.stringify(this.playlistsSubject.getValue())
    );
  }
}
