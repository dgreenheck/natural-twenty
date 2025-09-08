import { Inventory } from './inventory.js';

export class Player {
    constructor(name = 'Adventurer', playerClass = 'Fighter') {
        this.name = name;
        this.class = playerClass;
        this.level = 1;
        this.xp = 0;
        this.xpToNext = 100;
        this.game = null;
        
        this.initializeStats();
        this.initializeInventory();
    }
    
    setGame(game) {
        this.game = game;
    }

    initializeStats() {
        this.rollBaseStats();
        
        this.maxHp = 10 + this.con;
        this.hp = this.maxHp;
        this.maxMp = 10 + this.int;
        this.mp = this.maxMp;
        
        this.attack = 10 + Math.floor(this.str / 2);
        this.defense = 10 + Math.floor(this.dex / 2);
        
        this.gold = 50;
        
        this.applyClassModifiers();
    }

    rollBaseStats() {
        this.str = this.rollStat();
        this.dex = this.rollStat();
        this.int = this.rollStat();
        this.con = this.rollStat();
        this.wis = this.rollStat();
        this.cha = this.rollStat();
    }

    rollStat() {
        let rolls = [];
        for (let i = 0; i < 4; i++) {
            rolls.push(Math.floor(Math.random() * 6) + 1);
        }
        rolls.sort((a, b) => b - a);
        return rolls[0] + rolls[1] + rolls[2];
    }

    applyClassModifiers() {
        switch(this.class.toLowerCase()) {
            case 'fighter':
                this.str += 2;
                this.con += 2;
                this.maxHp += 5;
                this.hp = this.maxHp;
                break;
            
            case 'mage':
            case 'wizard':
                this.int += 3;
                this.wis += 1;
                this.maxMp += 10;
                this.mp = this.maxMp;
                break;
            
            case 'rogue':
            case 'thief':
                this.dex += 3;
                this.cha += 1;
                this.gold += 50;
                break;
            
            case 'cleric':
            case 'priest':
                this.wis += 2;
                this.con += 1;
                this.int += 1;
                this.maxHp += 3;
                this.maxMp += 5;
                this.hp = this.maxHp;
                this.mp = this.maxMp;
                break;
            
            case 'ranger':
                this.dex += 2;
                this.str += 1;
                this.wis += 1;
                this.maxHp += 2;
                this.hp = this.maxHp;
                break;
            
            case 'barbarian':
                this.str += 3;
                this.con += 3;
                this.int -= 2;
                this.maxHp += 8;
                this.hp = this.maxHp;
                break;
            
            default:
                this.str += 1;
                this.con += 1;
        }
        
        this.attack = 10 + Math.floor(this.str / 2);
        this.defense = 10 + Math.floor(this.dex / 2);
    }

    initializeInventory() {
        this.inventory = new Inventory(this);
        
        this.addStarterItems();
    }

    addStarterItems() {
        switch(this.class.toLowerCase()) {
            case 'fighter':
                this.inventory.addItem('iron_sword');
                this.inventory.addItem('leather_armor');
                break;
            
            case 'mage':
            case 'wizard':
                this.inventory.addItem('wooden_staff');
                this.inventory.addItem('mana_potion', 3);
                break;
            
            case 'rogue':
            case 'thief':
                this.inventory.addItem('dagger');
                this.inventory.addItem('smoke_bomb', 2);
                break;
            
            default:
                this.inventory.addItem('rusty_sword');
        }
        
        this.inventory.addItem('health_potion', 3);
        this.inventory.addItem('bread', 5);
    }

    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - Math.floor(this.defense / 4));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }

    heal(amount) {
        const healAmount = Math.min(amount, this.maxHp - this.hp);
        this.hp += healAmount;
        return healAmount;
    }

    restoreMp(amount) {
        const restoreAmount = Math.min(amount, this.maxMp - this.mp);
        this.mp += restoreAmount;
        return restoreAmount;
    }

    gainXp(amount) {
        this.xp += amount;
        let leveledUp = false;
        
        while (this.xp >= this.xpToNext) {
            this.xp -= this.xpToNext;
            this.levelUp();
            leveledUp = true;
        }
        
        return leveledUp;
    }

    levelUp() {
        this.level++;
        this.xpToNext = Math.floor(this.xpToNext * 1.5);
        
        const hpGain = Math.floor(Math.random() * 6) + 3 + Math.floor(this.con / 3);
        const mpGain = Math.floor(Math.random() * 4) + 1 + Math.floor(this.int / 3);
        
        this.maxHp += hpGain;
        this.maxMp += mpGain;
        this.hp = this.maxHp;
        this.mp = this.maxMp;
        
        if (this.level % 3 === 0) {
            this.str++;
            this.dex++;
            this.int++;
            this.con++;
            this.wis++;
            this.cha++;
            
            this.attack = 10 + Math.floor(this.str / 2);
            this.defense = 10 + Math.floor(this.dex / 2);
        }
    }

    calculateTotalAttack() {
        let total = this.attack;
        if (this.inventory.equipped.weapon) {
            total += this.inventory.equipped.weapon.attack || 0;
        }
        return total;
    }

    calculateTotalDefense() {
        let total = this.defense;
        if (this.inventory.equipped.armor) {
            total += this.inventory.equipped.armor.defense || 0;
        }
        return total;
    }

    reset() {
        this.level = 1;
        this.xp = 0;
        this.xpToNext = 100;
        this.initializeStats();
        this.initializeInventory();
    }
}