import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Canvas } from "../Canvas/Canvas";
import { AlgorithmNames } from "./SorterAlgorithms";
import { SorterLogic } from "./SorterLogic";
import styles from './Sorter.module.scss';

type SorterProps = {
  data: number[];
  algorithm?: AlgorithmNames;
  sleepTime?: number,
  run?: boolean,
  border?: number;
  defaultColor?: string;
  comparedColor?: string;
  sortedColor?: string;
};

export function Sorter ({
  data, 
  algorithm = 'BubbleSort', 
  sleepTime = 100, 
  run = false,
  border = 0.5,
  defaultColor = 'lightblue',
  comparedColor = 'darkblue',
  sortedColor = 'green',
}: SorterProps) {
  const [logic, setLogic] = useState<SorterLogic>();

  useEffect(() => {
    return () => {logic?.pause(); console.log('cleanup')}
  }, [logic]);

  useEffect(() => {
    setLogic(new SorterLogic(data, algorithm, sleepTime));
  }, [data, algorithm, sleepTime]);

  useEffect(() => {
    if(run) {
      logic?.start();
    } else {
      logic?.pause();
    }
  }, [logic, run]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    if(logic) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const borderWidth = Math.ceil(Math.max(width, height) / 100 * border)
      const innerWidth = width - 2 * borderWidth;
      const innerHeight = height - 2 * borderWidth;

      ctx.clearRect(0, 0, width, height);

      const {values, lastCompared, indicesSorted} = logic.getLastState();

      const elementWidth = Math.floor(innerWidth / values.length);
      const offset = (width - elementWidth * values.length) / 2;

      if(borderWidth > 0)
      {
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(offset - borderWidth * 0.5, borderWidth * 0.5, width - 2 * offset + borderWidth, innerHeight + borderWidth);
      }


      values.forEach((value, i) => {
        let color = defaultColor;

        if(indicesSorted.has(i)) color = sortedColor;
        if(lastCompared.includes(i)) color = comparedColor;

        ctx.fillStyle = color;
        ctx.fillRect(offset + elementWidth * i, innerHeight + borderWidth - innerHeight*value, elementWidth, innerHeight*value)
      });

    }

  }, [logic, border, defaultColor, comparedColor, sortedColor]);

  return (
    <div className={styles.sorter}>
      <Canvas draw={draw}/>
    </div>
  );
}