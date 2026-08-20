import { portfolioData } from './src/portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Hero Section
    const heroSec = document.getElementById('hero-section');
    if (heroSec) {
        heroSec.innerHTML = `
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
                            ${pr.problem ? `<li>${pr.problem}</li>` : ''}
                            ${pr.solution ? `<li>${pr.solution}</li>` : ''}
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
                    <span class="stat-number">4<i class="fa-solid fa-star text-sm" style="font-size: 0.5em; vertical-align: middle;"></i></span>
                    <span class="stat-label">CodeChef</span>
                    <span class="stat-desc">Competitive Programming</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">4+</span>
                    <span class="stat-label">Years Coding</span>
                    <span class="stat-desc">Self Taught</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">20+</span>
                    <span class="stat-label">Merged PRs</span>
                    <span class="stat-desc">vLLM, PyTorch, Canonical</span>
                </div>
                <div class="stat-item fade-up">
                    <span class="stat-number">2+</span>
                    <span class="stat-label">Major Projects</span>
                    <span class="stat-desc">DealLens, Tejas-DB</span>
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

    // 6. Render Education Section
    const eduSec = document.getElementById('education-section');
    if (eduSec) {
        let eduHtml = `<h2 class="section-title">EDUCATION</h2><div style="display:flex; flex-direction:column; gap:2.5rem;">`;
        portfolioData.education.forEach(edu => {
            eduHtml += `
            <div class="edu-item fade-up" style="display:flex; flex-direction:column; gap:4px;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px;">
                    <h3 class="text-foreground font-semibold" style="font-size:1.125rem;">${edu.institution}</h3>
                    <span class="text-muted-foreground font-mono" style="font-size:0.875rem;"><i class="fa-regular fa-calendar" style="margin-right:6px;"></i>${edu.period}</span>
                </div>
                <div class="text-muted-foreground">${edu.degree}</div>
                <div class="text-muted-foreground" style="font-size:0.875rem;">${edu.location}</div>
            </div>`;
        });
        eduHtml += `</div>`;
        eduSec.innerHTML = eduHtml;
    }

    // 7. Render Tech Stack Section
    const techSec = document.getElementById('tech-section');
    if (techSec) {
        // Initial preview row
        let techHtml = `
            <h2 class="section-title" style="justify-content:center; letter-spacing:0.15em;">TECHNOLOGIES I WORK WITH</h2>
            <div class="tech-preview-row fade-up">
                <span class="tech-pill"><i class="fa-brands fa-python"></i> Python</span>
                <span class="tech-pill"><i class="fa-solid fa-fire"></i> PyTorch</span>
                <span class="tech-pill"><i class="fa-brands fa-react"></i> React</span>
                <span class="tech-pill"><i class="fa-brands fa-docker"></i> Docker</span>
                <span class="tech-pill"><i class="fa-brands fa-linux"></i> Linux</span>
            </div>
            
            <div class="text-center fade-up" style="margin-top: 2rem;">
                <button id="view-full-stack-btn" class="view-stack-btn">VIEW FULL STACK <i class="fa-solid fa-chevron-down"></i></button>
            </div>
            
            <div id="full-stack-container" class="full-stack-container">
                <div class="stack-grid">
                    <div class="stack-col">
                        <h4 class="stack-category">LANGUAGES</h4>
                        <ul class="stack-list">
                            ${portfolioData.skills.languages.map(s => `<li><i class="${s.icon}"></i> ${s.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="stack-col">
                        <h4 class="stack-category">FRONTEND</h4>
                        <ul class="stack-list">
                            ${portfolioData.skills.frontend.map(s => `<li><i class="${s.icon}"></i> ${s.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="stack-col">
                        <h4 class="stack-category">BACKEND & DB</h4>
                        <ul class="stack-list">
                            ${portfolioData.skills.backend.map(s => `<li><i class="${s.icon}"></i> ${s.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="stack-col">
                        <h4 class="stack-category">INFRA & TOOLS</h4>
                        <ul class="stack-list">
                            ${portfolioData.skills.infra.map(s => `<li><i class="${s.icon}"></i> ${s.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="stack-col">
                        <h4 class="stack-category">AI & ML</h4>
                        <ul class="stack-list">
                            ${portfolioData.skills.ai.map(s => `<li><i class="${s.icon}"></i> ${s.name}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="text-center" style="margin-top: 3rem;">
                    <button id="hide-full-stack-btn" class="view-stack-btn">SHOW LESS <i class="fa-solid fa-chevron-up"></i></button>
                </div>
            </div>
        `;
        techSec.innerHTML = techHtml;

        // Tech stack toggle logic
        const viewBtn = document.getElementById('view-full-stack-btn');
        const hideBtn = document.getElementById('hide-full-stack-btn');
        const fullStack = document.getElementById('full-stack-container');
        
        if (viewBtn && fullStack && hideBtn) {
            viewBtn.addEventListener('click', () => {
                fullStack.classList.add('expanded');
                viewBtn.style.display = 'none';
            });
            hideBtn.addEventListener('click', () => {
                fullStack.classList.remove('expanded');
                viewBtn.style.display = 'inline-flex';
                // Scroll back slightly
                techSec.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    // 8. Render About Section
    const aboutSec = document.getElementById('about-section');
    if (aboutSec) {
        let aboutHtml = `
            <h2 class="section-title fade-up">THING ABOUT ME</h2>
            <div class="about-content fade-up" style="display:flex; flex-direction:column; gap:1.5rem; margin-bottom:4rem;">
                ${portfolioData.about.paragraphs.map(p => `<p class="text-muted-foreground" style="line-height:1.75; font-size:1rem;">${p}</p>`).join('')}
            </div>
            
            <h2 class="section-title fade-up">GET IN TOUCH</h2>
            <div class="contact-links text-muted-foreground fade-up" style="font-size:1.125rem;">
                Connect with me on <a href="${portfolioData.about.linkedin}" target="_blank" class="text-foreground" style="text-decoration:underline; text-underline-offset:4px;">LinkedIn</a> or shoot an <a href="mailto:${portfolioData.about.email}" class="text-foreground" style="text-decoration:underline; text-underline-offset:4px;">email</a>
            </div>
        `;
        aboutSec.innerHTML = aboutHtml;
    }

    // --- Interactivity ---

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Check local storage for theme preference, default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

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
        rootMargin: '0px 0px -50px 0px',
        threshold: 0
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
