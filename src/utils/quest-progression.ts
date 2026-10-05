import type { LifeRPGState, Quest } from '../models/life-rpg'
import { updateCharacterXP } from './character-progression'
import { updateSkillXP } from './skill-progression'

const questSource = (quest: Quest, undone = false) => ({
  zh: `${undone ? '撤销任务' : '任务'}：${quest.title.zh}`,
  en: `${undone ? 'Quest undone' : 'Quest'}: ${quest.title.en}`,
})

const updateCounts = (state: LifeRPGState, quests: Quest[]): LifeRPGState => ({
  ...state,
  quests,
  character: {
    ...state.character,
    completedQuestCount: quests.filter((quest) => quest.completed).length,
    questsTodayTotal: quests.length,
  },
})

export function completeQuest(state: LifeRPGState, questId: string, timestamp = new Date().toISOString()): LifeRPGState {
  const quest = state.quests.find((item) => item.id === questId)
  if (!quest || quest.completed) return state
  const skillId = quest.linkedSkillId && state.skills.some((skill) => skill.id === quest.linkedSkillId) ? quest.linkedSkillId : undefined
  const completionReward = { characterXp: quest.xpReward, skillXp: skillId ? quest.xpReward : 0, skillId }
  const quests = state.quests.map((item) => item.id === questId ? { ...item, completed: true, completedAt: timestamp, completionReward } : item)
  const next = updateCounts(state, quests)
  return {
    ...next,
    character: { ...updateCharacterXP(next.character, completionReward.characterXp), completedQuestCount: next.character.completedQuestCount },
    skills: skillId ? state.skills.map((skill) => skill.id === skillId ? updateSkillXP(skill, completionReward.skillXp, { createdAt: timestamp, source: questSource(quest) }) : skill) : state.skills,
  }
}

export function uncompleteQuest(state: LifeRPGState, questId: string, timestamp = new Date().toISOString()): LifeRPGState {
  const quest = state.quests.find((item) => item.id === questId)
  if (!quest || !quest.completed || !quest.completionReward) return state
  const reward = quest.completionReward
  const quests = state.quests.map((item) => item.id === questId ? { ...item, completed: false, completedAt: undefined, completionReward: undefined } : item)
  const next = updateCounts(state, quests)
  return {
    ...next,
    character: { ...updateCharacterXP(next.character, -reward.characterXp), completedQuestCount: next.character.completedQuestCount },
    skills: reward.skillId ? state.skills.map((skill) => skill.id === reward.skillId ? updateSkillXP(skill, -reward.skillXp, { createdAt: timestamp, source: questSource(quest, true) }) : skill) : state.skills,
  }
}

export function createQuest(state: LifeRPGState, quest: Quest): LifeRPGState {
  return updateCounts(state, [...state.quests, quest])
}

export function updateQuest(state: LifeRPGState, quest: Quest): LifeRPGState {
  return updateCounts(state, state.quests.map((item) => item.id === quest.id ? { ...quest, completionReward: item.completionReward, completedAt: item.completedAt, completed: item.completed } : item))
}

export function deleteQuest(state: LifeRPGState, questId: string): LifeRPGState {
  const quest = state.quests.find((item) => item.id === questId)
  if (!quest) return state
  const reversed = quest.completed ? uncompleteQuest(state, questId) : state
  return updateCounts(reversed, reversed.quests.filter((item) => item.id !== questId))
}
