import { Code2, Coins, Languages, LockKeyhole, Plane, Sparkles, WandSparkles } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'
import { XPProgress } from './XPProgress'

const icons = { Code2, Sparkles, Languages, WandSparkles, Coins, Plane }
export function SkillPreview() {
  const { state } = useLifeRPG(); const { t, localize } = useLanguage()
  return <section className="panel skill-preview"><div className="section-heading"><div><h2>{t('skillPreview')}</h2><span>{t('preview')}</span></div><small className="read-only-tag">{t('viewOnly')}</small></div><div className="skill-strip">{state.skills.slice(0,6).map((skill) => { const Icon = icons[skill.icon as keyof typeof icons] ?? Sparkles; return <article className={skill.locked ? 'locked' : ''} key={skill.id}><div className="skill-icon"><Icon /></div><strong>{localize(skill.name)}</strong><span>{skill.locked ? <><LockKeyhole size={12} /> {t('locked')}</> : `Lv.${skill.level}`}</span>{!skill.locked && <><small>{skill.xp} / {skill.xpToNextLevel} XP</small><XPProgress value={skill.xp} max={skill.xpToNextLevel} compact /></>}</article>})}</div></section>
}
