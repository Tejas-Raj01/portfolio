// Tejas Raj Portfolio — Personal AI Command Interface Logic

document.addEventListener('DOMContentLoaded', () => {
    initAICommandInterface();
    initScrollSpyAndProgress();
    initCopyEmailButtons();
    initCommandPalette();
    initResumeModal();
});

// STRUCTURED PORTFOLIO DATA STORE
const portfolioData = {
    identity: {
        name: "Tejas Raj",
        role: "AI Engineer — Generative AI · Agent Infrastructure · Open Source",
        statement: "I build and contribute to the infrastructure that makes AI systems useful.",
        email: "rajtejas.xyz@gmail.com",
        github: "https://github.com/Tejas-Raj01",
        linkedin: "https://www.linkedin.com/in/tejas-raj-09aa4a236/"
    },
    work: [
        {
            name: "vLLM",
            category: "Open-source LLM inference infrastructure",
            summary: "Fixed request index preemption misalignment in SchedulingPolicy.PRIORITY under KV cache memory pressure.",
            tags: ["Python", "PyTorch", "LLM Inference"],
            link: "https://github.com/vllm-project/vllm/pull/49206"
        },
        {
            name: "PyTorch",
            category: "Core open-source ML framework",
            summary: "Fixed FX operator return schema annotations (PR #189142) and resolved C++ sparse tensor division-by-zero crash (PR #190191).",
            tags: ["C++", "Python", "FX Tracer"],
            link: "https://github.com/pytorch/pytorch/pull/189142"
        },
        {
            name: "Tejas-DB",
            category: "Distributed C++ infrastructure foundation",
            summary: "Decentralized P2P key-value store featuring std::shared_mutex locking, WAL persistence, Gossip protocol, and Quorum consensus.",
            metrics: "33,685 req/s · ~2.97ms latency · 100 threads",
            tags: ["C++17", "Distributed Systems", "WAL"],
            link: "https://github.com/Tejas-Raj01/distributed-system"
        }
    ],
    openclaw: {
        title: "Focus: OpenClaw Agent Infrastructure",
        url: "https://openclaw.ai/",
        docs: "https://docs.openclaw.ai/",
        summary: "Exploring and contributing to self-hosted AI agent runtimes, tool calling schemas, session memory, and multi-agent gateway routing.",
        modules: ["Agent Runtime", "Tools & Skills", "Sessions & Memory", "Multi-Agent Gateway"]
    },
    why: "The interesting part of AI isn't only the model. It's everything around it — inference, memory, tools, orchestration, evaluation, and reliability."
};

