import { Id3Tag } from './id3-tag.model';
import { SpotifyTrack } from './spotify-track.model';
export interface TrackService {
  getFromStorage(): SpotifyTrack[] | Id3Tag[];
  updateStorage(tracks: SpotifyTrack[] | Id3Tag[]): void;
}
