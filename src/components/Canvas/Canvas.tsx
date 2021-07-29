import styles from './Canvas.module.scss';
import { useEffect } from "react";
import { useRef } from "react";
import { useResizeObserver } from '../../hooks/useResizeObserver';

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number)=>void
}

export function Canvas ({draw}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasDimensions = useResizeObserver(canvasRef);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if(context) {
      context.canvas.width = canvasDimensions?.width || 0
      context.canvas.height = canvasDimensions?.height || 0;
    }
  }, [canvasDimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    
    let frameCount = 0
    let animationFrameId: number;

    const render = () => {
      frameCount++
      draw(context!, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }

  }, [draw]);

  return <canvas ref={canvasRef} className={styles.canvas} />
}