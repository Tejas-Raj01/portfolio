// Tejas Raj — ChatGPT/Gemini-Style AI Portfolio Controller

import { PortfolioChatEngine } from './src/chat-engine.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatEngine = new PortfolioChatEngine();

    const landingState = document.getElementById('landing-state');
    const chatState = document.getElementById('chat-state');
    const chatHistory = document.getElementById('chat-history');

    const landingForm = document.getElementById('landing-form');
    const landingInput = document.getElementById('landing-prompt-input');

    const stickyForm = document.getElementById('sticky-chat-form');
    const stickyInput = document.getElementById('sticky-prompt-input');

    const quickChips = document.querySelectorAll('.quick-chip');
    const brandLogoBtn = document.getElementById('brand-logo-btn');

    let hasStartedChat = false;

    initCopyEmailButtons();
    initResumeModal();

    // 1. Landing Form Submit (State A)
    if (landingForm && landingInput) {
        landingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = landingInput.value.trim();
            if (query) {
                handleUserQuery(query, false);
                landingInput.value = '';
            }
        });
    }

    // 2. Sticky Bottom Form Submit (State B)
    if (stickyForm && stickyInput) {
        stickyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = stickyInput.value.trim();
            if (query) {
                handleUserQuery(query, false);
                stickyInput.value = '';
            }
        });
    }

    // 3. Quick Suggested Prompt Chips (Tag Clicks)
    // "agr mene ek tag baad dusre tag pr click kiya to purane tag k data htakr new tag k data ana chahiye"
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            if (query) {
                handleUserQuery(query, true); // isTagClick = true -> clear previous tag data!
            }
        });
    });

    // 4. Brand Logo Click (Reset to Landing)
    if (brandLogoBtn) {
        brandLogoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetToLandingState();
        });
    }

    // Pipeline: Process Query & Render Turns
    function handleUserQuery(queryText, isTagClick = false) {
        // Transition from State A -> State B on first query
        if (!hasStartedChat) {
            transitionToChatState();
        }

        // If tag clicked after previous turns exist, replace previous tag output!
        if (isTagClick && chatHistory) {
            chatHistory.innerHTML = '';
        }

        // Render User Turn
        renderUserMessage(queryText);

        // Render Temporary AI Thinking Turn
        const thinkingTurnEl = renderThinkingMessage();

        scrollToBottom();

        // Process query via Intent Engine
        setTimeout(() => {
            const resp = chatEngine.processQuery(queryText);

            // Replace Thinking Turn with AI Turn
            replaceThinkingWithAIResponse(thinkingTurnEl, resp);

            scrollToBottom();

            // Refocus Sticky Input
            if (stickyInput) {
                stickyInput.focus();
            }
        }, 250);
    }

    function transitionToChatState() {
        hasStartedChat = true;
        if (landingState) landingState.classList.add('hidden');
        if (chatState) chatState.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function resetToLandingState() {
        hasStartedChat = false;
        if (chatHistory) chatHistory.innerHTML = '';
        if (chatState) chatState.classList.add('hidden');
        if (landingState) landingState.classList.remove('hidden');
        if (landingInput) {
            landingInput.value = '';
            landingInput.focus();
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function renderUserMessage(text) {
        const turn = document.createElement('div');
        turn.className = 'chat-message user-message';
        turn.innerHTML = `
            <div class="message-sender">You</div>
            <div class="message-text">${escapeHtml(text)}</div>
        `;
        chatHistory.appendChild(turn);
    }

    function renderThinkingMessage() {
        const turn = document.createElement('div');
        turn.className = 'chat-message ai-message thinking-turn';
        turn.innerHTML = `
            <div class="message-sender">Tejas AI</div>
            <div class="thinking-dots">
                Thinking<span>.</span><span>.</span><span>.</span>
            </div>
        `;
        chatHistory.appendChild(turn);
        return turn;
    }

    function replaceThinkingWithAIResponse(thinkingEl, resp) {
        thinkingEl.className = 'chat-message ai-message';
        let bodyHtml = formatMarkdownText(resp.text);

        let turnHtml = `
            <div class="message-sender">Tejas AI</div>
            <div class="message-text">${bodyHtml}</div>
        `;

        thinkingEl.innerHTML = turnHtml;

        // Render Inline Evidence / PR Cards / Projects if present
        if (resp.cards && resp.cards.length > 0) {
            const cardsWrapper = document.createElement('div');
            cardsWrapper.className = 'inline-cards-wrapper';

            resp.cards.forEach(card => {
                cardsWrapper.appendChild(buildCardElement(card));
            });

            thinkingEl.appendChild(cardsWrapper);
        }
    }

    function buildCardElement(card) {
        const el = document.createElement('div');
        el.className = 'inline-card';

        // 1. Repo Summary Card for Open Source Tag
        // "pr tag m sirf company/project dikhayega aur uska sath link dega jo github k PR search URL ka hoga"
        if (card.type === 'repo_summary_card') {
            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.title)}</span>
                    <span class="card-badge">${escapeHtml(card.subtitle)}</span>
                </div>
                <div class="card-desc-text">${escapeHtml(card.summary || '')}</div>
                <a href="${card.prSearchUrl}" target="_blank" class="card-link-btn" style="font-weight:600;">
                    <i class="fab fa-github"></i> View My PRs on GitHub (${card.count}) <i class="fas fa-arrow-up-right-from-square"></i>
                </a>
            `;
        }
        // 2. Specific PR Card
        else if (card.type === 'pr_card') {
            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.repo)}</span>
                    <span class="card-badge">${escapeHtml(card.status)}</span>
                </div>
                <div style="font-weight:600; font-size:0.95rem; margin-bottom:6px; color:#ffffff;">${escapeHtml(card.title)}</div>
                <div class="card-desc-text"><strong>Problem:</strong> ${escapeHtml(card.problem)}</div>
                <div class="card-desc-text"><strong>Solution:</strong> ${escapeHtml(card.solution)}</div>
                <div style="display:flex; gap:12px; margin-top:6px; flex-wrap:wrap;">
                    <a href="${card.url}" target="_blank" class="card-link-btn">View Pull Request <i class="fas fa-arrow-up-right-from-square"></i></a>
                    ${card.prSearchUrl ? `<a href="${card.prSearchUrl}" target="_blank" class="card-link-btn" style="color:var(--text-muted);"><i class="fab fa-github"></i> All ${escapeHtml(card.repo)} PRs <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
            `;
        }
        // 3. Systems & AI Projects Card (contains BOTH GitHub & Live URLs!)
        else if (card.type === 'project_card' || card.type === 'ai_project_card') {
            let metricsHtml = (card.metrics || card.tags || []).map(m => `<span class="tag-mini">${escapeHtml(m)}</span>`).join(' ');

            el.innerHTML = `
                <div class="card-top-row">
                    <span class="card-repo-name">${escapeHtml(card.title)}</span>
                    <span class="card-badge">${escapeHtml(card.subtitle || card.category || 'Project')}</span>
                </div>
                <div class="card-desc-text">${escapeHtml(card.description)}</div>
                <div class="card-tags-row" style="margin-bottom:10px;">${metricsHtml}</div>
                <div style="display:flex; gap:14px; margin-top:6px; flex-wrap:wrap;">
                    ${card.githubUrl ? `<a href="${card.githubUrl}" target="_blank" class="card-link-btn"><i class="fab fa-github"></i> GitHub Repo <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                    ${card.liveUrl ? `<a href="${card.liveUrl}" target="_blank" class="card-link-btn" style="color:var(--accent-emerald);"><i class="fas fa-globe"></i> Live Website <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
            `;
        }

        return el;
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

    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Copy Email Handler
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

    // Resume Modal Handler
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
