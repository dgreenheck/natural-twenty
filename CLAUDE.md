# Claude Development Guidelines for D&D Text Game

## Core Principles

### 1. Incremental Development
- Build one system at a time and test it before moving to the next
- Start with the most fundamental systems (player, basic commands, game loop)
- Each feature should be functional before adding complexity

### 2. Simplicity First
- Implement the simplest version that works, then enhance
- Avoid over-engineering early - complexity can be added later
- Use straightforward data structures (objects, arrays) over complex patterns initially

### 3. Testing Strategy
- Create a test command system early (`/test combat`, `/test inventory`, etc.)
- Add console logging for debugging that can be toggled
- Test each system in isolation before integration
- Include edge cases (empty inventory, zero HP, invalid commands)

## Development Order

1. **Phase 1: Foundation**
   - HTML structure with terminal UI
   - Command parser and basic input handling
   - Game state management
   - Player character with basic stats

2. **Phase 2: Core Mechanics**
   - Simple map with 3-5 rooms for testing
   - Basic movement commands
   - Simple combat with 1-2 enemy types
   - Health and death mechanics

3. **Phase 3: Items & Inventory**
   - Basic inventory system
   - Equipable weapons/armor
   - Consumable items (potions)
   - Item pickup/drop commands

4. **Phase 4: Expansion**
   - Trading system with one merchant
   - Save/load functionality
   - More enemies and items
   - Expanded map

5. **Phase 5: Polish**
   - Quest system
   - Character classes and abilities
   - Balance tuning
   - UI improvements

## Technical Guidelines

### Code Organization
- One class/system per file
- Clear separation of concerns
- Consistent naming conventions
- Comments only for complex logic

### State Management
- Centralized game state object
- Immutable updates where possible
- Clear state validation

### Error Handling
- Graceful handling of invalid commands
- Clear error messages to player
- Never crash the game loop

### Performance Considerations
- Avoid deep nesting in game loop
- Efficient map navigation (use coordinates, not searching)
- Lazy loading for large data sets

## Testing Checklist

Before considering a feature complete:
- [ ] Feature works with valid input
- [ ] Feature handles invalid input gracefully
- [ ] Feature integrates with existing systems
- [ ] No console errors during normal use
- [ ] State persists correctly
- [ ] UI updates reflect state changes

## Common Pitfalls to Avoid

1. **Don't** create all files at once - build incrementally
2. **Don't** implement advanced features before basics work
3. **Don't** forget to test edge cases (zero, negative, overflow)
4. **Don't** couple systems too tightly - maintain modularity
5. **Don't** skip error handling - always validate input

## Success Criteria

A system is complete when:
1. It performs its core function reliably
2. It handles errors gracefully
3. It integrates cleanly with other systems
4. The player can interact with it intuitively
5. The code is maintainable and extensible

## Debug Commands

Implement these early for testing:
- `/heal` - Restore player HP
- `/damage [amount]` - Deal damage to player
- `/give [item]` - Add item to inventory
- `/gold [amount]` - Add gold
- `/teleport [location]` - Move to location
- `/spawn [enemy]` - Spawn enemy for combat
- `/reset` - Reset game state

## Commit Strategy

When using version control:
- Commit after each working feature
- Use clear commit messages
- Test before committing
- Keep commits atomic (one feature per commit)

## Final Notes

- Start simple, iterate often
- Test frequently during development
- Focus on working code over perfect code
- Player experience over technical elegance
- When stuck, implement the simplest solution that works