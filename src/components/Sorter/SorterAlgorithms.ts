import { SorterArray } from "./SorterArray";

export type SorterAlgorithmReturnType = [number | undefined, number | undefined, Set<number>];
export type SorterAlgorithmGenerator = Generator<SorterAlgorithmReturnType>
export type SorterAlgorithmType = (array: SorterArray) => SorterAlgorithmGenerator;

function* bubbleSort(array: SorterArray): SorterAlgorithmGenerator {
  const sorted = new Set<number>()
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
    sorted.add(j);
  }
  sorted.add(0);
  yield [undefined, undefined, sorted];

  return;
}

// function* cocktailShakerSort(array: SorterArray): SorterAlgorithmGenerator {
//   let sortedUpper: number[] = [];
//   let sortedLower: number[] = [];
//   const length = array.length;

//   if(length <= 0) return;

//   let lower = 0;
//   let upper = length - 1;
//   let swapped = false;

//   while(lower < upper) {
//     swapped = false;

//     for(let i = lower; i < upper; i++) {
//       yield [i, i+1, [...sortedLower, ...sortedUpper]];
//       if(!array.compare(i, i+1)) {
//         array.swap(i, i+1);
//         swapped = true;
//       }
//     }
//     if(!swapped) {
//       break;
//     }

//     sortedUpper = [upper, ...sortedUpper];
//     upper = upper - 1;
//     swapped = false;
//     for(let i = upper; i > lower; i--) {
//       yield [i-1, i, [...sortedLower, ...sortedUpper]];
//       if(!array.compare(i-1, i)) {
//         array.swap(i-1, i);
//         swapped = true;
//       }
//     }
//     if(!swapped) {
//       break;
//     }

//     sortedLower = [...sortedLower, lower];
//     lower = lower + 1;
//   }

//   if(!swapped) {
//     for(let i = lower; i < upper; i++) {
//       sortedLower = [...sortedLower, i];
//     }
//   }

//   yield [undefined, undefined, [...sortedLower, ...sortedUpper]]

//   return
// }

function* selectionSort(array: SorterArray): SorterAlgorithmGenerator {
  const sorted = new Set<number>();
  const length = array.length;

  if(length <= 0) return;

  for(let i = 0; i < length; i++) {
    let best = i;
    for(let j = i + 1; j < length; j++) {
      yield [best, j, sorted];
      if(!array.compare(best, j)) {
        best = j;
      }
    }

    if(best !== i) {
      array.swap(i, best);
    }
    sorted.add(i);
  }
  yield [undefined, undefined, sorted];

  return
}

function* insertionSort(array: SorterArray): SorterAlgorithmGenerator {
  const sorted = new Set<number>();
  const length = array.length;

  if(length <= 0) return;

  sorted.add(0);

  for(let i = 1; i < length; i++) {
    sorted.add(i);
    for(let j = i - 1; j >= 0; j--) {
      yield [j, j+1, sorted];
      if(!array.compare(j, j+1)) {
        array.swap(j, j+1);
      } else {
        break;
      }
    }
  }
  
  yield [undefined, undefined, sorted];

  return;
}

export const algorithms = {
  BubbleSort: bubbleSort,
  // CocktailShakerSort: cocktailShakerSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
}
