import { useRef, useState } from "react";
import useConstellation from "./useConstellation";

const Constellation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [config] = useState({
    color: "#b91c1c",
    radius: 1,
    density: 200,
    maxDist: 80,
  });
  useConstellation(canvasRef, config);
  return <canvas ref={canvasRef}></canvas>;
};

export default Constellation;
