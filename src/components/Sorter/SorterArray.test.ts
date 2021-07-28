import { SorterArray } from './SorterArray';

describe('SorterArray', () => {
  let instance: SorterArray;
  const a = 3;
  const b = 5
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];


  beforeEach(() => {
    instance = new SorterArray(data, (i: number, j: number) => i > j);
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

    expect(() => instance.compare(-1, 0)).toThrowError(RangeError);
    expect(() => instance.compare(instance.length, 0)).toThrowError(RangeError);
    expect(() => instance.compare(0, -1)).toThrowError(RangeError);
    expect(() => instance.compare(0, instance.length)).toThrowError(RangeError);
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

  it('returns the correct number of accesses and comparisons after compare', () => {
    for(let i = 0; i < 10; i++) {
      instance.compare(a, b);
    }

    expect(instance.accesses).toBe(20);
    expect(instance.comparisons).toBe(10);
  });

  it('returns the correct result for compare', () => {
    expect(instance.compare(a, b)).toBeFalsy();
  });
});