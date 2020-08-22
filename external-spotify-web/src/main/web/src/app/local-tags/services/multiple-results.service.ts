import { TrackService } from './track.service';
import { SpotifyTrack } from './../models/spotify-track.model';
import { BehaviorSubject } from 'rxjs';
import { ObjectMapperService } from './../../object-mapper.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MultipleResultsService implements TrackService {
  private multipleResultsSubject = new BehaviorSubject<SpotifyTrack[]>(
    this.getFromStorage()
  );
  public multipleResult = this.multipleResultsSubject.asObservable();

  constructor(private objectMapperService: ObjectMapperService) {}

  getFromStorage() {
    const multipleResultData = JSON.parse(
      localStorage.getItem('multipleResults')
    );
    return multipleResultData
      ? this.objectMapperService.mapToSpotifyTrackArray(multipleResultData)
      : [];
  }

  updateStorage(tracks: SpotifyTrack[]) {
    this.multipleResultsSubject.next(tracks);
    localStorage.setItem(
      'multipleResults',
      JSON.stringify(this.multipleResultsSubject.getValue())
    );
  }
}
