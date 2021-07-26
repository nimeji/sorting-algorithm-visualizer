import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { Component } from 'react';

export type SorterProps = {
  data: number[];
  decimals?: number;
}

type SorterState = {
  arrayAccesses: number;
  buttonDisabled: boolean;
  compared: [number | undefined, number | undefined];
  comparisons: number;
  generator: Generator | undefined;
  performanceTimer: number;
  realTime: number;
  sleepTime: number;
  sorted: number[];
  values: number[];
}

function cloneArray(array: Array<any>) {
  const result = [];
  let i = array.length;
  while(i--) {
    result[i] = array[i];
  }

  return result;
}

function* bubbleSort(length: number, compare: (i: number, j: number) => boolean, swap: (i: number, j: number) => void) {
  let sorted: number[] = [];

  for(let i = 0; i < length - 1; i++) {
    let j;
    for(j = 0; j < length - 1 - i; j++) {
      yield [j, j+1, sorted];

      if(compare(j, j+1)) {
        swap(j, j+1);
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
  }

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      arrayAccesses: 0,
      buttonDisabled: false,
      compared: [undefined, undefined],
      comparisons: 0,
      generator: undefined,
      performanceTimer: performance.now(),
      realTime: 0,
      sleepTime: 0,
      sorted: [],
      values: [],
    };

    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this.compare = this.compare.bind(this);
    this.swap = this.swap.bind(this);
    this.runNext = this.runNext.bind(this);
  }

  componentDidMount() {
    this.setState({values: cloneArray(this.props.data)});
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        values: cloneArray(this.props.data),
        generator: undefined,
      });
    }

    if (prevState.values !== this.state.values && this.state.values.length > 0 && !this.state.generator) {
      this.setState({
        generator: bubbleSort(this.state.values.length, this.compare, this.swap),
      });
    }
  }

  set(i: number, v: number) {
    this.setState((prevState) => {
      const temp = cloneArray(prevState.values);
      
      temp[i] = v;

      return {
        values: temp,
        arrayAccesses: prevState.arrayAccesses + 1,
      }
    });
  }

  get(i: number) {
    this.setState((prevState) => {
      return {
        arrayAccesses: prevState.arrayAccesses + 1,
      }
    });

    return this.state.values[i];
  }

  compare(i: number, j: number) {
    const result = this.get(i) > this.get(j);

    this.setState((prevState) => {
      return {
        comparisons: prevState.comparisons + 1,
      }
    });

    return result;
  }

  swap(i: number, j: number) {
    const a = this.get(i);
    const b = this.get(j);

    this.set(i, b);
    this.set(j, a);
  }

  runNext() {
    const {
      generator,
      performanceTimer,
      realTime,
      values
    } = this.state;

    if(generator) {
      const sleep = performance.now() - performanceTimer - realTime
      const result = generator.next([values, this.swap]).value;

      this.setState({
        sleepTime: sleep,
        realTime: performance.now() - performanceTimer - sleep,
      });

      if(result){
        const [i, j, sorted] = result;

        this.setState({
          compared: [i, j],
          sorted: sorted,
        });

      } else {
        this.setState({
          compared: [undefined, undefined],
          buttonDisabled: true,
        });
      }
    }
  }

  render() {
    const { 
      comparisons, 
      arrayAccesses, 
      realTime, 
      sleepTime, 
      buttonDisabled, 
      sorted, 
      values, 
      compared 
    } = this.state;

    const { decimals } = this.props;

    const elements = [];
    for(let i = 0; i < values.length; i++) {
      elements[i] = <SorterValue 
        key={i} 
        height={values[i] * 100} 
        width={100/values.length} 
        selected={compared.includes(i)}
        sorted={sorted.includes(i)}
      />
    }

    return (
      <div className={styles.Container}>
        <div className={styles.ValueContainer}>
          {elements}
        </div>
        <div className={styles.Metrics}>
          <div id="comparisions">Comparisons: <span>{comparisons}</span></div>
          <div id="accesses">Array Accesses: <span>{arrayAccesses}</span></div>
          <div id="real-time">Real Time: <span>{realTime.toFixed(decimals)}</span>ms</div>
          <div id="sleep-time">Sleep Time: <span>{sleepTime.toFixed(decimals)}</span>ms</div>
        </div>

        <button 
          onClick={this.runNext}
          disabled={buttonDisabled}
        >Continue</button>
      </div>
    );
  }
}