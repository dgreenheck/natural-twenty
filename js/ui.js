export class UI {
    constructor() {
        this.outputElement = document.getElementById('output');
        this.inputElement = document.getElementById('command-input');
        this.maxOutputLines = 1000;
        this.outputLines = [];
    }

    addOutput(text, className = '') {
        const timestamp = new Date().toLocaleTimeString();
        
        const line = document.createElement('div');
        if (className) {
            line.className = className;
        }
        line.textContent = text;
        
        this.outputElement.appendChild(line);
        this.outputLines.push(line);
        
        if (this.outputLines.length > this.maxOutputLines) {
            const oldLine = this.outputLines.shift();
            oldLine.remove();
        }
        
        this.scrollToBottom();
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
            this.addOutput(`⚔️ ${attacker} hits ${defender} for ${damage} damage!`, 'combat');
        } else {
            this.addOutput(`✗ ${attacker} misses ${defender}!`, 'combat');
        }
    }

    showLootMessage(item, quantity = 1) {
        if (quantity > 1) {
            this.addOutput(`✨ You found ${quantity}x ${item}!`, 'item');
        } else {
            this.addOutput(`✨ You found ${item}!`, 'item');
        }
    }

    showLocationDescription(name, description) {
        this.addOutput(`\n📍 ${name}`, 'location');
        this.addOutput(description, 'location');
    }

    showDialogue(speaker, text) {
        this.addOutput(`\n${speaker}: "${text}"`, 'dialogue');
    }
}