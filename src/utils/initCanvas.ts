import { RefObject } from "react";

export const initCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  if (!canvasRef.current) return console.error("canvas ref is missing");
  const canvas = canvasRef.current;
  const ctx = canvasRef.current.getContext("2D");
  if (!ctx) return console.error("canvas ref is missing");
  return { canvas, ctx };
};
