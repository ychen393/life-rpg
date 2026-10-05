import { Database, Languages, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

export function PhaseOnePage() {
  const { t } = useLanguage()
  return (
    <section className="phase-page">
      <div className="eyebrow">LIFE RPG · FOUNDATION</div>
      <h1>{t('phaseOneTitle')}</h1>
      <p>{t('phaseOneBody')}</p>
      <div className="foundation-grid">
        <article><ShieldCheck /><strong>{t('localFirst')}</strong><span>localStorage</span></article>
        <article><Languages /><strong>{t('bilingual')}</strong><span>中文 / English</span></article>
        <article><Database /><strong>{t('persistent')}</strong><span>{t('overallProgress')}</span></article>
      </div>
      <div className="next-chapter"><span>02</span><div><small>{t('comingSoon')}</small><strong>{t('dashboard')}</strong></div></div>
    </section>
  )
}
