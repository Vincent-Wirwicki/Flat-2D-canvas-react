const randomPos = (radius: number, max: number) =>
  radius + Math.random() * (max - radius * 2);

const randomSpeed = () => Math.random() * 1 - 0.4;

export class Particles {
  px: number;
  py: number;
  vx: number;
  vy: number;
  r: number;
  w: number;
  h: number;
  constructor(r: number, w: number, h: number) {
    this.r = r;
    this.h = h;
    this.w = w;
    this.px = randomPos(this.r, this.w);
    this.py = randomPos(this.r, this.h);
    this.vx = randomSpeed();
    this.vy = randomSpeed();
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.px, this.py, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.px += this.vx;
    this.py += this.vy;
    if (this.px < this.r || this.px > this.w - this.r) this.vx *= -1;
    if (this.py < this.r || this.py > this.h - this.r) this.vy *= -1;
  }
}

export class Constellations {
  ctx: CanvasRenderingContext2D;
  count: number;
  frameId: number;
  maxDist: number;
  particles: Particles[];

  constructor(ctx: CanvasRenderingContext2D, count: number, maxDist: number) {
    this.ctx = ctx;
    this.count = count;
    this.maxDist = maxDist;
    this.particles = [];
    this.init();
    this.frameId = requestAnimationFrame(() => this.render());
  }

  init() {
    this.ctx.fillStyle = "#b91c1c";
    this.ctx.strokeStyle = "#b91c1c";
    for (let i = 0; i < this.count; i++) {
      this.particles.push(
        new Particles(2, this.ctx.canvas.width, this.ctx.canvas.height)
      );
    }
  }

  connect() {
    for (let x = 0; x < this.particles.length; x++) {
      for (let y = 0; y < this.particles.length; y++) {
        const dx = this.particles[x].px - this.particles[y].px;
        const dy = this.particles[x].py - this.particles[y].py;
        const dist = Math.hypot(dx, dy);
        if (dist < this.maxDist) {
          const opacity = 1 - dist / this.maxDist;
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[x].px, this.particles[x].py);
          this.ctx.lineTo(this.particles[y].px, this.particles[y].py);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.ctx);
      this.particles[i].update();
    }
    this.connect();
    this.frameId = requestAnimationFrame(() => this.render());
  }
  stop() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }
}
