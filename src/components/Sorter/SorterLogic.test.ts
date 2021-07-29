import { SorterLogic } from './SorterLogic';
import { algorithms } from './SorterAlgorithms';
import { SorterArray } from './SorterArray';

describe('SorterLogic', () => {
  let instance: SorterLogic;
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];
  const sorted = new Set([1, 2, 3]);
  const compared = [1, 2];
  const iterations = 300;

  beforeEach(() => {
    jest.spyOn(algorithms, 'BubbleSort').mockImplementation(function* (array, indicesSorted) {
      let i = iterations;
      while(i--) {
        yield [compared[0], compared[1]];
      }
      return;
    });
  });

  it('has a valid minDelay', () => {
    expect(SorterLogic.minDelay).toBeGreaterThanOrEqual(10);
  });

  it('has a valid compareFn', () => {
    expect(typeof SorterLogic.compareFn(1, 2)).toBe('boolean');
  });

  describe('after initialization', () => {
    beforeEach(() => {
      instance = new SorterLogic(data, 'BubbleSort', 5);
    });

    it('has correct values array', () => {
      const values = instance.getValues();
      for(let i = 0; i < data.length; i++) {
        expect(values[i]).toBe(data[i]);
      }
    });

    it('returns a copy of the array', () => {
      const values1 = instance.getValues();
      const values2 = instance.getValues();

      expect(values1).not.toBe(values2);
    });

    it('clamps negative delays to zero', () => {
      instance = new SorterLogic(data, 'BubbleSort', -1);
      expect(instance.getDelay()).toBe(0);
    });

    it('has correct delay', () => {
      instance = new SorterLogic(data, 'BubbleSort', 5);
      expect(instance.getDelay()).toBe(5);
    });

    it('clamps trueDelay to minDelay', () => {
      instance = new SorterLogic(data, 'BubbleSort', 0);
      expect(instance.getTrueDelay()).toBe(SorterLogic.minDelay);
    });

    it('has correct trueDelay', () => {
      const delay = SorterLogic.minDelay + 1
      instance = new SorterLogic(data, 'BubbleSort', delay);
      expect(instance.getTrueDelay()).toBe(delay);
    });

    it('indicates an update after running', () => {
      expect(instance.didUpdate()).toBeFalsy();
      instance.runNext();
      expect(instance.didUpdate()).toBeTruthy();
    });
  });

  describe('with mocked SorterArray', () => {
    let spyRunNext: jest.SpyInstance;
    const comparisons = 123;
    const accesses = 456;

    beforeEach(() => {
      jest.spyOn(SorterArray.prototype, 'comparisons', 'get').mockReturnValue(comparisons);
      jest.spyOn(SorterArray.prototype, 'accesses', 'get').mockReturnValue(accesses);
      jest.useFakeTimers();

      instance = new SorterLogic(data, 'BubbleSort', SorterLogic.minDelay);
      spyRunNext = jest.spyOn(instance, 'runNext');
    });

    it('returns correct comparisons', () => {
      instance.runNext();
      expect(instance.getComparisons()).toBe(comparisons);
    });

    it('returns correct accesses', () => {
      instance.runNext();
      expect(instance.getAccesses()).toBe(accesses);
    });

    it('return correct lastCompared', () => {
      instance.runNext();

      const lc = instance.getLastCompared();
      expect(lc[0]).toBe(compared[0]);
      expect(lc[1]).toBe(compared[1]);
    });

    it('returns correct indicesSorted', () => {
      instance.runNext();

      instance.getIndicesSorted().forEach((element, i) => {
        expect(sorted.has(element)).toBeTruthy();
      });
    });

    it('starts running the algorithm when calling start', () => {
      instance.start();
      jest.advanceTimersToNextTimer(10);
      expect(spyRunNext).toHaveBeenCalledTimes(10);
    });

    it('pauses running the algorithm when calling pause', () => {
      instance.start();
      instance.pause();
      jest.advanceTimersToNextTimer(10);
      expect(spyRunNext).not.toHaveBeenCalled();
    });

    it('restarts running the algorithm when calling start after pause', () => {
      instance.start();
      instance.pause();
      instance.start();
      jest.advanceTimersToNextTimer(10);
      expect(spyRunNext).toHaveBeenCalledTimes(10);
    });

    it('runs the algorithm to completion', () => {
      instance.start();
      jest.runAllTimers();
      expect(instance['generator'].next().done).toBeTruthy();
    });

    it('indicates finished correctly', () => {
      expect(instance.isFinished()).toBeFalsy();
      instance.start();

      let i = iterations + 1;
      while(i--) {
        expect(instance.isFinished()).toBeFalsy();
        jest.advanceTimersToNextTimer();
      }

      expect(instance.isFinished()).toBeTruthy();
    });

    it('indicates correctly whether the algorithm is running', () => {
      expect(instance.isRunning()).toBeFalsy();
      instance.start();
      expect(instance.isRunning()).toBeTruthy();
      instance.pause();
      expect(instance.isRunning()).toBeFalsy();
    });

    it('does not restart after finishing', () => {
      instance.start();
      jest.runAllTimers();
      expect(instance.isFinished()).toBeTruthy();
      instance.start();
      expect(instance.isRunning()).toBeFalsy();
    });

    it('restarts the algorithm after changing delay', () => {
      instance.start();
      instance.setDelay(instance.getTrueDelay() * 2);
      expect(instance.isRunning()).toBeTruthy();
    });

    it('does not run multiple instances of the algorithm', () => {
      instance.start();
      instance.start();
      jest.runTimersToTime(instance.getTrueDelay() * 10);

      expect(spyRunNext).toHaveBeenCalledTimes(10);
    });

    it('stays paused when in a paused state', () => {
      instance.pause();

      expect(instance.isRunning()).toBeFalsy();
    });

    it('returns a sleepTime', () => {
      instance.start();
      jest.runAllTimers();
      expect(instance.getSleepTime()).toBeGreaterThan(0);
    });

    it('returns a realTime', () => {
      instance.start();
      jest.runAllTimers();
      expect(instance.getRealTime()).toBeGreaterThan(0);
    });

    it('returns the correct state', () => {
      instance.runNext();

      const { values, indicesSorted, lastCompared, comparisons, accesses } = instance.getLastState();
      
      const values2 = instance.getValues();
      for(let i = 0; i < values.length; i++) {
        expect(values[i]).toBe(values2[i]);
      }

      const indicesSorted2 = instance.getIndicesSorted();
      indicesSorted.forEach(element => expect(indicesSorted2.has(element)).toBeTruthy());

      const lastCompared2 = instance.getLastCompared();
      expect(lastCompared[0]).toBe(lastCompared2[0]);
      expect(lastCompared[1]).toBe(lastCompared2[1]);

      expect(comparisons).toBe(instance.getComparisons());
      expect(accesses).toBe(instance.getAccesses());
    });

    it('resets didUpdate after calling getLastState', () => {
      instance.runNext();
      expect(instance.didUpdate()).toBeTruthy();
      instance.getLastState();
      expect(instance.didUpdate()).toBeFalsy();
    });
  });
});