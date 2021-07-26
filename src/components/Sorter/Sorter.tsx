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

function* bubbleSort(array: number[], swap: (i: number, j: number) => void) {
  let sorted: number[] = [];
  let comparisions = 0;
  let accesses = 0;

  for(let i = 0; i < array.length - 1; i++) {
    let j;
    for(j = 0; j < array.length - 1 - i; j++) {
      comparisions += 1;
      accesses += 2;
      [array, swap] = yield [j, j+1, sorted, comparisions, accesses];

      if(array[j] > array[j+1]) {
        accesses += 4;
        swap(j, j+1);
      }
    }
    sorted = [j, ...sorted];
  }
  sorted = [0, ...sorted];
  yield [undefined, undefined, sorted, comparisions, accesses];

  return;
}

export class Sorter extends Component<SorterProps, SorterState> {
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
        generator: bubbleSort(this.state.values, this.swap),
      });
      console.log(this.state.values);
    }
  }

  swap(i: number, j: number) {
    this.setState((prevState) => {
      const temp = cloneArray(prevState.values);

      [temp[i], temp[j]] = [temp[j], temp[i]];

      return {values: temp}
    })
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
        const [i, j, sorted, comp, acc] = result;

        this.setState({
          compared: [i, j],
          sorted: sorted,
          comparisons: comp,
          arrayAccesses: acc,
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