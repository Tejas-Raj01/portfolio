// DOM Element & Text Glyph Sampler
// Extracts high-fidelity target coordinates from the real rendered DOM layout

import { swarmConfig } from './swarmConfig.js';

export function sampleLayoutTargets(viewportWidth, viewportHeight) {
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
    const maxParticles = isMobile
        ? swarmConfig.particles.mobile
        : (isTablet ? swarmConfig.particles.tablet : swarmConfig.particles.desktop);

    const targets = [];

    // 1. Text Glyph Sampling via Offscreen Canvas
    const offscreen = document.createElement('canvas');
    offscreen.width = viewportWidth;
    offscreen.height = viewportHeight;
    const ctx = offscreen.getContext('2d', { willReadFrequently: true });

    if (ctx) {
        // Collect text elements to rasterize and sample
        const textSelectors = [
            { selector: '.hero-name', color: '#ffffff', weightMultiplier: 1.5 },
            { selector: '.hero-positioning', color: '#c4b5fd', weightMultiplier: 1.0 },
            { selector: '.hero-rotating-bar', color: '#06b6d4', weightMultiplier: 0.8 },
            { selector: '.hero-status-pill', color: '#10b981', weightMultiplier: 0.7 }
        ];

        textSelectors.forEach(({ selector, color }) => {
            const el = document.querySelector(selector);
            if (!el) return;

            const rect = el.getBoundingClientRect();
            if (rect.top >= viewportHeight || rect.bottom <= 0) return;

            const computed = window.getComputedStyle(el);
            ctx.save();
            ctx.font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const text = el.innerText || el.textContent || '';
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            ctx.fillText(text, centerX, centerY);
            ctx.restore();

            // Sample pixel data within the element's bounding box
            const sampleStep = isMobile ? 4 : 3;
            const startX = Math.max(0, Math.floor(rect.left));
            const startY = Math.max(0, Math.floor(rect.top));
            const endX = Math.min(viewportWidth, Math.ceil(rect.right));
            const endY = Math.min(viewportHeight, Math.ceil(rect.bottom));
            const width = endX - startX;
            const height = endY - startY;

            if (width > 0 && height > 0) {
                const imgData = ctx.getImageData(startX, startY, width, height);
                const data = imgData.data;

                for (let y = 0; y < height; y += sampleStep) {
                    for (let x = 0; x < width; x += sampleStep) {
                        const alphaIdx = (y * width + x) * 4 + 3;
                        if (data[alphaIdx] > 70) {
                            targets.push({
                                tx: startX + x,
                                ty: startY + y,
                                color: color || swarmConfig.colors[0],
                                size: (data[alphaIdx] > 180 ? 2.0 : 1.4),
                                type: 'text'
                            });
                        }
                    }
                }
            }
        });
    }

    // 2. Sample UI Box Outlines & Cards (Buttons, Badges, Dock, Stat Cards)
    const boxSelectors = [
        { selector: '.hero-cta-bar .btn-primary-action', color: '#8b5cf6', density: isMobile ? 6 : 4 },
        { selector: '.hero-cta-bar .btn-secondary-action', color: '#06b6d4', density: isMobile ? 8 : 5 },
        { selector: '.hero-proof-badge', color: '#c4b5fd', density: isMobile ? 8 : 6 },
        { selector: '.stat-card', color: '#8b5cf6', density: isMobile ? 12 : 8 },
        { selector: '.floating-dock', color: '#8b5cf6', density: isMobile ? 10 : 7 }
    ];

    boxSelectors.forEach(({ selector, color, density }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top >= viewportHeight || rect.bottom <= 0) return;

            // Sample perimeter
            const perimeterLength = 2 * (rect.width + rect.height);
            const numPoints = Math.floor(perimeterLength / density);

            for (let i = 0; i < numPoints; i++) {
                const dist = (i / numPoints) * perimeterLength;
                let px, py;

                if (dist < rect.width) {
                    // Top edge
                    px = rect.left + dist;
                    py = rect.top;
                } else if (dist < rect.width + rect.height) {
                    // Right edge
                    px = rect.right;
                    py = rect.top + (dist - rect.width);
                } else if (dist < 2 * rect.width + rect.height) {
                    // Bottom edge
                    px = rect.right - (dist - (rect.width + rect.height));
                    py = rect.bottom;
                } else {
                    // Left edge
                    px = rect.left;
                    py = rect.bottom - (dist - (2 * rect.width + rect.height));
                }

                targets.push({
                    tx: px,
                    ty: py,
                    color: color,
                    size: 1.5,
                    type: 'border'
                });
            }
        });
    });

    // 3. Normalize particle count to match budget
    let result = targets;
    if (targets.length > maxParticles) {
        // Uniform downsampling
        const stride = targets.length / maxParticles;
        result = [];
        for (let i = 0; i < maxParticles; i++) {
            result.push(targets[Math.floor(i * stride)]);
        }
    } else if (targets.length < maxParticles * 0.7) {
        // Add ambient halo particles around hero center
        const needed = Math.floor(maxParticles * 0.8) - targets.length;
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight * 0.35;

        for (let i = 0; i < needed; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (viewportWidth * 0.45);
            result.push({
                tx: centerX + Math.cos(angle) * dist,
                ty: centerY + Math.sin(angle) * (dist * 0.5),
                color: swarmConfig.colors[Math.floor(Math.random() * swarmConfig.colors.length)],
                size: 1.2,
                type: 'ambient'
            });
        }
    }

    return result;
}
