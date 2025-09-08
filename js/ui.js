import { ColorTheme } from './theme.js';

export class UI {
    constructor() {
        this.outputElement = document.getElementById('output');
        this.inputElement = document.getElementById('command-input');
        this.maxOutputLines = 1000;
        this.outputLines = [];
        this.theme = ColorTheme;
    }

    addOutput(text, className = '', useHtml = false) {
        const timestamp = new Date().toLocaleTimeString();
        
        const line = document.createElement('div');
        if (className) {
            // Map old class names to new theme classes
            const themeClass = this.mapToThemeClass(className);
            line.className = themeClass;
        }
        
        if (useHtml) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        
        this.outputElement.appendChild(line);
        this.outputLines.push(line);
        
        if (this.outputLines.length > this.maxOutputLines) {
            const oldLine = this.outputLines.shift();
            oldLine.remove();
        }
        
        this.scrollToBottom();
    }
    
    mapToThemeClass(className) {
        const classMap = {
            'command-echo': 'msg-command',
            'error': 'msg-error',
            'success': 'msg-success',
            'info': 'msg-info',
            'warning': 'msg-warning',
            'combat': 'msg-combat',
            'item': 'msg-item',
            'location': 'msg-location',
            'dialogue': 'msg-dialogue',
            'npc-name': 'msg-npc-name'
        };
        
        return classMap[className] || `msg-${className}`;
    }
    
    addColoredOutput(parts) {
        const formattedText = this.theme.formatMessage(parts);
        this.addOutput(formattedText, '', true);
    }

    clearOutput() {
        this.outputElement.innerHTML = '';
        this.outputLines = [];
    }

    scrollToBottom() {
        const container = document.getElementById('output-container');
        container.scrollTop = container.scrollHeight;
    }

    updateStatusBar(player) {
        this.updateElement('player-hp', `HP: ${player.hp}/${player.maxHp}`);
        this.updateElement('player-level', `LVL: ${player.level}`);
        this.updateElement('player-gold', `Gold: ${player.gold}`);
        this.updateElement('player-location', `Location: ${player.location || 'Unknown'}`);
        
        this.highlightStatChange('player-hp', player.hp, player.maxHp);
    }

    updateElement(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    highlightStatChange(id, current, max) {
        const element = document.getElementById(id);
        if (!element) return;
        
        element.classList.remove('stat-change');
        void element.offsetWidth;
        element.classList.add('stat-change');
        
        const percentage = (current / max) * 100;
        if (percentage <= 25) {
            element.style.color = '#ff4444';
        } else if (percentage <= 50) {
            element.style.color = '#ffaa44';
        } else {
            element.style.color = '#00cc00';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    displayAsciiArt(art) {
        const artElement = document.createElement('pre');
        artElement.className = 'ascii-art';
        artElement.textContent = art;
        this.outputElement.appendChild(artElement);
        this.scrollToBottom();
    }

    typewriterEffect(text, className = '', speed = 30) {
        const element = document.createElement('div');
        if (className) {
            element.className = className;
        }
        
        this.outputElement.appendChild(element);
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                this.scrollToBottom();
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    createProgressBar(current, max, width = 20) {
        const percentage = Math.floor((current / max) * width);
        const filled = '█'.repeat(percentage);
        const empty = '░'.repeat(width - percentage);
        return `[${filled}${empty}] ${current}/${max}`;
    }

    formatTable(headers, rows) {
        const colWidths = headers.map((h, i) => {
            const maxRowWidth = Math.max(...rows.map(r => String(r[i]).length));
            return Math.max(h.length, maxRowWidth) + 2;
        });
        
        let table = '┌' + colWidths.map(w => '─'.repeat(w)).join('┬') + '┐\n';
        table += '│' + headers.map((h, i) => h.padEnd(colWidths[i])).join('│') + '│\n';
        table += '├' + colWidths.map(w => '─'.repeat(w)).join('┼') + '┤\n';
        
        rows.forEach(row => {
            table += '│' + row.map((cell, i) => String(cell).padEnd(colWidths[i])).join('│') + '│\n';
        });
        
        table += '└' + colWidths.map(w => '─'.repeat(w)).join('┴') + '┘';
        
        return table;
    }

    showCombatLog(attacker, defender, damage, hit) {
        if (hit) {
            const html = `⚔️ <span class="npc-name">${attacker}</span> hits <span class="enemy">${defender}</span> for <span class="damage-amount">${damage} damage</span>!`;
            this.addOutput(html, 'combat', true);
        } else {
            const html = `✗ <span class="npc-name">${attacker}</span> misses <span class="enemy">${defender}</span>!`;
            this.addOutput(html, 'miss', true);
        }
    }

    showLootMessage(item, quantity = 1) {
        if (quantity > 1) {
            const html = `✨ You found ${quantity}x <span class="item-name">${item}</span>!`;
            this.addOutput(html, '', true);
        } else {
            const html = `✨ You found <span class="item-name">${item}</span>!`;
            this.addOutput(html, '', true);
        }
    }

    showLocationDescription(name, description) {
        this.addOutput(`\n📍 ${name}`, 'location');
        this.addOutput(description, 'description');
    }

    showDialogue(speaker, text) {
        const html = `\n<span class="npc-name">${speaker}</span>: "<span class="msg-dialogue">${text}</span>"`;
        this.addOutput(html, '', true);
    }
}