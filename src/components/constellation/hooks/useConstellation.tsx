import { useCallback, useEffect, useRef, RefObject } from "react";
// import useThrottle from "../../hooks/useThrottle";

interface ParticuleType {
  radius: number;
  pos: { x: number; y: number };
  speed: { x: number; y: number };
}

interface ConfigArgs {
  color: string;
  radius: number;
  density: number;
  maxDist: number;
}

const useConstellation = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  config: ConfigArgs
): void => {
  const particulesArrayRef = useRef<ParticuleType[]>([]);
  const rafRef = useRef<number>(0);
  const randomizePos = (radius: number, max: number) =>
    radius + Math.random() * (max - radius * 2);
  const randomizeSpeed = () => Math.random() * 1 - 0.6;

  const initParticules = useCallback(() => {
    if (!canvasRef.current) return;
    for (let i = 0; i < config.density; i++) {
      particulesArrayRef.current.push({
        radius: config.radius,
        pos: {
          x: randomizePos(config.radius, canvasRef.current.width),
          y: randomizePos(config.radius, canvasRef.current.height),
        },
        speed: {
          x: randomizeSpeed(),
          y: randomizeSpeed(),
        },
      });
    }
  }, [canvasRef, config.density, config.radius]);

  // draw particule on canvas
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, { pos, radius }: ParticuleType) => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();
      // ctx.closePath();
    },
    []
  );

  // update particules positions
  const update = useCallback(
    (ctx: CanvasRenderingContext2D, particules: ParticuleType[]) => {
      if (!canvasRef.current || !particules.length) return;
      for (let i = 0; i < particules.length; i++) {
        const { pos, speed, radius } = particules[i];
        pos.x += speed.x;
        pos.y += speed.y;
        //check if particule reach canvas limit
        if (pos.x < radius || pos.x > canvasRef.current.width - radius)
          speed.x *= -1;
        if (pos.y < radius || pos.y > canvasRef.current.height - radius)
          speed.y *= -1;
        draw(ctx, particulesArrayRef.current[i]);
      }
    },
    [particulesArrayRef, canvasRef, draw]
  );

  //check distance between particules and connect if there are in range
  const connect = useCallback(
    (ctx: CanvasRenderingContext2D, particules: ParticuleType[]) => {
      for (let x = 0; x < particules.length; x++) {
        for (let y = x; y < particules.length; y++) {
          const distX = particules[x].pos.x - particules[y].pos.x;
          const distY = particules[x].pos.y - particules[y].pos.y;
          const dist = Math.hypot(distX, distY);
          const opacity = 1 - dist / config.maxDist;
          if (dist < config.maxDist) {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particules[x].pos.x, particules[x].pos.y);
            ctx.lineTo(particules[y].pos.x, particules[y].pos.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    },
    [config.maxDist]
  );
  // reload on resize
  //render part
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return console.error("canvas ref is missing");
    const parentEl = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    if (!parentEl || !ctx) return console.error("parent element missing");
    canvas.height = parentEl.offsetHeight;
    canvas.width = parentEl.offsetWidth;

    if (!particulesArrayRef.current.length) initParticules();
    const particules = particulesArrayRef.current;
    ctx.fillStyle = config.color;
    ctx.strokeStyle = config.color;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update(ctx, particules);
      connect(ctx, particules);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef, config.color, initParticules, connect, update]);

  //   return { config, setConfig };
};

export default useConstellation;
