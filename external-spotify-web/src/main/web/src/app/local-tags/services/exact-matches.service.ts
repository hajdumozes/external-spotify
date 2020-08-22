import { TrackService } from './track.service';
import { ObjectMapperService } from './../../object-mapper.service';
import { SpotifyTrack } from './../models/spotify-track.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExactMatchesService implements TrackService {
  private exactMatchesSubject = new BehaviorSubject<SpotifyTrack[]>(
    this.getFromStorage()
  );
  public exactMatches = this.exactMatchesSubject.asObservable();
  constructor(private objectMapperService: ObjectMapperService) {}

  getFromStorage() {
    const exactMatchesData = JSON.parse(localStorage.getItem('exactMatches'));
    return exactMatchesData
      ? this.objectMapperService.mapToSpotifyTrackArray(exactMatchesData)
      : [];
  }

  updateStorage(tracks: SpotifyTrack[]) {
    this.exactMatchesSubject.next(tracks);
    localStorage.setItem(
      'exactMatches',
      JSON.stringify(this.exactMatchesSubject.getValue())
    );
  }
}
