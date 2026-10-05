export type Language = 'zh' | 'en'
export type LocalizedText = { zh: string; en: string }
export type SkillCategory = 'intelligence' | 'languages' | 'adventure' | 'aesthetics' | 'fitness' | 'career' | 'freedom'

export interface Character {
  name: string
  level: number
  role: LocalizedText
  mainQuest: LocalizedText
  xp: number
  xpToNextLevel: number
  streak: number
  completedQuestCount: number
  questsTodayTotal: number
  unlockedAchievementCount: number
  activeProjectCount: number
}

export interface Attribute {
  id: string
  name: LocalizedText
  value: number
}

export interface Skill {
  id: string
  category: SkillCategory
  name: LocalizedText
  description: LocalizedText
  level: number
  xp: number
  xpToNextLevel: number
  maxLevel: number
  locked: boolean
  prerequisites: SkillPrerequisite[]
  levelMilestones: LocalizedText[]
  questIds: string[]
  icon: string
  xpHistory: XpEvent[]
}

export interface SkillPrerequisite {
  skillId?: string
  minLevel?: number
  label: LocalizedText
  suggested?: boolean
}

export interface XpEvent {
  id: string
  amount: number
  source: LocalizedText
  createdAt: string
}

export interface Quest {
  id: string
  title: LocalizedText
  description: LocalizedText
  xpReward: number
  linkedSkillId?: string
  completed: boolean
  difficulty: 'easy' | 'normal' | 'hard' | 'epic'
  category?: SkillCategory
  completedAt?: string
  createdAt: string
  completionReward?: QuestCompletionReward
}

export interface QuestCompletionReward {
  characterXp: number
  skillXp: number
  skillId?: string
}

export interface Achievement {
  id: string
  name: LocalizedText
  description: LocalizedText
  state: 'locked' | 'progress' | 'unlocked'
  progress: number
  unlockedAt?: string
  icon: string
}

export interface RoadmapMilestone {
  id: string
  ageOrYear: string
  title: LocalizedText
  description: LocalizedText
  order: number
}

export interface LifeRPGState {
  schemaVersion: number
  language: Language
  character: Character
  attributes: Attribute[]
  skills: Skill[]
  quests: Quest[]
  achievements: Achievement[]
  roadmap: RoadmapMilestone[]
}
