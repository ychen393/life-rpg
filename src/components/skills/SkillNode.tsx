import { LockKeyhole } from 'lucide-react'
import type { Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { calculateSkillProgress } from '../../utils/skill-progression'
import { SkillIcon } from './skill-icons'

export function SkillNode({ skill, selected, onSelect }: { skill: Skill; selected: boolean; onSelect: () => void }) {
  const { t, localize } = useLanguage(); const progress = calculateSkillProgress(skill.xp)
  return <button className={`skill-node category-${skill.category}${skill.locked?' is-locked':''}${selected?' selected':''}`} onClick={onSelect} aria-label={`${t('inspectSkill')}: ${localize(skill.name)}`}>
    <span className="node-orbit"><span className="node-icon">{skill.locked?<LockKeyhole />:<SkillIcon name={skill.icon} />}</span></span>
    <span className="node-copy"><strong>{localize(skill.name)}</strong><small>{skill.locked?t('undiscovered'):`Lv.${skill.level}`}</small></span>
    {!skill.locked&&<span className="node-progress"><i style={{width:`${progress.percentage}%`}}/><em>{skill.xp} / {progress.nextThreshold} XP</em></span>}
  </button>
}
