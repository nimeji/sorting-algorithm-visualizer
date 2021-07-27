
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
  public accesses: number = 0;
  public comparisons: number = 0;

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
    this.accesses = this.accesses + 1;
    return this.array[i];
  }

  private set(i: number, v: number) {
    this.accesses = this.accesses + 1
    this.array[i] = v;
  }

  compare(i: number, j: number) {
    this.comparisons = this.comparisons + 1;

    return this.compareFn(this.get(i), this.get(j));
  }

  swap(i: number, j: number) {
    const temp = this.get(i);

    this.set(i, this.get(j));
    this.set(j, temp);
  }

  getValues() {
    return cloneArray(this.array);
  }
}