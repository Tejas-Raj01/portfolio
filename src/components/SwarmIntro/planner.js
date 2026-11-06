// DOM Layout Snapshot & Rebuild Task Planner
// Scans the rendered real DOM above the fold and compiles the sequential build tasks

export function createBuildPlan(viewportWidth, viewportHeight) {
    const tasks = [];
    const isMobile = viewportWidth < 768;

    // Helper: Safely query an element and get viewport-relative metrics
    const getMetrics = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        if (rect.top >= viewportHeight || rect.bottom <= 0 || rect.width === 0 || rect.height === 0) {
            return null;
        }
        const style = window.getComputedStyle(el);
        return {
            el,
            rect: {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                right: rect.right,
                bottom: rect.bottom
            },
            text: el.innerText ? el.innerText.trim() : (el.textContent ? el.textContent.trim() : ''),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily,
            color: style.color,
            borderRadius: style.borderRadius,
            backgroundColor: style.backgroundColor
        };
    };

    // 1. Initial Ruler Guide (Alignment guide across hero center)
    tasks.push({
        type: 'guide',
        cursorId: 'vllm',
        orientation: 'horizontal',
        y: Math.round(viewportHeight * 0.28),
        startX: 40,
        endX: viewportWidth - 40,
        label: 'guide: center_x'
    });

    // 2. Hero Status Pill
    const pill = getMetrics('.hero-status-pill');
    if (pill) {
        tasks.push({
            type: 'box',
            cursorId: 'snapcraft',
            rect: pill.rect,
            borderRadius: '9999px',
            borderColor: 'rgba(16, 185, 129, 0.4)',
            bgColor: 'rgba(22, 24, 38, 0.85)',
            badge: `${Math.round(pill.rect.width)} × ${Math.round(pill.rect.height)}`
        });
        tasks.push({
            type: 'text',
            cursorId: 'snapcraft',
            rect: pill.rect,
            text: pill.text || "NIT Durgapur '27 · Open-Source Infrastructure",
            fontSize: pill.fontSize,
            fontFamily: pill.fontFamily,
            color: '#a1a1aa',
            align: 'center'
        });
    }

    // 3. Hero Name ("Tejas Raj")
    const name = getMetrics('.hero-name') || getMetrics('.hero-name-gradient');
    if (name) {
        tasks.push({
            type: 'guide',
            cursorId: 'pytorch',
            orientation: 'vertical',
            x: Math.round(name.rect.x),
            startY: name.rect.y - 30,
            endY: name.rect.bottom + 30,
            label: 'snap: name_left'
        });

        tasks.push({
            type: 'box',
            cursorId: 'vllm',
            rect: {
                x: name.rect.x - 10,
                y: name.rect.y - 6,
                width: name.rect.width + 20,
                height: name.rect.height + 12
            },
            borderRadius: '8px',
            borderColor: 'rgba(139, 92, 246, 0.5)',
            bgColor: 'transparent',
            badge: 'H1 Frame'
        });

        tasks.push({
            type: 'text',
            cursorId: 'vllm',
            rect: name.rect,
            text: name.text || 'Tejas Raj',
            fontSize: name.fontSize,
            fontWeight: name.fontWeight || '700',
            fontFamily: name.fontFamily || "'Space Grotesk', sans-serif",
            color: '#ffffff',
            gradient: 'linear-gradient(135deg, #ffffff 40%, #c4b5fd 80%, #67e8f9 100%)',
            align: 'center',
            isHeroName: true
        });
    }

    // 4. Hero Tagline ("I fix things in the codebases the world runs on.")
    const tagline = getMetrics('.hero-positioning');
    if (tagline) {
        tasks.push({
            type: 'text',
            cursorId: 'openclaw',
            rect: tagline.rect,
            text: tagline.text || '"I fix things in the codebases the world runs on."',
            fontSize: tagline.fontSize,
            fontWeight: '600',
            fontFamily: tagline.fontFamily,
            color: '#8b5cf6',
            align: 'center'
        });
    }

    // 5. Rotating Tech Strip
    const rotating = getMetrics('.hero-rotating-bar');
    if (rotating) {
        tasks.push({
            type: 'box',
            cursorId: 'jetpack',
            rect: rotating.rect,
            borderRadius: '9999px',
            borderColor: 'rgba(6, 182, 212, 0.4)',
            bgColor: 'rgba(30, 33, 50, 0.7)',
            badge: 'Terminal Pill'
        });
        tasks.push({
            type: 'text',
            cursorId: 'jetpack',
            rect: rotating.rect,
            text: rotating.text || 'LLM inference · Agent infra · Databases · Open source',
            fontSize: rotating.fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#94a3b8',
            align: 'center'
        });
    }

    // 6. Proof Badges
    const proofBadges = document.querySelectorAll('.hero-proof-badge');
    const badgeCursorIds = ['cpeditor', 'craftparts', 'vscode'];
    proofBadges.forEach((badgeEl, idx) => {
        const rect = badgeEl.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const cid = badgeCursorIds[idx % badgeCursorIds.length];
            tasks.push({
                type: 'box',
                cursorId: cid,
                rect: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                borderRadius: '9999px',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                bgColor: 'rgba(22, 24, 38, 0.85)',
                badge: 'Badge'
            });
            tasks.push({
                type: 'text',
                cursorId: cid,
                rect: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                text: badgeEl.innerText ? badgeEl.innerText.trim() : '',
                fontSize: '0.8125rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#f1f5f9',
                align: 'center'
            });
        }
    });

    // 7. Hero CTA Buttons
    const primaryBtn = getMetrics('.hero-cta-bar .btn-primary-action');
    if (primaryBtn) {
        tasks.push({
            type: 'box',
            cursorId: 'vllm',
            rect: primaryBtn.rect,
            borderRadius: '9999px',
            borderColor: 'rgba(139, 92, 246, 0.6)',
            bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            badge: `${Math.round(primaryBtn.rect.width)} × ${Math.round(primaryBtn.rect.height)}`
        });
        tasks.push({
            type: 'text',
            cursorId: 'vllm',
            rect: primaryBtn.rect,
            text: primaryBtn.text || 'View Open Source Work',
            fontSize: primaryBtn.fontSize,
            fontWeight: '600',
            fontFamily: primaryBtn.fontFamily,
            color: '#ffffff',
            align: 'center'
        });
    }

    const secondaryBtns = document.querySelectorAll('.hero-cta-bar .btn-secondary-action');
    secondaryBtns.forEach((btnEl, idx) => {
        const rect = btnEl.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const cid = idx === 0 ? 'pytorch' : 'openclaw';
            tasks.push({
                type: 'box',
                cursorId: cid,
                rect: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                borderRadius: '9999px',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                bgColor: 'rgba(22, 24, 38, 0.85)',
                badge: 'CTA Button'
            });
            tasks.push({
                type: 'text',
                cursorId: cid,
                rect: {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                },
                text: btnEl.innerText ? btnEl.innerText.trim() : '',
                fontSize: '0.9375rem',
                fontFamily: "'Inter', sans-serif",
                color: '#f1f5f9',
                align: 'center'
            });
        }
    });

    // 8. Stat Cards (If visible above the fold on desktop or tablet)
    if (!isMobile) {
        const statCards = document.querySelectorAll('.stat-card');
        const statCursors = ['vllm', 'pytorch', 'jetpack', 'craftparts'];
        statCards.forEach((cardEl, idx) => {
            const rect = cardEl.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const cid = statCursors[idx % statCursors.length];
                const numEl = cardEl.querySelector('.stat-number-wrap');
                const labelEl = cardEl.querySelector('.stat-label');

                tasks.push({
                    type: 'box',
                    cursorId: cid,
                    rect: {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height
                    },
                    borderRadius: '18px',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    bgColor: 'rgba(18, 19, 30, 0.75)',
                    badge: `${Math.round(rect.width)} × ${Math.round(rect.height)}`
                });

                if (numEl) {
                    const numRect = numEl.getBoundingClientRect();
                    tasks.push({
                        type: 'text',
                        cursorId: cid,
                        rect: {
                            x: numRect.left,
                            y: numRect.top,
                            width: numRect.width,
                            height: numRect.height
                        },
                        text: numEl.innerText ? numEl.innerText.trim() : '0',
                        fontSize: '2.25rem',
                        fontWeight: '700',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: idx === 1 ? '#6ee7b7' : (idx === 2 ? '#67e8f9' : (idx === 3 ? '#fcd34d' : '#c4b5fd')),
                        align: 'center'
                    });
                }

                if (labelEl) {
                    const lblRect = labelEl.getBoundingClientRect();
                    tasks.push({
                        type: 'text',
                        cursorId: cid,
                        rect: {
                            x: lblRect.left,
                            y: lblRect.top,
                            width: lblRect.width,
                            height: lblRect.height
                        },
                        text: labelEl.innerText ? labelEl.innerText.trim() : '',
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: '#f1f5f9',
                        align: 'center'
                    });
                }
            }
        });
    }

    return tasks;
}
