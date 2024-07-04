import { useCallback, useEffect, useRef, RefObject, useMemo } from "react";
// import useThrottle from "../../hooks/useThrottle";
interface ConfigArgs {
  color: string;
  radius: number;
  density: number;
  maxDist: number;
}

const useConstellation32Array = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: ConfigArgs
): void => {
  const rafRef = useRef<number>(0);
  const randomizePos = (radius: number, max: number) =>
    radius + Math.random() * (max - radius * 2);
  const randomizeSpeed = () => Math.random() * 1 - 0.6;

  const initPos = useCallback(() => {
    if (!canvasRef.current) return console.error("oups");
    const positions = new Float32Array(config.density * 2);
    for (let i = 0; i < config.density; i++) {
      const stride = i * 2;
      positions[stride] = randomizePos(config.radius, canvasRef.current.width);
      positions[stride + 1] = randomizePos(
        config.radius,
        canvasRef.current.height
      );
    }
    return positions;
  }, [canvasRef, config]);

  const velocities = useMemo(() => {
    const velocities = new Float32Array(config.density * 2);
    for (let i = 0; i < config.density; i++) {
      const stride = i * 2;
      velocities[stride] = randomizeSpeed();
      velocities[stride + 1] = randomizeSpeed();
    }
    return velocities;
  }, [config]);

  // update particules positions
  const update = useCallback(
    (ctx: CanvasRenderingContext2D, positions: Float32Array) => {
      if (!canvasRef.current || !velocities) return;
      for (let i = 0; i < positions.length; i++) {
        const stride = i * 2;
        positions[stride] += velocities[stride];
        positions[stride + 1] += velocities[stride + 1];
        //check if particule reach canvas limit
        if (
          positions[stride] < config.radius ||
          positions[stride] > canvasRef.current.width - config.radius
        )
          velocities[stride] *= -1;
        if (
          positions[stride + 1] < config.radius ||
          positions[stride + 1] > canvasRef.current.height - config.radius
        )
          velocities[stride + 1] *= -1;
        ctx.beginPath();
        ctx.arc(positions[stride], positions[stride + 1], 1, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [canvasRef, velocities, config]
  );

  //check distance between particules and connect if there are in range
  const connect = useCallback(
    (ctx: CanvasRenderingContext2D, positions: Float32Array) => {
      if (!positions) return;
      for (let x = 0; x < positions.length; x++) {
        for (let y = x; y < positions.length; y++) {
          const sx = x * 2;
          const sy = y * 2;
          const distX = positions[sx] - positions[sy];
          const distY = positions[sx + 1] - positions[sy + 1];
          const dist = Math.hypot(distX, distY);
          const opacity = 1 - dist / config.maxDist;
          if (dist < config.maxDist) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(positions[sx], positions[sx + 1]);
            ctx.lineTo(positions[sy], positions[sy + 1]);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    },
    [config.maxDist]
  );
  //render part
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return console.error("canvas ref is missing");
    const parentEl = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    if (!parentEl || !ctx) return console.error("parent element missing");
    canvas.height = parentEl.offsetHeight;
    canvas.width = parentEl.offsetWidth;

    ctx.fillStyle = config.color;
    ctx.strokeStyle = config.color;

    const positions = initPos();
    if (!positions) return console.error("positions error");
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update(ctx, positions);
      // draw(ctx);
      connect(ctx, positions);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [canvasRef, config.color, connect, update, initPos]);

  //   return { config, setConfig };
};

export default useConstellation32Array;
