import { Player } from './player.js';
import { WorldMap } from './map.js';
import { Combat } from './combat.js';
import { Trading } from './trading.js';

export class Game {
    constructor() {
        this.reset();
    }

    reset() {
        this.player = new Player('Hero', 'Fighter');
        this.player.setGame(this);
        this.started = false;
        this.debugMode = false;
        this.currentLocation = null;
        this.gameTime = 0;
        this.flags = {};
        this.combat = null;
        this.trading = null;
        this.merchants = new Map();
        this.quests = [];
        this.completedQuests = [];
        
        this.initializeWorld();
    }
    
    setCombat(combat) {
        this.combat = combat;
    }
    
    setTrading(trading) {
        this.trading = trading;
    }

    initializeWorld() {
        this.locations = new Map();
        this.map = new WorldMap(this);
        this.currentLocation = 'forest_entrance';
        this.player.location = 'Forest Entrance';
    }

    addLocation(location) {
        this.locations.set(location.id, location);
    }

    getLocation(id) {
        return this.locations.get(id);
    }

    getCurrentLocation() {
        return this.getLocation(this.currentLocation);
    }

    movePlayer(direction) {
        const location = this.getCurrentLocation();
        if (!location) return { success: false, message: 'You are nowhere!' };
        
        const newLocationId = location.exits[direction];
        if (!newLocationId) {
            return { success: false, message: `You cannot go ${direction} from here.` };
        }
        
        const newLocation = this.getLocation(newLocationId);
        if (!newLocation) {
            return { success: false, message: 'That area is not accessible yet.' };
        }
        
        this.currentLocation = newLocationId;
        this.player.location = newLocation.name;
        
        return {
            success: true,
            location: newLocation,
            message: `You travel ${direction} to ${newLocation.name}.`
        };
    }

    isInCombat() {
        return this.combat && this.combat.isInCombat();
    }

    saveGame() {
        const saveData = {
            player: {
                name: this.player.name,
                class: this.player.class,
                level: this.player.level,
                xp: this.player.xp,
                hp: this.player.hp,
                mp: this.player.mp,
                gold: this.player.gold,
                stats: {
                    str: this.player.str,
                    dex: this.player.dex,
                    int: this.player.int,
                    con: this.player.con,
                    wis: this.player.wis,
                    cha: this.player.cha
                },
                inventory: this.player.inventory,
                equipped: this.player.equipped
            },
            game: {
                started: this.started,
                currentLocation: this.currentLocation,
                gameTime: this.gameTime,
                flags: this.flags,
                quests: this.quests,
                completedQuests: this.completedQuests
            },
            version: '1.0.0'
        };
        
        localStorage.setItem('dnd_save', JSON.stringify(saveData));
        return true;
    }

    loadGame() {
        const saveString = localStorage.getItem('dnd_save');
        if (!saveString) return false;
        
        try {
            const saveData = JSON.parse(saveString);
            
            this.player.name = saveData.player.name;
            this.player.class = saveData.player.class;
            this.player.level = saveData.player.level;
            this.player.xp = saveData.player.xp;
            this.player.hp = saveData.player.hp;
            this.player.mp = saveData.player.mp;
            this.player.gold = saveData.player.gold;
            
            this.player.str = saveData.player.stats.str;
            this.player.dex = saveData.player.stats.dex;
            this.player.int = saveData.player.stats.int;
            this.player.con = saveData.player.stats.con;
            this.player.wis = saveData.player.stats.wis;
            this.player.cha = saveData.player.stats.cha;
            
            this.player.inventory = saveData.player.inventory;
            this.player.equipped = saveData.player.equipped;
            
            this.started = saveData.game.started;
            this.currentLocation = saveData.game.currentLocation;
            this.gameTime = saveData.game.gameTime;
            this.flags = saveData.game.flags;
            this.quests = saveData.game.quests || [];
            this.completedQuests = saveData.game.completedQuests || [];
            
            const location = this.getCurrentLocation();
            if (location) {
                this.player.location = location.name;
            }
            
            return true;
        } catch (error) {
            console.error('Failed to load save:', error);
            return false;
        }
    }

    deleteSave() {
        localStorage.removeItem('dnd_save');
        return true;
    }

    hasSaveGame() {
        return localStorage.getItem('dnd_save') !== null;
    }

    tick() {
        this.gameTime++;
        
        if (this.gameTime % 10 === 0) {
            if (this.player.hp < this.player.maxHp) {
                this.player.hp = Math.min(this.player.hp + 1, this.player.maxHp);
            }
        }
        
        if (this.gameTime % 20 === 0) {
            if (this.player.mp < this.player.maxMp) {
                this.player.mp = Math.min(this.player.mp + 1, this.player.maxMp);
            }
        }
    }

    rollDice(sides, count = 1) {
        let total = 0;
        for (let i = 0; i < count; i++) {
            total += Math.floor(Math.random() * sides) + 1;
        }
        return total;
    }

    rollD20() {
        return this.rollDice(20);
    }

    rollD6(count = 1) {
        return this.rollDice(6, count);
    }

    rollD8(count = 1) {
        return this.rollDice(8, count);
    }

    rollD10(count = 1) {
        return this.rollDice(10, count);
    }

    rollD12(count = 1) {
        return this.rollDice(12, count);
    }
}