import { Game } from './game.js';
import { UI } from './ui.js';
import { CommandParser } from './commands.js';
import { Combat } from './combat.js';
import { Trading } from './trading.js';

class DnDGame {
    constructor() {
        this.game = new Game();
        this.ui = new UI();
        this.combat = new Combat(this.game, this.ui);
        this.trading = new Trading(this.game, this.ui);
        this.game.setCombat(this.combat);
        this.game.setTrading(this.trading);
        this.commandParser = new CommandParser(this.game, this.ui, this.combat, this.trading);
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayWelcome();
        this.ui.updateStatusBar(this.game.player);
    }

    setupEventListeners() {
        const input = document.getElementById('command-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    this.processCommand(command);
                    input.value = '';
                }
            }
        });

        input.focus();
        
        // Help modal functionality
        const modal = document.getElementById('help-modal');
        const helpBtn = document.getElementById('help-btn');
        const closeBtn = document.querySelector('.close');
        
        helpBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            input.focus();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                input.focus();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                input.focus();
            }
        });
    }

    processCommand(command) {
        this.ui.addOutput(`> ${command}`, 'command-echo');
        
        try {
            const result = this.commandParser.parse(command);
            if (result) {
                this.ui.addOutput(result);
            }
            
            this.ui.updateStatusBar(this.game.player);
            
            if (this.game.player.hp <= 0) {
                this.handleDeath();
            }
        } catch (error) {
            this.ui.addOutput(`Error: ${error.message}`, 'error');
            if (this.game.debugMode) {
                console.error(error);
            }
        }
    }

    handleDeath() {
        this.ui.addOutput('\n💀 YOU HAVE DIED 💀', 'error');
        this.ui.addOutput('Your adventure has come to an end...', 'error');
        this.ui.addOutput('\nType "restart" to begin a new adventure.', 'info');
    }

    displayWelcome() {
        const welcomeText = `
╔══════════════════════════════════════════════════╗
║         WELCOME TO D&D TEXT ADVENTURE            ║
╚══════════════════════════════════════════════════╝

You awaken in a mysterious realm filled with danger and adventure.
Your destiny awaits...

Click the (?) button or type 'help' to see available commands.
Type 'stats' to view your character.
Type 'start' to begin your adventure.

`;
        this.ui.addOutput(welcomeText, 'success');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new DnDGame();
});