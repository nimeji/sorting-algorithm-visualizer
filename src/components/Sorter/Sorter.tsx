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

  private static minUpdateInterval = 50;

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      buttonDisabled: false,
      logic: new SorterLogic(props.data, props.delay),
    };

    this.start = this.start.bind(this);
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        logic: new SorterLogic(this.props.data, this.props.delay),
      });
    }
  }

  start() {
    this.state.logic.start();

    setInterval(() => {
      if(this.state.logic.didUpdate()) {
        this.forceUpdate();
      }
    }, Math.max(this.props.updateInterval, Sorter.minUpdateInterval));

    this.setState({
      buttonDisabled: true,
    })
  }

  render() {
    const { 
      buttonDisabled,
      logic,
    } = this.state;

    const { decimals } = this.props;

    const [values, sorted, lastCompared, comparisons, accesses] = logic.getLastState();

    const elements = [];
    for(let i = 0; i < values.length; i++) {
      elements[i] = <SorterValue 
        key={i} 
        height={values[i] * 100} 
        width={100/values.length} 
        selected={lastCompared.includes(i)}
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
          <div id="accesses">Array Accesses: <span>{accesses}</span></div>
          <div id="real-time">Real Time: <span>{logic.getRealTime().toFixed(decimals)}</span>ms</div>
          <div id="sleep-time">Sleep Time: <span>{logic.getSleepTime().toFixed(decimals)}</span>ms</div>
        </div>

        <button 
          onClick={this.start}
          disabled={buttonDisabled}
        >Start</button>
      </div>
    );
  }
}