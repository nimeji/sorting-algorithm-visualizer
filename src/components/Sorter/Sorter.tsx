import { Component } from "react";
import { Canvas } from "../Canvas/Canvas";
import { AlgorithmName } from "./SorterAlgorithms";
import { SorterLogic } from "./SorterLogic";
import styles from './Sorter.module.scss';

type SorterProps = {
  data: number[];
  algorithm: AlgorithmName;
  sleepTime: number,
  run: boolean,
  border: number;
  defaultColor: string;
  comparedColor: string;
  sortedColor: string;
  onFinished?: () => void;
};

type SorterState = {
  logic: SorterLogic,
};

export class Sorter extends Component<SorterProps, SorterState> {
  static defaultProps = { 
    algorithm: 'BubbleSort', 
    sleepTime: 100, 
    run: false,
    border: 1,
    defaultColor: 'lightblue',
    comparedColor: 'red',
    sortedColor: 'green',
  };

  constructor(props: SorterProps) {
    super(props);

    this.state = {
      logic: new SorterLogic(props.data, props.algorithm, props.sleepTime, props.onFinished),
    };

    this.draw= this.draw.bind(this);
  }

  componentDidMount() {
    if(this.props.run) this.start();
  }

  componentDidUpdate(prevProps: SorterProps, prevState: SorterState) {
    const { data, algorithm, sleepTime, run } = this.props;
    const { logic } = this.state;

    if (prevState.logic !== logic) {
      prevState.logic.pause();
      if(run) this.start();
    }

    if (prevProps.data !== data || prevProps.algorithm !== algorithm) {
      this.reset();
    }

    if (prevProps.sleepTime !== sleepTime) {
      logic.setDelay(sleepTime);
    }
    
    if (prevProps.run !== run) {
      if(run) this.start();
      else this.pause();
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

  reset() {
    const { data, algorithm, sleepTime, onFinished } = this.props;

    this.setState({
      logic: new SorterLogic(data, algorithm, sleepTime, onFinished),
    });
  }

  isRunning() {
    return this.state.logic.isRunning();
  }

  isFinished() {
    return this.state.logic.isFinished();
  }

  draw (ctx: CanvasRenderingContext2D, frameTime:number, avgFrameTime: number) {
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

      ctx.clearRect(0, 0, width, height);

      const {values, lastCompared, indicesSorted, comparisons, accesses} = logic.getLastState();

      const elementWidth = Math.floor(innerWidth / values.length);
      const offset = (width - elementWidth * values.length) / 2;

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

      if(!logic.isFinished()) {
        ctx.fillText(`fps: ${(1000/avgFrameTime).toFixed(0)}`, textX, textY + fontSize * 5);
        return true;
      } else {
        ctx.fillText('fps: -', textX, textY + fontSize * 5);
        return false;
      }

    }
    return false;
  }

  render() {
    return (
      <div className={styles.sorter}>
        <Canvas draw={this.draw} />
      </div>
    );
  }
}



  // const [logic, setLogic] = useState<SorterLogic>();

  // useEffect(() => {
  //   return () => {logic?.pause();}
  // }, [logic]);

  // useEffect(() => {
  //   setLogic(new SorterLogic(data, algorithm, sleepTime));
  // }, [data, algorithm, sleepTime]);

  // useEffect(() => {
  //   if(run) {
  //     logic?.start();
  //   } else {
  //     logic?.pause();
  //   }
  // }, [logic, run]);

  // draw (ctx: CanvasRenderingContext2D, _, frameTime: number) => {
  //   if(logic) {
  //     const width = ctx.canvas.width;
  //     const height = ctx.canvas.height;
  //     const borderWidth = Math.ceil(Math.max(width, height) / 100 * border)
  //     const innerWidth = width - 2 * borderWidth;
  //     const innerHeight = height - 2 * borderWidth;

  //     ctx.clearRect(0, 0, width, height);

  //     const {values, lastCompared, indicesSorted, comparisons, accesses} = logic.getLastState();

  //     const elementWidth = Math.floor(innerWidth / values.length);
  //     const offset = (width - elementWidth * values.length) / 2;

  //     values.forEach((value, i) => {
  //       let color = defaultColor;

  //       if(indicesSorted.has(i)) color = sortedColor;
  //       if(lastCompared.includes(i)) color = comparedColor;

  //       ctx.fillStyle = color;
  //       ctx.fillRect(offset + elementWidth * i, innerHeight + borderWidth - innerHeight*value, elementWidth*1.05, innerHeight*value)
  //     });

  //     if(borderWidth > 0)
  //     {
  //       ctx.lineWidth = borderWidth;
  //       ctx.strokeStyle = 'black';
  //       ctx.strokeRect(offset - borderWidth * 0.5, borderWidth * 0.5, (width - 2 * offset + borderWidth), innerHeight + borderWidth);
  //     }

  //     const fontSize = innerHeight / 20;
  //     const textX = offset + borderWidth
  //     const textY = borderWidth;
  //     ctx.font = `${fontSize}px sans-serif`;
  //     ctx.fillStyle = 'black';
  //     ctx.fillText(`Comparisons: ${comparisons}`,textX, textY  + fontSize);
  //     ctx.fillText(`Array Accesses: ${accesses}`, textX, textY  + fontSize * 2);
  //     ctx.fillText(`Real Time: ${logic.getRealTime().toFixed(1)}ms`, textX, textY + fontSize * 3);
  //     ctx.fillText(`Sleep Time: ${(logic.getSleepTime()/1000).toFixed(1)}s`, textX, textY + fontSize * 4);

  //     if(!logic.isFinished()) {
  //       ctx.fillText(`fps: ${(1000/frameTime).toFixed(0)}`, textX, textY + fontSize * 5);
  //       return true;
  //     } else {
  //       ctx.fillText('fps: -', textX, textY + fontSize * 5);
  //       return false;
  //     }

  //   }
  //   return false;
  // }

//   render() {
//     <div className={styles.sorter}>
//       <Canvas draw={this.draw} />
//     </div>
//   }
// }