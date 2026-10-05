import type { Character } from '../models/life-rpg'

const CHARACTER_LEVEL_STEP = 500
const BASE_LEVEL = 21

export function updateCharacterXP(character: Character, delta: number): Character {
  const xp = Math.max(0, character.xp + delta)
  let level = character.level
  let xpToNextLevel = character.xpToNextLevel
  while (xp >= xpToNextLevel) {
    level += 1
    xpToNextLevel += CHARACTER_LEVEL_STEP
  }
  while (level > BASE_LEVEL && xp < xpToNextLevel - CHARACTER_LEVEL_STEP) {
    level -= 1
    xpToNextLevel -= CHARACTER_LEVEL_STEP
  }
  return { ...character, xp, level, xpToNextLevel }
}
