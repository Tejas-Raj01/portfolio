// Tejas Raj Portfolio — Codebase Repository (tejas-raj/) Logic

document.addEventListener('DOMContentLoaded', () => {
    initFileTreeNavigation();
    initGitTimelineInteractivity();
    initScrollSpyAndProgress();
    initCopyEmailButtons();
    initCommandPalette();
    initResumeModal();
});

// 1. Sidebar File Tree Navigation & Smooth Scroll
function initFileTreeNavigation() {
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSec = document.querySelector(href);
                if (targetSec) {
                    fileItems.forEach(f => f.classList.remove('active'));
                    item.classList.add('active');
                    targetSec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// 2. Git History Commit Timeline Interactivity
function initGitTimelineInteractivity() {
    const commitNodes = document.querySelectorAll('.git-commit-node');

    commitNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            commitNodes.forEach(n => n.classList.remove('active-node'));
            node.classList.add('active-node');
        });
    });
}

// 3. ScrollSpy & Reading Progress Bar
function initScrollSpyAndProgress() {
    const progressBar = document.getElementById('progress-bar');
    const fileItems = document.querySelectorAll('.file-item');
    const sections = document.querySelectorAll('.code-file-section[id]');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            fileItems.forEach(item => {
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

// 6. Resume Viewer Modal Logic
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
