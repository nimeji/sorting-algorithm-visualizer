import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { Component } from 'react';
import { SorterArray } from './SorterArray';

export type SorterProps = {
  data: number[];
  decimals?: number;
  delay?: number;
  updateInterval?: number;
}

type SorterState = {
  buttonDisabled: boolean;
  compared: [number | undefined, number | undefined];
  generator: Generator | undefined;
  performanceTimer: number;
  sorted: number[];
}

function cloneArray(array: Array<any>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

function* bubbleSort(array: SorterArray) {
  let sorted: number[] = [];
  const length = array.length;

  for(let i = 0; i < length - 1; i++) {
    let j;
    for(j = 0; j < length - 1 - i; j++) {
      yield [j, j+1, sorted];

      if(array.compare(j, j+1)) {
        array.swap(j, j+1);
      }
    }
    sorted = [j, ...sorted];
  }
  sorted = [0, ...sorted];
  yield [undefined, undefined, sorted];

  return;
}

export class Sorter extends Component<SorterProps, SorterState> {
  static defaultProps = {
    decimals: 1,
    delay: 100,
    updateInterval: 1000/24,
  }
  static compareFn = (i: number, j: number) => i > j;

  private arrayAccesses: number = 0;
  private compared: [number | undefined, number | undefined] = [undefined, undefined];
  private comparisons: number = 0;
  private realTime: number = 0;
  private sleepTime: number = 0;
  private sorted: number[] = [];
  private values: SorterArray = new SorterArray([], () => true);
  private needUpdate: boolean = false;

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      buttonDisabled: false,
      compared: [undefined, undefined],
      generator: undefined,
      performanceTimer: performance.now(),
      sorted: [],
    };

    this.runNext = this.runNext.bind(this);
  }

  componentDidMount() {
    // this.setState({values: cloneArray(this.props.data)});
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        generator: undefined,
      });

      this.values = new SorterArray(cloneArray(this.props.data), Sorter.compareFn);
    }

    if (this.values.length > 0 && !this.state.generator) {
      this.setState({
        generator: bubbleSort(this.values),
      });
      this.start();
    }
  }

  runNext() {
    const {
      generator,
      performanceTimer,
    } = this.state;

    if(generator) {
      this.sleepTime = performance.now() - performanceTimer - this.realTime;
      const result = generator.next().value;
      this.realTime = performance.now() - performanceTimer - this.sleepTime;

      if(result){
        const [i, j, sorted] = result;

        this.compared = [i, j];
        this.sorted = sorted;

        return true;
      } else {
        this.compared = [undefined, undefined];

        this.setState({
          buttonDisabled: true,
        });
      }

      return false;
    }
  }

  start() {
    this.setState({
      performanceTimer: performance.now(),
    });

    const timer = setInterval(() => {
      if(!this.runNext()) {
        clearTimeout(timer)
      } else {
        this.needUpdate = true;
      }
    }, this.props.delay);
    setInterval(() => {
      if(this.needUpdate) {
        this.forceUpdate();
        this.needUpdate = false;
      }
    }, this.props.updateInterval);
  }

  render() {
    const { 
      buttonDisabled, 
    } = this.state;

    const { decimals } = this.props;

    const elements = [];
    for(let i = 0; i < this.values.length; i++) {
      elements[i] = <SorterValue 
        key={i} 
        height={this.values.value(i) * 100} 
        width={100/this.values.length} 
        selected={this.compared.includes(i)}
        sorted={this.sorted.includes(i)}
      />
    }

    return (
      <div className={styles.Container}>
        <div className={styles.ValueContainer}>
          {elements}
        </div>
        <div className={styles.Metrics}>
          <div id="comparisions">Comparisons: <span>{this.values.comparisons}</span></div>
          <div id="accesses">Array Accesses: <span>{this.values.accesses}</span></div>
          <div id="real-time">Real Time: <span>{this.realTime.toFixed(decimals)}</span>ms</div>
          <div id="sleep-time">Sleep Time: <span>{this.sleepTime.toFixed(decimals)}</span>ms</div>
        </div>

        <button 
          onClick={this.runNext}
          disabled={buttonDisabled}
        >Continue</button>
      </div>
    );
  }
}