import { SorterArray } from './SorterArray';

describe('SorterArray', () => {
  let instance: SorterArray;
  let array: number[];
  const data = [0.6, 0.5, 0.4, 0.1, 0.8, 0.2, 1, 0.9, 0.71, 0.3];


  beforeAll(() => {
    instance = new SorterArray(data, (i: number, j: number) => i > j);
    array = instance['array'];
  });

  it('copies the data correctly', () => {
    expect(array).not.toBe(data);
    expect(array.length).toBe(data.length);
    for(let i = 0; i < data.length; i++) {
      expect(array[i]).toBe(data[i]);
    }
  });

  it('returns a correct copy of the array', () => {
    const copy = instance.getValues();
    expect(copy).not.toBe(array);
    expect(copy.length).toBe(array.length);
    for(let i = 0; i < array.length; i++) {
      expect(copy[i]).toBe(array[i]);
    }
  });

  // getter tests + counters
})