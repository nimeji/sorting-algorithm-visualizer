import { SorterArray } from "./SorterArray";

export type SorterAlgorithmReturnType = [number | undefined, number | undefined];
export type SorterAlgorithmGenerator = Generator<SorterAlgorithmReturnType>
export type SorterAlgorithmType = (array: SorterArray, indicesSorted: Set<number>) => SorterAlgorithmGenerator;

function* BubbleSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  for(let i = 0; i < length - 1; i++) {
    let j;
    for(j = 0; j < length - 1 - i; j++) {
      yield [j, j+1];

      if(!array.compare(j, j+1)) {
        array.swap(j, j+1);
      }
    }
    indicesSorted.add(j);
  }
  indicesSorted.add(0);
  yield [undefined, undefined];

  return;
}

function* CocktailShakerSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  let lower = 0;
  let upper = length - 1;
  let swapped = false;

  do {
    swapped = false;
    for(let i = lower; i < upper; i++) {
      yield [i, i+1];
      if(!array.compare(i, i+1)) {
        array.swap(i, i+1);
        swapped = true;
      }
    }
    indicesSorted.add(upper);
    upper = upper - 1;

    // if(!swapped) {
    //   break;
    // }

    swapped = false;
    for(let i = upper; i > lower; i--) {
      yield [i-1, i];
      if(!array.compare(i-1, i)) {
        array.swap(i-1, i);
        swapped = true;
      }
    }
    indicesSorted.add(lower);
    lower = lower + 1;
  } while(swapped)

  for(let i = lower; i <= upper; i++) {
    indicesSorted.add(i);
  }

  yield [undefined, undefined];

  return
}

function* SelectionSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  for(let i = 0; i < length; i++) {
    let best = i;
    for(let j = i + 1; j < length; j++) {
      yield [best, j];
      if(!array.compare(best, j)) {
        best = j;
      }
    }

    if(best !== i) {
      array.swap(i, best);
    }
    indicesSorted.add(i);
  }
  yield [undefined, undefined];

  return
}

function* InsertionSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  indicesSorted.add(0);

  for(let i = 1; i < length; i++) {
    indicesSorted.add(i);
    for(let j = i - 1; j >= 0; j--) {
      yield [j, j+1];
      if(!array.compare(j, j+1)) {
        array.swap(j, j+1);
      } else {
        break;
      }
    }
  }
  
  yield [undefined, undefined];

  return;
}

function* QuickSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  function* qs(lo: number, hi: number): SorterAlgorithmGenerator {
    if(lo < hi)
    {
      let mid = Math.floor((lo + hi)/2);
      let i = lo - 1;
      let j = hi + 1;
      while(true) {
        do {
          i = i + 1;
          yield [i, mid];
        } while(array.compare(i, mid))
        do {
          j = j - 1;
          yield [mid, j];
        } while(array.compare(mid, j))
        if(i >= j) {
          break
        }
        array.swap(i, j);
        if(mid === i) {
          mid = j
        } else if(mid === j) {
          mid = i
        }
      }
    
      yield* qs(lo, j);
      yield* qs(j+1, hi);
    } else {
      indicesSorted.add(lo);
    }
  }

  yield* qs(0, length-1);
  yield [undefined, undefined];

  return;
}

function* HeapSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  function* shiftDown(start: number, end: number): SorterAlgorithmGenerator {
    let root = start;
    let child;

    while((child = 2 * root + 1) <= end) {
      let swap = root;
      yield [swap, child];
      if(array.compare(swap, child)) {
        swap = child;
      }
      yield [swap, child+1];
      if(child+1 <= end && array.compare(swap, child + 1)) {
        swap = child + 1;
      }
      if(swap === root) {
        return;
      } else {
        array.swap(root, swap);
        root = swap;
      }
    }
  }
  function* heapify() {
    for(let start = Math.floor((length-2) / 2); start >= 0; start--) {
      yield* shiftDown(start, length - 1);
    }
  }

  yield* heapify();

  for(let end = length - 1; end > 0; end--) {
    array.swap(end, 0);
    indicesSorted.add(end);
    yield* shiftDown(0, end-1);
  }

  indicesSorted.add(0);
  yield [undefined, undefined];

  return;
}

function* ShellSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1]

  if(length <= 0) return;

  for(let gap of gaps) {
    for(let i = gap; i < length; i++) {
      for(let j = i; j >= gap; j -= gap) {
        yield [j - gap, j];
        if(!array.compare(j - gap, j)) {
          array.swap(j - gap, j);
        } else {
          break;
        }
      }
      if(gap === 1) {
        indicesSorted.add(i-1);
      }
    }
  }

  indicesSorted.add(length-1);
  yield [undefined, undefined];

  return;
}

function* CombSort(array: SorterArray, indicesSorted: Set<number>): SorterAlgorithmGenerator {
  const length = array.length;

  if(length <= 0) return;

  let gap = length;
  const shrink = 1.3;
  let isSorted = false;

  while(isSorted === false) {
    gap = Math.floor(gap / shrink);

    if(gap <= 1) {
      gap = 1;
      isSorted = true;
    }

    for(let i = 0; i + gap < length; i++) {
      yield [i, i + gap];
      if(!array.compare(i, i + gap)) {
        array.swap(i, i + gap);
        isSorted = false;
      }
    }
  }

  for(let i = 0; i < length; i++) {indicesSorted.add(i)}
  
  yield [undefined, undefined];

  return;
}

export const algorithms = {
  BubbleSort,
  CocktailShakerSort,
  SelectionSort,
  InsertionSort,
  QuickSort,
  HeapSort,
  ShellSort,
  CombSort,
}

export type AlgorithmNames = keyof typeof algorithms;