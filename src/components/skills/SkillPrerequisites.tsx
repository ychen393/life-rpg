import { CheckCircle2, CircleDashed } from 'lucide-react'
import type { Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'

export function SkillPrerequisites({ skill }: { skill: Skill }) {
  const { t, localize } = useLanguage()
  return <section className="detail-section"><h3>{t('prerequisites')}</h3>{skill.prerequisites.length===0?<p className="detail-empty"><CheckCircle2 />{t('noPrerequisites')}</p>:<ul className="prerequisite-list">{skill.prerequisites.map((item,index)=><li key={`${item.label.en}-${index}`}><CircleDashed /><span>{localize(item.label)}{item.suggested&&<small>{t('suggested')}</small>}</span></li>)}</ul>}</section>
}
