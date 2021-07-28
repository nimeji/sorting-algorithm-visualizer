import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { Component } from 'react';
import { SorterLogic } from './SorterLogic';
import { algorithms } from './SorterAlgorithms';

export type SorterProps = {
  algorithm: keyof typeof algorithms;
  data: number[];
  decimals?: number;
  delay: number;
  updateInterval: number;
}

type SorterState = {
  buttonDisabled: boolean;
  logic: SorterLogic;
}

export class Sorter extends Component<SorterProps, SorterState> {
  static defaultProps = {
    algorithm: 'BubbleSort',
    decimals: 1,
    delay: 100,
    updateInterval: 1000/24,
  }

  private static minUpdateInterval = 50;

  private timeout = 0;
  private running = false;

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      buttonDisabled: false,
      logic: new SorterLogic(props.data, this.props.algorithm, props.delay),
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data || prevProps.algorithm !== this.props.algorithm) {
      this.reset();
    }
  }

  update() {
    if(this.state.logic.didUpdate()) {
      this.forceUpdate();
    }
  }

  start() {
    if(!this.running) {
      this.state.logic.start();
      this.timeout = window.setInterval(() => this.update(), Math.max(this.props.updateInterval, Sorter.minUpdateInterval));
      this.running = true;
    }

    this.setState({
      buttonDisabled: true,
    });
  }

  pause() {
    if(this.running) {
      this.state.logic.pause();
      clearInterval(this.timeout);
      this.running = false;
    }

    this.setState({
      buttonDisabled: false,
    });
  }

  reset() {
    this.pause();

    this.setState({
      logic: new SorterLogic(this.props.data, this.props.algorithm, this.props.delay),
    });
  }

  isRunning() {
    return this.running;
  }

  render() {
    const { 
      buttonDisabled,
      logic,
    } = this.state;

    const { decimals } = this.props;

    const {values, indicesSorted, lastCompared, comparisons, accesses} = logic.getLastState();

    const elements = [];
    for(let i = 0; i < values.length; i++) {
      elements[i] = <SorterValue 
        key={i} 
        height={values[i] * 100} 
        width={100/values.length} 
        selected={lastCompared.includes(i)}
        sorted={indicesSorted.includes(i)}
      />
    }

    return (
      <div className={styles.Container}>
        <div className={styles.ValueContainer}>
          {elements}
        </div>
        <div className={styles.Metrics}>
          <div>Comparisons: <span id="comparisons">{comparisons}</span></div>
          <div>Array Accesses: <span id="accesses">{accesses}</span></div>
          <div>Real Time: <span id="real-time">{logic.getRealTime().toFixed(decimals)}</span>ms</div>
          <div>Sleep Time: <span id="sleep-time">{logic.getSleepTime().toFixed(decimals)}</span>ms</div>
        </div>

        <button
          id="btn-start"
          onClick={this.start}
          disabled={buttonDisabled}
        >Start</button>
        <button
          id="btn-pause"
          onClick={this.pause}
        >Pause</button>
        <button
          id="btn-reset"
          onClick={this.reset}
        >Reset</button>
      </div>
    );
  }
}