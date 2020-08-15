import * as deepEqual from 'deep-equal';

export default class Utils {
  static chunkArray(array: any[], chunkSize: number): any[][] {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  }

  static findIndexOf(array: any[], object: any): number {
    return array.findIndex((item) => deepEqual(item, object));
  }
}
