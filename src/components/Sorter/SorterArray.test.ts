import { SorterArray } from './SorterArray';

describe('SorterArray', () => {
  let instance: SorterArray;
  const a = 3;
  const b = 5
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];


  beforeEach(() => {
    instance = new SorterArray(data, (i: number, j: number) => i-j);
  });

  it('throws an error when an index is out of range', () => {
    expect(() => instance.get(-1)).toThrowError(RangeError);
    expect(() => instance.get(instance.length)).toThrowError(RangeError);

    expect(() => instance.value(-1)).toThrowError(RangeError);
    expect(() => instance.value(instance.length)).toThrowError(RangeError);

    expect(() => instance.swap(-1, 0)).toThrowError(RangeError);
    expect(() => instance.swap(instance.length, 0)).toThrowError(RangeError);
    expect(() => instance.swap(0, -1)).toThrowError(RangeError);
    expect(() => instance.swap(0, instance.length)).toThrowError(RangeError);
  });

  it('returns the correct array length', () => {
    expect(instance.length).toBe(data.length);
  })

  it('returns the correct value', () => {
    for(let i = 0; i < data.length; i++) {
      expect(instance.value(i)).toBe(data[i]);
      expect(instance.get(i)).toBe(data[i]);
    }
  });

  it('correctly swaps indices', () => {
    const aValue = instance.value(a);
    const bValue = instance.value(b);

    instance.swap(a, b);

    expect(instance.value(a)).toBe(bValue);
    expect(instance.value(b)).toBe(aValue);
  });

  it('does not modify the original data', () => {
    const dataCopy = [...data];

    instance.swap(a, b);

    for(let i = 0; i < dataCopy.length; i++) {
      expect(data[i]).toBe(dataCopy[i]);
    }
  });

  it('returns a copy of the array', () => {
    const copy = instance.values;

    for(let i = 0; i < copy.length; i++) {
      expect(copy[i]).toBe(instance.value(i));
    }

    instance.swap(a, b);

    expect(copy[a]).not.toBe(instance.value(a));
    expect(copy[b]).not.toBe(instance.value(b));
  });

  it('returns the correct number of accesses after get', () => {
    for(let i = 0; i < 10; i++) {
      instance.get(i);
    }

    expect(instance.accesses).toBe(10);
  });

  it('return the correct number of accesses after swap', () => {
    for(let i = 0; i < 10; i++) {
      instance.swap(a, b);
    }

    expect(instance.accesses).toBe(40);
  });

  it('returns the correct number of accesses and comparisons after gt', () => {
    for(let i = 0; i < 10; i++) {
      instance.gt(a, b);
    }
    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for gt', () => {
    expect(instance.gt(0, 1)).toBeTruthy();
    expect(instance.gt(1, 1)).toBeFalsy();
    expect(instance.gt(1, 0)).toBeFalsy();
  });

  it('returns the correct number of accesses and comparisons after lt', () => {
    for(let i = 0; i < 10; i++) {
      instance.lt(a, b);
    }
    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for lt', () => {
    expect(instance.lt(0, 1)).toBeFalsy();
    expect(instance.lt(1, 1)).toBeFalsy();
    expect(instance.lt(1, 0)).toBeTruthy();
  });

  it('returns the correct number of accesses and comparisons after gte', () => {
    for(let i = 0; i < 10; i++) {
      instance.gte(a, b);
    }
    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for gte', () => {
    expect(instance.gte(0, 1)).toBeTruthy();
    expect(instance.gte(1, 1)).toBeTruthy();
    expect(instance.gte(1, 0)).toBeFalsy();
  });

  it('returns the correct number of accesses and comparisons after lte', () => {
    for(let i = 0; i < 10; i++) {
      instance.lte(a, b);
    }
    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for lte', () => {
    expect(instance.lte(0, 1)).toBeFalsy();
    expect(instance.lte(1, 1)).toBeTruthy();
    expect(instance.lte(1, 0)).toBeTruthy();
  });

  it('returns the correct number of accesses and comparisons after eq', () => {
    for(let i = 0; i < 10; i++) {
      instance.eq(a, b);
    }
    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for eq', () => {
    expect(instance.eq(0, 1)).toBeFalsy();
    expect(instance.eq(1, 1)).toBeTruthy();
    expect(instance.eq(1, 0)).toBeFalsy();
  });
});