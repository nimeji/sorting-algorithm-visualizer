import { algorithms } from "./SorterAlgorithms";
import { SorterArray } from "./SorterArray";


export class SorterLogic {
  static compareFn = (i: number, j: number) => i > j;
  static readonly minDelay = 10;

  private delay: number;
  private trueDelay: number;

  private generator: Generator;
  private values: SorterArray = new SorterArray([], () => true);
  private indidcesSorted: number[] = [];
  private lastCompared: [number | undefined, number | undefined] = [undefined, undefined];

  private updated = false;

  private needUpdate: boolean = false;
  private currentStep: number = 0;

  private t0: number = 0;
  private sleepT0: number = 0;
  private realTime: number = 0;
  private sleepTime: number = 0;

  constructor(data: number[], delay: number) {
    this.values = new SorterArray(data, SorterLogic.compareFn);
    this.generator = algorithms.BubbleSort(this.values);

    this.delay = Math.max(delay, 0);
    this.trueDelay = Math.max(SorterLogic.minDelay, this.delay);
  }

  runNext() {
    const result = this.generator.next().value;

    if(result){
      const [i, j, sorted] = result;

      this.lastCompared = [i, j];
      this.indidcesSorted = sorted;
      this.updated = true;

      return true;
    } else {
      this.lastCompared = [undefined, undefined];
    }

    return false;
  }

  getLastCompared() {
    return this.lastCompared;
  }

  getIndicesSorted() {
    return this.indidcesSorted;
  }

  getValues() {
    return this.values.values;
  }

  getDelay() {
    return this.delay;
  }

  getTrueDelay() {
    return this.trueDelay;
  }

  getComparisons() {
    return this.values.comparisons;
  }

  getAccesses() {
    return this.values.accesses;
  }

  didUpdate() {
    return this.updated;
  }

  getLastState(): [number[], number[], [number | undefined, number | undefined], number, number] {
    this.updated = false;

    return [
      this.getValues(),
      this.getIndicesSorted(),
      this.getLastCompared(),
      this.getComparisons(),
      this.getAccesses(),
    ];
  }
}