import type { LocalizedText, Skill } from '../models/life-rpg'

export const SKILL_LEVEL_THRESHOLDS = [0, 100, 200, 400, 700, 1000] as const

export function getSkillThreshold(level: number): number {
  const normalized = Math.min(5, Math.max(0, Math.floor(level)))
  return SKILL_LEVEL_THRESHOLDS[normalized]
}

export function getLevelFromXP(xp: number): number {
  const safeXP = Math.max(0, xp)
  for (let level = SKILL_LEVEL_THRESHOLDS.length - 1; level >= 0; level -= 1) {
    if (safeXP >= SKILL_LEVEL_THRESHOLDS[level]) return level
  }
  return 0
}

export function calculateSkillProgress(xp: number) {
  const safeXP = Math.max(0, xp)
  const level = getLevelFromXP(safeXP)
  const previousThreshold = getSkillThreshold(level)
  const nextThreshold = getSkillThreshold(Math.min(5, level + 1))
  const percentage = level === 5 ? 100 : Math.min(100, (safeXP / Math.max(1, nextThreshold)) * 100)
  return { level, xp: safeXP, previousThreshold, nextThreshold, percentage }
}

interface SkillXPOptions { createdAt?: string; source?: LocalizedText }

export function updateSkillXP(skill: Skill, delta: number, options: SkillXPOptions = {}): Skill {
  const createdAt = options.createdAt ?? new Date().toISOString()
  const xp = Math.min(getSkillThreshold(skill.maxLevel), Math.max(0, skill.xp + delta))
  const actualDelta = xp - skill.xp
  const level = getLevelFromXP(xp)
  if (actualDelta === 0) return skill
  return {
    ...skill,
    xp,
    level,
    xpToNextLevel: getSkillThreshold(Math.min(skill.maxLevel, level + 1)),
    xpHistory: [{
      id: `xp-${createdAt}-${Math.random().toString(36).slice(2, 8)}`,
      amount: actualDelta,
      source: options.source ?? (actualDelta > 0 ? { zh: '手动调整', en: 'Manual adjustment' } : { zh: '手动修正', en: 'Manual correction' }),
      createdAt,
    }, ...skill.xpHistory].slice(0, 30),
  }
}

export function setSkillLevel(skill: Skill, level: number): Skill {
  const normalized = Math.min(skill.maxLevel, Math.max(0, Math.floor(level)))
  const targetXP = getSkillThreshold(normalized)
  return updateSkillXP(skill, targetXP - skill.xp)
}
