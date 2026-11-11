// 2D Vector Math and Boids Flocking Simulation for Swarm Cursors

export interface Vector2D {
  x: number;
  y: number;
}

export class Vec2 implements Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  add(v: Vector2D): Vec2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2D): Vec2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(n: number): Vec2 {
    this.x *= n;
    this.y *= n;
    return this;
  }

  div(n: number): Vec2 {
    if (n !== 0) {
      this.x /= n;
      this.y /= n;
    }
    return this;
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vec2 {
    const m = this.mag();
    if (m > 0) this.div(m);
    return this;
  }

  limit(max: number): Vec2 {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
    return this;
  }

  dist(v: Vector2D): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }
}

export interface BoidConfig {
  maxSpeed: number;
  maxForce: number;
  separationDist: number;
  neighborDist: number;
}

export class Boid {
  pos: Vec2;
  vel: Vec2;
  acc: Vec2;
  target: Vec2 | null = null;
  name: string;
  color: string;
  tool: 'pointer' | 'crosshair' | 'ibeam' | 'pen' = 'pointer';
  mode: 'orbit' | 'task' | 'flock' | 'idle' = 'orbit';
  targetRect: DOMRect | null = null;
  dragStart: Vec2 | null = null;
  isDragging = false;

  constructor(x: number, y: number, name: string, color: string) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
    this.acc = new Vec2(0, 0);
    this.name = name;
    this.color = color;
  }

  applyForce(force: Vec2): void {
    this.acc.add(force);
  }

  seek(target: Vec2, maxSpeed: number, maxForce: number): Vec2 {
    const desired = new Vec2(target.x - this.pos.x, target.y - this.pos.y);
    const d = desired.mag();
    desired.normalize();

    // Arrival slowing within 60px
    if (d < 60) {
      const m = (d / 60) * maxSpeed;
      desired.mult(m);
    } else {
      desired.mult(maxSpeed);
    }

    const steer = new Vec2(desired.x - this.vel.x, desired.y - this.vel.y);
    steer.limit(maxForce);
    return steer;
  }

  flee(target: Vec2, radius: number, maxSpeed: number, maxForce: number): Vec2 {
    const d = this.pos.dist(target);
    if (d < radius && d > 0) {
      const desired = new Vec2(this.pos.x - target.x, this.pos.y - target.y);
      desired.normalize();
      desired.mult(maxSpeed);
      const steer = new Vec2(desired.x - this.vel.x, desired.y - this.vel.y);
      steer.limit(maxForce * 1.5);
      return steer;
    }
    return new Vec2(0, 0);
  }

  flock(boids: Boid[], config: BoidConfig, mousePos: Vec2 | null, isFollowingMouse = false): void {
    const sep = new Vec2(0, 0);
    const ali = new Vec2(0, 0);
    const coh = new Vec2(0, 0);
    let sepCount = 0;
    let aliCount = 0;
    let cohCount = 0;

    for (const other of boids) {
      if (other === this) continue;
      const d = this.pos.dist(other.pos);

      // Separation
      if (d > 0 && d < config.separationDist) {
        const diff = new Vec2(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
        diff.normalize();
        diff.div(d);
        sep.add(diff);
        sepCount++;
      }

      // Alignment and Cohesion
      if (d > 0 && d < config.neighborDist) {
        ali.add(other.vel);
        aliCount++;
        coh.add(other.pos);
        cohCount++;
      }
    }

    if (sepCount > 0) {
      sep.div(sepCount);
      sep.normalize();
      sep.mult(config.maxSpeed);
      const steer = new Vec2(sep.x - this.vel.x, sep.y - this.vel.y);
      steer.limit(config.maxForce * 1.4);
      this.applyForce(steer);
    }

    if (aliCount > 0) {
      ali.div(aliCount);
      ali.normalize();
      ali.mult(config.maxSpeed);
      const steer = new Vec2(ali.x - this.vel.x, ali.y - this.vel.y);
      steer.limit(config.maxForce);
      this.applyForce(steer);
    }

    if (cohCount > 0) {
      coh.div(cohCount);
      const steer = this.seek(coh, config.maxSpeed, config.maxForce * 0.8);
      this.applyForce(steer);
    }

    // Seek target or follow/evade mouse
    if (this.target) {
      const seekForce = this.seek(this.target, config.maxSpeed * 1.2, config.maxForce * 1.5);
      this.applyForce(seekForce);
    } else if (mousePos) {
      if (isFollowingMouse) {
        // Flock payoff mode: swarm happily clusters around user's cursor
        const seekMouse = this.seek(mousePos, config.maxSpeed * 1.1, config.maxForce);
        this.applyForce(seekMouse);
      } else {
        // Subtle natural evasion so they don't block user's reading
        const fleeForce = this.flee(mousePos, 90, config.maxSpeed, config.maxForce * 1.2);
        this.applyForce(fleeForce);
      }
    }
  }

  update(config: BoidConfig): void {
    this.vel.add(this.acc);
    this.vel.limit(config.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0); // Clear acceleration each tick
  }

  wrapBounds(width: number, height: number): void {
    const pad = 20;
    if (this.pos.x < -pad) this.pos.x = width + pad;
    if (this.pos.y < -pad) this.pos.y = height + pad;
    if (this.pos.x > width + pad) this.pos.x = -pad;
    if (this.pos.y > height + pad) this.pos.y = -pad;
  }
}
