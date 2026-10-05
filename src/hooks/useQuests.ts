import type { Quest } from '../models/life-rpg'
import { completeQuest, createQuest, deleteQuest, uncompleteQuest, updateQuest } from '../utils/quest-progression'
import { useLifeRPG } from './life-rpg-context'

export function useQuests() {
  const { state, setState } = useLifeRPG()
  return {
    quests: state.quests,
    complete: (id: string) => setState((current) => completeQuest(current, id)),
    uncomplete: (id: string) => setState((current) => uncompleteQuest(current, id)),
    create: (quest: Quest) => setState((current) => createQuest(current, quest)),
    update: (quest: Quest) => setState((current) => updateQuest(current, quest)),
    remove: (id: string) => setState((current) => deleteQuest(current, id)),
  }
}
