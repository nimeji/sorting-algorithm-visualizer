import styles from './Canvas.module.scss';
import { useEffect } from "react";
import { useRef } from "react";
import { useResizeObserver } from '../../hooks/useResizeObserver';

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameTime: number, avgFrameTime: number, frameCount: number) => void;
  redraw?: () => boolean;
}

export function Canvas ({draw, redraw=()=>true}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameTime = useRef(1000);
  const frameCount = useRef(0);
  const lastFrameTime = useRef(0);

  const wrapperDimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = canvasRef.current
    if(canvas) {
      canvas.width = wrapperDimensions?.width || 0
      canvas.height = wrapperDimensions?.height || 0;

      const context = canvas.getContext('2d');
      if(context) draw(context, frameTime.current, frameTime.current, frameCount.current);
    }
  }, [wrapperDimensions, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if(!context) return;

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
  }, [redraw, draw]);

  return (
    <div ref={wrapperRef} className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}