import { RefObject, useMemo } from "react";

const useInitCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const data = useMemo(() => {
    const canvas = ref.current;
    if (!canvas) return console.error("canvas ref is missing");
    const parentEl = canvas.parentElement;
    if (!parentEl) return console.error("canvas need a parent");
    canvas.height = parentEl.offsetHeight;
    canvas.width = parentEl.offsetWidth;
    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("canvas lost context");

    return { ctx, canvas };
  }, [ref]);

  return data;
};

export default useInitCanvas;
