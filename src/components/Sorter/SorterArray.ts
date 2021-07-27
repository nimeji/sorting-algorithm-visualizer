
function cloneArray(array: Array<any>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

export class SorterArray {
  private array: number[];
  private compareFn: (a: number, b: number) => boolean;
  private _accesses: number = 0;
  private _comparisons: number = 0;

  constructor(array: number[], compareFn: (a: number, b: number) => boolean) {
    this.array = cloneArray(array);
    this.compareFn = compareFn;
  }

  get length() {
    return this.array.length;
  }

  value(i: number) {
    return this.array[i];
  }

  get(i: number) {
    this._accesses = this._accesses + 1;
    return this.array[i];
  }

  private set(i: number, v: number) {
    this._accesses = this._accesses + 1
    this.array[i] = v;
  }

  compare(i: number, j: number) {
    this._comparisons = this._comparisons + 1;

    return this.compareFn(this.get(i), this.get(j));
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