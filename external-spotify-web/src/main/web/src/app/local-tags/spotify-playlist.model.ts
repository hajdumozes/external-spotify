import { UniqueObject } from './unique-object';
export class SpotifyPlaylist implements UniqueObject {
  constructor(public name: string, public id: string) {}

  getId() {
    return this.id;
  }
}
