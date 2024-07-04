const randomPos = (radius: number, max: number) =>
  radius + Math.random() * (max - radius * 2);

const randomSpeed = () => Math.random() * 1 - 0.4;

export class ConstellationParticules {
  positions: Float32Array;
  velocities: Float32Array;
  r: number;
  w: number;
  h: number;
  maxDist: number;
  count: number;

  constructor(count: number, r: number, w: number, h: number, maxDist: number) {
    this.r = r;
    this.h = h;
    this.w = w;
    this.count = count;
    this.maxDist = maxDist;
    this.positions = new Float32Array(count * 2); // px, py for each particle
    this.velocities = new Float32Array(count * 2); // vx, vy for each particle
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      const stride = i * 2;
      this.positions[stride] = randomPos(this.r, this.w);
      this.positions[stride + 1] = randomPos(this.r, this.h);
      this.velocities[stride] = randomSpeed();
      this.velocities[stride + 1] = randomSpeed();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.count; i++) {
      const px = this.positions[i * 2];
      const py = this.positions[i * 2 + 1];
      ctx.beginPath();
      ctx.arc(px, py, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.count; i++) {
      const stride = i * 2;
      this.positions[stride] += this.velocities[stride];
      this.positions[stride + 1] += this.velocities[stride + 1];

      if (
        this.positions[stride] < this.r ||
        this.positions[stride] > this.w - this.r
      ) {
        this.velocities[stride] *= -1;
      }

      if (
        this.positions[stride + 1] < this.r ||
        this.positions[stride + 1] > this.h - this.r
      ) {
        this.velocities[stride + 1] *= -1;
      }
      ctx.beginPath();
      ctx.arc(
        this.positions[stride],
        this.positions[stride + 1],
        this.r,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  connect(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < this.count; x++) {
      for (let y = x + 1; y < this.count; y++) {
        const sx = x * 2;
        const sy = y * 2;
        const dx = this.positions[sx] - this.positions[sy];
        const dy = this.positions[sx + 1] - this.positions[sy + 1];
        const dist = Math.hypot(dx, dy);
        if (dist < this.maxDist) {
          const opacity = 1 - dist / this.maxDist;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(this.positions[sx], this.positions[sx + 1]);
          ctx.lineTo(this.positions[sy], this.positions[sy + 1]);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }
}
