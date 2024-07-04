import { ConstellationParticules } from "./ConstellationParticule";

export class ConstellationRender {
  ctx: CanvasRenderingContext2D;
  frameId: number | null;
  maxDist: number;
  particles: ConstellationParticules;

  constructor(ctx: CanvasRenderingContext2D, count: number, maxDist: number) {
    this.ctx = ctx;
    this.maxDist = maxDist;
    this.particles = new ConstellationParticules(
      count,
      2,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
      this.maxDist
    );
    this.init();
    this.frameId = requestAnimationFrame(() => this.render());
  }

  init() {
    this.ctx.fillStyle = "#b91c1c";
    this.ctx.strokeStyle = "#b91c1c";
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // this.particles.draw(this.ctx);
    this.particles.update(this.ctx);
    this.particles.connect(this.ctx);
    this.frameId = requestAnimationFrame(() => this.render());
  }

  stop() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
}
