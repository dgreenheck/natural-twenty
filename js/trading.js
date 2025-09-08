import { NPC } from './npcs.js';
import { ITEM_TYPES } from './items.js';

export class Trading {
    constructor(game, ui) {
        this.game = game;
        this.ui = ui;
        this.currentMerchant = null;
        this.activeNPCs = new Map();
    }
    
    initializeNPC(npcId) {
        if (!this.activeNPCs.has(npcId)) {
            this.activeNPCs.set(npcId, new NPC(npcId));
        }
        return this.activeNPCs.get(npcId);
    }
    
    talkToNPC(npcId, topic = 'greeting') {
        const npc = this.initializeNPC(npcId);
        
        // Build colored output
        this.ui.addOutput(npc.name + ':', 'npc-name');
        this.ui.addOutput(`"${npc.talk(topic)}"`, 'dialogue');
        
        if (topic === 'greeting') {
            if (npc.canTrade()) {
                this.ui.addOutput('\n[You can TRADE with this NPC or ask about specific topics]', 'option');
            } else {
                this.ui.addOutput('\n[You can ask about specific topics]', 'option');
            }
            
            // Show available topics
            const topics = Object.keys(npc.dialogue.responses);
            if (topics.length > 0) {
                const topicList = topics.slice(0, 4).map(t => 
                    `<span class="option-text">${t}</span>`
                ).join(', ');
                this.ui.addOutput(`Try asking about: ${topicList}...`, '', true);
            }
        }
        
        // Special actions based on NPC
        if (npc.id === 'priest' && topic === 'heal') {
            const healed = this.game.player.heal(20);
            this.ui.addOutput(`\n✨ You have been healed for ${healed} HP!`, 'heal');
        } else if (npc.id === 'priest' && topic === 'blessing') {
            this.ui.addOutput('\n✨ You feel blessed! (+1 to all rolls for 10 turns)', 'holy');
            this.game.player.blessed = 10;
        }
        
        return ''; // Return empty since we're directly adding to UI
    }
    
    startTrading(npcId) {
        const npc = this.initializeNPC(npcId);
        
        if (!npc.canTrade()) {
            return `${npc.name} is not a merchant.`;
        }
        
        this.currentMerchant = npc;
        
        let output = `\n${npc.shop.specialDialogue.welcome}\n`;
        output += this.displayShop();
        output += '\n\nCommands: buy [item] [qty], sell [item] [qty], exit';
        
        return output;
    }
    
    displayShop() {
        if (!this.currentMerchant) return 'No shop open.';
        
        let output = `\n═══ ${this.currentMerchant.shop.name} ═══\n`;
        output += `Merchant's Gold: ${this.currentMerchant.shop.gold}\n`;
        output += `Your Gold: ${this.game.player.gold}\n\n`;
        
        output += 'FOR SALE:\n';
        output += '─────────────────────────────────────\n';
        
        if (this.currentMerchant.shop.inventory.length === 0) {
            output += '  (No items for sale)\n';
        } else {
            this.currentMerchant.shop.inventory.forEach(item => {
                const itemData = ITEM_TYPES[item.id];
                if (itemData) {
                    output += `  ${itemData.name.padEnd(20)} x${String(item.quantity).padEnd(3)} - ${item.price}g each\n`;
                    if (itemData.description) {
                        output += `    ${itemData.description}\n`;
                    }
                }
            });
        }
        
        output += '\nYOUR ITEMS (Sell Price):\n';
        output += '─────────────────────────────────────\n';
        
        const playerItems = this.game.player.inventory.items;
        if (playerItems.length === 0) {
            output += '  (No items to sell)\n';
        } else {
            playerItems.forEach(item => {
                if (!item.equipped && item.type !== 'quest') {
                    const sellPrice = Math.floor((item.value || 10) * this.currentMerchant.shop.buyMultiplier);
                    const qty = item.quantity || 1;
                    output += `  ${item.name.padEnd(20)} x${String(qty).padEnd(3)} - ${sellPrice}g each\n`;
                }
            });
        }
        
        return output;
    }
    
    buyItem(itemName, quantity = 1) {
        if (!this.currentMerchant) {
            return 'You are not trading with anyone.';
        }
        
        // Find item in merchant's inventory
        const shopItem = this.currentMerchant.shop.inventory.find(item => {
            const itemData = ITEM_TYPES[item.id];
            return itemData && (
                itemData.name.toLowerCase() === itemName.toLowerCase() ||
                item.id === itemName.toLowerCase().replace(/ /g, '_')
            );
        });
        
        if (!shopItem) {
            return `The merchant doesn't have "${itemName}".`;
        }
        
        const itemData = ITEM_TYPES[shopItem.id];
        const result = this.currentMerchant.sellToPlayer(shopItem.id, quantity);
        
        if (!result.success) {
            return result.message;
        }
        
        if (this.game.player.gold < result.price) {
            return this.currentMerchant.shop.specialDialogue.poor;
        }
        
        // Complete the transaction
        this.game.player.gold -= result.price;
        this.game.player.inventory.addItem(shopItem.id, quantity);
        this.currentMerchant.completePurchase(shopItem.id, quantity);
        
        return `${this.currentMerchant.shop.specialDialogue.purchase}\nYou bought ${quantity}x ${itemData.name} for ${result.price} gold.`;
    }
    
    sellItem(itemName, quantity = 1) {
        if (!this.currentMerchant) {
            return 'You are not trading with anyone.';
        }
        
        // Find item in player's inventory
        const playerItem = this.game.player.inventory.findItemByName(itemName);
        
        if (!playerItem) {
            return `You don't have "${itemName}".`;
        }
        
        if (playerItem.equipped) {
            return 'You cannot sell equipped items. Unequip it first.';
        }
        
        if (playerItem.type === 'quest') {
            return 'You cannot sell quest items.';
        }
        
        if ((playerItem.quantity || 1) < quantity) {
            return `You only have ${playerItem.quantity || 1}x ${playerItem.name}.`;
        }
        
        const result = this.currentMerchant.buyFromPlayer(playerItem, quantity, this.game.player.gold);
        
        if (!result.success) {
            return result.message;
        }
        
        // Complete the transaction
        this.game.player.inventory.removeItem(playerItem.id, quantity);
        this.game.player.gold += result.goldEarned;
        
        return `${result.message}\nYou sold ${quantity}x ${playerItem.name} for ${result.goldEarned} gold.`;
    }
    
    exitTrading() {
        if (!this.currentMerchant) {
            return 'You are not trading with anyone.';
        }
        
        const farewell = this.currentMerchant.shop.specialDialogue.farewell;
        this.currentMerchant = null;
        return farewell;
    }
    
    isTrading() {
        return this.currentMerchant !== null;
    }
    
    listNPCsInLocation(locationId) {
        const location = this.game.getLocation(locationId);
        if (!location || !location.npcs || location.npcs.length === 0) {
            return [];
        }
        
        return location.npcs.map(npcId => {
            const npc = this.initializeNPC(npcId);
            return {
                id: npcId,
                name: npc.name,
                description: npc.description,
                canTrade: npc.canTrade()
            };
        });
    }
}