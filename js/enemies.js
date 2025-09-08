class Enemy {
    constructor(type) {
        const enemyData = ENEMY_TYPES[type] || ENEMY_TYPES['goblin'];
        Object.assign(this, enemyData);
        this.type = type;
        this.hp = this.maxHp;
    }

    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - Math.floor(this.defense / 4));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }

    attack() {
        const roll = Math.floor(Math.random() * 20) + 1;
        const damage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
        return {
            roll: roll + this.attackBonus,
            damage: damage,
            critical: roll === 20
        };
    }

    isDead() {
        return this.hp <= 0;
    }

    getLoot() {
        const loot = [];
        
        // Gold drop
        if (Math.random() < this.goldChance) {
            const gold = Math.floor(Math.random() * (this.maxGold - this.minGold + 1)) + this.minGold;
            loot.push({ type: 'gold', amount: gold });
        }
        
        // Item drops
        if (this.drops) {
            for (let drop of this.drops) {
                if (Math.random() < drop.chance) {
                    loot.push({ type: 'item', name: drop.item, quantity: drop.quantity || 1 });
                }
            }
        }
        
        return loot;
    }
}

export const ENEMY_TYPES = {
    // Forest Enemies
    'wolf': {
        name: 'Wolf',
        maxHp: 15,
        attack: 8,
        defense: 6,
        minDamage: 2,
        maxDamage: 6,
        attackBonus: 2,
        xp: 25,
        goldChance: 0.3,
        minGold: 5,
        maxGold: 15,
        description: 'A lean, hungry wolf with sharp fangs.',
        drops: [
            { item: 'wolf_pelt', chance: 0.5 },
            { item: 'wolf_fang', chance: 0.3 }
        ]
    },
    
    'dire_wolf': {
        name: 'Dire Wolf',
        maxHp: 30,
        attack: 12,
        defense: 8,
        minDamage: 4,
        maxDamage: 10,
        attackBonus: 4,
        xp: 50,
        goldChance: 0.4,
        minGold: 10,
        maxGold: 30,
        description: 'A massive wolf, twice the size of a normal one.',
        drops: [
            { item: 'dire_wolf_pelt', chance: 0.6 },
            { item: 'wolf_fang', chance: 0.5, quantity: 2 }
        ]
    },
    
    'goblin': {
        name: 'Goblin',
        maxHp: 10,
        attack: 6,
        defense: 4,
        minDamage: 1,
        maxDamage: 4,
        attackBonus: 1,
        xp: 15,
        goldChance: 0.6,
        minGold: 3,
        maxGold: 12,
        description: 'A small, green creature with a wicked grin.',
        drops: [
            { item: 'rusty_dagger', chance: 0.3 },
            { item: 'goblin_ear', chance: 0.4 }
        ]
    },
    
    'forest_spider': {
        name: 'Forest Spider',
        maxHp: 12,
        attack: 7,
        defense: 5,
        minDamage: 2,
        maxDamage: 5,
        attackBonus: 2,
        xp: 20,
        goldChance: 0.2,
        minGold: 2,
        maxGold: 8,
        description: 'A large spider with hairy legs and multiple eyes.',
        drops: [
            { item: 'spider_silk', chance: 0.7 },
            { item: 'spider_venom', chance: 0.3 }
        ]
    },
    
    'giant_spider': {
        name: 'Giant Spider',
        maxHp: 25,
        attack: 10,
        defense: 7,
        minDamage: 3,
        maxDamage: 8,
        attackBonus: 3,
        xp: 40,
        goldChance: 0.3,
        minGold: 5,
        maxGold: 20,
        description: 'An enormous spider the size of a horse.',
        drops: [
            { item: 'spider_silk', chance: 0.9, quantity: 3 },
            { item: 'spider_venom', chance: 0.5 },
            { item: 'spider_eye', chance: 0.4 }
        ]
    },
    
    'spider_swarm': {
        name: 'Spider Swarm',
        maxHp: 8,
        attack: 5,
        defense: 3,
        minDamage: 1,
        maxDamage: 3,
        attackBonus: 0,
        xp: 10,
        goldChance: 0.1,
        minGold: 1,
        maxGold: 5,
        description: 'Dozens of tiny spiders moving as one.',
        drops: [
            { item: 'spider_silk', chance: 0.5 }
        ]
    },
    
    // Undead Enemies
    'skeleton': {
        name: 'Skeleton',
        maxHp: 18,
        attack: 8,
        defense: 6,
        minDamage: 2,
        maxDamage: 6,
        attackBonus: 2,
        xp: 30,
        goldChance: 0.4,
        minGold: 5,
        maxGold: 25,
        description: 'An animated skeleton wielding a rusty sword.',
        drops: [
            { item: 'old_bone', chance: 0.8 },
            { item: 'rusty_sword', chance: 0.3 }
        ]
    },
    
    'skeleton_warrior': {
        name: 'Skeleton Warrior',
        maxHp: 35,
        attack: 12,
        defense: 10,
        minDamage: 4,
        maxDamage: 10,
        attackBonus: 4,
        xp: 60,
        goldChance: 0.5,
        minGold: 15,
        maxGold: 50,
        description: 'An ancient warrior skeleton in rusted armor.',
        drops: [
            { item: 'warrior_bone', chance: 0.6 },
            { item: 'ancient_sword', chance: 0.3 },
            { item: 'rusted_armor', chance: 0.4 }
        ]
    },
    
    'zombie': {
        name: 'Zombie',
        maxHp: 22,
        attack: 6,
        defense: 4,
        minDamage: 3,
        maxDamage: 7,
        attackBonus: 1,
        xp: 25,
        goldChance: 0.3,
        minGold: 3,
        maxGold: 15,
        description: 'A shambling corpse with rotting flesh.',
        drops: [
            { item: 'rotten_flesh', chance: 0.7 },
            { item: 'zombie_brain', chance: 0.2 }
        ]
    },
    
    'wraith': {
        name: 'Wraith',
        maxHp: 28,
        attack: 11,
        defense: 8,
        minDamage: 3,
        maxDamage: 9,
        attackBonus: 3,
        xp: 50,
        goldChance: 0.5,
        minGold: 10,
        maxGold: 40,
        description: 'A ghostly figure shrouded in darkness.',
        drops: [
            { item: 'ectoplasm', chance: 0.6 },
            { item: 'soul_gem', chance: 0.2 }
        ]
    },
    
    // Bandits and Humanoids
    'bandit': {
        name: 'Bandit',
        maxHp: 20,
        attack: 9,
        defense: 7,
        minDamage: 2,
        maxDamage: 7,
        attackBonus: 2,
        xp: 35,
        goldChance: 0.8,
        minGold: 10,
        maxGold: 35,
        description: 'A rough-looking outlaw with a crude weapon.',
        drops: [
            { item: 'leather_armor', chance: 0.3 },
            { item: 'bandit_mask', chance: 0.4 },
            { item: 'health_potion', chance: 0.3 }
        ]
    },
    
    'highway_robber': {
        name: 'Highway Robber',
        maxHp: 25,
        attack: 10,
        defense: 8,
        minDamage: 3,
        maxDamage: 8,
        attackBonus: 3,
        xp: 45,
        goldChance: 0.9,
        minGold: 15,
        maxGold: 50,
        description: 'A skilled thief who preys on travelers.',
        drops: [
            { item: 'steel_dagger', chance: 0.4 },
            { item: 'lockpick', chance: 0.5 },
            { item: 'smoke_bomb', chance: 0.3 }
        ]
    },
    
    // Special Enemies
    'bridge_troll': {
        name: 'Bridge Troll',
        maxHp: 50,
        attack: 14,
        defense: 12,
        minDamage: 5,
        maxDamage: 12,
        attackBonus: 5,
        xp: 100,
        goldChance: 0.9,
        minGold: 30,
        maxGold: 100,
        description: 'A massive, ugly troll demanding a toll.',
        drops: [
            { item: 'troll_club', chance: 0.5 },
            { item: 'troll_hide', chance: 0.6 },
            { item: 'gold_tooth', chance: 0.7 }
        ]
    },
    
    'crystal_golem': {
        name: 'Crystal Golem',
        maxHp: 40,
        attack: 11,
        defense: 14,
        minDamage: 4,
        maxDamage: 10,
        attackBonus: 3,
        xp: 80,
        goldChance: 0.4,
        minGold: 20,
        maxGold: 60,
        description: 'A magical construct made of living crystal.',
        drops: [
            { item: 'crystal_shard', chance: 0.8, quantity: 2 },
            { item: 'magic_crystal', chance: 0.3 },
            { item: 'golem_core', chance: 0.2 }
        ]
    },
    
    // Weaker Enemies
    'river_slime': {
        name: 'River Slime',
        maxHp: 8,
        attack: 4,
        defense: 2,
        minDamage: 1,
        maxDamage: 3,
        attackBonus: 0,
        xp: 10,
        goldChance: 0.2,
        minGold: 1,
        maxGold: 5,
        description: 'A gelatinous blob that lives near water.',
        drops: [
            { item: 'slime_gel', chance: 0.9 }
        ]
    },
    
    'cave_bat': {
        name: 'Cave Bat',
        maxHp: 6,
        attack: 5,
        defense: 8,
        minDamage: 1,
        maxDamage: 2,
        attackBonus: 1,
        xp: 8,
        goldChance: 0.1,
        minGold: 1,
        maxGold: 3,
        description: 'A small flying creature with sharp teeth.',
        drops: [
            { item: 'bat_wing', chance: 0.6 }
        ]
    },
    
    'wild_dog': {
        name: 'Wild Dog',
        maxHp: 10,
        attack: 6,
        defense: 5,
        minDamage: 1,
        maxDamage: 4,
        attackBonus: 1,
        xp: 12,
        goldChance: 0.2,
        minGold: 2,
        maxGold: 8,
        description: 'A feral dog with matted fur.',
        drops: [
            { item: 'dog_hide', chance: 0.4 }
        ]
    },
    
    'vulture': {
        name: 'Vulture',
        maxHp: 12,
        attack: 7,
        defense: 6,
        minDamage: 2,
        maxDamage: 5,
        attackBonus: 2,
        xp: 18,
        goldChance: 0.1,
        minGold: 1,
        maxGold: 6,
        description: 'A scavenging bird with a hooked beak.',
        drops: [
            { item: 'vulture_feather', chance: 0.5 },
            { item: 'bird_meat', chance: 0.4 }
        ]
    },
    
    'sand_scorpion': {
        name: 'Sand Scorpion',
        maxHp: 14,
        attack: 8,
        defense: 7,
        minDamage: 2,
        maxDamage: 6,
        attackBonus: 2,
        xp: 22,
        goldChance: 0.2,
        minGold: 3,
        maxGold: 12,
        description: 'A venomous scorpion with a deadly stinger.',
        drops: [
            { item: 'scorpion_stinger', chance: 0.5 },
            { item: 'scorpion_venom', chance: 0.3 }
        ]
    }
};

