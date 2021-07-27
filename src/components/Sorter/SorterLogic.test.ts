import { SorterLogic } from './SorterLogic';

describe('SorterLogic', () => {
  let instance: SorterLogic;
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];

  describe('after initialization', () => {
    beforeEach(() => {
      instance = new SorterLogic(data, 5);
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
      instance = new SorterLogic(data, -1);
      expect(instance.getDelay()).toBe(0);
    });

    it('has a valid minDelay', () => {
      expect(SorterLogic.minDelay).toBeGreaterThanOrEqual(10);
    });

    it('has correct delay', () => {
      instance = new SorterLogic(data, 5);
      expect(instance.getDelay()).toBe(5);
    });

    it('clamps trueDelay to minDelay', () => {
      instance = new SorterLogic(data, 0);
      expect(instance.getTrueDelay()).toBe(SorterLogic.minDelay);
    });

    it('has correct trueDelay', () => {
      const delay = SorterLogic.minDelay + 1
      instance = new SorterLogic(data, delay);
      expect(instance.getTrueDelay()).toBe(delay);
    });

    it('indicates an update after running', () => {
      expect(instance.didUpdate()).toBeFalsy();
      instance.runNext();
      expect(instance.didUpdate()).toBeTruthy();
    });
  });

  describe('after sorting', () => {
    beforeEach(() => {
      instance = new SorterLogic(data, 0);

      let i = 300;
      while(instance.runNext() && i--) {}
    });

    it('returns the correct state', () => {
      const [values, sorted, lastCompared, comparisons, accesses] = instance.getLastState();
      
      const values2 = instance.getValues();
      for(let i = 0; i < values.length; i++) {
        expect(values[i]).toBe(values2[i]);
      }

      const sorted2 = instance.getIndicesSorted();
      for(let i = 0; i < sorted.length; i++) {
        expect(sorted[i]).toBe(sorted2[i]);
      }

      const lastCompared2 = instance.getLastCompared();
      expect(lastCompared[0]).toBe(lastCompared2[0]);
      expect(lastCompared[1]).toBe(lastCompared2[1]);

      expect(comparisons).toBe(instance.getComparisons());
      expect(accesses).toBe(instance.getAccesses());
    });

    it('resets didUpdate after calling getLastState', () => {
      expect(instance.didUpdate()).toBeTruthy();
      instance.getLastState();
      expect(instance.didUpdate()).toBeFalsy();
    });
  });
});