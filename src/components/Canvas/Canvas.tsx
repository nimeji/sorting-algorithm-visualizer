import styles from './Canvas.module.scss';
import { useEffect } from "react";
import { useRef } from "react";
import { useResizeObserver } from '../../hooks/useResizeObserver';

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameTime: number, avgFrameTime: number, frameCount: number) => void;
  setup?: (ctx: CanvasRenderingContext2D) => void;
  redraw?: () => boolean;
}

export function Canvas ({draw, setup, redraw=()=>true}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameTime = useRef(1000);
  const frameCount = useRef(0);
  const lastFrameTime = useRef(0);

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
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if(!context) return;

    if(setup) {
      setup(context);
    }
    
    let t0 = performance.now();

    let animationFrameId: number;

    const render = () => {
      if(redraw()) {
        frameCount.current++;
        const t1 = performance.now()
        lastFrameTime.current = t1 - t0;
        draw(context, lastFrameTime.current, frameTime.current, frameCount.current);
        t0 = t1;
      }

      frameTime.current += (lastFrameTime.current - frameTime.current) / 20;
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [redraw, draw, setup]);

  return <canvas ref={canvasRef} className={styles.canvas} />
}