import { Compass, Hammer, Languages } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'

const unlockIcons = [Hammer, Compass, Languages]
export function RecentUnlocks() {
  const { state } = useLifeRPG(); const { t, localize } = useLanguage()
  return <section className="panel unlocks-panel"><div className="section-heading"><h2>{t('recentUnlocks')}</h2><span>{t('preview')}</span></div><div className="unlock-grid">{state.achievements.map((item, index) => { const Icon = unlockIcons[index] ?? Compass; return <article key={item.id}><div><Icon /></div><strong>{localize(item.name)}</strong><small>{localize(item.description)}</small></article> })}</div></section>
}
