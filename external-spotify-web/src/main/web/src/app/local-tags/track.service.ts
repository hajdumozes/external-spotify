import { ObjectMapperService } from './../object-mapper.service';
import { HttpClient } from '@angular/common/http';
import { Id3Tag } from './id3-tag.model';
import { SpotifyTrack } from './spotify-track.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  exactMatches = new BehaviorSubject<SpotifyTrack[]>(
    this.getExactMatchesFromStorage()
  );
  multipleResults = new BehaviorSubject<SpotifyTrack[]>(
    this.getMultipleResultsFromStorage()
  );
  noResults = new BehaviorSubject<Id3Tag[]>(this.getNoResultsFromStorage());

  constructor(private objectMapperService: ObjectMapperService) {}

  private getExactMatchesFromStorage() {
    const exactMatchesData = JSON.parse(localStorage.getItem('exactMatches'));
    return exactMatchesData
      ? this.objectMapperService.mapToSpotifyTrackArray(exactMatchesData)
      : [];
  }

  private getMultipleResultsFromStorage() {
    const multipleResultData = JSON.parse(
      localStorage.getItem('multipleResults')
    );
    return multipleResultData
      ? this.objectMapperService.mapToSpotifyTrackArray(multipleResultData)
      : [];
  }

  private getNoResultsFromStorage() {
    const noResultData = JSON.parse(localStorage.getItem('noResults'));
    return noResultData
      ? this.objectMapperService.mapToId3TagArray(noResultData)
      : [];
  }

  public updateExactMatches(tracks: SpotifyTrack[]) {
    this.exactMatches.next(tracks);
    localStorage.setItem(
      'exactMatches',
      JSON.stringify(this.exactMatches.getValue())
    );
  }

  public updateMultipleResults(tracks: SpotifyTrack[]) {
    this.multipleResults.next(tracks);
    localStorage.setItem(
      'multipleResults',
      JSON.stringify(this.multipleResults.getValue())
    );
  }

  public updateNoResults(tags: Id3Tag[]) {
    this.noResults.next(tags);
    localStorage.setItem(
      'noResults',
      JSON.stringify(this.noResults.getValue())
    );
  }
}
