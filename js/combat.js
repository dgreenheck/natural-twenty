import { spawnEnemy } from './enemies.js';

export class Combat {
    constructor(game, ui) {
        this.game = game;
        this.ui = ui;
        this.enemy = null;
        this.turn = 'player';
        this.round = 1;
        this.combatLog = [];
    }

    startCombat(enemyType) {
        this.enemy = spawnEnemy(enemyType);
        this.turn = 'player';
        this.round = 1;
        this.combatLog = [];
        
        let output = '\n⚔️ COMBAT STARTED! ⚔️\n';
        output += `A ${this.enemy.name} appears!\n`;
        output += `${this.enemy.description}\n\n`;
        output += this.getCombatStatus();
        output += '\nCommands: attack, flee, use [item]';
        
        return output;
    }

    getCombatStatus() {
        let status = '═══ COMBAT STATUS ═══\n';
        status += `Round ${this.round}\n`;
        status += `\nYou: ${this.ui.createProgressBar(this.game.player.hp, this.game.player.maxHp)} HP\n`;
        status += `${this.enemy.name}: ${this.ui.createProgressBar(this.enemy.hp, this.enemy.maxHp)} HP\n`;
        return status;
    }

    playerAttack() {
        if (this.turn !== 'player') {
            return 'It\'s not your turn!';
        }
        
        let output = '';
        
        // Player attack roll
        const attackRoll = this.game.rollD20();
        const playerAttack = this.game.player.calculateTotalAttack();
        const totalAttack = attackRoll + Math.floor(playerAttack / 2);
        
        if (totalAttack >= this.enemy.defense + 10 || attackRoll === 20) {
            // Hit!
            let damage = this.game.rollD6(2) + Math.floor(this.game.player.str / 3);
            
            if (attackRoll === 20) {
                damage *= 2;
                output += '💥 CRITICAL HIT! 💥\n';
            }
            
            const actualDamage = this.enemy.takeDamage(damage);
            output += `You strike the ${this.enemy.name} for ${actualDamage} damage!\n`;
            
            if (this.enemy.isDead()) {
                return output + this.endCombat(true);
            }
        } else {
            output += `Your attack misses the ${this.enemy.name}!\n`;
        }
        
        // Enemy turn
        this.turn = 'enemy';
        output += '\n' + this.enemyAttack();
        this.turn = 'player';
        this.round++;
        
        output += '\n' + this.getCombatStatus();
        
        return output;
    }

    enemyAttack() {
        let output = '';
        const enemyAttack = this.enemy.attack();
        const totalAttack = enemyAttack.roll;
        
        if (totalAttack >= this.game.player.defense + 10 || enemyAttack.critical) {
            // Hit!
            let damage = enemyAttack.damage;
            
            if (enemyAttack.critical) {
                damage *= 2;
                output += '💀 ENEMY CRITICAL HIT! 💀\n';
            }
            
            const actualDamage = this.game.player.takeDamage(damage);
            output += `The ${this.enemy.name} hits you for ${actualDamage} damage!\n`;
            
            if (this.game.player.hp <= 0) {
                output += '\n💀 YOU HAVE BEEN DEFEATED! 💀';
            }
        } else {
            output += `The ${this.enemy.name}'s attack misses!\n`;
        }
        
        return output;
    }

    flee() {
        const fleeRoll = this.game.rollD20();
        const fleeChance = fleeRoll + Math.floor(this.game.player.dex / 2);
        
        if (fleeChance >= 12) {
            this.enemy = null;
            return 'You successfully flee from combat!';
        } else {
            let output = 'You failed to escape!\n\n';
            
            // Enemy gets a free attack
            this.turn = 'enemy';
            output += this.enemyAttack();
            this.turn = 'player';
            this.round++;
            
            output += '\n' + this.getCombatStatus();
            return output;
        }
    }

    endCombat(victory) {
        let output = '';
        
        if (victory) {
            output += `\n🎉 VICTORY! 🎉\n`;
            output += `You have defeated the ${this.enemy.name}!\n\n`;
            
            // Award XP
            const xpGained = this.enemy.xp;
            output += `You gained ${xpGained} XP!\n`;
            const leveledUp = this.game.player.gainXp(xpGained);
            
            if (leveledUp) {
                output += '\n⭐ LEVEL UP! ⭐\n';
                output += `You are now level ${this.game.player.level}!\n`;
                output += `HP and MP fully restored!\n`;
            }
            
            // Get loot
            const loot = this.enemy.getLoot();
            if (loot.length > 0) {
                output += '\nLoot obtained:\n';
                for (let item of loot) {
                    if (item.type === 'gold') {
                        this.game.player.gold += item.amount;
                        output += `  💰 ${item.amount} gold\n`;
                    } else if (item.type === 'item') {
                        const result = this.game.player.inventory.addItem(item.name, item.quantity);
                        if (result.success) {
                            output += `  📦 ${item.quantity}x ${item.name}\n`;
                        }
                    }
                }
            }
        }
        
        this.enemy = null;
        this.turn = 'player';
        this.round = 1;
        
        return output;
    }

    useCombatItem(itemName) {
        if (this.turn !== 'player') {
            return 'It\'s not your turn!';
        }
        
        // This will be implemented with the inventory system
        return 'Combat items not yet implemented.';
    }

    isInCombat() {
        return this.enemy !== null;
    }

    getCurrentEnemy() {
        return this.enemy;
    }
}