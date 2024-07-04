import { useEffect, useRef } from "react";

const Lab = () => {
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
    ctx.lineWidth = 0.15;

    const fibonacciSphere = (samples: number) => {
      const points = new Float32Array(samples * 2);
      const phi = Math.PI * (Math.sqrt(10) - 1);

      for (let i = 0; i < samples; i++) {
        const strides = i * 2;
        const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y * y * y); // radius at y

        const theta = phi * i; // golden angle increment

        const x = Math.cos(theta) * radius;
        // const z = Math.sin(theta) * radius; if 3D needed

        points[strides] = x;
        points[strides + 1] = y;
      }

      return points;
    };
    // hilbert
    // Here, "F" means "draw forward", "+" means "turn left 90°", "-" means "turn right 90°" (see turtle graphics), and "A" and "B" are ignored during drawing.

    // A → +F−F−F+ = l90 - F - r90 - F - r90 -F l90
    // B → −AF+BFB+FA− = r90
    const drawPoints = (
      points: Float32Array,
      ctx: CanvasRenderingContext2D
    ) => {
      // Projection parameters
      const scale = 200;
      const offsetX = canvas.width / 2;
      const offsetY = canvas.height / 2;

      for (let i = 0; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];

        // Simple orthographic projection
        const projectedX = x * scale + offsetX;
        const projectedY = y * scale + offsetY;

        // Draw point
        ctx.beginPath();
        // ctx.arc(projectedX, projectedY, 0.75, 0, Math.PI * 2);
        ctx.fillRect(projectedX, projectedY, 0.75, 0.75);
        ctx.fill();
      }
    };

    const points = fibonacciSphere(4000);
    drawPoints(points, ctx);
  }, []);

  return <canvas ref={canvasRef} style={{ border: "1px solid #fff" }}></canvas>;
};

export default Lab;
