import { portfolioData } from './src/portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {

    // Helper: Toast Notifications
    const showToast = (message, icon = 'fa-solid fa-circle-check') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        // Force reflow and show
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2800);
    };

    // 1. Render Hero Section
    const heroSec = document.getElementById('hero-section');
    if (heroSec) {
        heroSec.innerHTML = `
            <div class="hero-status-pill">
                <span class="status-dot-container">
                    <span class="status-dot-ping"></span>
                    <span class="status-dot-core"></span>
                </span>
                <span>NIT Durgapur '27 · Open-Source Infrastructure</span>
            </div>

            <h1 class="hero-name">
                <span class="hero-name-gradient">${portfolioData.identity.name}</span>
            </h1>
            
            <div class="hero-subtitle-bar">
                <span>/tɛ-dʒəs/</span>
                <span class="hero-dot">•</span>
                <span>noun</span>
                <span class="hero-dot">•</span>
                <button class="audio-pronounce-btn" id="btn-pronounce" title="Listen to pronunciation">
                    <i class="fa-solid fa-volume-high"></i>
                    <span>Listen</span>
                </button>
                <span class="hero-dot">•</span>
                <div style="display:flex; align-items:center;">
                    <button class="lofi-btn" id="play-lofi" aria-label="Toggle Lo-Fi Chillhop Radio" title="Lo-Fi Radio [M]">
                        <span class="lofi-waves">
                            <span></span><span></span><span></span>
                        </span>
                        <span>LOFI RADIO</span>
                    </button>
                    <audio id="lofi-audio" src="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/" preload="none"></audio>
                </div>
            </div>
            
            <div class="hero-tagline">
                Contributing to core open-source infrastructure across <strong>vLLM</strong>, <strong>PyTorch</strong>, <strong>Canonical</strong>, and <strong>Jetpack</strong>. 
                Architecting high-throughput distributed systems &amp; production AI workflow engines.
            </div>

            <div class="hero-cta-bar">
                <a href="#projects-section" class="btn-hero btn-hero-primary">
                    <i class="fa-solid fa-star" style="color:#eab308;"></i> View Projects
                </a>
                <a href="#opensource-section" class="btn-hero btn-hero-secondary">
                    <i class="fa-solid fa-code-pull-request" style="color:var(--accent-purple);"></i> Open Source
                </a>
                <button id="hero-resume-btn" class="btn-hero btn-hero-pdf">
                    <i class="fa-regular fa-file-pdf"></i> Resume PDF
                </button>
                <a href="#about-section" class="btn-hero btn-hero-secondary">
                    <i class="fa-regular fa-paper-plane" style="color:var(--accent-indigo);"></i> Get in Touch
                </a>
            </div>
        `;
    }

    // 2. Render Summary Section (Terminal Style)
    const summarySec = document.getElementById('summary-section');
    if (summarySec) {
        const listItems = portfolioData.me.focusAreas.map(item => {
            const parts = item.split(': ');
            if (parts.length > 1) {
                return `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(': ')}</li>`;
            }
            return `<li><strong>${item}</strong></li>`;
        }).join('');

        summarySec.innerHTML = `
            <h2 class="section-title"><i class="fa-regular fa-id-card"></i> Professional Summary</h2>
            <div class="terminal-card spotlight-card">
                <div class="terminal-header">
                    <div class="terminal-dots">
                        <span class="terminal-dot dot-red"></span>
                        <span class="terminal-dot dot-yellow"></span>
                        <span class="terminal-dot dot-green"></span>
                    </div>
                    <span>~/tejas/profile.sh</span>
                    <span style="opacity:0.6;"><i class="fa-solid fa-terminal"></i></span>
                </div>
                <div class="terminal-body">
                    <div class="summary-headline">
                        ${portfolioData.me.headline}
                    </div>
                    <p class="section-subtitle-text" style="margin-top:0; margin-bottom:1.75rem;">
                        ${portfolioData.me.description}
                    </p>
                    <ul class="summary-list">
                        ${listItems}
                    </ul>
                </div>
            </div>
        `;
    }

    // 3. Render Achievements Section (Bento Grid)
    const achieveSec = document.getElementById('achievements-section');
    if (achieveSec) {
        achieveSec.innerHTML = `
            <h2 class="section-title"><i class="fa-solid fa-chart-simple"></i> Key Highlights &amp; Metrics</h2>
            <div class="bento-stats-grid">
                <div class="bento-stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-award card-top-icon"></i>
                    <div class="stat-number-wrapper">
                        <span class="stat-number stat-gold">4<i class="fa-solid fa-star" style="font-size: 0.6em; margin-left: 2px;"></i></span>
                    </div>
                    <span class="stat-label">CodeChef 4★</span>
                    <span class="stat-desc">Competitive Programming · Max 1804 (Top ~3% globally)</span>
                    <span class="stat-badge">Algorithms</span>
                </div>

                <div class="bento-stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-code-pull-request card-top-icon"></i>
                    <div class="stat-number-wrapper">
                        <span class="stat-number stat-purple">20+</span>
                    </div>
                    <span class="stat-label">Upstream PRs</span>
                    <span class="stat-desc">vLLM, PyTorch, Canonical Snapcraft, Automattic Jetpack</span>
                    <span class="stat-badge">Open Source</span>
                </div>

                <div class="bento-stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-bolt card-top-icon"></i>
                    <div class="stat-number-wrapper">
                        <span class="stat-number stat-emerald">33.6k</span>
                    </div>
                    <span class="stat-label">req/s Throughput</span>
                    <span class="stat-desc">Tejas-DB C++17 Distributed KV Store · ~2.97ms Latency</span>
                    <span class="stat-badge">Systems</span>
                </div>

                <div class="bento-stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-diagram-project card-top-icon"></i>
                    <div class="stat-number-wrapper">
                        <span class="stat-number stat-indigo">7-Step</span>
                    </div>
                    <span class="stat-label">Deterministic DAG</span>
                    <span class="stat-desc">DealLens AI Engine · pgvector RRF Hybrid Search &amp; Guardrails</span>
                    <span class="stat-badge">Production AI</span>
                </div>
            </div>
        `;
    }

    // 4. Render Star Projects Section
    const projSec = document.getElementById('projects-section');
    if (projSec) {
        const allProjects = [...portfolioData.aiWork, ...portfolioData.systems];
        
        let projCardsHtml = allProjects.map(proj => {
            const tags = proj.tags || proj.tech || [];
            const tagHtml = tags.map(t => `<span class="pc-tag">${t}</span>`).join('');
            
            // Format sentences into structured bullet items
            const sentences = proj.description.split('. ').filter(s => s.length > 0).map(s => s + (s.endsWith('.') ? '' : '.'));
            const descHtml = sentences.map(s => `<li>${s}</li>`).join('');

            // Metrics bar if available
            let metricsHtml = '';
            if (proj.metrics && proj.metrics.length > 0) {
                metricsHtml = `
                    <div class="pc-metrics-strip">
                        ${proj.metrics.map(m => `<span class="metric-pill"><i class="fa-solid fa-bolt"></i> ${m}</span>`).join('')}
                    </div>
                `;
            } else if (proj.title.includes('DealLens')) {
                metricsHtml = `
                    <div class="pc-metrics-strip">
                        <span class="metric-pill"><i class="fa-solid fa-diagram-project"></i> 7-Step DAG Engine</span>
                        <span class="metric-pill"><i class="fa-solid fa-database"></i> pgvector 16 Hybrid RRF</span>
                        <span class="metric-pill"><i class="fa-solid fa-shield-halved"></i> CitationVerifier Guardrail</span>
                        <span class="metric-pill"><i class="fa-solid fa-file-lines"></i> Page-Aware PDF Parsing</span>
                    </div>
                `;
            }

            return `
            <div class="project-showcase-card spotlight-card fade-up">
                <div class="pc-top-bar">
                    <div class="pc-title-group">
                        <h3 class="pc-title">
                            ${proj.title}
                        </h3>
                        <span class="pc-subtitle">${proj.subtitle || proj.category}</span>
                    </div>
                    <span class="pc-category-badge">${proj.category || 'Engineering'}</span>
                </div>

                ${metricsHtml}

                <ul class="pc-desc-list">
                    ${descHtml}
                </ul>

                <div class="pc-tags-row">
                    ${tagHtml}
                </div>

                <div class="pc-action-buttons">
                    ${proj.liveUrl ? `
                        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-link btn-project-demo">
                            <span class="live-pulse-dot"></span> Live Application <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
                        </a>
                    ` : ''}
                    ${proj.githubUrl ? `
                        <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-link btn-project-code">
                            <i class="fa-brands fa-github"></i> View Source <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
                        </a>
                    ` : ''}
                </div>
            </div>`;
        }).join('');

        projSec.innerHTML = `
            <div class="section-header-row">
                <h2 class="section-title"><i class="fa-solid fa-star" style="color:#eab308;"></i> Star Engineering Projects</h2>
            </div>
            <div class="projects-flow">
                ${projCardsHtml}
            </div>
        `;
    }

    // 5. Render Open Source Section with Reactive Filter Tabs
    const osSec = document.getElementById('opensource-section');
    if (osSec) {
        // Collect unique categories / repos for filter tabs
        const repoTabs = [
            { id: 'all', label: 'All Upstream' },
            { id: 'vLLM', label: 'vLLM' },
            { id: 'PyTorch', label: 'PyTorch' },
            { id: 'Canonical', label: 'Canonical' },
            { id: 'Jetpack', label: 'Jetpack' },
            { id: 'CP Editor', label: 'CP Editor' }
        ];

        const tabsHtml = repoTabs.map((t, idx) => `
            <button class="oss-filter-tab ${idx === 0 ? 'active' : ''}" data-filter="${t.id}">${t.label}</button>
        `).join('');

        let groupsHtml = portfolioData.openSource.map(proj => {
            const isMatch = (filterId) => {
                if (filterId === 'all') return true;
                if (filterId === 'Canonical') return proj.repo.includes('Canonical');
                if (filterId === 'Jetpack') return proj.repo.includes('Jetpack');
                return proj.repo.toLowerCase().includes(filterId.toLowerCase());
            };

            let prsHtml = proj.highlights.map(pr => {
                const isMerged = pr.status.toLowerCase().includes('merged');
                const isOpen = pr.status.toLowerCase().includes('open');
                const badgeClass = isMerged ? 'badge-merged' : (isOpen ? 'badge-open' : 'badge-closed');
                const statusIcon = isMerged ? '<i class="fa-solid fa-code-merge"></i>' : '<i class="fa-solid fa-code-pull-request"></i>';

                return `
                <div class="pr-card spotlight-card">
                    <div class="pr-card-header">
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="pr-num-link">
                                ${statusIcon} PR #${pr.prNumber}
                            </a>
                            <span class="badge ${badgeClass}">${pr.status}</span>
                        </div>
                        <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="oss-repo-link">
                            View on GitHub <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>

                    <div class="pr-title-text">${pr.title}</div>

                    <div class="pr-details-box">
                        ${pr.problem ? `
                            <div class="pr-field">
                                <span class="pr-field-label">Problem:</span>${pr.problem}
                            </div>
                        ` : ''}
                        ${pr.solution ? `
                            <div class="pr-field">
                                <span class="pr-field-label">Solution:</span>${pr.solution}
                            </div>
                        ` : ''}
                    </div>
                </div>`;
            }).join('');

            return `
            <div class="oss-project-group fade-up" data-repo-name="${proj.repo}">
                <div class="oss-group-header">
                    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                        <h3 class="oss-group-title">
                            <i class="fa-brands fa-github"></i> ${proj.repo}
                        </h3>
                        <a href="${proj.prSearchUrl || `https://github.com/${proj.fullRepo}`}" target="_blank" rel="noopener noreferrer" class="oss-repo-link">
                            ${proj.fullRepo} <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                    <span class="oss-category-tag">${proj.category}</span>
                </div>
                <div class="oss-prs-list">
                    ${prsHtml}
                </div>
            </div>`;
        }).join('');

        osSec.innerHTML = `
            <div class="section-header-row">
                <h2 class="section-title"><i class="fa-solid fa-code-pull-request"></i> Upstream Open Source Contributions</h2>
            </div>
            
            <div class="oss-filter-bar">
                ${tabsHtml}
            </div>

            <div id="oss-groups-container">
                ${groupsHtml}
            </div>

            <div class="oss-cta-banner spotlight-card fade-up">
                <p>Looking for full regression test suites, architecture notes, and merged commit logs?</p>
                <a href="/opensource.html" class="btn-oss-more">
                    <i class="fa-solid fa-book-open"></i> Explore Detailed Upstream Evidence Page <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        `;

        // Filter tab interactions
        const filterBtns = osSec.querySelectorAll('.oss-filter-tab');
        const groups = osSec.querySelectorAll('.oss-project-group');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                groups.forEach(group => {
                    const repo = group.dataset.repoName;
                    let matches = false;
                    if (filter === 'all') matches = true;
                    else if (filter === 'Canonical') matches = repo.includes('Canonical');
                    else if (filter === 'Jetpack') matches = repo.includes('Jetpack');
                    else matches = repo.toLowerCase().includes(filter.toLowerCase());

                    if (matches) {
                        group.style.display = 'flex';
                    } else {
                        group.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Render Tech Stack Section (Modern Categorized Bento)
    const techSec = document.getElementById('tech-section');
    if (techSec) {
        techSec.innerHTML = `
            <h2 class="section-title"><i class="fa-solid fa-layer-group"></i> Technologies &amp; Tooling</h2>
            <div class="tech-grid">
                
                <div class="tech-group-card spotlight-card fade-up">
                    <div class="tech-group-header">
                        <i class="fa-solid fa-brain"></i> AI &amp; ML Inference
                    </div>
                    <div class="tech-pills-wrap">
                        ${portfolioData.skills.ai.map(s => `<span class="tech-item-pill"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                        <span class="tech-item-pill"><i class="fa-solid fa-vector-square"></i> pgvector</span>
                        <span class="tech-item-pill"><i class="fa-solid fa-microchip"></i> CUDA / Triton</span>
                    </div>
                </div>

                <div class="tech-group-card spotlight-card fade-up">
                    <div class="tech-group-header">
                        <i class="fa-solid fa-code"></i> Core Languages
                    </div>
                    <div class="tech-pills-wrap">
                        ${portfolioData.skills.languages.map(s => `<span class="tech-item-pill"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                    </div>
                </div>

                <div class="tech-group-card spotlight-card fade-up">
                    <div class="tech-group-header">
                        <i class="fa-solid fa-server"></i> Backend &amp; Distributed Systems
                    </div>
                    <div class="tech-pills-wrap">
                        ${portfolioData.skills.backend.map(s => `<span class="tech-item-pill"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                        <span class="tech-item-pill"><i class="fa-solid fa-cubes"></i> Redis 7</span>
                        <span class="tech-item-pill"><i class="fa-solid fa-clock-rotate-left"></i> Celery</span>
                    </div>
                </div>

                <div class="tech-group-card spotlight-card fade-up">
                    <div class="tech-group-header">
                        <i class="fa-brands fa-linux"></i> Systems, Infra &amp; Frontend
                    </div>
                    <div class="tech-pills-wrap">
                        ${portfolioData.skills.infra.map(s => `<span class="tech-item-pill"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                        ${portfolioData.skills.frontend.map(s => `<span class="tech-item-pill"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                    </div>
                </div>

            </div>
        `;
    }

    // 7. Render Education Section
    const eduSec = document.getElementById('education-section');
    if (eduSec) {
        let eduHtml = `<h2 class="section-title"><i class="fa-solid fa-graduation-cap"></i> Education</h2><div style="display:flex; flex-direction:column; gap:1.25rem;">`;
        portfolioData.education.forEach(edu => {
            eduHtml += `
            <div class="edu-card spotlight-card fade-up">
                <div class="edu-top-row">
                    <h3 class="edu-institution">${edu.institution}</h3>
                    <span class="edu-period"><i class="fa-regular fa-calendar"></i> ${edu.period}</span>
                </div>
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-location"><i class="fa-solid fa-location-dot" style="margin-right:4px;"></i> ${edu.location}</div>
            </div>`;
        });
        eduHtml += `</div>`;
        eduSec.innerHTML = eduHtml;
    }

    // 8. Render Contact Section
    const aboutSec = document.getElementById('about-section');
    if (aboutSec) {
        aboutSec.innerHTML = `
            <h2 class="section-title"><i class="fa-regular fa-envelope"></i> Get In Touch</h2>
            <div class="contact-card spotlight-card fade-up">
                <h3 class="contact-heading">Let's build something fast and resilient.</h3>
                <p class="contact-subtitle">
                    Whether you are working on LLM inference, low-level Linux systems, distributed data engines, or high-impact software engineering roles — my inbox is always open.
                </p>

                <button class="email-copy-pill" id="copy-email-btn" title="Click to copy email address">
                    <i class="fa-regular fa-copy"></i>
                    <span>${portfolioData.about.email}</span>
                    <span class="copy-badge-label" id="copy-badge-label">Copy</span>
                </button>

                <div class="contact-actions-row">
                    <a href="mailto:${portfolioData.about.email}" class="contact-btn btn-contact-primary">
                        <i class="fa-solid fa-paper-plane"></i> Send Email
                    </a>
                    <a href="${portfolioData.about.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-btn btn-contact-secondary">
                        <i class="fa-brands fa-linkedin-in"></i> LinkedIn
                    </a>
                    <a href="${portfolioData.identity.github}" target="_blank" rel="noopener noreferrer" class="contact-btn btn-contact-secondary">
                        <i class="fa-brands fa-github"></i> GitHub
                    </a>
                </div>

                <div class="contact-location-info">
                    <span class="status-dot-container" style="display:inline-flex;">
                        <span class="status-dot-core"></span>
                    </span>
                    <span>Based in West Bengal, India (IST) · Open to high-impact engineering opportunities</span>
                </div>
            </div>
        `;

        // Copy Email Logic
        const copyEmailBtn = document.getElementById('copy-email-btn');
        const copyBadgeLabel = document.getElementById('copy-badge-label');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(portfolioData.about.email).then(() => {
                    if (copyBadgeLabel) copyBadgeLabel.textContent = 'Copied!';
                    showToast('Email address copied to clipboard!', 'fa-solid fa-clipboard-check');
                    setTimeout(() => {
                        if (copyBadgeLabel) copyBadgeLabel.textContent = 'Copy';
                    }, 2500);
                }).catch(() => {
                    window.location.href = `mailto:${portfolioData.about.email}`;
                });
            });
        }
    }

    // =========================================================================
    // INTERACTIVITY: Theme, Audio, Spotlight, Reading Bar, Modals
    // =========================================================================

    // Reading Progress Bar
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / (docHeight || 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // Theme Toggle Functionality
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            showToast(`Theme switched to ${newTheme} mode`, newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun');
        });
    }

    // Pronunciation Speech Synthesis
    const pronounceBtn = document.getElementById('btn-pronounce');
    if (pronounceBtn) {
        pronounceBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Stop any pending speech
                const utterance = new SpeechSynthesisUtterance('Tejas');
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.lang = 'en-US';
                window.speechSynthesis.speak(utterance);
                showToast('Pronunciation: "Tejas" (/tɛ-dʒəs/)', 'fa-solid fa-volume-high');
            } else {
                showToast('Tejas (/tɛ-dʒəs/)', 'fa-solid fa-volume-high');
            }
        });
    }

    // Lo-Fi Chillhop Audio Player
    const playLofiBtn = document.getElementById('play-lofi');
    const lofiAudio = document.getElementById('lofi-audio');
    let isPlaying = false;
    
    if (playLofiBtn && lofiAudio) {
        playLofiBtn.addEventListener('click', () => {
            if (isPlaying) {
                lofiAudio.pause();
                playLofiBtn.classList.remove('active');
                showToast('Lo-Fi radio paused', 'fa-solid fa-pause');
            } else {
                lofiAudio.play().then(() => {
                    playLofiBtn.classList.add('active');
                    showToast('Streaming Lo-Fi Chillhop radio ♫', 'fa-solid fa-music');
                }).catch(() => {
                    showToast('Could not start audio stream. Click again to play.', 'fa-solid fa-circle-exclamation');
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // Spotlight Cursor Effect on Cards
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    document.addEventListener('mousemove', (e) => {
        spotlightCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }, { passive: true });

    // Resume Modal Handler
    const resumeModal = document.getElementById('resume-modal');
    const resumeCloseBtn = document.getElementById('resume-modal-close');
    const dockResumeBtn = document.getElementById('dock-resume-btn');
    const heroResumeBtn = document.getElementById('hero-resume-btn');

    const openResumeModal = () => {
        if (resumeModal) {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeResumeModal = () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (dockResumeBtn) dockResumeBtn.addEventListener('click', openResumeModal);
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    // Keyboard Shortcuts: 'T' for theme, 'M' for music, 'Escape' to close modal
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        } else if (e.key === 't' || e.key === 'T') {
            if (themeToggleBtn) themeToggleBtn.click();
        } else if (e.key === 'm' || e.key === 'M') {
            if (playLofiBtn) playLofiBtn.click();
        }
    });

    // Intersection Observer for Smooth Fade-Up Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
