document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Fake Linux Boot Sequence
    const bootSequence = document.createElement('div');
    bootSequence.id = 'boot-sequence';
    document.body.appendChild(bootSequence);
    
    // Hide main content initially
    const mainContent = document.querySelector('main');
    const navBar = document.querySelector('.navbar');
    if(mainContent) mainContent.style.display = 'none';
    if(navBar) navBar.style.display = 'none';

    const bootLogs = [
        "[ <span class='boot-ok'>OK</span> ] Started Show Plymouth Boot Screen.",
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
                if(mainContent) mainContent.style.display = 'block';
                if(navBar) navBar.style.display = 'flex';
                initPortfolio();
            }, 500);
        }
    }, 40); // Fast log printing

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
                        <a href="https://github.com/Tejas-Raj01" target="_blank" class="social-icon">[GitHub]</a>
                        <a href="https://www.linkedin.com/in/tejas-raj-09aa4a236/" target="_blank" class="social-icon">[LinkedIn]</a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rajtejas.xyz@gmail.com" target="_blank" class="social-icon">[Email]</a>
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

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // 6. Blinking Block Cursor logic
        const cursor = document.createElement('span');
        cursor.id = 'dynamic-cursor';
        document.body.appendChild(cursor);

        // Append cursor to hovered element if it's text-based
        document.addEventListener('mouseover', (e) => {
            const el = e.target;
            if (['H1', 'H2', 'H3', 'A', 'SPAN', 'P', 'BUTTON', 'DIV'].includes(el.tagName)) {
                // Ignore elements that shouldn't have cursor inside them directly, or are structural
                if (el.classList.contains('glass-card') || el.classList.contains('section')) return;
                
                // Remove cursor from current parent
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
                
                // Append to new hovered element
                el.appendChild(cursor);
            }
        });

        // 7. Vim Keybindings
        document.addEventListener('keydown', (e) => {
            // j = scroll down
            if (e.key === 'j') {
                window.scrollBy({ top: 100, behavior: 'auto' });
            }
            // k = scroll up
            else if (e.key === 'k') {
                window.scrollBy({ top: -100, behavior: 'auto' });
            }
            // 1-5 = jump to sections
            else if (['1', '2', '3', '4', '5'].includes(e.key)) {
                const sections = document.querySelectorAll('section');
                const idx = parseInt(e.key) - 1;
                if (sections[idx]) {
                    sections[idx].scrollIntoView({ behavior: 'auto' });
                }
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
    }
});
