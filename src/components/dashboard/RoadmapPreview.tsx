import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'

export function RoadmapPreview() {
  const { state } = useLifeRPG(); const { t, localize } = useLanguage()
  return <section className="panel roadmap-preview"><div className="section-heading"><div><h2>{t('roadmapPreview')}</h2><span>{t('preview')}</span></div></div><div className="roadmap-list">{state.roadmap.map((item) => <div key={item.id}><b>{item.ageOrYear}</b><i /><span>{localize(item.title)}</span></div>)}</div></section>
}
