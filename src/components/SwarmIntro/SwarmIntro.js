// Swarm Rebuild Engine — Clean-Room Collaborative Cursor Rebuild System
// Reconstructs the portfolio live via simulated multiplayer cursors

import { swarmConfig } from './swarmConfig.js';
import { createBuildPlan } from './planner.js';
import { MultiplayerCursor } from './cursor.js';

let isIntroActive = false;
let currentSpeed = swarmConfig.defaultSpeed;
let animationFrameId = null;
let activeTimeouts = [];
let overlayEl = null;
let cursorsMap = new Map();

export function initSwarmIntro(forceReplay = false) {
    if (!swarmConfig.enabled) return;
    if (isIntroActive) return;

    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced && !forceReplay) return;

    // Check session storage if not force replay
    if (!forceReplay && sessionStorage.getItem(swarmConfig.storageKey)) {
        return;
    }

    isIntroActive = true;
    currentSpeed = swarmConfig.defaultSpeed;

    // Ensure DOM is fully laid out before snapshotting
    requestAnimationFrame(() => {
        setupOverlay();
        startRebuildSequence();
    });
}

function clearAllTimers() {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function safeTimeout(fn, ms) {
    const adjustedMs = ms / currentSpeed;
    const id = setTimeout(fn, adjustedMs);
    activeTimeouts.push(id);
    return id;
}

function setupOverlay() {
    // Create Full-Viewport Dark Overlay
    overlayEl = document.createElement('div');
    overlayEl.id = 'swarm-intro-overlay';
    overlayEl.className = 'swarm-intro-overlay';

    overlayEl.innerHTML = `
        <div id="swarm-stage" class="swarm-stage"></div>
        <div id="swarm-cursors-layer" class="swarm-cursors-layer"></div>

        <div class="swarm-top-bar">
            <div class="swarm-brand">
                <span class="swarm-brand-dot"></span>
                <span>MULTIPLAYER REBUILD</span>
            </div>
            <div class="swarm-controls-right">
                <div class="swarm-speed-toggles" role="group" aria-label="Build speed multiplier">
                    <span class="speed-label">Speed:</span>
                    <button class="speed-btn active" data-speed="1">1x</button>
                    <button class="speed-btn" data-speed="2">2x</button>
                    <button class="speed-btn" data-speed="3">3x</button>
                </div>
                <button id="swarm-skip-btn" class="swarm-skip-btn" title="Skip Intro [Esc]" aria-label="Skip Intro Animation">
                    <span>${swarmConfig.labels.skip}</span>
                    <kbd class="swarm-kbd">${swarmConfig.labels.skipKey}</kbd>
                </button>
            </div>
        </div>

        <div id="swarm-golive-container" class="swarm-golive-container" style="display:none;">
            <button id="swarm-golive-btn" class="swarm-golive-btn">
                <i class="fa-solid fa-play"></i> ${swarmConfig.labels.goLive}
            </button>
        </div>
    `;

    document.body.appendChild(overlayEl);

    // Speed Control Interactions
    const speedBtns = overlayEl.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpeed = parseFloat(btn.dataset.speed) || 1;
        });
    });

    // Skip Handlers
    const skipBtn = overlayEl.querySelector('#swarm-skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            finishIntro(true);
        });
    }

    const goLiveBtn = overlayEl.querySelector('#swarm-golive-btn');
    if (goLiveBtn) {
        goLiveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            finishIntro(false);
        });
    }

    // Global Skip Listeners (Escape, click, or scroll)
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheelSkip, { passive: true });
    window.addEventListener('touchstart', onTouchSkip, { passive: true });
    overlayEl.addEventListener('click', onOverlayClick);

    // Tab visibility handling (pause/resume safety)
    document.addEventListener('visibilitychange', onVisibilityChange);
}

function onKeyDown(e) {
    if (!isIntroActive) return;
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finishIntro(true);
    }
}

function onWheelSkip() {
    if (!isIntroActive) return;
    finishIntro(true);
}

function onTouchSkip() {
    if (!isIntroActive) return;
    // Allow small touch to skip if user intends to interact
}

function onOverlayClick(e) {
    if (!isIntroActive) return;
    // If click is not on a speed button or skip button, fast forward or finish
    if (!e.target.closest('.swarm-speed-toggles')) {
        finishIntro(true);
    }
}

function onVisibilityChange() {
    if (document.hidden && isIntroActive) {
        finishIntro(true);
    }
}

