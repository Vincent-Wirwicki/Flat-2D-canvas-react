import { useRef, useState } from "react";
import useTheWall from "./useTheWall";

const TheWall = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useTheWall(canvasRef, isHover);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <canvas className="canvas-fit" ref={canvasRef} />
    </div>
  );
};

export default TheWall;
