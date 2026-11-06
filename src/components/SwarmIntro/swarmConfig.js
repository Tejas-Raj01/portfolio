// Swarm Rebuild Configuration & Cursor System Settings
// Inspired by DhvanilPatel/swarm-cursors and Joel Califa's Swarm

export const swarmConfig = {
    // Feature Toggle: Set to false to disable the intro completely
    enabled: true,

    // Session storage key to play once per session
    storageKey: 'swarm_rebuild_intro_played',

    // Available Speed Multipliers
    speedMultipliers: [1, 2, 3],
    defaultSpeed: 1,

    // Multiplayer Cursors (Named after open-source upstream contributions)
    cursors: [
        { id: 'vllm', name: 'vLLM', color: '#8b5cf6', initial: { x: 0.45, y: 0.35 } },
        { id: 'pytorch', name: 'PyTorch', color: '#06b6d4', initial: { x: 0.55, y: 0.38 } },
        { id: 'jetpack', name: 'Jetpack', color: '#10b981', initial: { x: 0.40, y: 0.45 } },
        { id: 'craftparts', name: 'Craft Parts', color: '#f59e0b', initial: { x: 0.60, y: 0.42 } },
        { id: 'snapcraft', name: 'Snapcraft', color: '#f43f5e', initial: { x: 0.35, y: 0.30 } },
        { id: 'openclaw', name: 'OpenClaw', color: '#c4b5fd', initial: { x: 0.65, y: 0.32 } },
        { id: 'vscode', name: 'VS Code', color: '#38bdf8', initial: { x: 0.50, y: 0.52 } },
        { id: 'cpeditor', name: 'CP Editor', color: '#fbbf24', initial: { x: 0.52, y: 0.28 } }
    ],

    // Default timings (in milliseconds at 1x speed; scaled dynamically by current speed)
    timings: {
        initialDelay: 350,
        cursorFlyIn: 600,
        boxDragDuration: 450,
        typingCharDelay: 32,
        guideDragDuration: 400,
        settleDelay: 600,
        fadeDuration: 500,
        maxIntroTimeMs: 8000 // Upper bound failsafe
    },

    // UI Strings & Labels
    labels: {
        skip: 'Skip Intro',
        skipKey: 'Esc',
        goLive: 'Go Live',
        speed: 'Speed'
    }
};
