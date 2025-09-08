# 🎲 Natural Twenty

A text-based D&D adventure game built with vanilla JavaScript. Explore a fantasy world, battle monsters, trade with merchants, and roll for your destiny!

![Game Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Play the Game

Visit the live demo: [Play Natural Twenty](#) *(Add your GitHub Pages URL here)*

Or run locally:
1. Clone this repository
2. Open `index.html` in a modern web browser
3. Or run a local server: `python3 -m http.server 8000`

## ✨ Features

### Core Gameplay
- **Terminal-style interface** with retro green-on-black aesthetic
- **D&D-inspired mechanics** including stats, dice rolls, and critical hits
- **Character progression** with XP, leveling, and stat improvements
- **30+ unique locations** to explore
- **20+ enemy types** from goblins to ancient dragons

### Systems
- **🗡️ Combat System**
  - Turn-based tactical combat
  - Critical hits and misses
  - Flee mechanics
  - Loot drops and rewards

- **🎒 Inventory Management**
  - 80+ unique items
  - Equipment system (weapons, armor, accessories)
  - Consumable items with various effects
  - Weight and carrying capacity

- **💬 NPC Dialogue System**
  - 14 unique NPCs with personalities
  - Branching dialogue trees
  - Topic-based conversations
  - Quest hints and lore

- **💰 Trading System**
  - Multiple merchant types
  - Dynamic pricing
  - Buy/sell mechanics
  - Limited merchant gold

- **🗺️ World Map**
  - Visual ASCII map
  - Cardinal direction navigation
  - Hidden areas and secrets
  - Fast travel between discovered locations

## 🎯 How to Play

### Basic Commands
```
start          - Begin your adventure
help           - Show all commands (or click ? button)
stats          - View character statistics
inventory      - Check your items
map            - Display world map
look           - Examine surroundings
clear          - Clear the screen
```

### Movement
```
north/n        - Move north
south/s        - Move south
east/e         - Move east  
west/w         - Move west
```

### NPC Interaction
```
talk [npc]     - Start conversation
ask [topic]    - Ask about specific topic
trade [npc]    - Open merchant shop
buy [item]     - Purchase from merchant
sell [item]    - Sell to merchant
exit           - Leave shop
```

### Combat
```
attack         - Attack the enemy
flee/run       - Attempt to escape
use [item]     - Use item in combat
```

### Inventory
```
use [item]     - Use consumable item
equip [item]   - Equip weapon/armor
unequip [slot] - Remove equipment
drop [item]    - Drop item
take [item]    - Pick up item
```

## 🛠️ Development

### Debug Commands
```
/heal          - Restore full HP/MP
/damage [n]    - Take n damage
/give [item]   - Add item to inventory
/gold [n]      - Add n gold
/spawn [enemy] - Spawn enemy for testing
/debug         - Toggle debug mode
```

### Project Structure
```
natural-twenty/
├── index.html          # Main game interface
├── style.css           # Terminal styling
├── js/
│   ├── main.js         # Game initialization
│   ├── game.js         # Core game loop
│   ├── player.js       # Player character class
│   ├── combat.js       # Combat system
│   ├── inventory.js    # Inventory management
│   ├── map.js          # World map and locations
│   ├── npcs.js         # NPC definitions
│   ├── trading.js      # Trading system
│   ├── enemies.js      # Enemy definitions
│   ├── items.js        # Item definitions
│   ├── ui.js           # UI updates
│   └── commands.js     # Command parser
└── CLAUDE.md           # Development guidelines
```

## 🎲 Game Mechanics

### Character Stats
- **STR** (Strength) - Melee damage
- **DEX** (Dexterity) - Defense and speed
- **INT** (Intelligence) - Magic power
- **CON** (Constitution) - Health points
- **WIS** (Wisdom) - Mana points
- **CHA** (Charisma) - NPC interactions

### Character Classes
- **Fighter** - High STR/CON, tank build
- **Mage** - High INT/WIS, magic damage
- **Rogue** - High DEX/CHA, speed and stealth
- **Cleric** - Balanced WIS/CON, healing
- **Ranger** - Balanced DEX/STR, versatile
- **Barbarian** - Maximum STR/CON, berserker

### Combat Rolls
- Attack Roll: 1d20 + Attack Bonus
- Damage: Weapon damage + STR modifier
- Critical Hit: Natural 20 (double damage)
- Defense: 10 + DEX modifier + Armor

## 🏰 World Lore

Explore a rich fantasy world including:
- **The Dark Forest** - Home to wolves and ancient trees
- **The Village** - Safe haven with shops and inn
- **The Temple** - Holy ground with mysterious crypts
- **The River** - Hidden caves behind waterfalls
- **The Crossroads** - Where adventures begin

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by classic text adventures and D&D 5e
- Built with vanilla JavaScript for maximum compatibility
- ASCII art and terminal aesthetic for retro feel

## 🚀 Future Features

- [ ] Save/Load game state
- [ ] Quest system with objectives
- [ ] Character creation screen
- [ ] More dungeons and boss battles
- [ ] Spell casting system
- [ ] Crafting system
- [ ] Multiplayer support
- [ ] Sound effects and music

---

*Roll a natural twenty and begin your adventure!* 🎲