import { useEffect, useRef } from "react";

const Clifford = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 0.5;
    // a,b,c and d are floating point values bewteen -3 and +3
    const clifford = (a: number, b: number, c: number, d: number) => {
      const { sin, cos } = Math;
      const scale = 50;
      const steps = 4000;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      let x = 0;
      let y = 0;
      let nx = 0;
      let ny = 0;
      ctx.beginPath();
      for (let i = 0; i < steps; i++) {
        nx = sin(a * y) + c * cos(a * x);
        ny = sin(b * x) + d * cos(b * y);
        ctx.rect(x * scale + cx, y * scale + cy, 1, 1);
        const opacity = i / steps;
        ctx.globalAlpha = opacity;
        x = nx;
        y = ny;
      }
      ctx.fill();
    };

    clifford(1.7, 1.8, -0.5, 1.2);
  }, []);

  return <canvas ref={canvasRef} style={{ border: "1px solid #fff" }}></canvas>;
};

export default Clifford;
