import styles from './Canvas.module.scss';
import { useEffect } from "react";
import { useRef } from "react";
import { useResizeObserver } from '../../hooks/useResizeObserver';

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameTime: number, avgFrameTime: number, frameCount: number) => void
  setup?: (ctx: CanvasRenderingContext2D) => void,
}

export function Canvas ({draw, setup}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasDimensions = useResizeObserver(canvasRef);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if(context) {
      context.canvas.width = canvasDimensions?.width || 0
      context.canvas.height = canvasDimensions?.height || 0;

      if (setup) {
        setup(context);
      }
    }
  }, [canvasDimensions, setup]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if(!context) return;

    if(setup) {
      setup(context);
    }

    let frameCount = 0
    let t0 = performance.now();
    let frameTime = 0;

    let animationFrameId: number;


    const render = () => {
      frameCount++;
      const t1 = performance.now()
      frameTime += (t1 - t0 - frameTime) / 20;

      draw(context, t1 - t0, frameTime, frameCount);
      t0 = t1;

      animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw, setup]);

  return <canvas ref={canvasRef} className={styles.canvas} />
}