// Swarm Engine Entrypoint

import { SwarmEngine } from './engine';

function initSwarm() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('noswarm') === '1') {
    // Reveal all elements immediately
    document.querySelectorAll<HTMLElement>('[data-swarm]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const canvas = document.getElementById('swarm-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  try {
    new SwarmEngine(canvas);
  } catch (err) {
    console.error('Swarm initialization error:', err);
    // If canvas fails, ensure all elements are visible
    document.querySelectorAll<HTMLElement>('[data-swarm]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwarm);
} else {
  initSwarm();
}