function startRebuildSequence() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cursorsLayer = document.getElementById('swarm-cursors-layer');
    const stage = document.getElementById('swarm-stage');
    if (!cursorsLayer || !stage) return;

    // 1. Initialize Multiplayer Cursors
    cursorsMap.clear();
    const centerX = vw / 2;
    const centerY = vh / 2;

    swarmConfig.cursors.forEach((cfg) => {
        const cursor = new MultiplayerCursor(cfg, cursorsLayer);
        // Start near center with slight spread
        const sx = centerX + (cfg.initial.x - 0.5) * vw * 0.4;
        const sy = centerY + (cfg.initial.y - 0.5) * vh * 0.3;
        cursor.setPosition(sx, sy);
        cursorsMap.set(cfg.id, cursor);
    });

    // 2. Start Animation Frame Loop for Smooth Cursor Motion
    const renderLoop = () => {
        cursorsMap.forEach(c => c.update());
        if (isIntroActive) {
            animationFrameId = requestAnimationFrame(renderLoop);
        }
    };
    animationFrameId = requestAnimationFrame(renderLoop);

    // 3. Compile Build Plan from Real DOM
    const plan = createBuildPlan(vw, vh);

    // 4. Sequential & Parallel Task Execution
    let cumulativeDelay = swarmConfig.timings.initialDelay;

    plan.forEach((task, idx) => {
        const taskDelay = idx === 0 ? cumulativeDelay : cumulativeDelay + (idx * 300);

        safeTimeout(() => {
            if (!isIntroActive) return;
            executeTask(task, stage);
        }, taskDelay);
    });

    // 5. Total Rebuild Completion Event
    const totalDuration = cumulativeDelay + (plan.length * 300) + swarmConfig.timings.settleDelay;
    safeTimeout(() => {
        if (!isIntroActive) return;
        onRebuildComplete();
    }, totalDuration);

    // Failsafe upper-bound timeout
    safeTimeout(() => {
        if (isIntroActive) {
            finishIntro(false);
        }
    }, swarmConfig.timings.maxIntroTimeMs);
}

