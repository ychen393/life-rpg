import { Compass } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function MainQuestCard() {
  const { t } = useLanguage()
  return (
    <section className="main-quest-card"><div className="main-quest-sky"><span className="main-quest-sun" /><i /><i /><i /></div><div className="main-quest-copy"><span><Compass size={15} /> {t('mainQuest')}</span><h2>{t('mainQuestTitle')}</h2><p>“{t('mainQuestDescription')}”</p></div></section>
  )
}
