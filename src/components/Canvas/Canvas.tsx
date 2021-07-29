import styles from './Canvas.module.scss';
import { useEffect } from "react";
import { useRef } from "react";
import { useResizeObserver } from '../../hooks/useResizeObserver';

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameTime: number, avgFrameTime: number, frameCount: number) => boolean;
  setup?: (ctx: CanvasRenderingContext2D) => void;
  run?: boolean;
}

export function Canvas ({draw, setup, run=true}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameTime = useRef(0);
  const frameCount = useRef(0);

  const canvasDimensions = useResizeObserver(canvasRef);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if(context) {
      context.canvas.width = canvasDimensions?.width || 0
      context.canvas.height = canvasDimensions?.height || 0;

      if (setup) {
        setup(context);
      }

      draw(context, frameTime.current, frameTime.current, frameCount.current);
    }
  }, [canvasDimensions, setup, draw]);

  useEffect(() => {
    if(!run) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if(!context) return;

    if(setup) {
      setup(context);
    }

    let t0 = performance.now();

    let animationFrameId: number;

    const render = () => {
      frameCount.current++;
      const t1 = performance.now()
      frameTime.current += (t1 - t0 - frameTime.current) / 20;

      const repeatDraw = draw(context, t1 - t0, frameTime.current, frameCount.current);
      t0 = t1;
      if(repeatDraw) animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [run, draw, setup]);

  return <canvas ref={canvasRef} className={styles.canvas} />
}