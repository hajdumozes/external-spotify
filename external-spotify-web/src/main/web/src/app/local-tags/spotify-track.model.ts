import { SpotifyArtist } from './spotify-artist.model';
import { UniqueObject } from './unique-object';
export class SpotifyTrack implements UniqueObject {
  constructor(
    public album: string,
    public albumId: string,
    public title: string,
    public trackId: string,
    public year: number,
    public artists: SpotifyArtist[],
    public url: string,
    public liked: boolean = false,
    public albumSaved: boolean = false
  ) {}
  get artistNames() {
    return this.artists.map((artist) => artist.name);
  }

  get artistsFollowed() {
    return this.artists.every((artist) => artist.followed);
  }

  getId() {
    return this.trackId;
  }
}
