import { TrackService } from './track.service';
import { ObjectMapperService } from './../../object-mapper.service';
import { Id3Tag } from './../id3-tag.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoResultsService implements TrackService {
  private noResultsSubject = new BehaviorSubject<Id3Tag[]>(
    this.getFromStorage()
  );
  public noResult = this.noResultsSubject.asObservable();

  constructor(private objectMapperService: ObjectMapperService) {}

  getFromStorage() {
    const noResultData = JSON.parse(localStorage.getItem('noResults'));
    return noResultData
      ? this.objectMapperService.mapToId3TagArray(noResultData)
      : [];
  }

  updateStorage(tags: Id3Tag[]) {
    this.noResultsSubject.next(tags);
    localStorage.setItem(
      'noResults',
      JSON.stringify(this.noResultsSubject.getValue())
    );
  }
}
