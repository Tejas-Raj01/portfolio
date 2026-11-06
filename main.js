// Tejas Raj — Portfolio Application Engine
import { portfolioData } from './src/portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // DYNAMIC METRICS COMPUTATION (Strictly Derived from Data Model)
    // =========================================================================
    let totalPrsCount = 0;
    let mergedPrsCount = 0;
    let openPrsCount = 0;
    const totalReposCount = portfolioData.openSource.length;

    portfolioData.openSource.forEach(repo => {
        repo.highlights.forEach(pr => {
            totalPrsCount++;
            const statusLower = pr.status.toLowerCase();
            if (statusLower.includes('merged')) {
                mergedPrsCount++;
            } else if (statusLower.includes('open')) {
                openPrsCount++;
            }
        });
    });

    const codechefRating = portfolioData.competitiveProgramming.rating;

    // Toast Notifications System
    const showToast = (message, icon = 'fa-solid fa-circle-check') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 250);
        }, 2800);
    };

    // =========================================================================
    // 1. HERO SECTION
    // =========================================================================
    const heroSec = document.getElementById('hero-section');
    if (heroSec) {
        heroSec.innerHTML = `
            <div class="hero-status-pill">
                <span class="status-dot-container">
                    <span class="status-dot-ping"></span>
                    <span class="status-dot-core"></span>
                </span>
                <span>${portfolioData.identity.institution} · ${portfolioData.identity.role}</span>
            </div>

            <h1 class="hero-name">
                <span class="hero-name-gradient">${portfolioData.identity.name}</span>
            </h1>

            <p class="hero-positioning">
                "${portfolioData.identity.tagline}"
            </p>

            <div class="hero-rotating-bar" id="hero-rotating-bar">
                <i class="fa-solid fa-terminal" style="color:var(--accent-cyan); font-size: 0.8rem;"></i>
                <span id="rotating-text">${portfolioData.identity.rotatingPhrases[0]}</span>
                <span class="rotating-text-cursor" aria-hidden="true"></span>
            </div>

            <div class="hero-proof-strip">
                <a href="#competitive-programming-section" class="hero-proof-badge">
                    <i class="fa-solid fa-trophy badge-codechef-star"></i>
                    <span>CodeChef 4★ (Max ${codechefRating})</span>
                </a>
                <a href="#opensource-section" class="hero-proof-badge">
                    <i class="fa-solid fa-code-merge badge-merged-check"></i>
                    <span>${mergedPrsCount} Merged Upstream PRs</span>
                </a>
                <a href="#opensource-section" class="hero-proof-badge">
                    <i class="fa-brands fa-github" style="color:var(--accent-violet);"></i>
                    <span>vLLM · PyTorch · Canonical · Jetpack · VS Code</span>
                </a>
            </div>

            <div class="hero-cta-bar">
                <a href="#opensource-section" class="btn-primary-action">
                    <i class="fa-solid fa-code-pull-request"></i> View Open Source Work
                </a>
                <button id="hero-resume-btn" class="btn-secondary-action">
                    <i class="fa-regular fa-file-pdf" style="color:var(--accent-violet);"></i> Resume PDF
                </button>
                <a href="#contact-section" class="btn-secondary-action">
                    <i class="fa-regular fa-envelope" style="color:var(--accent-cyan);"></i> Get in Touch
                </a>
            </div>
        `;

        // Text Rotator Animation
        const phrases = portfolioData.identity.rotatingPhrases;
        let phraseIdx = 0;
        const rotatingTextEl = document.getElementById('rotating-text');
        if (rotatingTextEl && phrases.length > 1) {
            setInterval(() => {
                phraseIdx = (phraseIdx + 1) % phrases.length;
                rotatingTextEl.style.opacity = '0';
                setTimeout(() => {
                    rotatingTextEl.textContent = phrases[phraseIdx];
                    rotatingTextEl.style.opacity = '1';
                }, 200);
            }, 3600);
        }
    }

    // =========================================================================
    // 2. IMPACT STATS BAR
    // =========================================================================
    const statsSec = document.getElementById('stats-section');
    if (statsSec) {
        statsSec.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-code-pull-request stat-icon"></i>
                    <div class="stat-number-wrap violet">
                        <span class="counter-num" data-target="${totalPrsCount}">0</span>
                    </div>
                    <div class="stat-label">Total Upstream PRs</div>
                    <div class="stat-caption">Computed live across all repos</div>
                </div>

                <div class="stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-code-merge stat-icon" style="color:var(--status-merged);"></i>
                    <div class="stat-number-wrap emerald">
                        <span class="counter-num" data-target="${mergedPrsCount}">0</span>
                    </div>
                    <div class="stat-label">Merged Pull Requests</div>
                    <div class="stat-caption">Production bug fixes &amp; features</div>
                </div>

                <div class="stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-cubes-stacked stat-icon"></i>
                    <div class="stat-number-wrap cyan">
                        <span class="counter-num" data-target="${totalReposCount}">0</span>
                    </div>
                    <div class="stat-label">Upstream Repositories</div>
                    <div class="stat-caption">vLLM, PyTorch, Snapcraft, Jetpack...</div>
                </div>

                <div class="stat-card spotlight-card fade-up">
                    <i class="fa-solid fa-trophy stat-icon" style="color:#fbbf24;"></i>
                    <div class="stat-number-wrap amber">
                        <span class="counter-num" data-target="${codechefRating}">0</span>
                    </div>
                    <div class="stat-label">CodeChef 4★ (Max)</div>
                    <div class="stat-caption">Top ~3% globally (Algorithms)</div>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 3. OPEN SOURCE (THE CENTERPIECE)
    // =========================================================================
    const ossSec = document.getElementById('opensource-section');
    if (ossSec) {
        // Build Marquee Logos
        const marqueeRepos = [
            { name: "vLLM", icon: "fa-solid fa-microchip", category: "LLM Inference" },
            { name: "PyTorch", icon: "fa-solid fa-fire", category: "ML Framework" },
            { name: "Microsoft VS Code", icon: "fa-brands fa-microsoft", category: "Dev Tooling" },
            { name: "Automattic Jetpack", icon: "fa-brands fa-wordpress", category: "WordPress Subsystem" },
            { name: "Canonical Craft Parts", icon: "fa-brands fa-ubuntu", category: "Linux Packaging" },
            { name: "Canonical Snapcraft", icon: "fa-brands fa-linux", category: "Linux Tooling" },
            { name: "CP Editor", icon: "fa-solid fa-code", category: "Desktop C++/Qt" },
            { name: "Future-AGI", icon: "fa-solid fa-network-wired", category: "Agent AI" },
            { name: "OpenClaw", icon: "fa-solid fa-robot", category: "Agent Infra" }
        ];

        // Double items for continuous marquee
        const marqueeBadgesHtml = [...marqueeRepos, ...marqueeRepos].map(repo => `
            <span class="marquee-badge">
                <i class="${repo.icon}" style="color:var(--accent-violet);"></i>
                <strong>${repo.name}</strong>
                <span style="color:var(--foreground-dim); font-size:0.75rem;">· ${repo.category}</span>
            </span>
        `).join('');

        // Build Selected Work Cards (Top 4 Highlights)
        const selectedWorkHtml = portfolioData.selectedWork.map(item => `
            <div class="selected-card spotlight-card ${item.badgeClass === 'badge-open' ? 'open-status' : ''}">
                <div>
                    <div class="selected-card-header">
                        <span class="selected-repo-badge">${item.repo}</span>
                        <span class="status-pill ${item.badgeClass === 'badge-merged' ? 'merged' : 'open'}">
                            <i class="${item.badgeClass === 'badge-merged' ? 'fa-solid fa-code-merge' : 'fa-solid fa-code-pull-request'}"></i>
                            ${item.status}
                        </span>
                    </div>
                    <h3 class="selected-card-title">${item.title}</h3>
                    <p class="selected-card-impact">
                        <strong style="color:var(--foreground-bright);">Impact:</strong> ${item.impact}.
                    </p>
                </div>
                <div class="selected-card-footer">
                    <span style="font-family:var(--font-mono); color:var(--foreground-dim);">
                        PR #${item.prNumber}
                    </span>
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="ps-github-btn">
                        View PR on GitHub <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        `).join('');

        // Category filters options
        const categories = [
            { id: 'all-cat', label: 'All Categories' },
            { id: 'AI Infra', label: 'AI Infra' },
            { id: 'ML Framework', label: 'ML Framework' },
            { id: 'Dev Tooling', label: 'Dev Tooling' },
            { id: 'Linux', label: 'Linux' },
            { id: 'WordPress', label: 'WordPress' }
        ];

        const catFiltersHtml = categories.map((cat, idx) => `
            <button class="filter-pill ${idx === 0 ? 'active' : ''}" data-type="category" data-filter="${cat.id}">
                ${cat.label}
            </button>
        `).join('');

        // Build Repo Cards Grid
        const repoCardsHtml = portfolioData.openSource.map(repo => {
            const highlightsHtml = repo.highlights.map(pr => {
                const isMerged = pr.status.toLowerCase().includes('merged');
                const badgeType = isMerged ? 'merged' : 'open';
                const statusIcon = isMerged ? 'fa-solid fa-code-merge' : 'fa-solid fa-code-pull-request';

                return `
                <div class="highlight-item" data-status="${badgeType}">
                    <div class="highlight-summary-bar" role="button" tabindex="0" aria-expanded="false" aria-label="Toggle details for PR #${pr.prNumber}">
                        <div class="highlight-info-left">
                            <span class="status-pill ${badgeType}">
                                <i class="${statusIcon}"></i>
                                ${isMerged ? 'Merged' : 'Open'}
                            </span>
                            <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="pr-num-link" onclick="event.stopPropagation()">
                                #${pr.prNumber}
                            </a>
                            <span class="highlight-title-preview">${pr.title}</span>
                        </div>
                        <i class="fa-solid fa-chevron-down accordion-chevron" aria-hidden="true"></i>
                    </div>

                    <div class="highlight-details-drawer">
                        <div class="ps-box">
                            ${pr.problem ? `
                                <div class="ps-row">
                                    <span class="ps-label problem">Problem</span>
                                    <span class="ps-text">${pr.problem}</span>
                                </div>
                            ` : ''}
                            ${pr.solution ? `
                                <div class="ps-row">
                                    <span class="ps-label solution">Solution</span>
                                    <span class="ps-text">${pr.solution}</span>
                                </div>
                            ` : ''}
                            <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="ps-github-btn">
                                Inspect full commit &amp; discussion on GitHub <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                </div>`;
            }).join('');

            return `
            <div class="oss-repo-card spotlight-card fade-up" data-category="${repo.category}" data-repo="${repo.repo}">
                <div class="repo-card-header">
                    <div class="repo-title-group">
                        <h3 class="repo-name">
                            <i class="fa-brands fa-github" style="color:var(--accent-violet); margin-right:4px;"></i>
                            ${repo.repo}
                        </h3>
                        <span class="repo-category-tag">${repo.categoryDetail || repo.category}</span>
                    </div>
                    <a href="${repo.prSearchUrl || `https://github.com/${repo.fullRepo}`}" target="_blank" rel="noopener noreferrer" class="repo-link" title="Search all PRs by Tejas Raj in this repo">
                        ${repo.fullRepo} <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>

                <p class="repo-summary">${repo.summary}</p>

                <div class="highlights-header">
                    <span>Key Upstream Contributions</span>
                    <span>${repo.highlights.length} PR${repo.highlights.length > 1 ? 's' : ''}</span>
                </div>

                <div class="highlights-list">
                    ${highlightsHtml}
                </div>
            </div>`;
        }).join('');

        ossSec.innerHTML = `
            <div class="section-header-row">
                <div>
                    <h2 class="section-title">
                        <i class="fa-solid fa-code-pull-request"></i> Upstream Open Source
                    </h2>
                    <p class="section-subtitle">
                        Core infrastructure fixes, scheduler concurrency patches, sparse tensor memory safety, and toolchain stability merged directly into foundational codebases.
                    </p>
                </div>
            </div>

            <!-- Logo Marquee -->
            <div class="oss-marquee-wrapper" aria-label="Contributed open-source repositories">
                <div class="oss-marquee-track">
                    ${marqueeBadgesHtml}
                </div>
            </div>

            <!-- Selected Work Spotlight -->
            <div class="selected-work-container">
                <div class="selected-work-title">
                    <i class="fa-solid fa-sparkles"></i> Selected High-Impact Work
                </div>
                <div class="selected-work-grid">
                    ${selectedWorkHtml}
                </div>
            </div>

            <!-- Multi-Filters Controls -->
            <div class="oss-controls-container">
                <div class="filter-pills-group" id="status-filters" role="group" aria-label="Filter by PR Status">
                    <button class="filter-pill active" data-type="status" data-filter="all-status">All Status</button>
                    <button class="filter-pill" data-type="status" data-filter="merged">Merged (${mergedPrsCount})</button>
                    <button class="filter-pill" data-type="status" data-filter="open">Open (${openPrsCount})</button>
                </div>

                <div class="filter-pills-group" id="category-filters" role="group" aria-label="Filter by Domain Category">
                    ${catFiltersHtml}
                </div>
            </div>

            <!-- Repos Grid -->
            <div class="oss-repos-grid" id="oss-repos-grid">
                ${repoCardsHtml}
            </div>
        `;

        // Interactive Accordions (Problem -> Solution view)
        const highlightBars = ossSec.querySelectorAll('.highlight-summary-bar');
        highlightBars.forEach(bar => {
            const toggleAccordion = () => {
                const item = bar.closest('.highlight-item');
                const isExpanded = item.classList.contains('expanded');
                item.classList.toggle('expanded');
                bar.setAttribute('aria-expanded', !isExpanded);
            };

            bar.addEventListener('click', toggleAccordion);
            bar.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion();
                }
            });
        });

        // Interactive Multi-Filters Logic (Status + Category)
        let activeStatus = 'all-status';
        let activeCategory = 'all-cat';

        const repoCards = ossSec.querySelectorAll('.oss-repo-card');

        const applyFilters = () => {
            repoCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const highlightItems = card.querySelectorAll('.highlight-item');

                let categoryMatch = (activeCategory === 'all-cat') || (cardCategory === activeCategory);
                let visibleCount = 0;

                highlightItems.forEach(item => {
                    const itemStatus = item.dataset.status;
                    let statusMatch = (activeStatus === 'all-status') || (itemStatus === activeStatus);

                    if (statusMatch && categoryMatch) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (categoryMatch && visibleCount > 0) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        const statusBtns = ossSec.querySelectorAll('#status-filters .filter-pill');
        statusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                statusBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeStatus = btn.dataset.filter;
                applyFilters();
            });
        });

        const catBtns = ossSec.querySelectorAll('#category-filters .filter-pill');
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.dataset.filter;
                applyFilters();
            });
        });
    }

    // =========================================================================
    // 4. PROJECTS (TWO IN-DEPTH CASE STUDIES)
    // =========================================================================
    const projSec = document.getElementById('projects-section');
    if (projSec) {
        const caseStudy1 = portfolioData.caseStudies.find(c => c.id === 'tejas-db');
        const caseStudy2 = portfolioData.caseStudies.find(c => c.id === 'ai-job-platform');

        projSec.innerHTML = `
            <div class="section-header-row">
                <div>
                    <h2 class="section-title">
                        <i class="fa-solid fa-microchip"></i> Engineering Case Studies
                    </h2>
                    <p class="section-subtitle">
                        Architectural deep-dives into high-throughput storage engines and decoupled AI intelligence systems.
                    </p>
                </div>
            </div>

            <div class="case-studies-stack">

                <!-- CASE STUDY 1: TEJAS-DB -->
                <article class="case-study-card spotlight-card fade-up">
                    <div class="case-top-meta">
                        <span class="case-badge">
                            <i class="fa-solid fa-hard-drive"></i> ${caseStudy1.badge}
                        </span>
                        <div class="case-links-row">
                            <a href="${caseStudy1.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link source">
                                <i class="fa-brands fa-github"></i> View GitHub Repo
                            </a>
                            <a href="${caseStudy1.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link live">
                                <i class="fa-solid fa-satellite-dish"></i> Live Chaos Cluster
                            </a>
                        </div>
                    </div>

                    <h3 class="case-title">${caseStudy1.title}</h3>
                    <div class="case-subtitle">${caseStudy1.subtitle}</div>

                    <!-- Metrics Strip -->
                    <div class="case-metrics-strip">
                        ${caseStudy1.metrics.map(m => `
                            <div class="case-metric-box">
                                <span class="metric-val">${m.value}</span>
                                <span class="metric-lbl">${m.label}</span>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Architecture Diagram Box -->
                    <div class="architecture-diagram-box">
                        <div class="diagram-header">
                            <h4><i class="fa-solid fa-diagram-project"></i> Storage Engine &amp; Consensus Flow</h4>
                            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--foreground-dim);">Zero-Dependency C++17</span>
                        </div>
                        <div class="diagram-flow-nodes">
                            <div class="diagram-node">
                                <span class="diagram-node-title">1. Client Request</span>
                                <span class="diagram-node-desc">Key Hashing &amp; Virtual Node Lookup</span>
                            </div>
                            <div class="diagram-node-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                            <div class="diagram-node">
                                <span class="diagram-node-title">2. Consistent Hash Ring</span>
                                <span class="diagram-node-desc">256 VNodes / Peer Partitioning</span>
                            </div>
                            <div class="diagram-node-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                            <div class="diagram-node">
                                <span class="diagram-node-title">3. Append-Only WAL</span>
                                <span class="diagram-node-desc">Sequential Disk Log (Crash Durability)</span>
                            </div>
                            <div class="diagram-node-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                            <div class="diagram-node">
                                <span class="diagram-node-title">4. Quorum (N, W, R)</span>
                                <span class="diagram-node-desc">Gossip Discovery &amp; Tunable Consensus</span>
                            </div>
                        </div>
                    </div>

                    <!-- Problem / Approach / Challenge Breakdown -->
                    <div class="case-body-grid">
                        <div class="case-detail-block">
                            <h4><i class="fa-solid fa-triangle-exclamation" style="color:#f43f5e;"></i> Problem Statement</h4>
                            <p>${caseStudy1.problem}</p>
                        </div>
                        <div class="case-detail-block">
                            <h4><i class="fa-solid fa-screwdriver-wrench" style="color:var(--accent-cyan);"></i> Engineering Approach</h4>
                            <p>${caseStudy1.approach}</p>
                        </div>
                    </div>

                    <!-- Key Challenge & Key Design Decisions -->
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-family:var(--font-heading); font-size:1rem; color:var(--foreground-bright); margin-bottom:0.5rem;">
                            <i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i> Key Design Decisions
                        </h4>
                        <ul class="decisions-list">
                            ${caseStudy1.keyDesignDecisions.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="case-tags-row">
                        ${caseStudy1.techStack.map(t => `<span class="case-tag">${t}</span>`).join('')}
                    </div>
                </article>

                <!-- CASE STUDY 2: AI JOB PLATFORM -->
                <article class="case-study-card spotlight-card fade-up">
                    <div class="case-top-meta">
                        <span class="case-badge" style="background:rgba(6,182,212,0.12); color:var(--accent-cyan); border-color:var(--border-cyan);">
                            <i class="fa-solid fa-brain"></i> ${caseStudy2.badge}
                        </span>
                        <div class="case-links-row">
                            <a href="${caseStudy2.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link source">
                                <i class="fa-brands fa-github"></i> View GitHub Repo
                            </a>
                            <a href="${caseStudy2.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link live">
                                <i class="fa-solid fa-globe"></i> Live Application
                            </a>
                        </div>
                    </div>

                    <h3 class="case-title">${caseStudy2.title}</h3>
                    <div class="case-subtitle">${caseStudy2.subtitle}</div>

                    <!-- Metrics Strip -->
                    <div class="case-metrics-strip">
                        ${caseStudy2.metrics.map(m => `
                            <div class="case-metric-box">
                                <span class="metric-val">${m.value}</span>
                                <span class="metric-lbl">${m.label}</span>
                            </div>
                        `).join('')}
                    </div>

                    <!-- 4-Step Pipeline Visual Grid -->
                    <div class="pipeline-steps-grid">
                        ${caseStudy2.pipeline.map(step => `
                            <div class="pipeline-step-card">
                                <span class="pipeline-step-num">${step.step}</span>
                                <h4 class="pipeline-step-title">${step.title}</h4>
                                <p class="pipeline-step-desc">${step.desc}</p>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Problem / Approach / Key Challenge -->
                    <div class="case-body-grid">
                        <div class="case-detail-block">
                            <h4><i class="fa-solid fa-triangle-exclamation" style="color:#f43f5e;"></i> Problem Statement</h4>
                            <p>${caseStudy2.problem}</p>
                        </div>
                        <div class="case-detail-block">
                            <h4><i class="fa-solid fa-bolt" style="color:var(--accent-cyan);"></i> Key Engineering Challenge</h4>
                            <p>${caseStudy2.keyChallenge}</p>
                        </div>
                    </div>

                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-family:var(--font-heading); font-size:1rem; color:var(--foreground-bright); margin-bottom:0.5rem;">
                            <i class="fa-solid fa-chart-line" style="color:var(--status-merged);"></i> Architecture Outcomes &amp; Fallback Design
                        </h4>
                        <p style="font-size:0.875rem; color:var(--foreground-muted); line-height:1.6;">
                            ${caseStudy2.approach} Resulted in ${caseStudy2.results.join(', ')}.
                        </p>
                    </div>

                    <div class="case-tags-row">
                        ${caseStudy2.techStack.map(t => `<span class="case-tag">${t}</span>`).join('')}
                    </div>
                </article>

            </div>
        `;
    }

    // =========================================================================
    // 5. COMPETITIVE PROGRAMMING
    // =========================================================================
    const cpSec = document.getElementById('competitive-programming-section');
    if (cpSec) {
        const cp = portfolioData.competitiveProgramming;

        // Generate SVG Sparkline Points from Rating History
        const minRating = 1350;
        const maxRating = 1850;
        const svgWidth = 400;
        const svgHeight = 60;

        const points = cp.history.map((pt, i) => {
            const x = (i / (cp.history.length - 1)) * (svgWidth - 20) + 10;
            const y = svgHeight - ((pt.rating - minRating) / (maxRating - minRating)) * (svgHeight - 16) - 8;
            return { x, y, rating: pt.rating, contest: pt.contest };
        });

        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

        const dotsHtml = points.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="3" class="sparkline-dot">
                <title>${p.contest}: ${p.rating}</title>
            </circle>
        `).join('');

        cpSec.innerHTML = `
            <div class="section-header-row">
                <div>
                    <h2 class="section-title">
                        <i class="fa-solid fa-trophy" style="color:#fbbf24;"></i> Competitive Programming
                    </h2>
                    <p class="section-subtitle">
                        Rigorous algorithmic foundations in graph algorithms, dynamic programming, and space-time optimization.
                    </p>
                </div>
            </div>

            <div class="cp-card spotlight-card fade-up">
                <div class="cp-left-col">
                    <span class="cp-badge-large">
                        <i class="fa-solid fa-award"></i> CodeChef ${cp.stars}
                    </span>
                    <div class="cp-rating-number">${cp.rating}</div>
                    <div class="cp-percentile">${cp.percentile} · Handle: @${cp.handle}</div>
                    <a href="${cp.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-action" style="padding:0.5rem 1.15rem; font-size:0.84rem;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify CodeChef Profile
                    </a>
                </div>

                <div class="cp-right-col">
                    <h3 class="cp-heading">Algorithmic Rigor &amp; Systems Engineering</h3>
                    <p class="cp-strengths-text">
                        ${cp.strengths}
                    </p>

                    <div class="cp-sparkline-wrapper">
                        <div class="sparkline-label-row">
                            <span>Rating Progression (Division 2)</span>
                            <span style="color:var(--accent-cyan); font-weight:600;">Max Rating: ${cp.rating} (4★)</span>
                        </div>
                        <svg class="cp-sparkline-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="var(--accent-violet)" stop-opacity="0.35"/>
                                    <stop offset="100%" stop-color="var(--accent-violet)" stop-opacity="0.0"/>
                                </linearGradient>
                            </defs>
                            <path d="${areaPath}" class="sparkline-area" />
                            <path d="${linePath}" class="sparkline-line" />
                            ${dotsHtml}
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 6. CURRENT FOCUS (OPENCLAW & AGENT INFRASTRUCTURE)
    // =========================================================================
    const focusSec = document.getElementById('current-focus-section');
    if (focusSec) {
        const claw = portfolioData.openclaw;

        const topicsHtml = claw.topics.map(t => `
            <div class="focus-topic-box">
                <i class="${t.icon} topic-icon"></i>
                <h4 class="topic-title">${t.title}</h4>
                <p class="topic-desc">${t.desc}</p>
            </div>
        `).join('');

        focusSec.innerHTML = `
            <div class="section-header-row">
                <div>
                    <h2 class="section-title">
                        <i class="fa-solid fa-compass"></i> Current Focus
                    </h2>
                    <p class="section-subtitle">
                        Building and exploring the next generation of open-source autonomous agent infrastructure.
                    </p>
                </div>
            </div>

            <div class="current-focus-card spotlight-card fade-up">
                <div class="focus-header-row">
                    <h3 class="focus-title">
                        <i class="fa-solid fa-robot"></i> OpenClaw &amp; Autonomous Agent Runtimes
                    </h3>
                    <div class="focus-links-group">
                        <a href="${claw.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link source">
                            <i class="fa-solid fa-globe"></i> openclaw.ai
                        </a>
                        <a href="${claw.docsUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link source">
                            <i class="fa-solid fa-book"></i> docs.openclaw.ai
                        </a>
                    </div>
                </div>

                <p class="focus-status-desc">
                    ${claw.statusText} ${claw.exploreNotice}
                </p>

                <div class="focus-topics-grid">
                    ${topicsHtml}
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 7. SKILLS (GROUPED CHIPS)
    // =========================================================================
    const skillsSec = document.getElementById('skills-section');
    if (skillsSec) {
        const s = portfolioData.skills;

        const renderChips = (list) => list.map(item => `
            <span class="skill-chip ${item.highlight ? 'highlight' : ''}">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </span>
        `).join('');

        skillsSec.innerHTML = `
            <div class="section-header-row">
                <div>
                    <h2 class="section-title">
                        <i class="fa-solid fa-layer-group"></i> Technical Proficiencies
                    </h2>
                    <p class="section-subtitle">
                        Grouped strictly by domain and ordered to reflect core open-source contributions.
                    </p>
                </div>
            </div>

            <div class="skills-grid">
                <div class="skill-category-card spotlight-card fade-up">
                    <div class="skill-category-header">
                        <i class="fa-solid fa-brain"></i> AI &amp; ML Infrastructure
                    </div>
                    <div class="chips-wrap">
                        ${renderChips(s.aiInfra)}
                    </div>
                </div>

                <div class="skill-category-card spotlight-card fade-up">
                    <div class="skill-category-header">
                        <i class="fa-solid fa-code"></i> Core Languages
                    </div>
                    <div class="chips-wrap">
                        ${renderChips(s.languages)}
                    </div>
                </div>

                <div class="skill-category-card spotlight-card fade-up">
                    <div class="skill-category-header">
                        <i class="fa-solid fa-server"></i> Systems &amp; Databases
                    </div>
                    <div class="chips-wrap">
                        ${renderChips(s.systems)}
                    </div>
                </div>

                <div class="skill-category-card spotlight-card fade-up">
                    <div class="skill-category-header">
                        <i class="fa-brands fa-linux"></i> Tooling, Linux &amp; Packaging
                    </div>
                    <div class="chips-wrap">
                        ${renderChips(s.tooling)}
                    </div>
                </div>

                <div class="skill-category-card spotlight-card fade-up" style="grid-column: 1 / -1;">
                    <div class="skill-category-header">
                        <i class="fa-solid fa-globe"></i> Web &amp; Application Layer
                    </div>
                    <div class="chips-wrap">
                        ${renderChips(s.web)}
                    </div>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 8. CONTACT & FOOTER
    // =========================================================================
    const contactSec = document.getElementById('contact-section');
    if (contactSec) {
        contactSec.innerHTML = `
            <div class="contact-card spotlight-card fade-up">
                <h2 class="contact-headline">
                    Let's build something fast, resilient, and enduring.
                </h2>
                <p class="contact-subtitle">
                    Whether you are engineering low-latency LLM inference kernels, distributed storage engines, or looking for a relentless builder on your engineering team — my inbox is open.
                </p>

                <button class="email-copy-pill" id="copy-email-btn" title="Click to copy email address">
                    <i class="fa-regular fa-copy" style="color:var(--accent-cyan);"></i>
                    <span>${portfolioData.identity.email}</span>
                    <span class="copy-badge" id="copy-badge-label">Copy</span>
                </button>

                <div class="contact-actions-row">
                    <a href="mailto:${portfolioData.identity.email}" class="btn-primary-action">
                        <i class="fa-solid fa-paper-plane"></i> Send Direct Email
                    </a>
                    <a href="${portfolioData.identity.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-secondary-action">
                        <i class="fa-brands fa-linkedin-in" style="color:#0a66c2;"></i> LinkedIn
                    </a>
                    <a href="${portfolioData.identity.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary-action">
                        <i class="fa-brands fa-github"></i> GitHub
                    </a>
                    <a href="${portfolioData.identity.resumePdf}" download="Tejas_Raj_Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn-secondary-action">
                        <i class="fa-solid fa-download" style="color:var(--status-merged);"></i> Download Resume
                    </a>
                </div>

                <div class="closing-line">
                    "I fix things in the codebases the world runs on."
                </div>
            </div>
        `;

        // Email copy interaction
        const copyEmailBtn = document.getElementById('copy-email-btn');
        const copyBadgeLabel = document.getElementById('copy-badge-label');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(portfolioData.identity.email).then(() => {
                    if (copyBadgeLabel) copyBadgeLabel.textContent = 'Copied!';
                    showToast('Email address copied to clipboard!', 'fa-solid fa-clipboard-check');
                    setTimeout(() => {
                        if (copyBadgeLabel) copyBadgeLabel.textContent = 'Copy';
                    }, 2500);
                }).catch(() => {
                    window.location.href = `mailto:${portfolioData.identity.email}`;
                });
            });
        }
    }

    // =========================================================================
    // SPOTLIGHT CURSOR EFFECT & AMBIENT GLOW
    // =========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    const spotlightCards = document.querySelectorAll('.spotlight-card');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (cursorGlow) {
            cursorGlow.style.left = `${mouseX}px`;
            cursorGlow.style.top = `${mouseY}px`;
        }

        spotlightCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    }, { passive: true });

    // =========================================================================
    // READING PROGRESS BAR
    // =========================================================================
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / (docHeight || 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // =========================================================================
    // RESUME VIEWER MODAL
    // =========================================================================
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

    // =========================================================================
    // THEME TOGGLE
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

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

    // Keyboard Shortcuts: 'T' for theme, 'Escape' to close modal, 'R' to replay intro
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        } else if (e.key === 't' || e.key === 'T') {
            if (themeToggleBtn) themeToggleBtn.click();
        } else if ((e.key === 'r' || e.key === 'R') && !document.getElementById('swarm-intro-overlay')) {
            import('./src/components/SwarmIntro/SwarmIntro.js').then(({ initSwarmIntro }) => {
                initSwarmIntro(true);
            });
        }
    });

    // Replay Intro Button in Footer
    const footerReplayBtn = document.getElementById('footer-replay-intro');
    if (footerReplayBtn) {
        footerReplayBtn.addEventListener('click', () => {
            import('./src/components/SwarmIntro/SwarmIntro.js').then(({ initSwarmIntro }) => {
                initSwarmIntro(true);
            });
        });
    }

    // =========================================================================
    // LAZY-LOAD SWARM REBUILD INTRO (Runs once per session unless disabled)
    // =========================================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introAlreadyPlayed = sessionStorage.getItem('swarm_rebuild_intro_played');

    if (!prefersReducedMotion && (!introAlreadyPlayed || window.location.hash === '#replay-intro')) {
        setTimeout(() => {
            import('./src/components/SwarmIntro/SwarmIntro.js').then(({ initSwarmIntro }) => {
                initSwarmIntro();
            }).catch(err => console.warn('SwarmIntro deferred:', err));
        }, 60);
    }

    // =========================================================================
    // ANIMATED STATS COUNTER ON SCROLL REVEAL
    // =========================================================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-num');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            if (isNaN(target)) return;

            const duration = 1400;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                counter.textContent = currentVal.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    let countersAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.25 });

    if (statsSec) {
        statsObserver.observe(statsSec);
    }

    // =========================================================================
    // INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS
    // =========================================================================
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
});
