export const ITEM_TYPES = {
    // Weapons
    'rusty_sword': {
        name: 'Rusty Sword',
        type: 'weapon',
        slot: 'weapon',
        attack: 2,
        value: 10,
        description: 'An old sword covered in rust.'
    },
    
    'iron_sword': {
        name: 'Iron Sword',
        type: 'weapon',
        slot: 'weapon',
        attack: 4,
        value: 50,
        description: 'A sturdy iron sword.'
    },
    
    'steel_sword': {
        name: 'Steel Sword',
        type: 'weapon',
        slot: 'weapon',
        attack: 6,
        value: 150,
        description: 'A well-crafted steel blade.'
    },
    
    'ancient_sword': {
        name: 'Ancient Sword',
        type: 'weapon',
        slot: 'weapon',
        attack: 8,
        magical: true,
        value: 500,
        description: 'An ancient blade that glows with inner light.'
    },
    
    'dagger': {
        name: 'Dagger',
        type: 'weapon',
        slot: 'weapon',
        attack: 2,
        speed: 2,
        value: 20,
        description: 'A small, swift blade.'
    },
    
    'steel_dagger': {
        name: 'Steel Dagger',
        type: 'weapon',
        slot: 'weapon',
        attack: 3,
        speed: 3,
        value: 75,
        description: 'A sharp steel dagger.'
    },
    
    'wooden_staff': {
        name: 'Wooden Staff',
        type: 'weapon',
        slot: 'weapon',
        attack: 1,
        magicPower: 3,
        value: 30,
        description: 'A simple wooden staff that channels magic.'
    },
    
    'troll_club': {
        name: 'Troll Club',
        type: 'weapon',
        slot: 'weapon',
        attack: 7,
        speed: -2,
        value: 80,
        description: 'A massive, crude club.'
    },
    
    // Armor
    'cloth_armor': {
        name: 'Cloth Armor',
        type: 'armor',
        slot: 'armor',
        defense: 1,
        value: 15,
        description: 'Simple cloth robes.'
    },
    
    'leather_armor': {
        name: 'Leather Armor',
        type: 'armor',
        slot: 'armor',
        defense: 3,
        value: 40,
        description: 'Sturdy leather armor.'
    },
    
    'chain_mail': {
        name: 'Chain Mail',
        type: 'armor',
        slot: 'armor',
        defense: 5,
        value: 120,
        description: 'Interlocking metal rings provide good protection.'
    },
    
    'rusted_armor': {
        name: 'Rusted Armor',
        type: 'armor',
        slot: 'armor',
        defense: 2,
        value: 25,
        description: 'Old armor covered in rust.'
    },
    
    'plate_armor': {
        name: 'Plate Armor',
        type: 'armor',
        slot: 'armor',
        defense: 8,
        speed: -2,
        value: 300,
        description: 'Heavy but extremely protective armor.'
    },
    
    // Consumables
    'health_potion': {
        name: 'Health Potion',
        type: 'consumable',
        effect: 'heal',
        value: 30,
        amount: 20,
        stackable: true,
        description: 'Restores 20 HP when consumed.'
    },
    
    'greater_health_potion': {
        name: 'Greater Health Potion',
        type: 'consumable',
        effect: 'heal',
        value: 50,
        amount: 50,
        stackable: true,
        description: 'Restores 50 HP when consumed.'
    },
    
    'mana_potion': {
        name: 'Mana Potion',
        type: 'consumable',
        effect: 'mana',
        value: 20,
        amount: 20,
        stackable: true,
        description: 'Restores 20 MP when consumed.'
    },
    
    'bread': {
        name: 'Bread',
        type: 'consumable',
        effect: 'heal',
        value: 5,
        amount: 5,
        stackable: true,
        description: 'Simple bread that restores 5 HP.'
    },
    
    'apple': {
        name: 'Apple',
        type: 'consumable',
        effect: 'heal',
        value: 3,
        amount: 3,
        stackable: true,
        description: 'A fresh apple that restores 3 HP.'
    },
    
    'mushroom': {
        name: 'Mushroom',
        type: 'consumable',
        effect: 'random',
        value: 10,
        stackable: true,
        description: 'A strange mushroom with unknown effects.'
    },
    
    'rare_mushroom': {
        name: 'Rare Mushroom',
        type: 'consumable',
        effect: 'boost',
        value: 50,
        stackable: true,
        description: 'A rare mushroom that temporarily boosts stats.'
    },
    
    'smoke_bomb': {
        name: 'Smoke Bomb',
        type: 'consumable',
        effect: 'escape',
        value: 25,
        stackable: true,
        description: 'Allows guaranteed escape from combat.'
    },
    
    'holy_water': {
        name: 'Holy Water',
        type: 'consumable',
        effect: 'damage_undead',
        value: 30,
        amount: 25,
        stackable: true,
        description: 'Deals 25 damage to undead enemies.'
    },
    
    // Quest Items
    'ancient_scroll': {
        name: 'Ancient Scroll',
        type: 'quest',
        value: 0,
        description: 'An ancient scroll with mysterious writing.'
    },
    
    'crystal_shard': {
        name: 'Crystal Shard',
        type: 'material',
        value: 75,
        stackable: true,
        description: 'A glowing crystal fragment.'
    },
    
    'magic_crystal': {
        name: 'Magic Crystal',
        type: 'material',
        value: 200,
        stackable: true,
        description: 'A crystal pulsing with magical energy.'
    },
    
    'golem_core': {
        name: 'Golem Core',
        type: 'material',
        value: 300,
        description: 'The magical core of a golem.'
    },
    
    // Materials and Loot
    'wolf_pelt': {
        name: 'Wolf Pelt',
        type: 'material',
        value: 15,
        stackable: true,
        description: 'A wolf\'s fur pelt.'
    },
    
    'dire_wolf_pelt': {
        name: 'Dire Wolf Pelt',
        type: 'material',
        value: 35,
        stackable: true,
        description: 'A thick pelt from a dire wolf.'
    },
    
    'wolf_fang': {
        name: 'Wolf Fang',
        type: 'material',
        value: 8,
        stackable: true,
        description: 'A sharp wolf fang.'
    },
    
    'spider_silk': {
        name: 'Spider Silk',
        type: 'material',
        value: 12,
        stackable: true,
        description: 'Strong silk from a giant spider.'
    },
    
    'spider_venom': {
        name: 'Spider Venom',
        type: 'material',
        value: 25,
        stackable: true,
        description: 'Poisonous venom from a spider.'
    },
    
    'spider_eye': {
        name: 'Spider Eye',
        type: 'material',
        value: 20,
        stackable: true,
        description: 'A large spider eye.'
    },
    
    'goblin_ear': {
        name: 'Goblin Ear',
        type: 'material',
        value: 5,
        stackable: true,
        description: 'Proof of defeating a goblin.'
    },
    
    'old_bone': {
        name: 'Old Bone',
        type: 'material',
        value: 3,
        stackable: true,
        description: 'An ancient bone.'
    },
    
    'warrior_bone': {
        name: 'Warrior Bone',
        type: 'material',
        value: 15,
        stackable: true,
        description: 'Bone from an ancient warrior.'
    },
    
    'ectoplasm': {
        name: 'Ectoplasm',
        type: 'material',
        value: 30,
        stackable: true,
        description: 'Ghostly residue from a wraith.'
    },
    
    'soul_gem': {
        name: 'Soul Gem',
        type: 'material',
        value: 100,
        description: 'A gem containing trapped souls.'
    },
    
    'troll_hide': {
        name: 'Troll Hide',
        type: 'material',
        value: 50,
        stackable: true,
        description: 'Thick hide from a troll.'
    },
    
    'gold_tooth': {
        name: 'Gold Tooth',
        type: 'valuable',
        value: 40,
        stackable: true,
        description: 'A golden tooth.'
    },
    
    'gold_chalice': {
        name: 'Gold Chalice',
        type: 'valuable',
        value: 150,
        description: 'An ornate golden chalice.'
    },
    
    'treasure_chest': {
        name: 'Treasure Chest',
        type: 'container',
        value: 0,
        description: 'A locked treasure chest. Use to open.'
    },
    
    'lockpick': {
        name: 'Lockpick',
        type: 'tool',
        value: 10,
        stackable: true,
        description: 'Used to open locked doors and chests.'
    },
    
    'fishing_rod': {
        name: 'Fishing Rod',
        type: 'tool',
        value: 20,
        description: 'Can be used to catch fish.'
    },
    
    'journal': {
        name: 'Journal',
        type: 'readable',
        value: 5,
        description: 'Someone\'s personal journal.'
    },
    
    'spell_scroll': {
        name: 'Spell Scroll',
        type: 'consumable',
        effect: 'spell',
        value: 75,
        description: 'A scroll containing a magical spell.'
    },
    
    'mana_crystal': {
        name: 'Mana Crystal',
        type: 'consumable',
        effect: 'max_mana',
        value: 200,
        description: 'Permanently increases max MP by 5.'
    },
    
    'ancient_bark': {
        name: 'Ancient Bark',
        type: 'material',
        value: 40,
        stackable: true,
        description: 'Bark from the ancient tree.'
    },
    
    'spring_water': {
        name: 'Spring Water',
        type: 'consumable',
        effect: 'full_heal',
        value: 100,
        description: 'Magical water that fully restores HP and MP.'
    },
    
    'rainbow_gem': {
        name: 'Rainbow Gem',
        type: 'valuable',
        value: 500,
        description: 'A beautiful gem that shimmers with all colors.'
    },
    
    'bandit_mask': {
        name: 'Bandit Mask',
        type: 'equipment',
        slot: 'accessory',
        stealth: 2,
        value: 25,
        description: 'A mask that helps you blend into shadows.'
    },
    
    'river_stone': {
        name: 'River Stone',
        type: 'material',
        value: 2,
        stackable: true,
        description: 'A smooth stone from the river.'
    },
    
    'herb': {
        name: 'Herb',
        type: 'material',
        value: 8,
        stackable: true,
        description: 'A medicinal herb.'
    },
    
    'rotten_flesh': {
        name: 'Rotten Flesh',
        type: 'material',
        value: 1,
        stackable: true,
        description: 'Disgusting rotted flesh.'
    },
    
    'zombie_brain': {
        name: 'Zombie Brain',
        type: 'material',
        value: 20,
        stackable: true,
        description: 'A preserved zombie brain.'
    },
    
    'slime_gel': {
        name: 'Slime Gel',
        type: 'material',
        value: 5,
        stackable: true,
        description: 'Sticky gel from a slime.'
    },
    
    'bat_wing': {
        name: 'Bat Wing',
        type: 'material',
        value: 4,
        stackable: true,
        description: 'A leathery bat wing.'
    },
    
    'dog_hide': {
        name: 'Dog Hide',
        type: 'material',
        value: 7,
        stackable: true,
        description: 'Hide from a wild dog.'
    },
    
    'vulture_feather': {
        name: 'Vulture Feather',
        type: 'material',
        value: 3,
        stackable: true,
        description: 'A large vulture feather.'
    },
    
    'bird_meat': {
        name: 'Bird Meat',
        type: 'consumable',
        effect: 'heal',
        value: 8,
        amount: 8,
        stackable: true,
        description: 'Raw bird meat. Restores 8 HP.'
    },
    
    'scorpion_stinger': {
        name: 'Scorpion Stinger',
        type: 'material',
        value: 18,
        stackable: true,
        description: 'A venomous scorpion stinger.'
    },
    
    'scorpion_venom': {
        name: 'Scorpion Venom',
        type: 'material',
        value: 28,
        stackable: true,
        description: 'Deadly scorpion venom.'
    },
    
    'gold_pouch': {
        name: 'Gold Pouch',
        type: 'container',
        value: 0,
        description: 'A small pouch. Use to open.'
    },
    
    // Additional items for trading
    'rope': {
        name: 'Rope',
        type: 'tool',
        value: 10,
        stackable: true,
        description: '50 feet of sturdy rope.'
    },
    
    'torch': {
        name: 'Torch',
        type: 'tool',
        value: 5,
        stackable: true,
        description: 'Provides light in dark places.'
    },
    
    'antidote': {
        name: 'Antidote',
        type: 'consumable',
        effect: 'cure_poison',
        value: 25,
        stackable: true,
        description: 'Cures poison effects.'
    },
    
    'blessing_scroll': {
        name: 'Blessing Scroll',
        type: 'consumable',
        effect: 'blessing',
        value: 100,
        description: 'Grants divine blessing when read.'
    },
    
    'strength_potion': {
        name: 'Strength Potion',
        type: 'consumable',
        effect: 'buff_str',
        value: 80,
        stackable: true,
        description: 'Temporarily increases strength.'
    },
    
    'speed_potion': {
        name: 'Speed Potion',
        type: 'consumable',
        effect: 'buff_dex',
        value: 80,
        stackable: true,
        description: 'Temporarily increases dexterity.'
    },
    
    'fish': {
        name: 'Fish',
        type: 'consumable',
        effect: 'heal',
        value: 8,
        amount: 10,
        stackable: true,
        description: 'Fresh fish. Restores 10 HP.'
    },
    
    'cooked_fish': {
        name: 'Cooked Fish',
        type: 'consumable',
        effect: 'heal',
        value: 12,
        amount: 15,
        stackable: true,
        description: 'Cooked fish. Restores 15 HP.'
    }
};

export class Item {
    constructor(id, quantity = 1) {
        const itemData = ITEM_TYPES[id];
        if (!itemData) {
            throw new Error(`Unknown item: ${id}`);
        }
        
        this.id = id;
        this.quantity = quantity;
        Object.assign(this, itemData);
    }
    
    isStackable() {
        return this.stackable === true;
    }
    
    isEquippable() {
        return this.type === 'weapon' || this.type === 'armor' || this.type === 'equipment';
    }
    
    isConsumable() {
        return this.type === 'consumable';
    }
    
    getDisplayName() {
        if (this.quantity > 1 && this.isStackable()) {
            return `${this.name} (${this.quantity})`;
        }
        return this.name;
    }
}