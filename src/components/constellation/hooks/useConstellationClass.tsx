import { RefObject, useEffect } from "react";
import { ConstellationRender } from "./class/ConstellationRender";

const useConstellationClass = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return console.error("canvas ref is missing");
    const parentEl = canvas.parentElement;
    if (!parentEl) return console.error("canvas need a parent");
    canvas.height = parentEl.offsetHeight;
    canvas.width = parentEl.offsetWidth;
    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("missing 2D context");

    const constellation = new ConstellationRender(ctx, 300, 50);
    constellation.render();
    return () => constellation.stop();
  });
};

export default useConstellationClass;
