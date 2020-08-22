import { UniqueObject } from '../local-tags/models/unique-object';

export default class Utils {
  static chunkArray(array: any[], chunkSize: number): any[][] {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  }

  static findIndexOf(array: UniqueObject[], object: UniqueObject): number {
    return array.findIndex((item) => item.getId() === object.getId());
  }
}
