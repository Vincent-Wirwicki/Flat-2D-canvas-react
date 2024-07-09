import { RefObject, useEffect, useRef } from "react";

const useWaveGif = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const rafRef = useRef<number | null>(0);

  useEffect(() => {
    if (!canvasRef.current) return console.error("canvas ref is missing");
    const canvas = canvasRef.current;
    const parentEl = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("canvas context error");
    if (!parentEl) return console.error("no parents element");
    canvas.height = parentEl.offsetHeight;
    canvas.width = parentEl.offsetWidth;
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#000";

    //adapted from here https://bleuje.com/tutorial2/
    const totalFrame = 60;
    let frameCount = 0;

    //lerp and constrain value some sort of clamp
    const map = (
      value: number,
      min1: number,
      max1: number,
      min2: number,
      max2: number
    ) => ((value - min1) / (max1 - min1)) * (max2 - min2) + min2;

    const dist = (x1: number, y1: number, x2: number, y2: number) => {
      const x = x2 - x1;
      const y = y2 - y1;
      return Math.sqrt(x * x + y * y);
    };
    //sin interval of [-1,1] map to [2,8]
    const period = (p: number) => map(Math.sin(2 * Math.PI * p), -1, 1, 2, 8);

    const offset = (x: number, y: number) =>
      0.01 * dist(x, y, canvas.width / 2, canvas.height / 2);

    const draw = () => {
      const loop = frameCount / totalFrame;
      //w = wave radius
      const w = 80;
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < w; j++) {
          const x = map(i, 0, w, 0, canvas.width);
          const y = map(j, 0, w, 0, canvas.height);
          // looping
          const size = period(loop - offset(x, y));
          ctx.save();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.fillRect(x, y, size, size);
          ctx.restore();
        }
      }
    };

    const render = () => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
      if (frameCount === totalFrame) frameCount = 0;
      frameCount++;
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [canvasRef]);
};

export default useWaveGif;
