import { useRef } from "react";
import useResizeReload from "../../hooks/useResizeReload";
import useWaveGif from "./useWaveGif";

const WaveGif = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useWaveGif(canvasRef);

  useResizeReload();
  return <canvas ref={canvasRef}></canvas>;
};

export default WaveGif;
