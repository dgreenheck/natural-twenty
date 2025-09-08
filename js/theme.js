// Color Theme Configuration for Natural Twenty
// Each type of content gets its own distinct color for better readability

export const ColorTheme = {
  // Text colors with semantic meaning
  colors: {
    // System & UI
    default: '#00ff00',        // Classic terminal green
    command: '#888888',        // Gray for echoed commands
    prompt: '#00ff00',         // Green for input prompt

    // Game Status
    success: '#44ff44',        // Bright green for success
    error: '#ff4444',          // Red for errors
    warning: '#ff8844',        // Orange for warnings
    info: '#4488ff',           // Blue for information

    // NPC & Dialogue
    npcName: '#44fcffff',        // Magenta for NPC names
    dialogue: '#ff9100ff',       // Light magenta for dialogue text
    playerDialogue: '#ffffffff', // Light green for player speech
    narratorText: '#888888',   // Gray for narrative descriptions

    // Locations & Navigation
    location: '#44ffff',       // Cyan for location names
    direction: '#88ccff',      // Light blue for directions
    description: '#bbbbbb',    // Light gray for descriptions

    // Combat
    combat: '#ff8844',         // Orange for combat messages
    damage: '#ff4444',         // Red for damage
    heal: '#44ff44',           // Green for healing
    critical: '#ffff44',       // Yellow for critical hits
    miss: '#888888',           // Gray for misses
    enemyName: '#ff6666',      // Light red for enemy names

    // Items & Inventory
    item: '#ffff44',           // Yellow for item names
    legendary: '#ff44ff',      // Magenta for legendary items
    rare: '#4444ff',           // Blue for rare items
    common: '#aaaaaa',         // Gray for common items
    gold: '#ffdd44',           // Gold color for currency

    // Stats & Numbers
    statPositive: '#44ff44',   // Green for positive stats
    statNegative: '#ff4444',   // Red for negative stats
    statNeutral: '#ffff44',    // Yellow for neutral stats
    xp: '#bb44ff',             // Purple for experience
    level: '#44ffff',          // Cyan for level

    // Actions & Options
    action: '#ffaa44',         // Orange for available actions
    option: '#44aaff',         // Light blue for selectable options
    disabled: '#666666',       // Dark gray for disabled options

    // Special Effects
    magic: '#ff44ff',          // Magenta for magic
    poison: '#44ff44',         // Green for poison
    fire: '#ff6644',           // Orange-red for fire
    ice: '#44ddff',            // Light cyan for ice
    holy: '#ffffaa',           // Light yellow for holy
    dark: '#aa44ff',           // Purple for dark/evil

    // UI Elements
    border: '#00ff00',         // Green for borders
    headerBg: '#003300',       // Dark green for headers
    highlight: '#00ff00',      // Green for highlights
    shadow: 'rgba(0, 255, 0, 0.3)' // Green shadow
  },

  // Message type to color mapping
  messageTypes: {
    // System
    'default': 'default',
    'command-echo': 'command',
    'error': 'error',
    'success': 'success',
    'info': 'info',
    'warning': 'warning',

    // Game World
    'location': 'location',
    'location-name': 'location',
    'location-desc': 'description',
    'direction': 'direction',

    // NPCs & Dialogue
    'npc-name': 'npcName',
    'dialogue': 'dialogue',
    'player-dialogue': 'playerDialogue',
    'narrator': 'narratorText',
    'npc-action': 'action',

    // Combat
    'combat': 'combat',
    'combat-hit': 'damage',
    'combat-miss': 'miss',
    'combat-critical': 'critical',
    'combat-heal': 'heal',
    'enemy': 'enemyName',
    'enemy-action': 'combat',

    // Items
    'item': 'item',
    'item-legendary': 'legendary',
    'item-rare': 'rare',
    'item-common': 'common',
    'gold': 'gold',
    'loot': 'item',

    // Stats
    'stat-increase': 'statPositive',
    'stat-decrease': 'statNegative',
    'stat-neutral': 'statNeutral',
    'xp': 'xp',
    'level': 'level',
    'level-up': 'critical',

    // Actions
    'action': 'action',
    'option': 'option',
    'disabled': 'disabled',

    // Magic & Effects
    'magic': 'magic',
    'spell': 'magic',
    'poison': 'poison',
    'fire': 'fire',
    'ice': 'ice',
    'holy': 'holy',
    'dark': 'dark'
  },

  // Format text with color spans
  formatText(text, type = 'default') {
    const colorKey = this.messageTypes[type] || type;
    const color = this.colors[colorKey] || this.colors.default;
    return `<span style="color: ${color}">${text}</span>`;
  },

  // Format complex messages with multiple colors
  formatMessage(parts) {
    return parts.map(part => {
      if (typeof part === 'string') {
        return part;
      }
      return this.formatText(part.text, part.type);
    }).join('');
  },

  // Apply color to entire line
  getColorClass(type) {
    const colorKey = this.messageTypes[type] || type;
    return colorKey;
  },

  // Helper functions for common formatting
  formatNPC(name) {
    return this.formatText(name, 'npc-name');
  },

  formatItem(name, rarity = 'common') {
    return this.formatText(name, `item-${rarity}`);
  },

  formatDamage(amount) {
    return this.formatText(`${amount} damage`, 'damage');
  },

  formatHeal(amount) {
    return this.formatText(`${amount} HP`, 'heal');
  },

  formatGold(amount) {
    return this.formatText(`${amount} gold`, 'gold');
  },

  formatLocation(name) {
    return this.formatText(name, 'location');
  },

  formatAction(action) {
    return this.formatText(action, 'action');
  },

  formatOption(option) {
    return this.formatText(`[${option}]`, 'option');
  }
};

