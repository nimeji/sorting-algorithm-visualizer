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
    return () => {logic?.pause();}
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

  const draw = useCallback((ctx: CanvasRenderingContext2D, _, frameTime: number) => {
    if(logic) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const borderWidth = Math.ceil(Math.max(width, height) / 100 * border)
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
        ctx.fillText(`fps: ${(1000/frameTime).toFixed(0)}`, textX, textY + fontSize * 5);
        return true;
      } else {
        ctx.fillText('fps: -', textX, textY + fontSize * 5);
        return false;
      }

    }
    return false;
  }, [logic, border, defaultColor, comparedColor, sortedColor]);

  return (
    <div className={styles.sorter}>
      <Canvas draw={draw} />
    </div>
  );
}