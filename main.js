// Tejas Raj Portfolio — Personal Engineering Lab Logic & Interactivity

document.addEventListener('DOMContentLoaded', () => {
    initMatrixBackground();
    initHeroGraphCanvas();
    initOpenSourceTabs();
    initProblemToMergeStepper();
    initTopologyTooltips();
    initScrollSpyAndProgress();
    initCopyEmailButtons();
    initCommandPalette();
    initArchitectureModals();
    initResumeModal();
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

        ctx.fillStyle = '#00ff41'; // Terminal Green
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

// 2. Interactive Hero System Graph Canvas
function initHeroGraphCanvas() {
    const canvas = document.getElementById('hero-graph-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = 180);

    const labels = [
        'C++', 'Python', 'vLLM', 'PyTorch', 
        'Linux', 'Distributed Systems', 'Open Source', 'WAL Engine'
    ];

    const nodes = labels.map((label, idx) => {
        const angle = (idx / labels.length) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.32;
        return {
            label,
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: 5
        };
    });

    let mouse = { x: -1000, y: -1000 };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    function animateGraph() {
        ctx.clearRect(0, 0, width, height);

        // Update positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 30 || node.x > width - 30) node.vx *= -1;
            if (node.y < 20 || node.y > height - 20) node.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 160) {
                    ctx.strokeStyle = `rgba(0, 255, 65, ${1 - dist / 160})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes & labels
        nodes.forEach(node => {
            const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
            const isHovered = distMouse < 50;

            ctx.fillStyle = isHovered ? '#ffffff' : '#00ff41';
            ctx.beginPath();
            ctx.arc(node.x, node.y, isHovered ? 7 : 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = isHovered ? '#00ff41' : '#e5e5e5';
            ctx.font = isHovered ? 'bold 12px Fira Code' : '11px Fira Code';
            ctx.fillText(node.label, node.x + 8, node.y + 4);
        });

        requestAnimationFrame(animateGraph);
    }

    animateGraph();

    window.addEventListener('resize', () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = 180;
    });
}

// 3. Open Source Interactive Tab Switching
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

// 4. "From Problem to Merge" 5-Stage Stepper
function initProblemToMergeStepper() {
    const stepBtns = document.querySelectorAll('.step-btn');
    const stepPanes = document.querySelectorAll('.step-pane');

    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const stepNum = btn.getAttribute('data-step');

            stepBtns.forEach(b => b.classList.remove('active'));
            stepPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(`step-pane-${stepNum}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// 5. Tejas-DB Interactive Topology Tooltips
function initTopologyTooltips() {
    const topoNodes = document.querySelectorAll('.topo-node');
    const tooltipBox = document.getElementById('topology-tooltip-box');

    if (!tooltipBox) return;

    topoNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            topoNodes.forEach(n => n.classList.remove('active-topo'));
            node.classList.add('active-topo');

            const text = node.getAttribute('data-tooltip');
            if (text) {
                tooltipBox.innerHTML = `<i class="fas fa-check-circle accent-icon"></i> ${text}`;
            }
        });
    });
}

// 6. ScrollSpy & Progress Bar
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

// 7. Copy Email & Toast Notification
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

// 8. Command Palette (Cmd+K / Ctrl+K)
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

// 9. Architecture Diagram Modals
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

// 10. Resume Viewer Modal Logic
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
