import { UniqueObject } from './unique-object';
export class SpotifyPlaylist implements UniqueObject {
  constructor(public id: string, public name: string) {}

  getId() {
    return this.id;
  }
}
