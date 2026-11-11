// Declarative Swarm Task Scheduler (Reveal-In-Place)

import type { Boid } from './boids';
import { Vec2 } from './boids';
import { swarmAudio } from './audio';

export interface SwarmTask {
  element: HTMLElement;
  type: 'box' | 'text' | 'line' | 'media' | 'repeat';
  order: number;
  assignedBoid: Boid | null;
  state: 'pending' | 'active' | 'completed';
  startTime: number;
  duration: number;
}

export class TaskScheduler {
  tasks: SwarmTask[] = [];
  currentIndex: number = 0;
  speed: number = 1;
  isCompleted: boolean = false;

  constructor() {
    this.collectTasks();
  }

  collectTasks(): void {
    const rawElements = Array.from(document.querySelectorAll<HTMLElement>('[data-swarm]'));
    this.tasks = rawElements.map((el, i) => {
      const type = (el.getAttribute('data-swarm') || 'box') as SwarmTask['type'];
      const orderAttr = el.getAttribute('data-swarm-order');
      const order = orderAttr ? parseInt(orderAttr, 10) : i;

      // Hero elements are always visible on initial paint
      if (order <= 5) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      } else {
        // Elements below the fold start ready to reveal smoothly
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';
        el.style.transition = 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      }

      return {
        element: el,
        type,
        order,
        assignedBoid: null,
        state: order <= 5 ? 'completed' : 'pending',
        startTime: 0,
        duration: type === 'text' ? 300 : (type === 'line' ? 200 : 350)
      };
    }).sort((a, b) => a.order - b.order);

    // Instant unlock on scroll: never show empty boxes to scrolling visitors
    window.addEventListener('scroll', () => {
      const vh = window.innerHeight;
      for (const task of this.tasks) {
        if (task.state === 'pending') {
          const rect = task.element.getBoundingClientRect();
          if (rect.top < vh + 100) {
            this.revealElement(task.element);
            task.state = 'completed';
          }
        }
      }
    }, { passive: true });
  }

  setSpeed(newSpeed: number): void {
    this.speed = Math.max(1, newSpeed);
  }

  update(boids: Boid[], now: number): void {
    if (this.isCompleted) return;

    // Allocate available boids to next pending tasks
    const activeTasks = this.tasks.filter(t => t.state === 'active');
    const pendingTasks = this.tasks.filter(t => t.state === 'pending');

    // Check if tasks in viewport should unlock immediately on scroll
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    for (const task of pendingTasks) {
      const rect = task.element.getBoundingClientRect();
      // If task element is near or above viewport, boost it
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        // Active scroll acceleration
        task.duration = Math.min(task.duration, 240);
      }
    }
    if (activeTasks.length < maxConcurrent && pendingTasks.length > 0) {
      const nextTask = pendingTasks[0];
      const availableBoid = boids.find(b => b.mode === 'orbit' || b.mode === 'idle');

      if (availableBoid) {
        nextTask.state = 'active';
        nextTask.assignedBoid = availableBoid;
        nextTask.startTime = now;

        availableBoid.mode = 'task';
        const rect = nextTask.element.getBoundingClientRect();
        availableBoid.targetRect = rect;

        // Choose tool based on task
        if (nextTask.type === 'box') {
          availableBoid.tool = 'crosshair';
          availableBoid.dragStart = new Vec2(rect.left + window.scrollX, rect.top + window.scrollY);
          availableBoid.isDragging = true;
          availableBoid.target = new Vec2(rect.right + window.scrollX, rect.bottom + window.scrollY);
          swarmAudio.playSnap();
        } else if (nextTask.type === 'text') {
          availableBoid.tool = 'ibeam';
          availableBoid.target = new Vec2(rect.left + 20 + window.scrollX, rect.top + 10 + window.scrollY);
          swarmAudio.playTypeClick();
        } else if (nextTask.type === 'line') {
          availableBoid.tool = 'pen';
          availableBoid.target = new Vec2(rect.right + window.scrollX, rect.top + window.scrollY);
          swarmAudio.playLineStroke();
        } else {
          availableBoid.tool = 'pointer';
          availableBoid.target = new Vec2(rect.left + 15 + window.scrollX, rect.top + 15 + window.scrollY);
          swarmAudio.playSnap();
        }
      }
    }

    // Process active tasks
    for (const task of activeTasks) {
      const elapsed = (now - task.startTime) * this.speed;
      if (elapsed >= task.duration) {
        // Complete the task: Reveal the real DOM element smoothly
        this.revealElement(task.element);
        task.state = 'completed';

        if (task.assignedBoid) {
          task.assignedBoid.mode = 'orbit';
          task.assignedBoid.tool = 'pointer';
          task.assignedBoid.isDragging = false;
          task.assignedBoid.dragStart = null;
          task.assignedBoid.target = null;
          task.assignedBoid = null;
        }
      }
    }

    if (this.tasks.every(t => t.state === 'completed')) {
      this.isCompleted = true;
    }
  }

  revealElement(el: HTMLElement): void {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }

  skipAll(boids: Boid[]): void {
    this.isCompleted = true;
    for (const task of this.tasks) {
      task.state = 'completed';
      this.revealElement(task.element);
    }
    for (const boid of boids) {
      boid.mode = 'orbit';
      boid.tool = 'pointer';
      boid.isDragging = false;
      boid.dragStart = null;
      boid.target = null;
    }
  }

  resetAll(boids: Boid[]): void {
    this.isCompleted = false;
    for (const task of this.tasks) {
      task.state = 'pending';
      task.assignedBoid = null;
      task.element.style.opacity = '0';
      task.element.style.transform = 'translateY(6px)';
    }
    for (const boid of boids) {
      boid.mode = 'orbit';
      boid.tool = 'pointer';
      boid.isDragging = false;
      boid.dragStart = null;
      boid.target = null;
    }
  }
}