// 1. PERSONAL AI COMMAND INTERFACE ROUTER
function initAICommandInterface() {
    const input = document.getElementById('ai-prompt-input');
    const submitBtn = document.getElementById('ai-submit-btn');
    const terminal = document.getElementById('ai-response-terminal');
    const chips = document.querySelectorAll('.prompt-chip');

    if (!input || !terminal) return;

    function handleQuery(userQuery) {
        if (!userQuery) return;
        const q = userQuery.toLowerCase().trim();

        // Render user prompt line
        appendLine(`<span class="user-prefix">USER &gt;</span> ${escapeHtml(userQuery)}`);

        // Router Intent Matching
        if (q.includes('work') || q.includes('built') || q.includes('project') || q.includes('system')) {
            renderWorkResponse();
        } else if (q.includes('openclaw') || q.includes('agent')) {
            renderOpenClawResponse();
        } else if (q.includes('open source') || q.includes('oss') || q.includes('pr') || q.includes('contribution')) {
            renderOpenSourceResponse();
        } else if (q.includes('why') || q.includes('infra')) {
            renderWhyResponse();
        } else if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
            renderContactResponse();
        } else if (q.includes('who') || q.includes('about') || q.includes('tejas')) {
            renderIdentityResponse();
        } else {
            renderFallbackResponse(userQuery);
        }

        input.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => handleQuery(input.value));
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleQuery(input.value);
        }
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleQuery(query);
        });
    });

    function appendLine(htmlContent) {
        const line = document.createElement('div');
        line.className = 'response-line';
        line.innerHTML = htmlContent;
        terminal.appendChild(line);
    }

    function renderWorkResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Three key systems representing Tejas's AI &amp; infrastructure work:</strong><br><br>`;
        portfolioData.work.forEach((w, idx) => {
            html += `<strong>0${idx + 1} — ${w.name}</strong> (${w.category})<br>`;
            html += `<em>${w.summary}</em><br>`;
            if (w.metrics) html += `<span style="color:var(--accent-ai)">[Metrics]: ${w.metrics}</span><br>`;
            html += `<a href="${w.link}" target="_blank" class="action-btn" style="font-size:12px">View evidence →</a><br><br>`;
        });
        appendLine(html);
    }

    function renderOpenClawResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Focus: OpenClaw &amp; Agent Infrastructure</strong> (<a href="${portfolioData.openclaw.url}" target="_blank" class="highlight">openclaw.ai</a>)<br>`;
        html += `${portfolioData.openclaw.summary}<br><br>`;
        html += `<strong>Core Modules:</strong> ${portfolioData.openclaw.modules.join(" · ")}<br>`;
        html += `<span style="color:var(--fg-muted)">[Status]: Exploring and preparing upstream contributions. Built for live addition as PRs merge.</span>`;
        appendLine(html);
    }

    function renderOpenSourceResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Upstream Open Source Credibility:</strong><br>`;
        html += `• <strong>vLLM:</strong> Inference scheduler request preemption fix (<a href="https://github.com/vllm-project/vllm/pull/49206" target="_blank" class="highlight">PR #49206</a>)<br>`;
        html += `• <strong>PyTorch:</strong> FX operator return schema &amp; sparse C++ div-by-zero fixes (<a href="https://github.com/pytorch/pytorch/pull/189142" target="_blank" class="highlight">PR #189142</a>)<br>`;
        html += `• <strong>Jetpack:</strong> 9 merged PRs addressing block editor stability &amp; REST API schemas<br>`;
        html += `• <strong>Snapcraft:</strong> Linux package build linter resolution (<a href="https://github.com/canonical/snapcraft/pull/6272" target="_blank" class="highlight">PR #6272</a>)<br>`;
        html += `<a href="/opensource.html" class="action-btn" style="font-size:12px; margin-top:6px; display:inline-block">Explore detailed /opensource page →</a>`;
        appendLine(html);
    }

    function renderWhyResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Why Infrastructure?</strong><br>`;
        html += `"${portfolioData.why}"<br><br>`;
        html += `Tejas's C++ and distributed systems foundation (Tejas-DB) provides the systems reliability needed to optimize AI inference and agent runtimes.`;
        appendLine(html);
    }

    function renderContactResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Direct Contact Details:</strong><br>`;
        html += `• Email: <button class="copy-email-btn btn-link highlight" data-email="${portfolioData.identity.email}">${portfolioData.identity.email}</button><br>`;
        html += `• GitHub: <a href="${portfolioData.identity.github}" target="_blank" class="highlight">github.com/Tejas-Raj01</a><br>`;
        html += `• LinkedIn: <a href="${portfolioData.identity.linkedin}" target="_blank" class="highlight">linkedin.com/in/tejas-raj-09aa4a236</a><br>`;
        html += `• Resume: <button class="btn-link highlight open-resume-modal">View Resume Preview PDF</button>`;
        appendLine(html);

        // Re-bind email buttons
        initCopyEmailButtons();
        initResumeModal();
    }

    function renderIdentityResponse() {
        let html = `<span class="ai-prefix">[AI Interface]:</span> <strong>Tejas Raj — ${portfolioData.identity.role}</strong><br>`;
        html += `"${portfolioData.identity.statement}"<br><br>`;
        html += `Focused on generative AI, agent runtimes, LLM inference serving, and open-source infrastructure.`;
        appendLine(html);
    }

    function renderFallbackResponse(query) {
        let html = `<span class="ai-prefix">[AI Interface]:</span> I parsed "${escapeHtml(query)}". Here is a quick overview of Tejas's identity:<br>`;
        html += `<strong>Tejas Raj — AI Engineer</strong> (Generative AI · Agent Infrastructure · Open Source).<br>`;
        html += `Select a prompt chip above (Work, Open Source, OpenClaw, Contact) or ask specifically about vLLM, PyTorch, or Tejas-DB.`;
        appendLine(html);
    }

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

