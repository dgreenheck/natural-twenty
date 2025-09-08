export class WorldMap {
    constructor(game) {
        this.game = game;
        this.createWorld();
    }

    createWorld() {
        // Forest Area
        this.game.addLocation({
            id: 'forest_entrance',
            name: 'Forest Entrance',
            description: 'A peaceful clearing at the edge of a dark forest. Sunlight filters through the trees, and a well-worn path leads deeper into the woods.',
            exits: {
                north: 'forest_path',
                east: 'village',
                west: 'river_bank',
                south: 'crossroads'
            },
            items: [],
            enemies: [],
            npcs: []
        });

        this.game.addLocation({
            id: 'forest_path',
            name: 'Forest Path',
            description: 'A narrow path winds through towering trees. The forest is quiet except for the occasional bird call and rustling leaves.',
            exits: {
                south: 'forest_entrance',
                north: 'deep_forest',
                east: 'forest_clearing'
            },
            items: ['mushroom', 'herb'],
            enemies: ['wolf', 'goblin'],
            npcs: []
        });

        this.game.addLocation({
            id: 'deep_forest',
            name: 'Deep Forest',
            description: 'The trees grow thick here, blocking most of the sunlight. Strange sounds echo from the darkness.',
            exits: {
                south: 'forest_path',
                north: 'ancient_tree',
                west: 'spider_nest'
            },
            items: ['rare_mushroom'],
            enemies: ['dire_wolf', 'forest_spider'],
            npcs: []
        });

        this.game.addLocation({
            id: 'ancient_tree',
            name: 'Ancient Tree',
            description: 'A massive, ancient oak stands before you. Its trunk is wider than a house, and strange runes are carved into its bark.',
            exits: {
                south: 'deep_forest',
                up: 'tree_hollow'
            },
            items: ['ancient_bark'],
            enemies: [],
            npcs: ['druid']
        });

        this.game.addLocation({
            id: 'tree_hollow',
            name: 'Tree Hollow',
            description: 'Inside the ancient tree, you find a cozy hollow filled with glowing mushrooms and old books.',
            exits: {
                down: 'ancient_tree'
            },
            items: ['spell_scroll', 'mana_crystal'],
            enemies: [],
            npcs: []
        });

        this.game.addLocation({
            id: 'spider_nest',
            name: 'Spider Nest',
            description: 'Thick webs cover everything here. You can see wrapped bundles hanging from the trees - some still moving.',
            exits: {
                east: 'deep_forest'
            },
            items: ['spider_silk', 'gold_pouch'],
            enemies: ['giant_spider', 'spider_swarm'],
            npcs: []
        });

        this.game.addLocation({
            id: 'forest_clearing',
            name: 'Forest Clearing',
            description: 'A small clearing with a bubbling spring. The water looks crystal clear and refreshing.',
            exits: {
                west: 'forest_path'
            },
            items: ['spring_water'],
            enemies: [],
            npcs: ['fairy']
        });

        // Village Area
        this.game.addLocation({
            id: 'village',
            name: 'Small Village',
            description: 'A quaint village with thatched-roof houses. Smoke rises from chimneys, and villagers go about their daily business.',
            exits: {
                west: 'forest_entrance',
                north: 'market_square',
                east: 'inn',
                south: 'village_gate'
            },
            items: [],
            enemies: [],
            npcs: ['guard', 'villager']
        });

        this.game.addLocation({
            id: 'market_square',
            name: 'Market Square',
            description: 'The bustling heart of the village. Merchants hawk their wares from colorful stalls.',
            exits: {
                south: 'village',
                east: 'blacksmith',
                west: 'general_store',
                north: 'temple'
            },
            items: ['apple'],
            enemies: [],
            npcs: ['merchant', 'food_vendor', 'weapon_merchant']
        });

        this.game.addLocation({
            id: 'blacksmith',
            name: 'Blacksmith Shop',
            description: 'The ring of hammer on anvil fills the air. The burly blacksmith works tirelessly at his forge.',
            exits: {
                west: 'market_square'
            },
            items: [],
            enemies: [],
            npcs: ['blacksmith']
        });

        this.game.addLocation({
            id: 'general_store',
            name: 'General Store',
            description: 'Shelves packed with various goods line the walls. A bell rings as you enter.',
            exits: {
                east: 'market_square'
            },
            items: [],
            enemies: [],
            npcs: ['shopkeeper']
        });

        this.game.addLocation({
            id: 'temple',
            name: 'Temple of Light',
            description: 'A peaceful temple with stained glass windows casting colorful patterns on the floor.',
            exits: {
                south: 'market_square',
                down: 'crypt'
            },
            items: ['holy_water'],
            enemies: [],
            npcs: ['priest']
        });

        this.game.addLocation({
            id: 'crypt',
            name: 'Temple Crypt',
            description: 'Dark stone corridors lined with ancient tombs. The air is cold and musty.',
            exits: {
                up: 'temple',
                north: 'crypt_chamber'
            },
            items: ['old_bone'],
            enemies: ['skeleton', 'zombie'],
            npcs: []
        });

        this.game.addLocation({
            id: 'crypt_chamber',
            name: 'Crypt Chamber',
            description: 'A large chamber with an ornate sarcophagus in the center. Dark energy pulses from within.',
            exits: {
                south: 'crypt'
            },
            items: ['ancient_sword', 'gold_chalice'],
            enemies: ['skeleton_warrior', 'wraith'],
            npcs: []
        });

        this.game.addLocation({
            id: 'inn',
            name: 'The Prancing Pony Inn',
            description: 'A warm, inviting inn with the smell of roasting meat and ale. A bard plays in the corner.',
            exits: {
                west: 'village',
                up: 'inn_room'
            },
            items: [],
            enemies: [],
            npcs: ['innkeeper', 'bard', 'mysterious_stranger']
        });

        this.game.addLocation({
            id: 'inn_room',
            name: 'Inn Room',
            description: 'A simple but comfortable room with a bed, desk, and window overlooking the village.',
            exits: {
                down: 'inn'
            },
            items: ['journal'],
            enemies: [],
            npcs: []
        });

        this.game.addLocation({
            id: 'village_gate',
            name: 'Village Gate',
            description: 'The southern entrance to the village. Guards keep watch for travelers and threats.',
            exits: {
                north: 'village',
                south: 'crossroads'
            },
            items: [],
            enemies: [],
            npcs: ['gate_guard']
        });

        // River Area
        this.game.addLocation({
            id: 'river_bank',
            name: 'River Bank',
            description: 'A peaceful river flows here. You can hear the gentle babbling of water over rocks.',
            exits: {
                east: 'forest_entrance',
                west: 'waterfall',
                south: 'bridge'
            },
            items: ['river_stone', 'fishing_rod'],
            enemies: ['river_slime'],
            npcs: ['fisherman']
        });

        this.game.addLocation({
            id: 'waterfall',
            name: 'Waterfall',
            description: 'A magnificent waterfall crashes down from the cliffs above. Mist fills the air.',
            exits: {
                east: 'river_bank',
                south: 'hidden_cave',
                behind: 'hidden_cave'
            },
            items: ['rainbow_gem'],
            enemies: [],
            npcs: []
        });

        this.game.addLocation({
            id: 'hidden_cave',
            name: 'Hidden Cave',
            description: 'A secret cave behind the waterfall. Crystals in the walls provide a dim, ethereal light.',
            exits: {
                north: 'waterfall',
                out: 'waterfall'
            },
            items: ['crystal_shard', 'treasure_chest'],
            enemies: ['cave_bat', 'crystal_golem'],
            npcs: []
        });

        this.game.addLocation({
            id: 'bridge',
            name: 'Old Stone Bridge',
            description: 'An ancient stone bridge crosses the river here. It has stood for centuries.',
            exits: {
                north: 'forest_entrance',
                south: 'crossroads',
                west: 'river_bank',
                under: 'troll_lair'
            },
            items: [],
            enemies: [],
            npcs: []
        });

        this.game.addLocation({
            id: 'troll_lair',
            name: 'Under the Bridge',
            description: 'A dank, smelly area under the bridge. Bones and refuse are scattered about.',
            exits: {
                up: 'bridge'
            },
            items: ['troll_club', 'gold_tooth'],
            enemies: ['bridge_troll'],
            npcs: []
        });

        // Roads and Crossroads
        this.game.addLocation({
            id: 'crossroads',
            name: 'Crossroads',
            description: 'Four roads meet here. A weathered signpost points in all directions.',
            exits: {
                north: 'bridge',
                south: 'road_west',
                east: 'road_south',
                west: 'troll_lair'
            },
            items: [],
            enemies: ['bandit'],
            npcs: ['traveling_merchant']
        });

        this.game.addLocation({
            id: 'road_south',
            name: 'Southern Road',
            description: 'The road stretches south toward distant mountains. The journey looks long and dangerous.',
            exits: {
                west: 'crossroads',
                south: 'road_east'
            },
            items: [],
            enemies: ['bandit', 'wild_dog'],
            npcs: []
        });

        this.game.addLocation({
            id: 'road_east',
            name: 'Eastern Road',
            description: 'The road leads east toward the coast. You can smell salt on the wind.',
            exits: {
                north: 'road_south'
            },
            items: [],
            enemies: ['highway_robber'],
            npcs: []
        });

        this.game.addLocation({
            id: 'road_west',
            name: 'Western Road',
            description: 'The road heads west into barren wastelands. The landscape becomes increasingly desolate.',
            exits: {
                north: 'crossroads'
            },
            items: [],
            enemies: ['vulture', 'sand_scorpion'],
            npcs: []
        });
    }

    getMapDisplay(currentLocationId) {
        // Create a proper grid that matches actual navigation
        // North is up (decreasing row), South is down (increasing row)
        // West is left (decreasing col), East is right (increasing col)
        
        const mapGrid = [
            ['   ', '   ', 'THL', '   ', '   ', '   ', '   '],  // Row 0 (North)
            ['   ', '   ', 'TRE', '   ', '   ', '   ', '   '],
            ['   ', 'SPI', 'DEP', 'CLR', '   ', '   ', '   '],
            ['   ', '   ', 'FOR', '   ', '   ', 'TMP', 'CPC'],
            ['   ', '   ', '   ', '   ', 'BLK', 'MKT', 'GEN'],
            ['WAT', 'RIV', 'FEN', 'VIL', 'INN', '   ', '   '],
            ['HCV', '   ', 'BRG', '   ', 'VGT', '   ', '   '],
            ['   ', 'TRL', 'CRO', '   ', 'RSO', '   ', '   '],
            ['   ', '   ', 'RWE', '   ', '   ', '   ', '   '],
            ['   ', '   ', '   ', '   ', 'REA', '   ', '   ']   // Row 9 (South)
        ];

        const locationMap = {
            // Forest area - center/north section
            'tree_hollow': [0, 2],
            'ancient_tree': [1, 2],
            'spider_nest': [2, 1],
            'deep_forest': [2, 2],
            'forest_clearing': [2, 3],
            'forest_path': [3, 2],
            
            // Village area - center/east section
            'temple': [3, 5],
            'crypt': [3, 6],
            'crypt_chamber': [3, 6], // Same position, different level
            'blacksmith': [4, 4],
            'market_square': [4, 5],
            'general_store': [4, 6],
            'forest_entrance': [5, 2],
            'village': [5, 3],
            'inn': [5, 4],
            'inn_room': [5, 4], // Same position, different level
            'village_gate': [6, 4],
            
            // River area - west section
            'waterfall': [5, 0],
            'river_bank': [5, 1],
            'hidden_cave': [6, 0],
            'bridge': [6, 2],
            'troll_lair': [7, 1],
            
            // Roads - south section
            'crossroads': [7, 2],
            'road_south': [7, 4],
            'road_west': [8, 2],
            'road_east': [9, 4]
        };

        // Create display grid with current position marked
        const displayGrid = mapGrid.map(row => [...row]);
        const currentPos = locationMap[currentLocationId];
        
        if (currentPos) {
            const [row, col] = currentPos;
            // Mark current position with brackets
            const location = displayGrid[row][col];
            if (location && location.trim()) {
                displayGrid[row][col] = `[${location.trim()}]`;
            }
        }

        // Build the map display with legend
        let mapDisplay = '\n╔════════════════════════════════════════════╗\n';
        mapDisplay += '║                 WORLD MAP                  ║\n';
        mapDisplay += '╠════════════════════════════════════════════╣\n';
        mapDisplay += '║     N                                      ║\n';
        mapDisplay += '║     ↑                                      ║\n';
        mapDisplay += '║  W ← → E                                   ║\n';
        mapDisplay += '║     ↓                                      ║\n';
        mapDisplay += '║     S                                      ║\n';
        mapDisplay += '╠════════════════════════════════════════════╣\n';
        
        // Add the map grid
        for (let row of displayGrid) {
            mapDisplay += '║ ' + row.join('  ').padEnd(42) + ' ║\n';
        }
        
        mapDisplay += '╠════════════════════════════════════════════╣\n';
        mapDisplay += '║ LEGEND:                                    ║\n';
        mapDisplay += '║ [XXX] = You are here                       ║\n';
        mapDisplay += '║ FEN = Forest Entrance   VIL = Village      ║\n';
        mapDisplay += '║ FOR = Forest Path       INN = Inn          ║\n';
        mapDisplay += '║ DEP = Deep Forest       MKT = Market       ║\n';
        mapDisplay += '║ TRE = Ancient Tree      TMP = Temple       ║\n';
        mapDisplay += '║ RIV = River Bank        BRG = Bridge       ║\n';
        mapDisplay += '║ CRO = Crossroads        Other locations... ║\n';
        mapDisplay += '╚════════════════════════════════════════════╝\n';
        
        return mapDisplay;
    }
}