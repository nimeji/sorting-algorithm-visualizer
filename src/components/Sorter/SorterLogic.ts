import { algorithms, SorterAlgorithmGenerator } from "./SorterAlgorithms";
import { SorterArray } from "./SorterArray";


export class SorterLogic {
  static readonly compareFn = (i: number, j: number) => i < j;
  static readonly minDelay = 10;

  private delay: number;
  private trueDelay: number;

  private generator: SorterAlgorithmGenerator;
  private values: SorterArray = new SorterArray([], () => true);
  private indidcesSorted: number[] = [];
  private lastCompared: [number | undefined, number | undefined] = [undefined, undefined];

  private step = 0;

  private t0 = 0;
  private t1 = 0;
  private timeElapsedT0 = 0;
  private timeElapsed = 0;
  private sleepTime = 0;
  private realTime = 0;

  private updated = false;

  constructor(data: number[], delay: number) {
    this.values = new SorterArray(data, SorterLogic.compareFn);
    this.generator = algorithms.BubbleSort(this.values);

    this.delay = Math.max(delay, 0);
    this.trueDelay = Math.max(SorterLogic.minDelay, this.delay);

    this.loop = this.loop.bind(this);
  }

  runNext() {
    const next = this.generator.next();

    if(!next.done){
      const [i, j, sorted] = next.value;

      this.lastCompared = [i, j];
      this.indidcesSorted = sorted;
      this.updated = true;
    } else {
      this.lastCompared = [undefined, undefined];
    }

    return !next.done;
  }

  loop() {
    this.t1 = performance.now();
    this.sleepTime = this.sleepTime + this.t1 - this.t0;

    let hasNext;

    do {
      hasNext = this.runNext();
      this.step = this.step + 1;
    } while(hasNext && this.sleepTime > this.delay * this.step)

    if(hasNext) {
      setTimeout(this.loop, this.trueDelay);
    }

    this.t0 = performance.now();
    this.realTime = this.realTime + this.t0 - this.t1; 
  }

  start() {
    this.t0 = performance.now();
    this.timeElapsedT0 = this.t0 - this.timeElapsed;
    this.loop();
  }

  didUpdate() {
    return this.updated;
  }

  getSleepTime() {
    return this.sleepTime;
  }

  getRealTime() {
    return this.realTime;
  }

  getLastCompared() {
    return this.lastCompared;
  }

  getIndicesSorted() {
    return [...this.indidcesSorted];
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