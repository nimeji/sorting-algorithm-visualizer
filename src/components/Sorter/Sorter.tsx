import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { Component } from 'react';
import { SorterArray } from './SorterArray';

export type SorterProps = {
  data: number[];
  decimals?: number;
  delay: number;
  updateInterval: number;
}

type SorterState = {
  buttonDisabled: boolean;
  generator: Generator | undefined;
  sorted: number[];
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
  static minDelay = 10;
  static minUpdateInterval = 10;

  private compared: [number | undefined, number | undefined] = [undefined, undefined];
  private realTime: number = 0;
  private sleepTime: number = 0;
  private sorted: number[] = [];
  private values: SorterArray = new SorterArray([], () => true);
  private needUpdate: boolean = false;
  private currentStep: number = 0;
  private t0: number = 0;
  private sleepT0: number = 0;
  private trueDelay: number = 0;

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      buttonDisabled: false,
      generator: undefined,
      sorted: [],
    };

    this.start = this.start.bind(this);
    this.updateLoop = this.updateLoop.bind(this);
  }

  initValues() {
    this.values = new SorterArray(this.props.data, Sorter.compareFn);
    this.forceUpdate();
  }

  componentDidMount() {
    this.trueDelay = Math.max(Sorter.minDelay, this.props.delay);
    this.initValues();
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        generator: undefined,
      });

      this.initValues();
    }

    if (this.values.length > 0 && !this.state.generator) {
      this.setState({
        generator: bubbleSort(this.values),
      });
    }

    if(prevProps.delay !== this.props.delay) {
      this.trueDelay = Math.max(Sorter.minDelay, this.props.delay);
    }
  }

  runNext() {
    const {
      generator,
    } = this.state;

    if(generator) {
      const result = generator.next().value;

      if(result){
        const [i, j, sorted] = result;

        this.compared = [i, j];
        this.sorted = sorted;

        return true;
      } else {
        this.compared = [undefined, undefined];
      }

      return false;
    }
  }
  
  updateLoop() {
    this.sleepTime = this.sleepTime + performance.now() - this.sleepT0;

    let hasNext;
    do {
      hasNext = this.runNext();
      this.currentStep = this.currentStep + 1;
    } while(this.sleepTime > this.props.delay * this.currentStep && hasNext)
    
    this.realTime = performance.now() - this.t0 - this.sleepTime;

    if(!hasNext) {
      this.forceUpdate()
      this.needUpdate = false;
    } else {
      this.sleepT0 = performance.now();
      this.needUpdate = true;
      setTimeout(this.updateLoop, this.trueDelay)
    }
  }

  start() {
    this.t0 = performance.now();
    this.sleepT0 = this.t0;
    setTimeout(this.updateLoop, 0);

    setInterval(() => {
      if(this.needUpdate) {
        this.forceUpdate();
        this.needUpdate = false;
      }
    }, Math.max(this.props.updateInterval, Sorter.minUpdateInterval));

    this.setState({
      buttonDisabled: true,
    })
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
          onClick={this.start}
          disabled={buttonDisabled}
        >Start</button>
      </div>
    );
  }
}