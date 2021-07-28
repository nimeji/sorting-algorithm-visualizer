import { algorithms, SorterAlgorithmGenerator } from "./SorterAlgorithms";
import { SorterArray } from "./SorterArray";


export class SorterLogic {
  static readonly compareFn = (i: number, j: number) => i < j;
  static readonly minDelay = 10;


  private trueDelay: number = SorterLogic.minDelay;
  private delay: number = this.trueDelay;

  private generator: SorterAlgorithmGenerator;
  private values: SorterArray;
  private indidcesSorted = new Set<number>();
  private lastCompared: [number | undefined, number | undefined] = [undefined, undefined];

  private step = 0;

  private sleepTime = 0;
  private realTime = 0;

  private timeout = 0;
  private running = false;

  private updated = false;

  constructor(data: number[], algorithm: keyof typeof algorithms, delay: number) {
    this.values = new SorterArray(data, SorterLogic.compareFn);

    this.generator = algorithms[algorithm](this.values);

    this.setDelay(delay);

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

  private loop() {
    const t0 = performance.now();

    this.sleepTime = this.sleepTime + this.trueDelay;

    let hasNext;
    do {
      hasNext = this.runNext();
      this.step = this.step + 1;
    } while(hasNext && this.sleepTime > this.delay * this.step)

    if(!hasNext) {
      this.pause();
    }

    this.realTime = this.realTime + performance.now() - t0; 
  }

  start() {
    if(!this.running)
    {
      this.timeout = window.setInterval(this.loop, this.trueDelay);
      this.running = true;
    }
  }

  pause() {
    if(this.running) {
      clearInterval(this.timeout);
      this.running = false;
    }
  }

  didUpdate() {
    return this.updated;
  }

  isRunning() {
    return this.running;
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

  getLastState() {
    this.updated = false;

    return {
      values: this.getValues(),
      indicesSorted: this.getIndicesSorted(),
      lastCompared: this.getLastCompared(),
      comparisons: this.getComparisons(),
      accesses: this.getAccesses(),
    };
  }

  setDelay(delay: number) {
    this.delay = Math.max(delay, 0);
    this.trueDelay = Math.max(SorterLogic.minDelay, this.delay);

    if(this.running) {
      this.pause();
      this.start();
    }
  }
}