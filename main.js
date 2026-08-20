import { portfolioData } from './src/portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Hero Section
    const heroSec = document.getElementById('hero-section');
    if (heroSec) {
        heroSec.innerHTML = `
            <div class="hero-image-wrapper">
                <div class="hero-image-bg"></div>
                <!-- Assuming download.png is the profile image -->
                <img src="/download.png" alt="${portfolioData.identity.name}" class="hero-image" />
            </div>
            
            <h1 class="hero-name">${portfolioData.identity.name}</h1>
            
            <div class="hero-subtitle-bar">
                <span>/tɛ-dʒəs/</span>
                <span class="hero-dot">•</span>
                <span>noun</span>
                <span class="hero-dot">•</span>
                <div style="width: 20px;"></div>
                <span class="hero-dot">•</span>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button class="lofi-btn" id="play-lofi" aria-label="Play Lofi Music">
                        <span>LOFI</span>
                        <i class="fa-solid fa-music text-xs"></i>
                    </button>
                    <audio id="lofi-audio" src="https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/" preload="none"></audio>
                </div>
            </div>
            
            <div class="hero-tagline">${portfolioData.identity.tagline}</div>
        `;
    }

    // 2. Render Summary Section
    const summarySec = document.getElementById('summary-section');
    if (summarySec) {
        // Convert focusAreas to li elements
        const listItems = portfolioData.me.focusAreas.map(item => {
            // we split the item if there's a natural split, or just render it
            return `<li><strong class="text-foreground">${item}</strong></li>`;
        }).join('');

        summarySec.innerHTML = `
            <h2 class="section-title">Professional Summary</h2>
            <div class="text-muted-foreground" style="margin-bottom:1rem; line-height:1.6; font-size:1rem;">
                ${portfolioData.me.headline} ${portfolioData.me.description}
            </div>
            <ul class="summary-list">
                ${listItems}
            </ul>
        `;
    }

    // 3. Render Open Source Section
    const osSec = document.getElementById('opensource-section');
    if (osSec) {
        let osHtml = `<h2 class="section-title">Open Source Contributions</h2><div style="display:flex; flex-direction:column; gap:4rem;">`;
        
        portfolioData.openSource.forEach(proj => {
            let prsHtml = proj.highlights.map(pr => {
                const badgeClass = pr.status.toLowerCase().includes('merged') ? 'badge-merged' : 
                                  pr.status.toLowerCase().includes('open') ? 'badge-open' : 'badge-closed';
                
                return `
                <div class="pr-item fade-up">
                    <div class="pr-timeline-dot"></div>
                    <div class="pr-header">
                        <a href="${pr.url}" target="_blank" class="pr-link-btn">
                            <i class="fa-solid fa-code-pull-request"></i> PR #${pr.prNumber}
                        </a>
                        <span class="badge ${badgeClass}">${pr.status.split(' ')[0]}</span>
                    </div>
                    <div class="pr-content">
                        <ul>
                            <li><strong class="text-foreground font-semibold">${pr.title}</strong></li>
                            <li>${pr.problem}</li>
                            <li>${pr.solution}</li>
                        </ul>
                    </div>
                </div>`;
            }).join('');

            osHtml += `
            <div class="os-project">
                <div class="os-project-header">
                    <h3 class="os-project-title">${proj.repo}</h3>
                    <span class="os-project-role">${proj.category}</span>
                </div>
                <div class="pr-list-container">
                    ${prsHtml}
                </div>
            </div>`;
        });
        
        osHtml += `</div>`;
        osSec.innerHTML = osHtml;
    }

    // 4. Render Achievements Section
    const achieveSec = document.getElementById('achievements-section');
    if (achieveSec) {
        achieveSec.innerHTML = `
            <h2 class="section-title" style="justify-content:center; margin-bottom:3rem;">Achievements</h2>
            <div class="stats-grid">
                <div class="stat-item fade-up">
                    <span class="stat-number">4+</span>
                    <span class="stat-label">Years Coding</span>
                    <span class="stat-desc">Self Taught</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">15+</span>
                    <span class="stat-label">Merged PRs</span>
                    <span class="stat-desc">vLLM, PyTorch, Canonical</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">2+</span>
                    <span class="stat-label">Major Projects</span>
                    <span class="stat-desc">DealLens, Tejas-DB</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">24/7</span>
                    <span class="stat-label">Learning</span>
                    <span class="stat-desc">Exploring Agent Infra</span>
                </div>
            </div>
        `;
    }

    // 5. Render Star Projects Section
    const projSec = document.getElementById('projects-section');
    if (projSec) {
        let projHtml = `<h2 class="section-title"><i class="fa-solid fa-star text-foreground" style="color:#eab308;"></i> Star Projects</h2><div style="display:flex; flex-direction:column; gap:4rem;">`;
        
        const allProjects = [...portfolioData.aiWork, ...portfolioData.systems];
        
        allProjects.forEach(proj => {
            const tags = proj.tags || proj.tech || [];
            const tagHtml = tags.map(t => `<span class="pc-tag">${t}</span>`).join('');
            
            // split description into sentences for bullet points if it's long, or just render
            // DealLens description is very long, let's split it by period.
            const sentences = proj.description.split('. ').filter(s => s.length > 0).map(s => s + (s.endsWith('.') ? '' : '.'));
            
            const descHtml = sentences.map(s => `<li>${s}</li>`).join('');

            projHtml += `
            <div class="project-card fade-up">
                <div class="pc-header">
                    <h3 class="pc-title">${proj.title}</h3>
                    <span class="pc-subtitle">${proj.subtitle || proj.category}</span>
                </div>
                <div class="pc-meta">
                    <span class="pc-year">2024</span>
                    <div class="pc-tags">${tagHtml}</div>
                </div>
                <ul class="pc-desc-list">
                    ${descHtml}
                </ul>
                <div class="pc-links">
                    ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="pc-link-out">View Repo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                    ${proj.liveUrl && proj.liveUrl !== proj.githubUrl ? `<a href="${proj.liveUrl}" target="_blank" class="pc-link-out">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
            </div>
            `;
        });
        
        projHtml += `</div>`;
        projSec.innerHTML = projHtml;
    }

    // --- Interactivity ---

    // Lofi Audio Player
    const playLofiBtn = document.getElementById('play-lofi');
    const lofiAudio = document.getElementById('lofi-audio');
    let isPlaying = false;
    
    if (playLofiBtn && lofiAudio) {
        playLofiBtn.addEventListener('click', () => {
            if (isPlaying) {
                lofiAudio.pause();
                playLofiBtn.style.color = 'var(--muted-foreground)';
            } else {
                lofiAudio.play();
                playLofiBtn.style.color = 'var(--foreground)';
            }
            isPlaying = !isPlaying;
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial animations for hero
    setTimeout(() => {
        const heroImg = document.querySelector('.hero-image-wrapper');
        const heroName = document.querySelector('.hero-name');
        const heroSub = document.querySelector('.hero-subtitle-bar');
        const heroTag = document.querySelector('.hero-tagline');
        
        if (heroImg) { heroImg.style.opacity = '1'; heroImg.style.transform = 'scale(1)'; }
        if (heroName) { heroName.style.transition = 'opacity 1s ease 0.2s'; heroName.style.opacity = '1'; }
        if (heroSub) { heroSub.style.transition = 'opacity 1s ease 0.4s'; heroSub.style.opacity = '1'; }
        if (heroTag) { heroTag.style.transition = 'opacity 1s ease 0.6s'; heroTag.style.opacity = '1'; }
    }, 100);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
});
