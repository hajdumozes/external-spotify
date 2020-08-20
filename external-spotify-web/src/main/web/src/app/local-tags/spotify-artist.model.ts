import { UniqueObject } from './unique-object';
export class SpotifyArtist implements UniqueObject {
  constructor(
    public name: string,
    public id: string,
    public followed: boolean = false
  ) {}

  getId() {
    return this.id;
  }
}
