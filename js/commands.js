export class CommandParser {
    constructor(game, ui, combat, trading) {
        this.game = game;
        this.ui = ui;
        this.combat = combat;
        this.trading = trading;
        this.commands = this.initializeCommands();
        this.debugCommands = this.initializeDebugCommands();
    }

    initializeCommands() {
        return {
            help: () => this.showHelp(),
            stats: () => this.showStats(),
            clear: () => this.clearScreen(),
            start: () => this.startAdventure(),
            restart: () => this.restartGame(),
            
            north: () => this.move('north'),
            south: () => this.move('south'),
            east: () => this.move('east'),
            west: () => this.move('west'),
            n: () => this.move('north'),
            s: () => this.move('south'),
            e: () => this.move('east'),
            w: () => this.move('west'),
            
            look: () => this.look(),
            map: () => this.showMap(),
            inventory: () => this.showInventory(),
            inv: () => this.showInventory(),
            
            talk: (args) => this.talkToNPC(args),
            speak: (args) => this.talkToNPC(args),
            ask: (args) => this.askNPC(args),
            trade: (npc) => this.tradeWithNPC(npc),
            shop: (npc) => this.tradeWithNPC(npc),
            buy: (args) => this.buyItem(args),
            sell: (args) => this.sellItem(args),
            exit: () => this.exitShop(),
            
            attack: (target) => this.attack(target),
            flee: () => this.flee(),
            run: () => this.flee(),
            use: (item) => this.useItem(item),
            equip: (item) => this.equipItem(item),
            unequip: (item) => this.unequipItem(item),
            drop: (item) => this.dropItem(item),
            take: (item) => this.takeItem(item),
            get: (item) => this.takeItem(item),
        };
    }

    initializeDebugCommands() {
        return {
            '/heal': () => this.debugHeal(),
            '/damage': (amount) => this.debugDamage(amount),
            '/give': (item) => this.debugGiveItem(item),
            '/gold': (amount) => this.debugGiveGold(amount),
            '/teleport': (location) => this.debugTeleport(location),
            '/spawn': (enemy) => this.debugSpawnEnemy(enemy),
            '/reset': () => this.debugReset(),
            '/debug': () => this.toggleDebug(),
        };
    }

    parse(input) {
        const parts = input.toLowerCase().trim().split(' ');
        const command = parts[0];
        const args = parts.slice(1).join(' ');

        if (command.startsWith('/')) {
            if (this.debugCommands[command]) {
                return this.debugCommands[command](args);
            }
            return `Unknown debug command: ${command}`;
        }

        if (this.commands[command]) {
            return this.commands[command](args);
        }

        return `Unknown command: ${command}. Type 'help' for available commands.`;
    }

    showHelp() {
        return `
AVAILABLE COMMANDS:
═══════════════════════════════════════════════════

BASIC:
  help          - Show this help menu
  stats         - View your character stats
  clear         - Clear the screen
  start         - Begin your adventure
  restart       - Restart the game

MOVEMENT:
  north/n       - Move north
  south/s       - Move south
  east/e        - Move east
  west/w        - Move west
  look          - Look around the current area
  map           - Display the area map

NPC INTERACTION:
  talk [npc]    - Talk to an NPC
  ask [topic]   - Ask about a specific topic
  trade [npc]   - Trade with a merchant
  buy [item] [qty] - Buy items from merchant
  sell [item] [qty] - Sell items to merchant
  exit          - Exit trading

INVENTORY:
  inventory/inv - View your inventory
  use [item]    - Use an item
  equip [item]  - Equip a weapon or armor
  unequip [item]- Unequip an item
  drop [item]   - Drop an item
  take/get [item] - Pick up an item

COMBAT:
  attack        - Attack the enemy
  flee/run      - Attempt to flee from combat

DEBUG (Development):
  /heal         - Restore full HP
  /damage [n]   - Take n damage
  /give [item]  - Add item to inventory
  /gold [n]     - Add n gold
  /debug        - Toggle debug mode
`;
    }

    showStats() {
        const player = this.game.player;
        return `
CHARACTER STATS:
═══════════════════════════════════════════════════
Name: ${player.name}
Class: ${player.class}
Level: ${player.level} (XP: ${player.xp}/${player.xpToNext})

HP: ${player.hp}/${player.maxHp}
MP: ${player.mp}/${player.maxMp}

ATTRIBUTES:
  STR: ${player.str} (Strength)
  DEX: ${player.dex} (Dexterity)
  INT: ${player.int} (Intelligence)
  CON: ${player.con} (Constitution)
  WIS: ${player.wis} (Wisdom)
  CHA: ${player.cha} (Charisma)

Combat:
  Attack: ${player.attack}
  Defense: ${player.defense}
  
Gold: ${player.gold}
`;
    }

    clearScreen() {
        this.ui.clearOutput();
        return 'Screen cleared.';
    }

    startAdventure() {
        if (this.game.started) {
            return 'Your adventure has already begun!';
        }
        
        this.game.started = true;
        return `
Your adventure begins...

You find yourself at the entrance of a dark forest.
The path ahead splits in multiple directions.

Type 'look' to examine your surroundings.
`;
    }

    restartGame() {
        this.game.reset();
        this.ui.clearOutput();
        this.ui.updateStatusBar(this.game.player);
        return 'Game restarted. Type "start" to begin a new adventure.';
    }

    move(direction) {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        if (this.game.isInCombat()) {
            return 'You cannot move during combat! Fight or flee!';
        }
        
        const result = this.game.movePlayer(direction);
        if (!result.success) {
            return result.message;
        }
        
        this.ui.addOutput(`\n${result.message}`, 'info');
        this.describeLocation(result.location);
        
        // Check for enemies
        if (result.location.enemies && result.location.enemies.length > 0) {
            const enemyChance = Math.random();
            if (enemyChance < 0.3) {
                const enemyType = result.location.enemies[Math.floor(Math.random() * result.location.enemies.length)];
                return this.combat.startCombat(enemyType);
            }
        }
        
        return '';
    }

    look() {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        const location = this.game.getCurrentLocation();
        if (!location) {
            return 'You are in a void. This shouldn\'t happen!';
        }
        
        this.describeLocation(location);
        return ''; // Return empty since describeLocation outputs directly
    }
    
    describeLocation(location) {
        // Use colored output for better readability
        this.ui.addOutput(`📍 ${location.name}`, 'location');
        this.ui.addOutput(location.description, 'description');
        
        // Show exits with colors
        const exits = Object.keys(location.exits);
        if (exits.length > 0) {
            const exitList = exits.map(e => `<span class="action-text">${e}</span>`).join(', ');
            this.ui.addOutput(`\nExits: ${exitList}`, '', true);
        }
        
        // Show items with colors
        if (location.items && location.items.length > 0) {
            const itemList = location.items.map(i => `<span class="item-name">${i}</span>`).join(', ');
            this.ui.addOutput(`Items here: ${itemList}`, '', true);
        }
        
        // Show NPCs with proper names and colors
        if (location.npcs && location.npcs.length > 0) {
            const npcList = this.trading.listNPCsInLocation(this.game.currentLocation);
            if (npcList.length > 0) {
                const npcHtml = npcList.map(npc => 
                    `<span class="npc-name">${npc.name}</span>${npc.canTrade ? ' <span class="option-text">(merchant)</span>' : ''}`
                ).join(', ');
                this.ui.addOutput(`People here: ${npcHtml}`, '', true);
            }
        }
        
        return ''; // Return empty since we're directly outputting
    }
    
    showMap() {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        return this.game.map.getMapDisplay(this.game.currentLocation);
    }

    showInventory() {
        return this.game.player.inventory.getInventoryDisplay();
    }

    attack(target) {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        if (!this.combat.isInCombat()) {
            return 'There is nothing to attack here.';
        }
        
        return this.combat.playerAttack();
    }
    
    flee() {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        if (!this.combat.isInCombat()) {
            return 'You are not in combat.';
        }
        
        return this.combat.flee();
    }

    useItem(itemName) {
        if (!itemName) {
            return 'Use what? Specify an item name.';
        }
        
        const item = this.game.player.inventory.findItemByName(itemName);
        if (!item) {
            return `You don't have "${itemName}" in your inventory.`;
        }
        
        const result = this.game.player.inventory.useItem(item.id);
        return result.message;
    }

    equipItem(itemName) {
        if (!itemName) {
            return 'Equip what? Specify an item name.';
        }
        
        const item = this.game.player.inventory.findItemByName(itemName);
        if (!item) {
            return `You don't have "${itemName}" in your inventory.`;
        }
        
        const result = this.game.player.inventory.equipItem(item.id);
        return result.message;
    }

    unequipItem(itemName) {
        if (!itemName) {
            return 'Unequip what? Specify an item name or slot (weapon/armor/accessory).';
        }
        
        // Check if it's a slot name
        if (['weapon', 'armor', 'accessory'].includes(itemName.toLowerCase())) {
            const result = this.game.player.inventory.unequipItem(itemName.toLowerCase());
            return result.message;
        }
        
        // Otherwise try to find the item
        const item = this.game.player.inventory.findItemByName(itemName);
        if (!item) {
            return `You don't have "${itemName}" equipped.`;
        }
        
        if (!item.equipped) {
            return `${item.name} is not equipped.`;
        }
        
        const result = this.game.player.inventory.unequipItem(item.slot);
        return result.message;
    }

    dropItem(itemName) {
        if (!itemName) {
            return 'Drop what? Specify an item name.';
        }
        
        const item = this.game.player.inventory.findItemByName(itemName);
        if (!item) {
            return `You don't have "${itemName}" in your inventory.`;
        }
        
        const result = this.game.player.inventory.dropItem(item.id);
        return result.message;
    }

    takeItem(itemName) {
        if (!itemName) {
            return 'Take what? Specify an item name.';
        }
        
        const location = this.game.getCurrentLocation();
        if (!location || !location.items || location.items.length === 0) {
            return 'There are no items here to take.';
        }
        
        // Try to find the item in the location
        const itemId = itemName.toLowerCase().replace(/ /g, '_');
        if (!location.items.includes(itemId)) {
            // Try partial match
            const found = location.items.find(id => id.includes(itemId) || id.includes(itemName.toLowerCase()));
            if (!found) {
                return `There is no "${itemName}" here.`;
            }
        }
        
        const result = this.game.player.inventory.pickupItem(itemId);
        return result.message;
    }

    debugHeal() {
        this.game.player.hp = this.game.player.maxHp;
        this.game.player.mp = this.game.player.maxMp;
        return '✓ Health and mana fully restored!';
    }

    debugDamage(amount) {
        const damage = parseInt(amount) || 10;
        this.game.player.hp = Math.max(0, this.game.player.hp - damage);
        return `✓ Took ${damage} damage! HP: ${this.game.player.hp}/${this.game.player.maxHp}`;
    }

    debugGiveItem(itemName) {
        if (!itemName) {
            return 'Specify an item to give.';
        }
        
        const itemId = itemName.toLowerCase().replace(/ /g, '_');
        const result = this.game.player.inventory.addItem(itemId);
        
        if (result.success) {
            return `✓ ${result.message}`;
        } else {
            // Try adding as a custom item
            this.game.player.inventory.items.push({
                id: itemId,
                name: itemName,
                type: 'debug',
                equipped: false,
                quantity: 1
            });
            return `✓ Added ${itemName} to inventory (debug item)!`;
        }
    }

    debugGiveGold(amount) {
        const gold = parseInt(amount) || 100;
        this.game.player.gold += gold;
        return `✓ Added ${gold} gold! Total: ${this.game.player.gold}`;
    }

    debugTeleport(location) {
        return `[Map system not yet implemented]`;
    }

    debugSpawnEnemy(enemyType) {
        if (!enemyType) {
            return 'Specify an enemy type to spawn.';
        }
        return this.combat.startCombat(enemyType);
    }

    debugReset() {
        this.game.reset();
        this.ui.updateStatusBar(this.game.player);
        return '✓ Game state reset!';
    }

    toggleDebug() {
        this.game.debugMode = !this.game.debugMode;
        return `Debug mode: ${this.game.debugMode ? 'ON' : 'OFF'}`;
    }
    
    talkToNPC(npcName) {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        // Check if currently trading
        if (this.trading.isTrading()) {
            return 'Finish your current trade first (type "exit" to leave shop).';
        }
        
        const location = this.game.getCurrentLocation();
        if (!location.npcs || location.npcs.length === 0) {
            return 'There is no one here to talk to.';
        }
        
        // If no NPC specified, list available NPCs
        if (!npcName) {
            const npcList = this.trading.listNPCsInLocation(this.game.currentLocation);
            if (npcList.length === 0) {
                return 'There is no one here to talk to.';
            }
            return `You can talk to: ${npcList.map(npc => npc.name).join(', ')}\nUse: talk [name]`;
        }
        
        // Find the NPC
        const npcId = location.npcs.find(id => 
            id.toLowerCase().includes(npcName.toLowerCase()) ||
            npcName.toLowerCase().includes(id.toLowerCase())
        );
        
        if (!npcId) {
            return `There is no one called "${npcName}" here.`;
        }
        
        return this.trading.talkToNPC(npcId, 'greeting');
    }
    
    askNPC(topic) {
        if (!topic) {
            return 'Ask about what? Use: ask [topic]';
        }
        
        const location = this.game.getCurrentLocation();
        if (!location.npcs || location.npcs.length === 0) {
            return 'There is no one here to ask.';
        }
        
        // Talk to the first NPC in the location about the topic
        const npcId = location.npcs[0];
        return this.trading.talkToNPC(npcId, topic);
    }
    
    tradeWithNPC(npcName) {
        if (!this.game.started) {
            return 'Type "start" to begin your adventure first.';
        }
        
        // Check if already trading
        if (this.trading.isTrading()) {
            return this.trading.displayShop();
        }
        
        const location = this.game.getCurrentLocation();
        if (!location.npcs || location.npcs.length === 0) {
            return 'There is no one here to trade with.';
        }
        
        // If no NPC specified, list merchants
        if (!npcName) {
            const npcList = this.trading.listNPCsInLocation(this.game.currentLocation);
            const merchants = npcList.filter(npc => npc.canTrade);
            if (merchants.length === 0) {
                return 'There are no merchants here.';
            }
            return `You can trade with: ${merchants.map(npc => npc.name).join(', ')}\nUse: trade [name]`;
        }
        
        // Find the NPC
        const npcId = location.npcs.find(id => 
            id.toLowerCase().includes(npcName.toLowerCase()) ||
            npcName.toLowerCase().includes(id.toLowerCase())
        );
        
        if (!npcId) {
            return `There is no one called "${npcName}" here.`;
        }
        
        return this.trading.startTrading(npcId);
    }
    
    buyItem(args) {
        if (!this.trading.isTrading()) {
            return 'You need to be in a shop to buy items. Use "trade [merchant]" first.';
        }
        
        const parts = args.split(' ');
        const quantity = parseInt(parts[parts.length - 1]);
        
        let itemName, qty;
        if (!isNaN(quantity)) {
            qty = quantity;
            itemName = parts.slice(0, -1).join(' ');
        } else {
            qty = 1;
            itemName = args;
        }
        
        if (!itemName) {
            return 'Buy what? Use: buy [item] [quantity]';
        }
        
        return this.trading.buyItem(itemName, qty);
    }
    
    sellItem(args) {
        if (!this.trading.isTrading()) {
            return 'You need to be in a shop to sell items. Use "trade [merchant]" first.';
        }
        
        const parts = args.split(' ');
        const quantity = parseInt(parts[parts.length - 1]);
        
        let itemName, qty;
        if (!isNaN(quantity)) {
            qty = quantity;
            itemName = parts.slice(0, -1).join(' ');
        } else {
            qty = 1;
            itemName = args;
        }
        
        if (!itemName) {
            return 'Sell what? Use: sell [item] [quantity]';
        }
        
        return this.trading.sellItem(itemName, qty);
    }
    
    exitShop() {
        if (!this.trading.isTrading()) {
            return 'You are not in a shop.';
        }
        
        return this.trading.exitTrading();
    }
}