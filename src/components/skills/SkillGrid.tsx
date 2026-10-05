import type { Skill } from '../../models/life-rpg'
import type { CSSProperties } from 'react'
import { SkillNode } from './SkillNode'

export function SkillGrid({ skills, selectedId, onSelect }: { skills: Skill[]; selectedId?: string; onSelect: (id: string) => void }) {
  return <div className="skill-map">{skills.map((skill,index)=><div className="skill-map-item" style={{'--node-index':index} as CSSProperties} key={skill.id}><SkillNode skill={skill} selected={skill.id===selectedId} onSelect={()=>onSelect(skill.id)}/></div>)}</div>
}
