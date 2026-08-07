// Tejas Raj — AI-Native Conversational Portfolio UI Controller

import { PortfolioChatEngine } from './src/chat-engine.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatEngine = new PortfolioChatEngine();

    const chatForm = document.getElementById('chat-form');
    const inputField = document.getElementById('chat-prompt-input');
    const streamContainer = document.getElementById('conversation-stream');
    const quickChips = document.querySelectorAll('.quick-chip');
    const avatarContainer = document.getElementById('ai-avatar-container');
    const avatarBadge = document.getElementById('avatar-status-badge');

    initCopyEmailButtons();
    initResumeModal();

    // 1. Submit Question Event
    if (chatForm && inputField) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = inputField.value.trim();
            if (text) {
                handleUserQuery(text);
                inputField.value = '';
            }
        });
    }

    // 2. Quick Question Chips
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            if (query) {
                handleUserQuery(query);
            }
        });
    });

    // Main Query Execution Pipeline
    function handleUserQuery(queryText) {
        if (!streamContainer) return;

        // Render User Query Bubble
        renderUserBubble(queryText);

        // Set Avatar State to Thinking
        setAvatarState('thinking', 'Thinking...');

        // Process query with Intent Engine
        setTimeout(() => {
            const responseObj = chatEngine.processQuery(queryText);

            // Render AI Response Bubble
            renderAIResponse(responseObj);

            // Reset Avatar State
            setAvatarState('ready', 'Ready');
        }, 350);
    }

    function renderUserBubble(text) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble user-bubble';
        bubble.innerHTML = `
            <div class="user-header">YOU</div>
            <div class="bubble-body">${escapeHtml(text)}</div>
        `;
        streamContainer.appendChild(bubble);
        scrollToBottom();
    }

    function renderAIResponse(resp) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ai-bubble';

        // Header
        let html = `
            <div class="bubble-header">
                <span class="badge-ai">TEJAS AI</span>
            </div>
            <div class="bubble-body" id="streaming-body"></div>
        `;

        bubble.innerHTML = html;
        streamContainer.appendChild(bubble);

        const bodyEl = bubble.querySelector('#streaming-body');

        // Streaming text simulation
        streamText(bodyEl, resp.text, () => {

            // Render Inline Cards if present
            if (resp.cards && resp.cards.length > 0) {
                const cardsWrapper = document.createElement('div');
                cardsWrapper.className = 'inline-cards-wrapper';

                resp.cards.forEach(card => {
                    cardsWrapper.appendChild(buildCardElement(card));
                });

                bubble.appendChild(cardsWrapper);
            }

            // Render Follow-up Action Chips if present
            if (resp.actions && resp.actions.length > 0) {
                const actionsWrapper = document.createElement('div');
                actionsWrapper.className = 'bubble-actions';

                resp.actions.forEach(act => {
                    const btn = document.createElement('button');
                    btn.className = 'action-chip-btn';

                    if (act.query) {
                        btn.innerHTML = `${escapeHtml(act.label)} →`;
                        btn.addEventListener('click', () => handleUserQuery(act.query));
                    } else if (act.url) {
                        btn.innerHTML = `${escapeHtml(act.label)} <i class="fas fa-arrow-up-right-from-square"></i>`;
                        btn.addEventListener('click', () => window.open(act.url, '_blank'));
                    } else if (act.action === 'copy-email') {
                        btn.innerHTML = `<i class="fas fa-copy"></i> ${escapeHtml(act.label)}`;
                        btn.addEventListener('click', () => copyToClipboard(act.value || 'rajtejas.xyz@gmail.com'));
                    } else if (act.action === 'open-resume') {
                        btn.innerHTML = `<i class="fas fa-file-pdf"></i> ${escapeHtml(act.label)}`;
                        btn.addEventListener('click', openResumeModal);
                    }

                    actionsWrapper.appendChild(btn);
                });

                bubble.appendChild(actionsWrapper);
            }

            scrollToBottom();
        });
    }

    function buildCardElement(card) {
        const el = document.createElement('div');
        el.className = 'inline-card';

        if (card.type === 'pr_card') {
            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.repo)}</span>
                    <span class="card-badge">${escapeHtml(card.status)}</span>
                </div>
                <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">${escapeHtml(card.title)}</div>
                <div class="card-desc-text"><strong>Problem:</strong> ${escapeHtml(card.problem)}</div>
                <div class="card-desc-text"><strong>Solution:</strong> ${escapeHtml(card.solution)}</div>
                <a href="${card.url}" target="_blank" class="card-link-btn">View Pull Request <i class="fas fa-arrow-up-right-from-square"></i></a>
            `;
        } else if (card.type === 'repo_summary') {
            let highlightsHtml = (card.highlights || []).slice(0, 2).map(h => `
                <div style="font-size:0.85rem; margin-top:6px;">
                    <strong>${escapeHtml(h.title)}</strong> (${escapeHtml(h.status)})
                    <br><a href="${h.url}" target="_blank" class="card-link-btn" style="font-size:0.78rem">View PR →</a>
                </div>
            `).join('');

            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.title)}</span>
                    <span class="card-badge">${escapeHtml(card.subtitle)}</span>
                </div>
                ${highlightsHtml}
            `;
        } else if (card.type === 'ai_card') {
            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.title)}</span>
                    <span class="card-badge">${escapeHtml(card.category)}</span>
                </div>
                <div class="card-desc-text">${escapeHtml(card.description)}</div>
                ${card.url ? `<a href="${card.url}" target="_blank" class="card-link-btn">View Evidence <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
            `;
        } else if (card.type === 'systems_card') {
            let metricsHtml = (card.metrics || []).map(m => `<span class="tag-mini">${escapeHtml(m)}</span>`).join(' ');

            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.title)}</span>
                    <span class="card-badge">${escapeHtml(card.subtitle)}</span>
                </div>
                <div class="card-desc-text">${escapeHtml(card.description)}</div>
                <div class="card-tags-row" style="margin-bottom:8px;">${metricsHtml}</div>
                ${card.url ? `<a href="${card.url}" target="_blank" class="card-link-btn">View Repository <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
            `;
        }

        return el;
    }

    function streamText(targetEl, text, callback) {
        let index = 0;
        const formatted = formatMarkdownText(text);

        // Fast streaming effect
        targetEl.innerHTML = formatted;
        if (callback) callback();
    }

    function formatMarkdownText(str) {
        if (!str) return '';
        let out = escapeHtml(str);
        // bold
        out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // inline code
        out = out.replace(/`(.*?)`/g, '<code style="font-family:var(--font-mono); font-size:0.85em; background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px;">$1</code>');
        // markdown links
        out = out.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-blue); text-decoration:none;">$1 <i class="fas fa-arrow-up-right-from-square" style="font-size:0.75em"></i></a>');
        return out;
    }

    function setAvatarState(state, text) {
        if (!avatarContainer || !avatarBadge) return;
        if (state === 'thinking') {
            avatarContainer.classList.add('thinking');
            avatarBadge.innerHTML = `<span class="status-dot"></span> ${text}`;
        } else {
            avatarContainer.classList.remove('thinking');
            avatarBadge.innerHTML = `<span class="status-dot"></span> ${text}`;
        }
    }

    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // 3. Copy Email & Toast
    function initCopyEmailButtons() {
        const btns = document.querySelectorAll('.copy-email-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = btn.getAttribute('data-email') || 'rajtejas.xyz@gmail.com';
                copyToClipboard(email);
            });
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied to clipboard: ${text}`);
        }).catch(() => {
            showToast(`Email: ${text}`);
        });
    }

    function showToast(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // 4. Resume Modal
    function initResumeModal() {
        const btns = document.querySelectorAll('.open-resume-modal');
        const modal = document.getElementById('resume-modal');
        const closeBtn = document.getElementById('resume-close');

        if (!modal) return;

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openResumeModal();
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeResumeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeResumeModal();
        });
    }

    function openResumeModal() {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function closeResumeModal() {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        }
    }
});
