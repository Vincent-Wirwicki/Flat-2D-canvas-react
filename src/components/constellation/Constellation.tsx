import { useRef } from "react";
import useResizeReload from "../../hooks/useResizeReload";
import useConstellation32Array from "./hooks/useConstellation32array";
// import useConstellationClass from "./useConstellationClass";

const Constellation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useResizeReload();
  // useConstellationClass(canvasRef);
  useConstellation32Array(canvasRef, {
    color: "#b91c1c",
    radius: 1,
    density: 200,
    maxDist: 80,
  });
  return (
    <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }}></canvas>
  );
};

export default Constellation;
