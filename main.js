document.addEventListener('DOMContentLoaded', () => {

    // Check localStorage for boot preference
    const shouldSkipBoot = localStorage.getItem('skipBootSequence') === 'true';

    // 1. Fake Linux Boot Sequence (or skip based on preference)
    const bootSequence = document.createElement('div');
    bootSequence.id = 'boot-sequence';
    document.body.appendChild(bootSequence);

    // Hide main content initially
    const mainContent = document.querySelector('main');
    const navBar = document.querySelector('.navbar');
    const skipBootBtn = document.createElement('button');
    skipBootBtn.id = 'skip-boot-btn';
    skipBootBtn.innerHTML = 'skip <span class="dot">.</span>';
    document.body.appendChild(skipBootBtn);

    // Skip boot button functionality
    skipBootBtn.addEventListener('click', () => {
        localStorage.setItem('skipBootSequence', 'true');
        bootSequence.remove();
        skipBootBtn.remove();
        if(mainContent) mainContent.style.display = 'block';
        if(navBar) navBar.style.display = 'flex';
        initPortfolio();
    });

    if (shouldSkipBoot) {
        skipBootBtn.remove();
        bootSequence.remove();
        if(mainContent) mainContent.style.display = 'block';
        if(navBar) navBar.style.display = 'flex';
        initPortfolio();
    } else {
        const bootLogs = [
            "[ <span class='boot-ok'>OK</span> ] Starting Show Plymouth Boot Screen...",
            "[ <span class='boot-ok'>OK</span> ] Reached target Paths.",
            "[ <span class='boot-ok'>OK</span> ] Reached target Basic System.",
            "Mounting /sys/kernel/debug...",
            "[ <span class='boot-ok'>OK</span> ] Mounted /sys/kernel/debug.",
            "Starting Load/Save Random Seed...",
            "[ <span class='boot-ok'>OK</span> ] Started Load/Save Random Seed.",
            "Starting udev Coldplug all Devices...",
            "[ <span class='boot-ok'>OK</span> ] Started udev Coldplug all Devices.",
            "Starting Network Time Synchronization...",
            "[ <span class='boot-ok'>OK</span> ] Started Network Time Synchronization.",
            "[ <span class='boot-ok'>OK</span> ] Reached target System Initialization.",
            "[ <span class='boot-ok'>OK</span> ] Reached target Sockets.",
            "[ <span class='boot-ok'>OK</span> ] Reached target Basic System.",
            "Starting Network Manager...",
            "[ <span class='boot-ok'>OK</span> ] Started Network Manager.",
            "Starting WPA supplicant...",
            "[ <span class='boot-ok'>OK</span> ] Started WPA supplicant.",
            "[ <span class='boot-ok'>OK</span> ] Reached target Network.",
            "Starting Light Display Manager...",
            "[ <span class='boot-ok'>OK</span> ] Started Light Display Manager.",
            "[ <span class='boot-ok'>OK</span> ] Reached target Graphical Interface.",
            "Welcome to Arch Linux!"
        ];

        let logIndex = 0;
        const bootInterval = setInterval(() => {
            if (logIndex < bootLogs.length) {
                const line = document.createElement('div');
                line.className = 'boot-line';
                line.innerHTML = bootLogs[logIndex];
                bootSequence.appendChild(line);
                window.scrollTo(0, document.body.scrollHeight);
                logIndex++;
            } else {
                clearInterval(bootInterval);
                setTimeout(() => {
                    bootSequence.remove();
                    skipBootBtn.remove();
                    if(mainContent) mainContent.style.display = 'block';
                    if(navBar) navBar.style.display = 'flex';
                    initPortfolio();
                }, 500);
            }
        }, 40); // Fast log printing
    }

    function initPortfolio() {

        // 2. Format Neofetch Right Column
        const heroInner = document.querySelector('.hero-inner');
        if (heroInner) {
            heroInner.innerHTML = `
                <div class="name">tejas-raj@archlinux</div>
                <div class="neofetch-divider">-------------------</div>
                <div class="neofetch-row"><span class="neofetch-key">OS</span><span>Arch Linux x86_64</span></div>
                <div class="neofetch-row"><span class="neofetch-key">Host</span><span>NIT Durgapur</span></div>
                <div class="neofetch-row"><span class="neofetch-key">Kernel</span><span>6.1.53-1-lts</span></div>
                <div class="neofetch-row"><span class="neofetch-key">Uptime</span><span>20 years</span></div>
                <div class="neofetch-row"><span class="neofetch-key">Role</span><span id="type-role"></span></div>
                <div class="neofetch-row"><span class="neofetch-key">Passion</span><span id="type-summary"></span></div>
                <div class="social-links" id="type-socials"></div>
            `;

            // Ultra-fast Typing Effect for Role and Passion
            const roleText = "Software Engineer & Open Source Contributor";
            const summaryText = "Building scalable systems, AI & open-source software.";

            const roleSpan = document.getElementById('type-role');
            const summarySpan = document.getElementById('type-summary');

            let rIdx = 0;
            let sIdx = 0;

            function typeRole() {
                if (rIdx < roleText.length) {
                    roleSpan.textContent += roleText.charAt(rIdx);
                    rIdx++;
                    setTimeout(typeRole, 20);
                } else {
                    typeSummary();
                }
            }

            function typeSummary() {
                if (sIdx < summaryText.length) {
                    summarySpan.textContent += summaryText.charAt(sIdx);
                    sIdx++;
                    setTimeout(typeSummary, 20);
                } else {
                    document.getElementById('type-socials').innerHTML = `
                        <a href="https://github.com/Tejas-Raj01" target="_blank" class="social-icon" data-name="GitHub">GitHub</a>
                        <a href="https://www.linkedin.com/in/tejas-raj-09aa4a236/" target="_blank" class="social-icon" data-name="LinkedIn">LinkedIn</a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rajtejas.xyz@gmail.com" target="_blank" class="social-icon" data-name="Email">Email</a>
                    `;
                }
            }

            setTimeout(typeRole, 300);
        }

        // 3. Tmux Navbar formatting
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const links = navLinks.querySelectorAll('a');
            links.forEach((link, idx) => {
                const text = link.innerText;
                link.innerHTML = `[${idx}] ~/${text}`;
            });
        }

        // 4. Section titles formatting
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            const text = title.innerText.replace('.', '').trim();
            title.innerHTML = `ls -la`;
            title.setAttribute('data-dir', text);
        });

        // 5. Interactive Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        let currentTabIndex = 0;
        const tabIds = Array.from(tabBtns).map(btn => btn.getAttribute('data-target'));

        tabBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
                currentTabIndex = idx;
            });
        });

        // 6. Blinking Block Cursor logic
        const cursor = document.createElement('span');
        cursor.id = 'dynamic-cursor';
        document.body.appendChild(cursor);

        let hoverTarget = null;

        // Append cursor to hovered element if it's text-based
        document.addEventListener('mouseover', (e) => {
            const el = e.target;

            // Fix: Prevent cursor from appending to itself
            if (el === cursor) return;

            if (['H1', 'H2', 'H3', 'A', 'SPAN', 'P', 'BUTTON', 'DIV', 'LI'].includes(el.tagName)) {
                // Ignore elements that shouldn't have cursor inside them directly, or are structural
                if (el.classList.contains('glass-card') || el.classList.contains('section') || el.classList.contains('neofetch-key')) return;

                // Ignore the skip boot button and command palette
                if (el.id === 'skip-boot-btn' || el.id === 'command-palette' || el.classList.contains('palette-item')) return;

                // Remove cursor from current parent
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }

                // Append to new hovered element
                el.appendChild(cursor);
                hoverTarget = el;
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (hoverTarget) {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
                hoverTarget = null;
            }
        });

        // 7. Vim Keybindings + Extensions
        let mode = 'NORMAL';

        document.addEventListener('keydown', (e) => {
            // Don't interfere with input/textarea focus
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Prevent vim keybindings from interfering with browser shortcuts
            if (e.ctrlKey || e.metaKey) return;

            // j = scroll down
            if (e.key === 'j') {
                window.scrollBy({ top: 100, behavior: 'smooth' });
                e.preventDefault();
            }
            // k = scroll up
            else if (e.key === 'k') {
                window.scrollBy({ top: -100, behavior: 'smooth' });
                e.preventDefault();
            }
            // 1-5 = jump to sections
            else if (['1', '2', '3', '4', '5'].includes(e.key)) {
                const sections = document.querySelectorAll('section');
                const idx = parseInt(e.key) - 1;
                if (sections[idx]) {
                    sections[idx].scrollIntoView({ behavior: 'smooth' });
                    e.preventDefault();
                }
            }
            // h = previous tab (open source)
            else if (e.key === 'h') {
                if (tabBtns.length > 0) {
                    currentTabIndex = (currentTabIndex - 1 + tabIds.length) % tabIds.length;
                    tabBtns[currentTabIndex].click();
                    e.preventDefault();
                }
            }
            // l = next tab (open source)
            else if (e.key === 'l') {
                if (tabBtns.length > 0) {
                    currentTabIndex = (currentTabIndex + 1) % tabIds.length;
                    tabBtns[currentTabIndex].click();
                    e.preventDefault();
                }
            }
            // : = open command palette
            else if (e.key === ':') {
                openCommandPalette();
                e.preventDefault();
            }
            // ? = show help
            else if (e.key === '?') {
                showHelpOverlay();
                e.preventDefault();
            }
            // r = refresh/re-run boot sequence (if not already running)
            else if (e.key === 'r' && !shouldSkipBoot) {
                location.reload();
                e.preventDefault();
            }
        });

        // 8. Matrix Background Logic
        const canvas = document.getElementById('matrix-bg');
        if (canvas) {
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

        // 9. Command Palette
        function openCommandPalette() {
            // Remove existing palette
            const existingPalette = document.getElementById('command-palette');
            if (existingPalette) existingPalette.remove();

            const palette = document.createElement('div');
            palette.id = 'command-palette';
            palette.innerHTML = `
                <div class="palette-header">
                    <span>cmd</span>
                </div>
                <div class="palette-search">
                    <input type="text" id="palette-input" placeholder="Type commands..." autofocus />
                </div>
                <div class="palette-section">
                    <div class="palette-section-title">Navigation</div>
                    <div class="palette-items">
                        <div class="palette-item" data-action="hero">Go to Hero</div>
                        <div class="palette-item" data-action="about">Go to Education</div>
                        <div class="palette-item" data-action="experience">Go to Open Source</div>
                        <div class="palette-item" data-action="projects">Go to Projects</div>
                        <div class="palette-item" data-action="skills">Go to Skills</div>
                        <div class="palette-item" data-action="achievements">Go to Achievements</div>
                    </div>
                </div>
                <div class="palette-section">
                    <div class="palette-section-title">Links</div>
                    <div class="palette-items">
                        <div class="palette-item" data-action="github">Open GitHub</div>
                        <div class="palette-item" data-action="linkedin">Open LinkedIn</div>
                        <div class="palette-item" data-action="email">Open Email</div>
                    </div>
                </div>
                <div class="palette-section">
                    <div class="palette-section-title">Settings</div>
                    <div class="palette-items">
                        <div class="palette-item" data-action="toggle-matrix">Toggle Matrix Background</div>
                        <div class="palette-item" data-action="reset-boot">Reset Boot Sequence</div>
                        <div class="palette-item" data-action="help">Show Help</div>
                    </div>
                </div>
                <div class="palette-footer">
                    <span class="palette-tip">↑↓ to navigate, Enter to select, Esc to close</span>
                </div>
            `;
            document.body.appendChild(palette);

            const input = palette.querySelector('#palette-input');
            const items = palette.querySelectorAll('.palette-item');
            let selectedIndex = -1;

            // Filter items based on input
            input.addEventListener('input', () => {
                const query = input.value.toLowerCase();
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? 'block' : 'none';
                });
            });

            // Navigation with arrow keys
            input.addEventListener('keydown', (e) => {
                const visibleItems = Array.from(items).filter(item => item.style.display !== 'none');

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (selectedIndex < visibleItems.length - 1) {
                        selectedIndex++;
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (selectedIndex > 0) {
                        selectedIndex--;
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (selectedIndex >= 0 && selectedIndex < visibleItems.length) {
                        executePaletteAction(visibleItems[selectedIndex].dataset.action);
                    }
                } else if (e.key === 'Escape') {
                    closeCommandPalette();
                }

                updateSelection(visibleItems);
            });

            function updateSelection(visibleItems) {
                items.forEach(item => item.classList.remove('selected'));
                if (selectedIndex >= 0 && selectedIndex < visibleItems.length) {
                    visibleItems[selectedIndex].classList.add('selected');
                }
            }

            // Execute action
            items.forEach(item => {
                item.addEventListener('click', () => {
                    executePaletteAction(item.dataset.action);
                });
            });
        }

        function executePaletteAction(action) {
            closeCommandPalette();

            switch (action) {
                case 'hero':
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'about':
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'experience':
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'projects':
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'skills':
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'achievements':
                    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'github':
                    window.open('https://github.com/Tejas-Raj01', '_blank');
                    break;
                case 'linkedin':
                    window.open('https://www.linkedin.com/in/tejas-raj-09aa4a236/', '_blank');
                    break;
                case 'email':
                    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=rajtejas.xyz@gmail.com', '_blank');
                    break;
                case 'toggle-matrix':
                    toggleMatrix();
                    break;
                case 'reset-boot':
                    localStorage.removeItem('skipBootSequence');
                    location.reload();
                    break;
                case 'help':
                    showHelpOverlay();
                    break;
            }
        }

        function closeCommandPalette() {
            const palette = document.getElementById('command-palette');
            if (palette) palette.remove();
        }

        function toggleMatrix() {
            const canvas = document.getElementById('matrix-bg');
            if (canvas) {
                if (canvas.style.display === 'none') {
                    canvas.style.display = 'block';
                } else {
                    canvas.style.display = 'none';
                }
            }
        }

        // 10. Help Overlay
        function showHelpOverlay() {
            const existingOverlay = document.getElementById('help-overlay');
            if (existingOverlay) {
                existingOverlay.remove();
                return;
            }

            const overlay = document.createElement('div');
            overlay.id = 'help-overlay';
            overlay.innerHTML = `
                <div class="help-content">
                    <h2>Keyboard Shortcuts</h2>
                    <div class="help-grid">
                        <div class="help-item"><span class="help-key">j</span> <span class="help-desc">Scroll down</span></div>
                        <div class="help-item"><span class="help-key">k</span> <span class="help-desc">Scroll up</span></div>
                        <div class="help-item"><span class="help-key">h</span> <span class="help-desc">Previous tab (open source)</span></div>
                        <div class="help-item"><span class="help-key">l</span> <span class="help-desc">Next tab (open source)</span></div>
                        <div class="help-item"><span class="help-key">1-5</span> <span class="help-desc">Jump to sections</span></div>
                        <div class="help-item"><span class="help-key">:</span> <span class="help-desc">Open command palette</span></div>
                        <div class="help-item"><span class="help-key">?</span> <span class="help-desc">Show this help</span></div>
                        <div class="help-item"><span class="help-key">r</span> <span class="help-desc">Reload page</span></div>
                        <div class="help-item"><span class="help-key">Esc</span> <span class="help-desc">Close palette/overlay</span></div>
                    </div>
                    <div class="help-footer">
                        <span>Click anywhere or press <span class="help-key">Esc</span> to close</span>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        }

        // 11. Skills Section Tooltips (initialize on load)
        const skillTags = document.querySelectorAll('.skill-tags .tag');
        skillTags.forEach(tag => {
            tag.title = 'Click for details';
        });

        // Add click handlers for skill tags
        skillTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                const skillName = tag.textContent.replace(/"/g, '').replace(/,/g, '');
                alert(`${skillName} - Proficiency level varies by context\n\nClick external links for detailed projects.`);
            });
        });

        // 12. Status Line at Bottom
        const statusLine = document.createElement('div');
        statusLine.id = 'status-line';
        statusLine.innerHTML = `
            <div class="status-item">
                <span class="status-label">mode:</span>
                <span id="mode-indicator">NORMAL</span>
            </div>
            <div class="status-item">
                <span class="status-label">section:</span>
                <span id="section-indicator">hero</span>
            </div>
            <div class="status-item">
                <span class="status-label">tab:</span>
                <span id="tab-indicator">pytorch</span>
            </div>
        `;
        document.body.appendChild(statusLine);

        // Update mode indicator
        function updateModeIndicator(newMode) {
            mode = newMode;
            document.getElementById('mode-indicator').textContent = mode;
        }

        // Track current section
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    document.getElementById('section-indicator').textContent = sectionId;
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));

        // Update tab indicator
        tabBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                document.getElementById('tab-indicator').textContent = btn.dataset.target;
            });
        });
    }

    // Handle escape key for closing overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const palette = document.getElementById('command-palette');
            const overlay = document.getElementById('help-overlay');
            if (palette) palette.remove();
            if (overlay) overlay.remove();
        }
    });
});