export function spawnEnemy(type) {
    const enemyData = ENEMY_TYPES[type] || ENEMY_TYPES['goblin'];
    const enemy = {
        ...enemyData,
        type: type,
        hp: enemyData.maxHp,
        
        takeDamage(amount) {
            const actualDamage = Math.max(1, amount - Math.floor(this.defense / 4));
            this.hp = Math.max(0, this.hp - actualDamage);
            return actualDamage;
        },
        
        attack() {
            const roll = Math.floor(Math.random() * 20) + 1;
            const damage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
            return {
                roll: roll + this.attackBonus,
                damage: damage,
                critical: roll === 20
            };
        },
        
        isDead() {
            return this.hp <= 0;
        },
        
        getLoot() {
            const loot = [];
            
            // Gold drop
            if (Math.random() < this.goldChance) {
                const gold = Math.floor(Math.random() * (this.maxGold - this.minGold + 1)) + this.minGold;
                loot.push({ type: 'gold', amount: gold });
            }
            
            // Item drops
            if (this.drops) {
                for (let drop of this.drops) {
                    if (Math.random() < drop.chance) {
                        loot.push({ type: 'item', name: drop.item, quantity: drop.quantity || 1 });
                    }
                }
            }
            
            return loot;
        }
    };
    
    return enemy;
}