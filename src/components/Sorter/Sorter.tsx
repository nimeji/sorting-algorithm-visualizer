import { Component } from "react";
import { Canvas } from "../Canvas/Canvas";
import { AlgorithmName } from "./SorterAlgorithms";
import { SorterLogic } from "./SorterLogic";
import styles from './Sorter.module.scss';

type SorterProps = {
  data: number[];
  algorithm: AlgorithmName;
  sleepTime: number,
  border: number;
  defaultColor: string;
  comparedColor: string;
  sortedColor: string;
  onFinished?: () => void;
  onMaxValuesChange?: (maxValues: number) => void;
};

type SorterState = {
  logic: SorterLogic;
};

export class Sorter extends Component<SorterProps, SorterState> {
  static defaultProps = { 
    algorithm: 'BubbleSort', 
    sleepTime: 100, 
    border: 1,
    defaultColor: 'lightblue',
    comparedColor: 'red',
    sortedColor: 'green',
  };

  private maxValues = 0;

  constructor(props: SorterProps) {
    super(props);

    this.redraw = this.redraw.bind(this);
    this.draw= this.draw.bind(this);
    this.onFinished = this.onFinished.bind(this);

    const logic = new SorterLogic(props.data, props.algorithm, props.sleepTime, this.onFinished)

    this.state = {
      logic: logic,
    };
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    const { data, algorithm, sleepTime } = this.props;
    const { logic } = this.state;

    if (prevState.logic !== logic) {
      prevState.logic.pause();
    }

    if (prevProps.data !== data || prevProps.algorithm !== algorithm) {
      this.reset();
    }

    if (prevProps.sleepTime !== sleepTime) {
      logic.setDelay(sleepTime);
    }
  }

  componentWillUnmount() {
    this.pause();
  }

  start() {
    this.state.logic.start();
  }

  pause() {
    this.state.logic.pause();
  }

  onFinished() {
    const { onFinished } = this.props;

    this.pause();
    if(onFinished) onFinished();
  }

  reset() {
    const { data, algorithm, sleepTime } = this.props;

    const logic = new SorterLogic(data, algorithm, sleepTime, this.onFinished);

    this.setState({
      logic: logic,
    });
  }

  isRunning() {
    return this.state.logic.isRunning();
  }

  isFinished() {
    return this.state.logic.isFinished();
  }

  private setMaxValues(maxValues: number) {
    const { onMaxValuesChange } = this.props;

    if(onMaxValuesChange && maxValues !== this.maxValues) {
      onMaxValuesChange(maxValues);
    }
    this.maxValues = maxValues;
  }

  private redraw() {
    return this.state.logic.didUpdate();
  }

  private draw (ctx: CanvasRenderingContext2D, frameTime:number, avgFrameTime: number) {
    const {
      border,
      defaultColor,
      sortedColor,
      comparedColor,
    } = this.props;

    const { logic } = this.state;

    if(logic) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const borderWidth = Math.ceil(Math.max(width, height) / 100 * border * 0.5)
      const innerWidth = width - 2 * borderWidth;
      const innerHeight = height - 2 * borderWidth;

      this.setMaxValues(innerWidth);

      ctx.clearRect(0, 0, width, height);

      const {values, lastCompared, indicesSorted, comparisons, accesses} = logic.getLastState();

      const elementWidth = Math.floor(innerWidth / values.length);
      const offset = (width - elementWidth * values.length) / 2;

      ctx.fillStyle = 'white';
      ctx.fillRect(offset-borderWidth, borderWidth, innerWidth, innerHeight);

      values.forEach((value, i) => {
        let color = defaultColor;

        if(indicesSorted.has(i)) color = sortedColor;
        if(lastCompared.includes(i)) color = comparedColor;

        ctx.fillStyle = color;
        ctx.fillRect(offset + elementWidth * i, innerHeight + borderWidth - innerHeight*value, elementWidth*1.05, innerHeight*value)
      });

      if(borderWidth > 0)
      {
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(offset - borderWidth * 0.5, borderWidth * 0.5, (width - 2 * offset + borderWidth), innerHeight + borderWidth);
      }

      const fontSize = innerHeight / 20;
      const textX = offset + borderWidth
      const textY = borderWidth;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = 'black';
      ctx.fillText(`Comparisons: ${comparisons}`,textX, textY  + fontSize);
      ctx.fillText(`Array Accesses: ${accesses}`, textX, textY  + fontSize * 2);
      ctx.fillText(`Real Time: ${logic.getRealTime().toFixed(1)}ms`, textX, textY + fontSize * 3);
      ctx.fillText(`Sleep Time: ${(logic.getSleepTime()/1000).toFixed(1)}s`, textX, textY + fontSize * 4);

      if(logic.isRunning()) {
        ctx.fillText(`fps: ${(1000/avgFrameTime).toFixed(0)}`, textX, textY + fontSize * 5);
      } else {
        ctx.fillText('fps: -', textX, textY + fontSize * 5);
      }
    }
  }

  render() {
    return (
      <div className={styles.sorter}>
        <Canvas draw={this.draw} redraw={this.redraw} />
      </div>
    );
  }
}
