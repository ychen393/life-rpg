import type { Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'

export function SkillLevelMilestones({ skill }: { skill: Skill }) {
  const { t, localize } = useLanguage()
  return <section className="detail-section"><h3>{t('levelMilestones')}</h3><div className="milestone-list">{skill.levelMilestones.map((milestone,level)=><div className={`${level===skill.level?'current':''}${level<skill.level?' complete':''}`} key={level}><span>Lv.{level}</span><i/><p>{localize(milestone)}</p></div>)}</div></section>
}
