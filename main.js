// Tejas Raj Portfolio — Dark Hacker Terminal Logic & Interactivity

document.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initOpenSourceTabs();
    initScrollSpyAndProgress();
    initCopyEmailButtons();
    initCommandPalette();
    initArchitectureModals();
    initResumeModal();
    initMetricsObserver();
});

// 1. Matrix Background Animation
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+';
    const characters = matrixLetters.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41'; // Hacky Green
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 2. Open Source Interactive Tab Switching
function initOpenSourceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// 3. ScrollSpy & Progress Bar
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

// 4. Copy Email & Toast Notification
function initCopyEmailButtons() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toastContainer = document.getElementById('toast-container');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'rajtejas.xyz@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(`[OK] Copied email to clipboard: ${email}`);
            }).catch(() => {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`[OK] Copied email to clipboard: ${email}`);
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

// 5. Command Palette (Cmd+K / Ctrl+K)
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

// 6. Architecture Diagram Modals
function initArchitectureModals() {
    const archBtns = document.querySelectorAll('.open-arch-modal');
    const archModal = document.getElementById('arch-modal');
    const archClose = document.getElementById('arch-close');
    const archTitle = document.getElementById('arch-title');
    const archBody = document.getElementById('arch-body');

    if (!archModal || !archBody) return;

    const diagrams = {
        kv: {
            title: "Distributed Key-Value Storage Architecture",
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
|                            CLIENT APP (React 19 SPA)                              |
+-----------------------------------------------------------------------------------+
                                         |
                                   (REST API Async)
                                         v
+-----------------------------------------------------------------------------------+
|                            LARAVEL 13 REST API BACKEND                            |
|                                                                                   |
|  +---------------------+                       +-------------------------------+  |
|  | Vector Math Engine  |                       | Active-Model Fallback Engine  |  |
|  | (Custom TF Cosine)  |                       | (Groq LLM -> Auto-Fallback)   |  |
|  +---------------------+                       +-------------------------------+  |
+-----------------------------------------------------------------------------------+
         |                                                       |
         | (Dispatch Async Job)                                  | (Persist Results)
         v                                                       v
+-----------------------+                               +-----------------------+
|  REDIS QUEUE BROKER   |                               |  POSTGRESQL DATABASE  |
|   + Laravel Queues    |                               |  Candidate Profiling  |
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

// 7. Resume Viewer Modal Logic
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

// 8. Impact Metrics Counter Animation
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
        const duration = 800;
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
