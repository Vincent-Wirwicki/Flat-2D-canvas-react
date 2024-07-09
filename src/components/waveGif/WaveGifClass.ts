export class WaveGifClass {
  totalFrame: number;
  frame: number;
  frameId: number | null;
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.totalFrame = 60;
    this.frame = 0;
    this.frameId = requestAnimationFrame(() => this.render());
  }
  dist(x1: number, y1: number, x2: number, y2: number) {
    const x = x2 - x1;
    const y = y2 - y1;
    return Math.sqrt(x * x + y * y);
  }
  map(value: number, min1: number, max1: number, min2: number, max2: number) {
    return ((value - min1) / (max1 - min1)) * (max2 - min2) + min2;
  }
  period(p: number) {
    return this.map(Math.sin(2 * Math.PI * p), -1, 1, 2, 8);
  }
  offset(x: number, y: number) {
    return 0.01 * this.dist(x, y, this.w / 2, this.h / 2);
  }
  draw() {
    const loop = this.frame / this.totalFrame;
    const w = 80;
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < w; j++) {
        const x = this.map(i, 0, w, 0, this.w);
        const y = this.map(j, 0, w, 0, this.h);
        // looping
        const size = this.period(loop - this.offset(x, y));
        this.ctx.save();
        this.ctx.fillStyle = "#fff";
        this.ctx.beginPath();
        this.ctx.fillRect(x, y, size, size);
        this.ctx.restore();
      }
    }
  }
  render() {
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.draw();
    if (this.frame === this.totalFrame) this.frame = 0;
    this.frame++;
    this.frameId = requestAnimationFrame(() => this.render());
  }

  stop() {
    this.ctx.fillRect(0, 0, this.w, this.h);
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
}
