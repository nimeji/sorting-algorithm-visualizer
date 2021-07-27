import { SorterArray } from "./SorterArray";
import { algorithms, SorterAlgorithmGenerator, SorterAlgorithmType, SorterAlgorithmReturnType } from './SorterAlgorithms'

describe('SorterAlgorithms', () => {
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
  const compareFn = (i: number, j: number) => i > j;
  let array: SorterArray;

  beforeEach(() => {
    array = new SorterArray(data, compareFn);
  });

  describe.each([
    ['BubbleSort', algorithms.BubbleSort],
  ])('%s', (name: string, algorithm: SorterAlgorithmType) => {
    let generator: SorterAlgorithmGenerator;
    let result: SorterAlgorithmReturnType;

    beforeEach(() => {
      generator = algorithm(array);

      let i = 300;
      let temp;
      while(!(temp = generator.next()).done && i--) {
        result = temp.value;
      }
    });

    it('terminates', () => {
      expect(generator.next().done).toBeTruthy();
    });

    it('results in a sorted array', () => {
      for(let i = 0; i < array.length - 1; i++) {
        expect(compareFn(array.value(i), array.value(i+1))).toBeFalsy();
      }
    });

    it('marks all indices as sorted', () => {
      const [,, sorted] = result;
      for(let i = 0; i < array.length; i++) {
        expect(sorted[i]).toBe(i);
      }
    });
  });
});