function executeTask(task, stage) {
    const cursor = cursorsMap.get(task.cursorId) || cursorsMap.values().next().value;
    if (!cursor) return;

    if (task.type === 'guide') {
        // Drag in ruler guide
        if (task.orientation === 'horizontal') {
            cursor.moveTo(task.startX, task.y, 'pen');
            safeTimeout(() => {
                if (!isIntroActive) return;
                cursor.moveTo(task.endX, task.y, 'pen');
                const guideEl = document.createElement('div');
                guideEl.className = 'swarm-ruler-guide horizontal';
                guideEl.style.top = `${task.y}px`;
                guideEl.innerHTML = `<span class="guide-tag">${task.label || 'guide'}</span>`;
                stage.appendChild(guideEl);
            }, 180);
        } else {
            cursor.moveTo(task.x, task.startY, 'pen');
            safeTimeout(() => {
                if (!isIntroActive) return;
                cursor.moveTo(task.x, task.endY, 'pen');
                const guideEl = document.createElement('div');
                guideEl.className = 'swarm-ruler-guide vertical';
                guideEl.style.left = `${task.x}px`;
                guideEl.innerHTML = `<span class="guide-tag">${task.label || 'guide'}</span>`;
                stage.appendChild(guideEl);
            }, 180);
        }
    } else if (task.type === 'box') {
        // Drag out bounding box with crosshairs and size tag
        cursor.moveTo(task.rect.x, task.rect.y, 'crosshair');

        const boxEl = document.createElement('div');
        boxEl.className = 'swarm-wireframe-box';
        boxEl.style.left = `${Math.round(task.rect.x)}px`;
        boxEl.style.top = `${Math.round(task.rect.y)}px`;
        boxEl.style.width = '0px';
        boxEl.style.height = '0px';
        boxEl.style.borderRadius = task.borderRadius || '8px';
        boxEl.style.borderColor = task.borderColor || 'rgba(139, 92, 246, 0.4)';

        const sizeTag = document.createElement('div');
        sizeTag.className = 'swarm-box-size-tag';
        sizeTag.textContent = task.badge || `${Math.round(task.rect.width)} × ${Math.round(task.rect.height)}`;
        boxEl.appendChild(sizeTag);
        stage.appendChild(boxEl);

        safeTimeout(() => {
            if (!isIntroActive) return;
            cursor.moveTo(task.rect.right, task.rect.bottom, 'crosshair');
            boxEl.style.width = `${Math.round(task.rect.width)}px`;
            boxEl.style.height = `${Math.round(task.rect.height)}px`;

            // Fill background after drag
            safeTimeout(() => {
                if (!isIntroActive) return;
                boxEl.style.background = task.bgColor || 'rgba(18, 19, 30, 0.8)';
                boxEl.classList.add('settled');
            }, 220);
        }, 160);

    } else if (task.type === 'text') {
        // Type out text character-by-character with blinking caret
        cursor.moveTo(task.rect.x, task.rect.y + task.rect.height / 2, 'type');

        const textEl = document.createElement('div');
        textEl.className = 'swarm-typed-text';
        textEl.style.left = `${Math.round(task.rect.x)}px`;
        textEl.style.top = `${Math.round(task.rect.y)}px`;
        textEl.style.width = `${Math.round(task.rect.width)}px`;
        textEl.style.height = `${Math.round(task.rect.height)}px`;
        textEl.style.fontSize = task.fontSize || '1rem';
        textEl.style.fontWeight = task.fontWeight || '400';
        textEl.style.fontFamily = task.fontFamily || "'Space Grotesk', sans-serif";
        textEl.style.color = task.color || '#ffffff';
        if (task.gradient) {
            textEl.style.backgroundImage = task.gradient;
            textEl.style.webkitBackgroundClip = 'text';
            textEl.style.webkitTextFillColor = 'transparent';
        }

        const textSpan = document.createElement('span');
        const caret = document.createElement('span');
        caret.className = 'swarm-caret';
        caret.textContent = '|';

        textEl.appendChild(textSpan);
        textEl.appendChild(caret);
        stage.appendChild(textEl);

        // Character typing animation
        const rawText = task.text || '';
        let charIndex = 0;
        const charDelay = Math.max(12, swarmConfig.timings.typingCharDelay / currentSpeed);

        const typeNextChar = () => {
            if (!isIntroActive) return;
            if (charIndex < rawText.length) {
                textSpan.textContent += rawText[charIndex];
                charIndex++;
                safeTimeout(typeNextChar, charDelay);
            } else {
                caret.style.display = 'none';
            }
        };

        safeTimeout(typeNextChar, 100);
    }
}

function onRebuildComplete() {
    if (!isIntroActive || !overlayEl) return;

    // Show Go Live trigger if not already dismissed
    const goLiveCont = overlayEl.querySelector('#swarm-golive-container');
    if (goLiveCont) {
        goLiveCont.style.display = 'block';
    }

    // Multiplayer Cursor Mouse Flock Interaction (Flock to visitor cursor)
    const onMouseMoveFlock = (e) => {
        if (!isIntroActive) return;
        const mx = e.clientX;
        const my = e.clientY;

        let idx = 0;
        cursorsMap.forEach((cursor) => {
            const angle = (idx / cursorsMap.size) * Math.PI * 2;
            const radius = 35 + (idx * 5);
            cursor.moveTo(mx + Math.cos(angle) * radius, my + Math.sin(angle) * radius);
            idx++;
        });
    };

    window.addEventListener('mousemove', onMouseMoveFlock, { passive: true });

    // Auto-complete into real page after brief settle
    safeTimeout(() => {
        window.removeEventListener('mousemove', onMouseMoveFlock);
        finishIntro(false);
    }, 1200);
}

function finishIntro(instant = false) {
    if (!isIntroActive) return;
    isIntroActive = false;

    clearAllTimers();

    // Mark as played in session storage
    try {
        sessionStorage.setItem(swarmConfig.storageKey, 'true');
    } catch (_) {}

    // Cleanup Event Listeners
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('wheel', onWheelSkip);
    window.removeEventListener('touchstart', onTouchSkip);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    // Fade out and cleanup overlay
    if (overlayEl) {
        if (instant) {
            cleanupOverlay();
        } else {
            overlayEl.classList.add('fading-out');
            setTimeout(cleanupOverlay, swarmConfig.timings.fadeDuration);
        }
    }
}

function cleanupOverlay() {
    if (overlayEl && overlayEl.parentNode) {
        overlayEl.parentNode.removeChild(overlayEl);
    }
    overlayEl = null;
    cursorsMap.clear();
}
