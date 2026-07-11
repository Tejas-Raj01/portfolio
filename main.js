document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 2. Navbar scroll effect (Waybar style floating adjustment)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 27, 38, 0.9)'; // Darker Tokyo Night bg
            navbar.style.border = '1px solid #7dcfff'; // Cyan border on scroll
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
        } else {
            navbar.style.background = 'rgba(36, 40, 59, 0.7)';
            navbar.style.border = '1px solid #414868';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        }
    });

    // 3. Hover Glow effect tracking for Hyprland borders
    // Removed because the CSS handles it nicely now with pseudo-elements 
    // and cubic-bezier. Keeping it clean and CSS-driven for performance.

    // 4. Interactive Tabs (Tmux/FZF style)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab pane
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            
            // Re-trigger the CSS animation
            targetPane.style.animation = 'none';
            targetPane.offsetHeight; // Trigger reflow
            targetPane.style.animation = null;
            
            targetPane.classList.add('active');
        });
    });

    // 5. Terminal Typing Effect for Hero Section
    const glowBadge = document.querySelector('.glow-badge');
    if (glowBadge) {
        const text = 'sys.init("Hello World");';
        glowBadge.textContent = ''; // Clear text
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                glowBadge.textContent += text.charAt(i);
                i++;
                // Randomize typing speed slightly for realism
                setTimeout(typeWriter, Math.random() * 50 + 30);
            } else {
                // Add blinking cursor at the end
                const cursor = document.createElement('span');
                cursor.textContent = '█';
                cursor.style.animation = 'blink 1s step-end infinite';
                
                // Add keyframes dynamically if not present
                if (!document.getElementById('cursor-styles')) {
                    const style = document.createElement('style');
                    style.id = 'cursor-styles';
                    style.innerHTML = `
                        @keyframes blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                glowBadge.appendChild(cursor);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 600);
    }
});
