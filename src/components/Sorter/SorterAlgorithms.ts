import { SorterArray } from "./SorterArray";

export type SorterAlgorithmReturnType = [number | undefined, number | undefined, number[]];
export type SorterAlgorithmGenerator = Generator<SorterAlgorithmReturnType>
export type SorterAlgorithmType = (array: SorterArray) => SorterAlgorithmGenerator;

function* bubbleSort(array: SorterArray): SorterAlgorithmGenerator {
  let sorted: number[] = [];
  const length = array.length;

  if(length <= 0) return;

  for(let i = 0; i < length - 1; i++) {
    let j;
    for(j = 0; j < length - 1 - i; j++) {
      yield [j, j+1, sorted];

      if(!array.compare(j, j+1)) {
        array.swap(j, j+1);
      }
    }
    sorted = [j, ...sorted];
  }
  sorted = [0, ...sorted];
  yield [undefined, undefined, sorted];

  return;
}

function* insertionSort(array: SorterArray): SorterAlgorithmGenerator {
  let sorted;
  const length = array.length;

  if(length <= 0) return;

  sorted = [0]

  for(let i = 1; i < length; i++) {
    for(let j = i - 1; j >= 0; j--) {
      yield [j, j+1, sorted];
      if(!array.compare(j, j+1)) {
        array.swap(j, j+1);
      }
    }

    sorted = [...sorted, i];
  }
  
  yield [undefined, undefined, sorted];

  return;
}

export const algorithms = {
  BubbleSort: bubbleSort,
  InsertionSort: insertionSort,
}