// CSS class definitions for the theme
export const themeStyles = `
    /* Base message types */
    .msg-default { color: ${ColorTheme.colors.default}; }
    .msg-command { color: ${ColorTheme.colors.command}; font-style: italic; }
    .msg-error { color: ${ColorTheme.colors.error}; }
    .msg-success { color: ${ColorTheme.colors.success}; }
    .msg-info { color: ${ColorTheme.colors.info}; }
    .msg-warning { color: ${ColorTheme.colors.warning}; }
    
    /* NPC & Dialogue */
    .msg-npc-name { 
        color: ${ColorTheme.colors.npcName}; 
        font-weight: bold;
        text-shadow: 0 0 5px ${ColorTheme.colors.npcName}40;
    }
    .msg-dialogue { 
        color: ${ColorTheme.colors.dialogue}; 
        font-style: italic;
    }
    .msg-player-dialogue { 
        color: ${ColorTheme.colors.playerDialogue}; 
        font-style: italic;
    }
    .msg-narrator { 
        color: ${ColorTheme.colors.narratorText}; 
        font-style: italic;
    }
    
    /* Locations */
    .msg-location { 
        color: ${ColorTheme.colors.location}; 
        font-weight: bold;
        text-shadow: 0 0 5px ${ColorTheme.colors.location}40;
    }
    .msg-direction { color: ${ColorTheme.colors.direction}; }
    .msg-description { color: ${ColorTheme.colors.description}; }
    
    /* Combat */
    .msg-combat { color: ${ColorTheme.colors.combat}; }
    .msg-damage { 
        color: ${ColorTheme.colors.damage}; 
        font-weight: bold;
    }
    .msg-heal { 
        color: ${ColorTheme.colors.heal}; 
        font-weight: bold;
    }
    .msg-critical { 
        color: ${ColorTheme.colors.critical}; 
        font-weight: bold;
        text-shadow: 0 0 10px ${ColorTheme.colors.critical};
        animation: pulse 0.5s ease-in-out;
    }
    .msg-miss { 
        color: ${ColorTheme.colors.miss}; 
        opacity: 0.8;
    }
    .msg-enemy { 
        color: ${ColorTheme.colors.enemyName}; 
        font-weight: bold;
    }
    
    /* Items */
    .msg-item { 
        color: ${ColorTheme.colors.item}; 
        font-weight: bold;
    }
    .msg-legendary { 
        color: ${ColorTheme.colors.legendary}; 
        font-weight: bold;
        text-shadow: 0 0 10px ${ColorTheme.colors.legendary};
        animation: shimmer 2s infinite;
    }
    .msg-rare { 
        color: ${ColorTheme.colors.rare}; 
        font-weight: bold;
        text-shadow: 0 0 5px ${ColorTheme.colors.rare}40;
    }
    .msg-common { color: ${ColorTheme.colors.common}; }
    .msg-gold { 
        color: ${ColorTheme.colors.gold}; 
        font-weight: bold;
        text-shadow: 0 0 3px ${ColorTheme.colors.gold}40;
    }
    
    /* Stats */
    .msg-stat-positive { color: ${ColorTheme.colors.statPositive}; }
    .msg-stat-negative { color: ${ColorTheme.colors.statNegative}; }
    .msg-stat-neutral { color: ${ColorTheme.colors.statNeutral}; }
    .msg-xp { color: ${ColorTheme.colors.xp}; }
    .msg-level { 
        color: ${ColorTheme.colors.level}; 
        font-weight: bold;
    }
    .msg-level-up { 
        color: ${ColorTheme.colors.critical}; 
        font-weight: bold;
        font-size: 1.1em;
        text-shadow: 0 0 10px ${ColorTheme.colors.critical};
        animation: levelUp 1s ease-in-out;
    }
    
    /* Actions & Options */
    .msg-action { 
        color: ${ColorTheme.colors.action}; 
        font-weight: bold;
    }
    .msg-option { 
        color: ${ColorTheme.colors.option}; 
        cursor: pointer;
        text-decoration: underline;
    }
    .msg-option:hover {
        color: ${ColorTheme.colors.highlight};
        text-shadow: 0 0 5px ${ColorTheme.colors.highlight};
    }
    .msg-disabled { 
        color: ${ColorTheme.colors.disabled}; 
        opacity: 0.5;
        text-decoration: line-through;
    }
    
    /* Magic & Effects */
    .msg-magic { 
        color: ${ColorTheme.colors.magic}; 
        text-shadow: 0 0 5px ${ColorTheme.colors.magic}40;
    }
    .msg-poison { color: ${ColorTheme.colors.poison}; }
    .msg-fire { 
        color: ${ColorTheme.colors.fire}; 
        text-shadow: 0 0 5px ${ColorTheme.colors.fire}40;
    }
    .msg-ice { 
        color: ${ColorTheme.colors.ice}; 
        text-shadow: 0 0 5px ${ColorTheme.colors.ice}40;
    }
    .msg-holy { 
        color: ${ColorTheme.colors.holy}; 
        text-shadow: 0 0 10px ${ColorTheme.colors.holy}40;
    }
    .msg-dark { 
        color: ${ColorTheme.colors.dark}; 
        text-shadow: 0 0 5px ${ColorTheme.colors.dark}40;
    }
    
    /* Animations */
    @keyframes shimmer {
        0% { opacity: 0.8; }
        50% { opacity: 1; }
        100% { opacity: 0.8; }
    }
    
    @keyframes levelUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    /* Inline spans for mixed colors */
    .npc-name { color: ${ColorTheme.colors.npcName}; font-weight: bold; }
    .item-name { color: ${ColorTheme.colors.item}; }
    .gold-amount { color: ${ColorTheme.colors.gold}; }
    .damage-amount { color: ${ColorTheme.colors.damage}; }
    .heal-amount { color: ${ColorTheme.colors.heal}; }
    .location-name { color: ${ColorTheme.colors.location}; }
    .action-text { color: ${ColorTheme.colors.action}; }
    .option-text { color: ${ColorTheme.colors.option}; }
`;