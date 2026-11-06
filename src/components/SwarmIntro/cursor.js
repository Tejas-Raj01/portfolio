// Multiplayer Cursor Entity
// Renders and animates Figma-style collaborative cursors with name tags and tool state

export class MultiplayerCursor {
    constructor(config, container) {
        this.id = config.id;
        this.name = config.name;
        this.color = config.color;

        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.speed = 0.18; // Lerp factor
        this.tool = 'pointer'; // 'pointer', 'crosshair', 'pen', 'type'

        // Create DOM element for cursor
        this.el = document.createElement('div');
        this.el.className = 'swarm-cursor';
        this.el.id = `cursor-${this.id}`;
        this.el.style.setProperty('--cursor-color', this.color);

        this.el.innerHTML = `
            <svg class="cursor-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" 
                      fill="${this.color}" 
                      stroke="#ffffff" 
                      stroke-width="1.2"/>
            </svg>
            <div class="cursor-label-tag" style="background-color: ${this.color};">
                <span class="cursor-name">${this.name}</span>
                <span class="cursor-tool-badge" style="display:none;"></span>
            </div>
        `;

        container.appendChild(this.el);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.render();
    }

    moveTo(tx, ty, tool = 'pointer') {
        this.targetX = tx;
        this.targetY = ty;
        this.setTool(tool);
    }

    setTool(toolName, badgeText = '') {
        this.tool = toolName;
        const badge = this.el.querySelector('.cursor-tool-badge');
        if (badge) {
            if (badgeText) {
                badge.textContent = badgeText;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        this.render();
    }

    render() {
        this.el.style.transform = `translate3d(${Math.round(this.x)}px, ${Math.round(this.y)}px, 0)`;
    }

    destroy() {
        if (this.el && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    }
}