// 2. ScrollSpy & Reading Progress Bar
function initScrollSpyAndProgress() {
    const progressBar = document.getElementById('progress-bar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    }, { passive: true });
}

// 3. Copy Email & Toast Notification
function initCopyEmailButtons() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toastContainer = document.getElementById('toast-container');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'rajtejas.xyz@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(`[OK] Copied email: ${email}`);
            }).catch(() => {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`[OK] Copied email: ${email}`);
            });
        });
    });

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// 4. Command Palette (Cmd+K / Ctrl+K)
function initCommandPalette() {
    const cmdBtn = document.getElementById('cmd-palette-btn');
    const cmdModal = document.getElementById('cmd-modal');
    const cmdClose = document.getElementById('cmd-close');
    const cmdInput = document.getElementById('cmd-input');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (!cmdModal || !cmdInput) return;

    let selectedIndex = -1;

    function openPalette() {
        cmdModal.classList.add('open');
        cmdModal.setAttribute('aria-hidden', 'false');
        cmdInput.value = '';
        filterItems('');
        setTimeout(() => cmdInput.focus(), 50);
    }

    function closePalette() {
        cmdModal.classList.remove('open');
        cmdModal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdModal.classList.contains('open')) {
                closePalette();
            } else {
                openPalette();
            }
        } else if (e.key === 'Escape' && cmdModal.classList.contains('open')) {
            closePalette();
        }
    });

    if (cmdBtn) cmdBtn.addEventListener('click', openPalette);
    if (cmdClose) cmdClose.addEventListener('click', closePalette);

    cmdModal.addEventListener('click', (e) => {
        if (e.target === cmdModal) closePalette();
    });

    cmdInput.addEventListener('input', (e) => {
        filterItems(e.target.value.toLowerCase().trim());
    });

    function filterItems(query) {
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
            item.classList.remove('selected');
        });
        selectedIndex = -1;
    }

    cmdInput.addEventListener('keydown', (e) => {
        const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
        if (visibleItems.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % visibleItems.length;
            updateSelection(visibleItems);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
            updateSelection(visibleItems);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && visibleItems[selectedIndex]) {
                visibleItems[selectedIndex].click();
            } else if (visibleItems.length > 0) {
                visibleItems[0].click();
            }
        }
    });

    function updateSelection(visibleItems) {
        visibleItems.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');
            const query = item.getAttribute('data-query');

            closePalette();

            if (action === 'query' && query) {
                const promptInput = document.getElementById('ai-prompt-input');
                const submitBtn = document.getElementById('ai-submit-btn');
                if (promptInput && submitBtn) {
                    promptInput.value = query;
                    submitBtn.click();
                    const heroSec = document.getElementById('hero');
                    if (heroSec) heroSec.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (action === 'external' && target) {
                window.open(target, '_blank');
            } else if (action === 'copy-email') {
                const copyBtn = document.querySelector('.copy-email-btn');
                if (copyBtn) copyBtn.click();
            } else if (action === 'open-resume') {
                const resumeModal = document.getElementById('resume-modal');
                if (resumeModal) {
                    resumeModal.classList.add('open');
                    resumeModal.setAttribute('aria-hidden', 'false');
                }
            }
        });
    });
}

// 5. Resume Viewer Modal Logic
function initResumeModal() {
    const resumeBtns = document.querySelectorAll('.open-resume-modal');
    const resumeModal = document.getElementById('resume-modal');
    const resumeClose = document.getElementById('resume-close');

    if (!resumeModal) return;

    resumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
        });
    });

    if (resumeClose) {
        resumeClose.addEventListener('click', () => {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
        });
    }

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('open');
            resumeModal.setAttribute('aria-hidden', 'true');
        }
    });
}
