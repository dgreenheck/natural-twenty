export const NPC_DATA = {
    // Village NPCs
    'guard': {
        name: 'Village Guard',
        description: 'A stern-looking guard in leather armor.',
        dialogue: {
            greeting: "Halt! State your business in our village.",
            responses: {
                'village': "This is a peaceful village. We don't take kindly to troublemakers.",
                'trouble': "There have been reports of goblins in the forest. Be careful out there.",
                'goblins': "Nasty creatures. They've been raiding our supply wagons.",
                'help': "If you're looking for work, the merchant might have something for you.",
                'merchant': "You'll find merchants in the market square. They're always looking for adventurers."
            },
            farewell: "Move along then, and stay out of trouble."
        },
        isTrader: false
    },
    
    'villager': {
        name: 'Villager',
        description: 'A simple villager going about their daily business.',
        dialogue: {
            greeting: "Oh, hello there, stranger!",
            responses: {
                'village': "It's a quiet place, usually. Though lately we've had some troubles.",
                'troubles': "Goblins from the forest, and I heard something about undead in the old crypt.",
                'crypt': "Below the temple. The priest keeps it sealed, but sometimes things... escape.",
                'forest': "Dangerous place. Wolves, spiders, and worse. But there are treasures too, they say.",
                'inn': "The Prancing Pony? Best ale in town! The innkeeper tells great stories too."
            },
            farewell: "Safe travels, adventurer!"
        },
        isTrader: false
    },
    
    'innkeeper': {
        name: 'Bartimus the Innkeeper',
        description: 'A jolly, round fellow with a magnificent mustache.',
        dialogue: {
            greeting: "Welcome to the Prancing Pony! Finest inn this side of the river!",
            responses: {
                'room': "A room? That'll be 10 gold for the night. Includes breakfast!",
                'drink': "Our ale is legendary! Only 2 gold a mug.",
                'food': "Got some fresh bread and stew. 5 gold for a hearty meal.",
                'rumors': "Well, I heard there's an ancient treasure hidden behind the waterfall...",
                'waterfall': "North of the river. Beautiful sight, but I'd be careful poking around there.",
                'rest': "Just head upstairs when you're ready. Your room is always available."
            },
            farewell: "Come back anytime! The door's always open!"
        },
        isTrader: true,
        shop: {
            name: "The Prancing Pony Inn",
            inventory: [
                { id: 'bread', quantity: 10, price: 5 },
                { id: 'apple', quantity: 20, price: 3 },
                { id: 'health_potion', quantity: 5, price: 50 },
                { id: 'mana_potion', quantity: 3, price: 40 }
            ],
            buyMultiplier: 0.5,  // Sells to player at normal price, buys at 50%
            specialDialogue: {
                welcome: "What can I get for you?",
                purchase: "Excellent choice!",
                sell: "I'll take that off your hands.",
                poor: "You don't have enough gold for that.",
                farewell: "Thank you for your business!"
            }
        }
    },
    
    'merchant': {
        name: 'Marcus the Merchant',
        description: 'A well-dressed trader with keen eyes and a silver tongue.',
        dialogue: {
            greeting: "Ah, a customer! Welcome to my humble shop!",
            responses: {
                'wares': "I have the finest goods from across the realm!",
                'quest': "Actually, I could use some help. Bandits stole my shipment. Retrieve it and I'll reward you.",
                'bandits': "They're hold up at the crossroads. Dangerous bunch.",
                'reward': "Get my goods back and I'll give you a special discount, plus 100 gold!",
                'deal': "I always have the best deals in town. Check my wares!"
            },
            farewell: "May fortune smile upon you!"
        },
        isTrader: true,
        shop: {
            name: "Marcus's General Goods",
            inventory: [
                { id: 'iron_sword', quantity: 2, price: 75 },
                { id: 'leather_armor', quantity: 3, price: 60 },
                { id: 'health_potion', quantity: 10, price: 45 },
                { id: 'mana_potion', quantity: 5, price: 35 },
                { id: 'rope', quantity: 10, price: 10 },
                { id: 'torch', quantity: 20, price: 5 },
                { id: 'lockpick', quantity: 5, price: 15 }
            ],
            buyMultiplier: 0.6,
            specialDialogue: {
                welcome: "Take a look at my wares!",
                purchase: "A wise investment!",
                sell: "Hmm, I can offer you a fair price for that.",
                poor: "I'm afraid you need more gold for that.",
                farewell: "Come back when you have more gold!"
            }
        }
    },
    
    'blacksmith': {
        name: 'Thorin the Blacksmith',
        description: 'A burly dwarf with arms like tree trunks, covered in soot.',
        dialogue: {
            greeting: "Welcome to my forge! Looking for quality steel?",
            responses: {
                'weapons': "I forge the finest weapons in the land. Have a look!",
                'armor': "Good armor will save your life. I have several pieces available.",
                'repair': "Broken gear? I can fix it... for a price.",
                'custom': "Bring me rare materials and I can craft something special.",
                'materials': "Spider silk for light armor, troll hide for heavy armor, crystal shards for magic weapons.",
                'forge': "Been smithing for forty years. My father taught me, and his father taught him."
            },
            farewell: "May your blade stay sharp!"
        },
        isTrader: true,
        shop: {
            name: "Thorin's Forge",
            inventory: [
                { id: 'iron_sword', quantity: 3, price: 70 },
                { id: 'steel_sword', quantity: 1, price: 200 },
                { id: 'dagger', quantity: 5, price: 25 },
                { id: 'leather_armor', quantity: 2, price: 55 },
                { id: 'chain_mail', quantity: 1, price: 150 },
                { id: 'plate_armor', quantity: 1, price: 400 }
            ],
            buyMultiplier: 0.7,
            specialDialogue: {
                welcome: "Looking for weapons or armor?",
                purchase: "Forged with dwarven skill!",
                sell: "Interesting piece. I can use this.",
                poor: "Quality costs gold, friend.",
                farewell: "Fight with honor!"
            }
        }
    },
    
    'priest': {
        name: 'Father Benedict',
        description: 'An elderly priest in white robes, radiating calm and wisdom.',
        dialogue: {
            greeting: "Blessings upon you, child. How may I help you?",
            responses: {
                'blessing': "May the light protect you on your journey. *You feel blessed*",
                'heal': "You look wounded. Let me help. *Restores some HP*",
                'temple': "This temple has stood for centuries, protecting the village.",
                'crypt': "The crypt below... evil stirs there. Only the brave should enter.",
                'undead': "Cursed souls that cannot rest. Holy water is effective against them.",
                'evil': "There is a darkness growing in the deep forest. An ancient evil awakens."
            },
            farewell: "Go with the light, my child."
        },
        isTrader: true,
        shop: {
            name: "Temple Supplies",
            inventory: [
                { id: 'holy_water', quantity: 10, price: 40 },
                { id: 'health_potion', quantity: 5, price: 50 },
                { id: 'blessing_scroll', quantity: 3, price: 100 },
                { id: 'antidote', quantity: 5, price: 25 }
            ],
            buyMultiplier: 0.5,
            specialDialogue: {
                welcome: "The temple offers these blessed items.",
                purchase: "May it serve you well.",
                sell: "The temple thanks you for your donation.",
                poor: "The temple requires a donation for these items.",
                farewell: "Light be with you."
            }
        }
    },
    
    'shopkeeper': {
        name: 'Sarah the Shopkeeper',
        description: 'A friendly woman managing the general store.',
        dialogue: {
            greeting: "Welcome to the general store! We have everything you need!",
            responses: {
                'supplies': "Basic adventuring supplies, potions, and more!",
                'potions': "Health and mana potions, fresh from the alchemist.",
                'rope': "Essential for any adventurer. You never know when you'll need it.",
                'news': "A traveling merchant came through yesterday. Said something about trolls at the bridge.",
                'bridge': "South of here. Be careful if you go that way."
            },
            farewell: "Come back soon!"
        },
        isTrader: true,
        shop: {
            name: "General Store",
            inventory: [
                { id: 'health_potion', quantity: 15, price: 48 },
                { id: 'mana_potion', quantity: 8, price: 38 },
                { id: 'bread', quantity: 20, price: 5 },
                { id: 'rope', quantity: 10, price: 12 },
                { id: 'torch', quantity: 25, price: 5 },
                { id: 'smoke_bomb', quantity: 5, price: 30 },
                { id: 'antidote', quantity: 5, price: 25 }
            ],
            buyMultiplier: 0.55,
            specialDialogue: {
                welcome: "What can I help you find?",
                purchase: "Thank you for shopping with us!",
                sell: "I can take that off your hands.",
                poor: "Sorry, you need more gold for that.",
                farewell: "Have a great day!"
            }
        }
    },
    
    'weapon_merchant': {
        name: 'Viktor the Arms Dealer',
        description: 'A scarred veteran turned weapon merchant.',
        dialogue: {
            greeting: "Need something with a sharp edge or a heavy blow?",
            responses: {
                'weapons': "Swords, daggers, maces... I've got them all.",
                'best': "The ancient sword is my finest piece. Found it in the old ruins.",
                'ruins': "East of here, beyond the crossroads. Dangerous place.",
                'advice': "A good weapon is important, but skill matters more.",
                'war': "I've seen my share of battles. That's why I sell weapons now - to those who need them."
            },
            farewell: "Strike true, warrior."
        },
        isTrader: true,
        shop: {
            name: "Viktor's Weapons",
            inventory: [
                { id: 'rusty_sword', quantity: 5, price: 15 },
                { id: 'iron_sword', quantity: 3, price: 65 },
                { id: 'steel_sword', quantity: 2, price: 180 },
                { id: 'ancient_sword', quantity: 1, price: 500 },
                { id: 'dagger', quantity: 8, price: 22 },
                { id: 'steel_dagger', quantity: 3, price: 70 }
            ],
            buyMultiplier: 0.65,
            specialDialogue: {
                welcome: "Weapons for every warrior!",
                purchase: "Use it well!",
                sell: "This weapon has seen battle, I see.",
                poor: "Good weapons aren't cheap.",
                farewell: "May your enemies fall before you!"
            }
        }
    },
    
    // Special NPCs
    'mysterious_stranger': {
        name: 'Mysterious Stranger',
        description: 'A cloaked figure sitting in the corner of the inn.',
        dialogue: {
            greeting: "...",
            responses: {
                'who': "That's not important. What matters is what you seek.",
                'seek': "Power? Treasure? Knowledge? All can be found... for a price.",
                'price': "Not gold. Deeds. Prove yourself worthy.",
                'worthy': "Defeat the troll at the bridge. Then we'll talk.",
                'troll': "A beast of strength and greed. It guards more than just a bridge.",
                'secret': "Behind the waterfall lies a crystal cave. But beware the guardian."
            },
            farewell: "We'll meet again... if you survive."
        },
        isTrader: false
    },
    
    'bard': {
        name: 'Melody the Bard',
        description: 'A cheerful bard strumming a lute.',
        dialogue: {
            greeting: "Greetings, traveler! Care to hear a song or a tale?",
            responses: {
                'song': "*plays a cheerful tune* 🎵 The brave adventurer went forth... 🎵",
                'tale': "I know many tales! The Dragon's Hoard, The Cursed Crypt, The Lost Prince...",
                'dragon': "Ah, not in these parts, thankfully! But I heard rumors of one far to the east.",
                'crypt': "The temple crypt? They say a powerful lich once ruled there.",
                'news': "Travelers speak of strange lights in the deep forest at night.",
                'tip': "If you're looking for treasure, check behind the waterfall. *winks*"
            },
            farewell: "May your adventures be worthy of song!"
        },
        isTrader: false
    },
    
    'druid': {
        name: 'Elara the Druid',
        description: 'A wise druid dressed in robes of leaves and bark.',
        dialogue: {
            greeting: "Nature welcomes you, traveler.",
            responses: {
                'forest': "The forest is ancient and full of secrets. Respect it, and it will respect you.",
                'ancient': "The great tree has stood for a thousand years. It remembers much.",
                'tree': "Seek the Ancient Tree in the deep forest. Touch its bark and be blessed.",
                'animals': "The wolves are hungry. The spiders are territorial. Give them space.",
                'magic': "Nature's magic is everywhere. In the water, the trees, the very air.",
                'help': "Bring me rare mushrooms and herbs, and I'll brew powerful potions for you."
            },
            farewell: "May the forest guide your path."
        },
        isTrader: true,
        shop: {
            name: "Druid's Natural Remedies",
            inventory: [
                { id: 'health_potion', quantity: 10, price: 42 },
                { id: 'mana_potion', quantity: 10, price: 33 },
                { id: 'antidote', quantity: 15, price: 20 },
                { id: 'strength_potion', quantity: 3, price: 80 },
                { id: 'speed_potion', quantity: 3, price: 80 },
                { id: 'spring_water', quantity: 1, price: 150 }
            ],
            buyMultiplier: 0.8,
            specialDialogue: {
                welcome: "Nature provides these remedies.",
                purchase: "Use it wisely.",
                sell: "The forest thanks you.",
                poor: "Nature's gifts require exchange.",
                farewell: "Walk in harmony."
            }
        }
    },
    
    'fisherman': {
        name: 'Old Pete the Fisherman',
        description: 'A weathered old man with a fishing rod.',
        dialogue: {
            greeting: "Ahoy there! Fine day for fishing, isn't it?",
            responses: {
                'fishing': "Been fishing these waters for fifty years. Never gets old.",
                'fish': "The river's full of fish. And other things...",
                'other': "River slimes, mostly. Nasty things. But I've seen stranger.",
                'strange': "Once saw a chest float by. Another time, a sword. The river brings many things.",
                'tip': "If you want to catch fish, you need patience. And a good rod.",
                'rod': "This old rod? Had it for years. Wouldn't trade it for anything."
            },
            farewell: "May your nets be full!"
        },
        isTrader: true,
        shop: {
            name: "Pete's Fishing Supplies",
            inventory: [
                { id: 'fishing_rod', quantity: 3, price: 25 },
                { id: 'fish', quantity: 20, price: 8 },
                { id: 'cooked_fish', quantity: 10, price: 12 }
            ],
            buyMultiplier: 0.5,
            specialDialogue: {
                welcome: "Need fishing supplies?",
                purchase: "That'll help you catch the big ones!",
                sell: "Always looking for fishing supplies.",
                poor: "Fishing supplies cost money, friend.",
                farewell: "Good fishing to you!"
            }
        }
    },
    
    'traveling_merchant': {
        name: 'Zara the Traveling Merchant',
        description: 'An exotic merchant with wares from distant lands.',
        dialogue: {
            greeting: "Greetings! I have exotic goods from far-off lands!",
            responses: {
                'lands': "I've traveled from the desert kingdoms to the frozen north.",
                'exotic': "Rare potions, magical items, things you won't find elsewhere!",
                'magic': "I have scrolls and crystals with mysterious powers.",
                'travel': "The roads are dangerous. Bandits, monsters... but the profit makes it worthwhile.",
                'advice': "Stock up on potions. You never know when you'll need them.",
                'special': "I might have something special... if you have the gold."
            },
            farewell: "Safe travels, friend!"
        },
        isTrader: true,
        shop: {
            name: "Zara's Exotic Goods",
            inventory: [
                { id: 'health_potion', quantity: 8, price: 55 },
                { id: 'greater_health_potion', quantity: 3, price: 120 },
                { id: 'mana_potion', quantity: 8, price: 45 },
                { id: 'spell_scroll', quantity: 2, price: 100 },
                { id: 'crystal_shard', quantity: 5, price: 80 },
                { id: 'smoke_bomb', quantity: 8, price: 35 },
                { id: 'rare_mushroom', quantity: 3, price: 60 }
            ],
            buyMultiplier: 0.4,
            specialDialogue: {
                welcome: "Exotic goods from distant lands!",
                purchase: "An excellent choice from my collection!",
                sell: "Interesting... I might find a buyer for this.",
                poor: "Exotic goods require exotic prices.",
                farewell: "May fortune follow your footsteps!"
            }
        }
    }
};

