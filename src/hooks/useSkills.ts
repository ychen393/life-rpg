import { useLifeRPG } from './life-rpg-context'
import { setSkillLevel, updateSkillXP } from '../utils/skill-progression'

export function useSkills() {
  const { state, setState } = useLifeRPG()
  const updateOne = (skillId: string, updater: (skill: typeof state.skills[number]) => typeof state.skills[number]) => {
    setState((current) => ({ ...current, skills: current.skills.map((skill) => skill.id === skillId ? updater(skill) : skill) }))
  }
  return {
    skills: state.skills,
    adjustXP: (skillId: string, delta: number) => updateOne(skillId, (skill) => updateSkillXP(skill, delta)),
    changeLevel: (skillId: string, level: number) => updateOne(skillId, (skill) => setSkillLevel(skill, level)),
    toggleLocked: (skillId: string) => updateOne(skillId, (skill) => ({ ...skill, locked: !skill.locked })),
  }
}
