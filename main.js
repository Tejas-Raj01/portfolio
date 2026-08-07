// Tejas Raj Portfolio — AI Engineer & Agent Infrastructure Router Logic

document.addEventListener('DOMContentLoaded', () => {
    initAICommandGateway();
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
    ]
};

// 1. AI CHAT GATEWAY & ROUTER
function initAICommandGateway() {
    const input = document.getElementById('ai-prompt-input');
    const submitBtn = document.getElementById('ai-submit-btn');
    const terminal = document.getElementById('ai-response-terminal');
    const quickBtns = document.querySelectorAll('.quick-btn');

    if (!input || !terminal) return;

    function routeQuery(queryText) {
        if (!queryText) return;
        const q = queryText.toLowerCase().trim();

        // Append User Prompt Line
        appendLine(`<span class="user-prefix">USER &gt;</span> ${escapeHtml(queryText)}`);

        // Router Intent Engine
        if (q.includes('work') || q.includes('project') || q.includes('built')) {
            renderWorkRoute();
        } else if (q.includes('open source') || q.includes('oss') || q.includes('pr')) {
            renderOpenSourceRoute();
        } else if (q.includes('agent') || q.includes('openclaw')) {
            renderAgentsRoute();
        } else if (q.includes('system') || q.includes('c++') || q.includes('tejas-db')) {
            renderSystemsRoute();
        } else if (q.includes('about') || q.includes('who') || q.includes('bio')) {
            renderAboutRoute();
        } else if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
            renderContactRoute();
        } else {
            renderFallbackRoute(queryText);
        }

        input.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => routeQuery(input.value));
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            routeQuery(input.value);
        }
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            routeQuery(query);
        });
    });

    function appendLine(htmlContent) {
        const line = document.createElement('div');
        line.className = 'response-line';
        line.innerHTML = htmlContent;
        terminal.appendChild(line);
    }

    function renderWorkRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Opening /work section...</strong><br><br>`;
        portfolioData.work.forEach((w, idx) => {
            html += `<strong>0${idx + 1} — ${w.name}</strong> (${w.category})<br>`;
            html += `<em>${w.summary}</em><br>`;
            html += `<a href="${w.link}" target="_blank" class="action-btn" style="font-size:12px">View evidence →</a><br><br>`;
        });
        appendLine(html);
        scrollToSection('#work');
    }

    function renderOpenSourceRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Routing to /open-source timeline...</strong><br>`;
        html += `• <strong>vLLM:</strong> Request preemption queue re-indexing (<a href="https://github.com/vllm-project/vllm/pull/49206" target="_blank" class="highlight">PR #49206</a>)<br>`;
        html += `• <strong>PyTorch:</strong> FX operator return schemas &amp; C++ sparse div-by-zero (<a href="https://github.com/pytorch/pytorch/pull/189142" target="_blank" class="highlight">PR #189142</a>)<br>`;
        html += `• <strong>Jetpack, Snapcraft, CP Editor:</strong> Verified merged upstream contributions.<br>`;
        html += `<a href="/opensource.html" class="action-btn" style="font-size:12px; margin-top:4px; display:inline-block">Explore detailed /opensource page →</a>`;
        appendLine(html);
        scrollToSection('#open-source');
    }

    function renderAgentsRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Routing to /agents (Agent Infrastructure)...</strong><br>`;
        html += `Focused on agent runtimes, tool schemas, memory, and multi-agent routing.<br>`;
        html += `<span style="color:var(--accent-ai)">Open Source Focus: OpenClaw (openclaw.ai) — Exploring &amp; preparing upstream contributions.</span>`;
        appendLine(html);
        scrollToSection('#agents');
    }

    function renderSystemsRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Routing to /systems...</strong><br>`;
        html += `Tejas-DB: Distributed Key-Value Store built in C++17 (33,685 req/s, ~2.97ms latency, WAL, Gossip, Quorum). Demonstrates the systems foundation behind AI infrastructure work.`;
        appendLine(html);
        scrollToSection('#systems');
    }

    function renderAboutRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Routing to /about...</strong><br>`;
        html += `Tejas Raj — AI Engineer focused on generative AI, agent runtimes, LLM inference serving, and open-source systems.`;
        appendLine(html);
        scrollToSection('#about');
    }

    function renderContactRoute() {
        let html = `<span class="ai-prefix">[AI Router]:</span> <strong>Routing to /contact...</strong><br>`;
        html += `Email: <button class="copy-email-btn btn-link highlight" data-email="${portfolioData.identity.email}">${portfolioData.identity.email}</button> · `;
        html += `<a href="${portfolioData.identity.github}" target="_blank" class="highlight">GitHub</a> · `;
        html += `<a href="${portfolioData.identity.linkedin}" target="_blank" class="highlight">LinkedIn</a> · `;
        html += `<button class="btn-link highlight open-resume-modal">Resume PDF</button>`;
        appendLine(html);
        scrollToSection('#contact');
        initCopyEmailButtons();
        initResumeModal();
    }

    function renderFallbackRoute(query) {
        let html = `<span class="ai-prefix">[AI Router]:</span> I parsed "${escapeHtml(query)}". Routing you to Tejas's work...`;
        appendLine(html);
        scrollToSection('#work');
    }

    function scrollToSection(selector) {
        const sec = document.querySelector(selector);
        if (sec) {
            setTimeout(() => sec.scrollIntoView({ behavior: 'smooth' }), 300);
        }
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

            closePalette();

            if (action === 'navigate' && target) {
                const sec = document.querySelector(target);
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
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