export class NPC {
    constructor(id) {
        const data = NPC_DATA[id];
        if (!data) {
            throw new Error(`Unknown NPC: ${id}`);
        }
        
        this.id = id;
        Object.assign(this, data);
        
        if (this.shop) {
            this.shop.gold = 500 + Math.floor(Math.random() * 500);
        }
    }
    
    talk(topic = 'greeting') {
        if (topic === 'greeting') {
            return this.dialogue.greeting;
        }
        
        if (topic === 'farewell' || topic === 'bye' || topic === 'goodbye') {
            return this.dialogue.farewell;
        }
        
        // Check for response to topic
        const response = this.dialogue.responses[topic.toLowerCase()];
        if (response) {
            return response;
        }
        
        // Check partial matches
        for (let key in this.dialogue.responses) {
            if (key.includes(topic.toLowerCase()) || topic.toLowerCase().includes(key)) {
                return this.dialogue.responses[key];
            }
        }
        
        return "I don't know anything about that.";
    }
    
    canTrade() {
        return this.isTrader;
    }
    
    getShopInventory() {
        if (!this.shop) return [];
        return this.shop.inventory;
    }
    
    buyFromPlayer(item, quantity, playerGold) {
        if (!this.shop) return { success: false, message: "I'm not a trader." };
        
        const itemData = item;
        const sellPrice = Math.floor((itemData.value || 10) * this.shop.buyMultiplier);
        const totalPrice = sellPrice * quantity;
        
        if (this.shop.gold < totalPrice) {
            return { success: false, message: "I don't have enough gold for that." };
        }
        
        this.shop.gold -= totalPrice;
        
        // Add item to merchant inventory
        const existingItem = this.shop.inventory.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.shop.inventory.push({ id: item.id, quantity: quantity, price: Math.floor((itemData.value || 10) * 1.5) });
        }
        
        return { success: true, goldEarned: totalPrice, message: this.shop.specialDialogue.sell };
    }
    
    sellToPlayer(itemId, quantity) {
        if (!this.shop) return { success: false, message: "I'm not a trader." };
        
        const shopItem = this.shop.inventory.find(i => i.id === itemId);
        if (!shopItem) {
            return { success: false, message: "I don't have that item." };
        }
        
        if (shopItem.quantity < quantity) {
            return { success: false, message: `I only have ${shopItem.quantity} of those.` };
        }
        
        const totalPrice = shopItem.price * quantity;
        
        return { 
            success: true, 
            price: totalPrice, 
            available: shopItem.quantity 
        };
    }
    
    completePurchase(itemId, quantity) {
        const shopItem = this.shop.inventory.find(i => i.id === itemId);
        shopItem.quantity -= quantity;
        
        if (shopItem.quantity === 0) {
            const index = this.shop.inventory.indexOf(shopItem);
            this.shop.inventory.splice(index, 1);
        }
        
        this.shop.gold += shopItem.price * quantity;
    }
}