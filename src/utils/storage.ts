import { createSeedState, SCHEMA_VERSION } from '../data/seed'
import type { LifeRPGState } from '../models/life-rpg'

export const STORAGE_KEY = 'life-rpg:state'

function isLifeRPGState(value: unknown): value is LifeRPGState {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<LifeRPGState>
  return candidate.schemaVersion === SCHEMA_VERSION
    && (candidate.language === 'zh' || candidate.language === 'en')
    && Boolean(candidate.character && typeof candidate.character.xp === 'number')
    && Array.isArray(candidate.attributes)
    && Array.isArray(candidate.skills)
    && Array.isArray(candidate.quests)
    && Array.isArray(candidate.achievements)
    && Array.isArray(candidate.roadmap)
}

export function loadState(): LifeRPGState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return createSeedState()
    const parsed: unknown = JSON.parse(stored)
    return isLifeRPGState(parsed) ? parsed : createSeedState()
  } catch {
    return createSeedState()
  }
}

export function saveState(state: LifeRPGState): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* Storage can be unavailable or full. */ }
}

export function clearState(): void {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* Reset still restores in-memory seed state. */ }
}
