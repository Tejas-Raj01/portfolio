// Tejas Raj Portfolio — Main Logic & Micro-Interactions

document.addEventListener('DOMContentLoaded', () => {
    initScrollSpyAndProgress();
    initCopyEmailButtons();
    initCommandPalette();
    initArchitectureModals();
    initMobileMenu();
    initMetricsObserver();
});

// 1. Reading Progress Bar & ScrollSpy Navigation
function initScrollSpyAndProgress() {
    const progressBar = document.getElementById('progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Reading Progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }

        // Active Section ScrollSpy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { passive: true });
}

// 2. Copy Email Toast Notification
function initCopyEmailButtons() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toastContainer = document.getElementById('toast-container');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'rajtejas.xyz@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Email copied: ${email}`);
            }).catch(() => {
                // Fallback copy
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`Email copied: ${email}`);
            });
        });
    });

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.25s ease-out';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    }
}

// 3. Command Palette (Cmd+K / Ctrl+K) Modal
function initCommandPalette() {
    const cmdBtn = document.getElementById('cmd-palette-btn');
    const cmdModal = document.getElementById('cmd-modal');
    const cmdClose = document.getElementById('cmd-close');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
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

    // Key listeners
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

    // Search Filtering
    cmdInput.addEventListener('input', (e) => {
        filterItems(e.target.value.toLowerCase().trim());
    });

    function filterItems(query) {
        let visibleCount = 0;
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
            item.classList.remove('selected');
        });
        selectedIndex = -1;
    }

    // Keyboard Arrow Navigation inside Palette
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

    // Action Triggers
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
                navigator.clipboard.writeText('rajtejas.xyz@gmail.com');
                const btn = document.querySelector('.copy-email-btn');
                if (btn) btn.click();
            }
        });
    });
}

// 4. Architecture Viewer Modals
function initArchitectureModals() {
    const archBtns = document.querySelectorAll('.open-arch-modal');
    const archModal = document.getElementById('arch-modal');
    const archClose = document.getElementById('arch-close');
    const archTitle = document.getElementById('arch-title');
    const archBody = document.getElementById('arch-body');

    if (!archModal || !archBody) return;

    const diagrams = {
        kv: {
            title: "Distributed Key-Value Engine Architecture",
            diagram: `
+-----------------------------------------------------------------------------------+
|                              CLIENT CLUSTER / stress testing                      |
+-----------------------------------------------------------------------------------+
                                         |
                                (Consistent Hashing)
                                         v
+-----------------------------------------------------------------------------------+
|                        RING PARTITIONING & NODE TOPOLOGY                          |
|                                                                                   |
|  +-------------------+        Gossip Protocol       +-------------------+         |
|  |   NODE 1 (Leader) | <--------------------------> |   NODE 2 (Replica)|         |
|  | - std::shared_m   |                              | - std::shared_m   |         |
|  | - WAL Engine      |        Quorum (N, W, R)      | - WAL Engine      |         |
|  +-------------------+ <--------------------------> +-------------------+         |
|           |                                                  |                    |
|           +------------------------+-------------------------+                    |
|                                    |                                              |
|                                    v                                              |
|                          +-------------------+                                    |
|                          |   NODE 3 (Replica)|                                    |
|                          | - WAL Engine      |                                    |
|                          +-------------------+                                    |
+-----------------------------------------------------------------------------------+
                                     |
                          (WAL Replay & Disk Persistence)
                                     v
+-----------------------------------------------------------------------------------+
|                     CRASH RECOVERY ENGINE & MEMORY STORAGE                        |
+-----------------------------------------------------------------------------------+`
        },
        ai: {
            title: "AI Career Intelligence Platform Architecture",
            diagram: `
+-----------------------------------------------------------------------------------+
|                            CLIENT APP (React.js SPA)                              |
+-----------------------------------------------------------------------------------+
                                         |
                                   (REST API Async)
                                         v
+-----------------------------------------------------------------------------------+
|                              FASTAPI API GATEWAY                                  |
|                                                                                   |
|  +---------------------+                       +-------------------------------+  |
|  | Vector Math Engine  |                       | Active-Model Fallback Engine  |  |
|  | (scikit-learn TFIDF)|                       | (Groq LLM -> LangChain -> API)|  |
|  +---------------------+                       +-------------------------------+  |
+-----------------------------------------------------------------------------------+
         |                                                       |
         | (Dispatch Async Job)                                  | (Persist Results)
         v                                                       v
+-----------------------+                               +-----------------------+
|  REDIS TASK BROKER    |                               |  POSTGRESQL DATABASE  |
|   + Celery Workers    |                               |  Candidate Profiling  |
+-----------------------+                               +-----------------------+`
        }
    };

    archBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-arch');
            const data = diagrams[key];
            if (data) {
                archTitle.textContent = data.title;
                archBody.innerHTML = `<div class="arch-diagram-box">${escapeHtml(data.diagram)}</div>`;
                archModal.classList.add('open');
                archModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (archClose) {
        archClose.addEventListener('click', () => {
            archModal.classList.remove('open');
            archModal.setAttribute('aria-hidden', 'true');
        });
    }

    archModal.addEventListener('click', (e) => {
        if (e.target === archModal) {
            archModal.classList.remove('open');
            archModal.setAttribute('aria-hidden', 'true');
        }
    });

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

// 5. Mobile Navigation Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }
}

// 6. Impact Metrics Counter Animation (Triggers once on Viewport Entry)
function initMetricsObserver() {
    const metricNumbers = document.querySelectorAll('.metric-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                if (target && !el.classList.contains('counted')) {
                    el.classList.add('counted');
                    animateNumber(el, target);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    metricNumbers.forEach(num => observer.observe(num));

    function animateNumber(el, target) {
        let current = 0;
        const duration = 1000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                if (target === 10 || target === 4 || target === 1400) {
                    el.textContent = `${target}+`;
                } else {
                    el.textContent = target.toString();
                }
            } else {
                el.textContent = Math.floor(current).toString();
            }
        }, stepTime);
    }
}
