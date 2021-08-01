
function cloneArray<T>(array: Array<T>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

export class SorterArray {
  private array: number[];
  private compareFn: (a: number, b: number) => number;
  private _accesses: number = 0;
  private _comparisons: number = 0;

  constructor(array: number[], compareFn: (a: number, b: number) => number) {
    this.array = cloneArray(array);
    this.compareFn = compareFn;
  }

  get length() {
    return this.array.length;
  }

  private validateIndex(i: number) {
    if(i >= this.array.length || i < 0) throw new RangeError('index out of range');
  }

  value(i: number) {
    this.validateIndex(i);  

    return this.array[i];
  }

  get(i: number) {
    this.validateIndex(i);  

    this._accesses = this._accesses + 1;
    return this.array[i];
  }

  private set(i: number, v: number) {
    this.validateIndex(i);    

    this._accesses = this._accesses + 1
    this.array[i] = v;
  }

  private compare(i: number, j: number) {
    this._comparisons = this._comparisons + 1;
    return this.compareFn(this.get(i), this.get(j));
  }

  lt(i: number, j: number) {
    return this.compare(i, j) < 0;
  }

  gt(i: number, j: number) {
    return this.compare(i, j) > 0;
  }

  lte(i: number, j: number) {
    return this.compare(i, j) <= 0;
  }

  gte(i: number, j: number) {
    return this.compare(i, j) >= 0;
  }

  eq(i: number, j: number) {
    return this.compare(i, j) === 0;
  }

  swap(i: number, j: number) {
    const temp = this.get(i);

    this.set(i, this.get(j));
    this.set(j, temp);
  }

  get accesses() {
    return this._accesses;
  }

  get comparisons() {
    return this._comparisons;
  }

  get values() {
    return cloneArray(this.array);
  }
}