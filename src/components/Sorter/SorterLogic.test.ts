import { SorterLogic } from './SorterLogic';

describe('SorterLogic', () => {
  let instance: SorterLogic;
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];

  describe('after initialization', () => {
    beforeEach(() => {
      instance = new SorterLogic(data, 5);
    });

    it('has correct values array', () => {
      for(let i = 0; i < instance['values'].length; i++) {
        expect(instance['values'].value(i)).toBe(data[i]);
      }
    });

    it('clamps negative delays to zero', () => {
      instance = new SorterLogic(data, -1);
      expect(instance['delay']).toBe(0);
    });

    it('has a valid minDelay', () => {
      expect(SorterLogic.minDelay).toBeGreaterThanOrEqual(10);
    });

    it('has correct delay', () => {
      instance = new SorterLogic(data, 5);
      expect(instance['delay']).toBe(5);
    });

    it('clamps trueDelay to minDelay', () => {
      instance = new SorterLogic(data, 0);
      expect(instance['trueDelay']).toBe(SorterLogic.minDelay);
    });

    it('has correct trueDelay', () => {
      const delay = SorterLogic.minDelay + 1
      instance = new SorterLogic(data, delay);
      expect(instance['trueDelay']).toBe(delay);
    });

    it('returns lastCompared correctly', () => {
      instance['lastCompared'] = [123, 456];

      const lc = instance.getLastCompared();
      expect(lc[0]).toBe(123);
      expect(lc[1]).toBe(456);
    });

    it('returns indicesSorted correctly', () => {
      const numbers = [3, 1, 634, 12, 3];
      instance['indidcesSorted'] = numbers;

      expect(instance.getIndicesSorted()).toBe(numbers);
    });
  });

  describe('after sorting', () => {
    beforeEach(() => {
      instance = new SorterLogic(data, 0);

      let i = 300;
      while(instance.runNext() && i--) {}
    });

    it('results in a sorted array', () => {
      for(let i = 0; i < instance['values'].length - 1; i++) {
        expect(instance['values'].value(i)).toBeLessThanOrEqual(instance['values'].value(i+1));
      }
    });

    it('marks all indices as sorted', () => {
      const sorted = instance.getIndicesSorted();
      
      for(let i = 0; i < instance['values'].length; i++) {
        expect(sorted[i]).toBe(i);
      }
    });
  });
});