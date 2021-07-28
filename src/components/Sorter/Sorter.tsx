import styles from './Sorter.module.scss';

import { SorterValue } from "../SorterValue/SorterValue";
import { Component } from 'react';
import { SorterLogic } from './SorterLogic';

export type SorterProps = {
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
    decimals: 1,
    delay: 100,
    updateInterval: 1000/24,
  }

  private timeout: NodeJS.Timeout | undefined;
  private static minUpdateInterval = 50;

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      buttonDisabled: false,
      logic: new SorterLogic(props.data, props.delay),
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        logic: new SorterLogic(this.props.data, this.props.delay),
      });
    }
  }

  update() {
    if(this.state.logic.didUpdate()) {
      this.forceUpdate();
    }
  }

  start() {
    this.state.logic.start();

    if(!this.timeout) {
      this.timeout = setInterval(() => this.update(), Math.max(this.props.updateInterval, Sorter.minUpdateInterval));
    }

    this.setState({
      buttonDisabled: true,
    });
  }

  pause() {
    this.state.logic.pause();

    if(this.timeout) {
      clearInterval(this.timeout);
      this.timeout = undefined;
    }

    this.setState({
      buttonDisabled: false,
    });
  }

  reset() {
    this.pause();

    this.setState({
      logic: new SorterLogic(this.props.data, this.props.delay),
    })
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