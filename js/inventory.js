import { Item, ITEM_TYPES } from './items.js';

export class Inventory {
    constructor(player) {
        this.player = player;
        this.items = [];
        this.maxWeight = 100;
        this.equipped = {
            weapon: null,
            armor: null,
            accessory: null
        };
    }

    addItem(itemId, quantity = 1) {
        const itemData = ITEM_TYPES[itemId];
        if (!itemData) {
            return { success: false, message: `Unknown item: ${itemId}` };
        }

        // Check if item is stackable and already exists
        if (itemData.stackable) {
            const existingItem = this.items.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
                return { success: true, message: `Added ${quantity}x ${itemData.name} to inventory.` };
            }
        }

        // Add new item
        try {
            const newItem = new Item(itemId, quantity);
            this.items.push(newItem);
            return { success: true, message: `Added ${newItem.getDisplayName()} to inventory.` };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    removeItem(itemId, quantity = 1) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            return { success: false, message: 'Item not found in inventory.' };
        }

        const item = this.items[itemIndex];
        
        if (item.quantity > quantity) {
            item.quantity -= quantity;
            return { success: true, message: `Removed ${quantity}x ${item.name}.` };
        } else if (item.quantity === quantity) {
            this.items.splice(itemIndex, 1);
            return { success: true, message: `Removed ${item.getDisplayName()}.` };
        } else {
            return { success: false, message: `You only have ${item.quantity}x ${item.name}.` };
        }
    }

    useItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) {
            return { success: false, message: 'Item not found in inventory.' };
        }

        if (!item.isConsumable()) {
            return { success: false, message: `${item.name} cannot be used.` };
        }

        let message = '';
        let success = true;

        switch (item.effect) {
            case 'heal':
                const healAmount = this.player.heal(item.amount);
                message = `You use ${item.name} and restore ${healAmount} HP.`;
                break;
                
            case 'mana':
                const manaAmount = this.player.restoreMp(item.amount);
                message = `You use ${item.name} and restore ${manaAmount} MP.`;
                break;
                
            case 'full_heal':
                this.player.hp = this.player.maxHp;
                this.player.mp = this.player.maxMp;
                message = `You use ${item.name}. HP and MP fully restored!`;
                break;
                
            case 'max_mana':
                this.player.maxMp += 5;
                this.player.mp += 5;
                message = `You use ${item.name}. Max MP increased by 5!`;
                break;
                
            case 'boost':
                message = `You eat the ${item.name}. You feel stronger! (Stats temporarily boosted)`;
                // Temporary boost would need a buff system
                break;
                
            case 'escape':
                if (this.player.game && this.player.game.isInCombat()) {
                    message = `You use ${item.name} and escape from combat!`;
                    // Combat escape would be handled by combat system
                } else {
                    message = `You use ${item.name} but you're not in combat.`;
                    success = false;
                }
                break;
                
            case 'damage_undead':
                message = `You need to be in combat with undead to use ${item.name}.`;
                success = false;
                break;
                
            case 'random':
                const effects = ['heal', 'damage', 'boost', 'poison'];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                
                switch(randomEffect) {
                    case 'heal':
                        const randomHeal = Math.floor(Math.random() * 20) + 5;
                        this.player.heal(randomHeal);
                        message = `The mushroom heals you for ${randomHeal} HP!`;
                        break;
                    case 'damage':
                        const randomDamage = Math.floor(Math.random() * 10) + 1;
                        this.player.takeDamage(randomDamage);
                        message = `The mushroom was poisonous! You take ${randomDamage} damage!`;
                        break;
                    case 'boost':
                        message = 'The mushroom makes you feel stronger!';
                        break;
                    case 'poison':
                        message = 'The mushroom makes you feel sick...';
                        break;
                }
                break;
                
            case 'spell':
                message = `You read the ${item.name}. A spell is cast!`;
                // Spell effects would be implemented later
                break;
                
            default:
                message = `You use ${item.name}.`;
        }

        if (success) {
            this.removeItem(itemId, 1);
        }

        return { success, message };
    }

    equipItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) {
            return { success: false, message: 'Item not found in inventory.' };
        }

        if (!item.isEquippable()) {
            return { success: false, message: `${item.name} cannot be equipped.` };
        }

        const slot = item.slot;
        
        // Unequip current item if any
        if (this.equipped[slot]) {
            this.equipped[slot].equipped = false;
        }

        // Equip new item
        this.equipped[slot] = item;
        item.equipped = true;

        // Update player stats
        this.updatePlayerStats();

        return { success: true, message: `Equipped ${item.name}.` };
    }

    unequipItem(slot) {
        if (!this.equipped[slot]) {
            return { success: false, message: `No item equipped in ${slot} slot.` };
        }

        const item = this.equipped[slot];
        item.equipped = false;
        this.equipped[slot] = null;

        // Update player stats
        this.updatePlayerStats();

        return { success: true, message: `Unequipped ${item.name}.` };
    }

    updatePlayerStats() {
        // Reset to base stats
        this.player.attack = 10 + Math.floor(this.player.str / 2);
        this.player.defense = 10 + Math.floor(this.player.dex / 2);

        // Apply equipment bonuses
        for (let slot in this.equipped) {
            const item = this.equipped[slot];
            if (item) {
                if (item.attack) this.player.attack += item.attack;
                if (item.defense) this.player.defense += item.defense;
                if (item.magicPower) this.player.magicPower = (this.player.magicPower || 0) + item.magicPower;
                if (item.speed) this.player.speed = (this.player.speed || 0) + item.speed;
                if (item.stealth) this.player.stealth = (this.player.stealth || 0) + item.stealth;
            }
        }
    }

    dropItem(itemId, quantity = 1) {
        const result = this.removeItem(itemId, quantity);
        if (result.success) {
            // Add item to current location
            const location = this.player.game.getCurrentLocation();
            if (location) {
                if (!location.items) location.items = [];
                location.items.push(itemId);
            }
            return { success: true, message: `Dropped ${result.message}` };
        }
        return result;
    }

    pickupItem(itemId) {
        const location = this.player.game.getCurrentLocation();
        if (!location || !location.items) {
            return { success: false, message: 'No items here to pick up.' };
        }

        const itemIndex = location.items.indexOf(itemId);
        if (itemIndex === -1) {
            return { success: false, message: `No ${itemId} found here.` };
        }

        // Remove from location
        location.items.splice(itemIndex, 1);
        
        // Add to inventory
        return this.addItem(itemId);
    }

    getInventoryDisplay() {
        if (this.items.length === 0) {
            return 'Your inventory is empty.';
        }

        let output = 'INVENTORY:\n';
        output += '═══════════════════════════════════════════════════\n';
        
        // Group items by type
        const weapons = this.items.filter(i => i.type === 'weapon');
        const armor = this.items.filter(i => i.type === 'armor');
        const consumables = this.items.filter(i => i.type === 'consumable');
        const materials = this.items.filter(i => i.type === 'material');
        const other = this.items.filter(i => !['weapon', 'armor', 'consumable', 'material'].includes(i.type));

        if (weapons.length > 0) {
            output += '\nWeapons:\n';
            weapons.forEach(item => {
                output += `  ${item.getDisplayName()}${item.equipped ? ' [EQUIPPED]' : ''} - ATK: +${item.attack || 0}\n`;
            });
        }

        if (armor.length > 0) {
            output += '\nArmor:\n';
            armor.forEach(item => {
                output += `  ${item.getDisplayName()}${item.equipped ? ' [EQUIPPED]' : ''} - DEF: +${item.defense || 0}\n`;
            });
        }

        if (consumables.length > 0) {
            output += '\nConsumables:\n';
            consumables.forEach(item => {
                output += `  ${item.getDisplayName()} - ${item.description}\n`;
            });
        }

        if (materials.length > 0) {
            output += '\nMaterials:\n';
            materials.forEach(item => {
                output += `  ${item.getDisplayName()} - Value: ${item.value}g\n`;
            });
        }

        if (other.length > 0) {
            output += '\nOther:\n';
            other.forEach(item => {
                output += `  ${item.getDisplayName()}\n`;
            });
        }

        output += `\nGold: ${this.player.gold}`;

        return output;
    }

    findItemByName(name) {
        name = name.toLowerCase();
        
        // First try exact match
        let item = this.items.find(i => i.name.toLowerCase() === name);
        if (item) return item;
        
        // Then try ID match
        item = this.items.find(i => i.id === name.replace(/ /g, '_'));
        if (item) return item;
        
        // Finally try partial match
        item = this.items.find(i => i.name.toLowerCase().includes(name));
        return item;
    }
}