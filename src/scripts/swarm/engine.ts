// Clean-Room Implementation of Multiplayer Cursor Swarm Engine
// Inspired by Swarm by Joel Califa & Swarm Rebuild by Dhvanil Patel

import { Boid, Vec2, type BoidConfig } from './boids';
import { renderCursor } from './cursor';
import { TaskScheduler } from './scheduler';
import { swarmAudio } from './audio';

const PROJECT_CURSORS = [
  { name: 'vllm',       color: '#C4432B' }, // Accent Red
  { name: 'pytorch',    color: '#D9534F' },
  { name: 'canonical',  color: '#388087' },
  { name: 'jetpack',    color: '#2DA44E' }, // Diff Green
  { name: 'cpeditor',   color: '#5E5B54' },
  { name: 'vscode',     color: '#4682B4' },
  { name: 'openclaw',   color: '#8A2BE2' },
  { name: 'future-agi', color: '#B8860B' }
];

export class SwarmEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private boids: Boid[] = [];
  private scheduler: TaskScheduler;
  private mousePos: Vec2 | null = null;
  private isFollowingMouse: boolean = false;
  private isPaused: boolean = false;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private lastFpsCheck: number = 0;
  private fps: number = 60;

  private config: BoidConfig = {
    maxSpeed: 4.5,
    maxForce: 0.18,
    separationDist: 40,
    neighborDist: 100
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get 2d context for swarm canvas');
    this.ctx = context;

    this.resizeCanvas();
    this.initBoids();
    this.scheduler = new TaskScheduler();
    this.bindEvents();

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.skip();
      return;
    }

    // Check if returning visitor in current browser session
    if (sessionStorage.getItem('swarm-visited') === 'true') {
      this.skip();
    } else {
      sessionStorage.setItem('swarm-visited', 'true');
    }

    this.start();
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initBoids(): void {
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 5 : PROJECT_CURSORS.length;

    this.boids = [];
    for (let i = 0; i < count; i++) {
      const p = PROJECT_CURSORS[i % PROJECT_CURSORS.length];
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
      this.boids.push(new Boid(x, y, p.name, p.color));
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => this.resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      this.mousePos = new Vec2(e.clientX, e.clientY);
    });

    window.addEventListener('mouseleave', () => {
      this.mousePos = null;
    });

    // Custom events
    window.addEventListener('swarm:skip', () => this.skip());
    window.addEventListener('swarm:replay', () => this.replay());
    window.addEventListener('swarm:set-speed', (e: Event) => {
      const speed = (e as CustomEvent).detail?.speed || 1;
      this.scheduler.setSpeed(speed);
    });
    window.addEventListener('swarm:toggle-audio', (e: Event) => {
      const enabled = (e as CustomEvent).detail?.enabled ?? false;
      swarmAudio.setEnabled(enabled);
    });
    window.addEventListener('swarm:flock-pointer', () => {
      this.isFollowingMouse = true;
    });
    window.addEventListener('swarm:go-live', () => {
      this.isFollowingMouse = true;
      this.config.maxSpeed = 7.0;
      this.config.maxForce = 0.35;
    });
    window.addEventListener('swarm:git-push', () => {
      // Easter egg response: swarm cursors bow out with thanks
      this.triggerGitPushEasterEgg();
    });
  }

  public skip(): void {
    this.scheduler.skipAll(this.boids);
  }

  public replay(): void {
    this.scheduler.resetAll(this.boids);
  }

  private triggerGitPushEasterEgg(): void {
    // Show temporary toast banner
    const banner = document.createElement('div');
    banner.className = 'swarm-controls-bar';
    banner.style.bottom = 'auto';
    banner.style.top = '2rem';
    banner.style.right = '50%';
    banner.style.transform = 'translateX(50%)';
    banner.innerHTML = `
      <span class="swarm-status-dot" style="background: var(--color-diff-add)"></span>
      <span><strong>git push:</strong> Everything up to date. Thanks for reading to the end!</span>
    `;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 4500);

    // Cursors disperse outward gracefully
    for (const b of this.boids) {
      b.target = null;
      b.vel = new Vec2((Math.random() - 0.5) * 15, -Math.random() * 15);
    }
  }

  private start(): void {
    const loop = (timestamp: number) => {
      if (!this.lastTime) this.lastTime = timestamp;
      const delta = timestamp - this.lastTime;
      this.lastTime = timestamp;

      // Monitor FPS and adaptively degrade on slow devices
      this.frameCount++;
      if (timestamp - this.lastFpsCheck > 1000) {
        this.fps = (this.frameCount * 1000) / (timestamp - this.lastFpsCheck);
        this.frameCount = 0;
        this.lastFpsCheck = timestamp;

        if (this.fps < 38 && this.boids.length > 4) {
          // Degrade one cursor to keep 60fps smooth
          this.boids.pop();
        }
      }

      this.update(timestamp);
      this.draw();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  private update(now: number): void {
    if (this.isPaused) return;

    // Update task scheduler
    this.scheduler.update(this.boids, now);

    // Update Boids flocking
    for (const boid of this.boids) {
      boid.flock(this.boids, this.config, this.mousePos, this.isFollowingMouse);
      boid.update(this.config);
      boid.wrapBounds(window.innerWidth, window.innerHeight);
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const boid of this.boids) {
      renderCursor(this.ctx, boid);
    }
  }
}
