import { History } from 'lucide-react'
import type { Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'

export function SkillXPHistory({ skill }: { skill: Skill }) {
  const { t, localize, language } = useLanguage()
  const formatTime = (value: string) => new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{hour:'2-digit',minute:'2-digit'}).format(new Date(value))
  return <section className="detail-section"><h3>{t('xpHistory')}</h3>{skill.xpHistory.length===0?<p className="detail-empty"><History />{t('noXPHistory')}</p>:<div className="history-list">{skill.xpHistory.slice(0,6).map(item=><div key={item.id}><strong className={item.amount>0?'positive':'negative'}>{item.amount>0?'+':''}{item.amount} XP</strong><span>{localize(item.source)}</span><time>{t('today')} {formatTime(item.createdAt)}</time></div>)}</div>}</section>
}
