import { Award, Compass, LockKeyhole, MapPinned, Medal, Milestone, Sparkles, Stamp } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

type ComingSoonVariant = 'achievements' | 'roadmap'

const pageConfig = {
  achievements: {
    status: 'achievementComingSoonStatus',
    title: 'achievementComingSoonTitle',
    subtitle: 'achievementComingSoonSubtitle',
    description: 'achievementComingSoonDescription',
    Icon: Award,
  },
  roadmap: {
    status: 'roadmapComingSoonStatus',
    title: 'roadmapComingSoonTitle',
    subtitle: 'roadmapComingSoonSubtitle',
    description: 'roadmapComingSoonDescription',
    Icon: Compass,
  },
} as const

export function ComingSoonPage({ variant }: { variant: ComingSoonVariant }) {
  const { t } = useLanguage()
  const config = pageConfig[variant]
  const Icon = config.Icon

  return (
    <section className={`coming-soon-page coming-soon-${variant}`}>
      <div className="coming-soon-copy">
        <div className="coming-soon-status"><Sparkles />{t(config.status)}</div>
        <div className="coming-soon-emblem"><Icon /></div>
        <h1>{t(config.title)}</h1>
        <h2>{t(config.subtitle)}</h2>
        <p>{t(config.description)}</p>
        {variant === 'achievements' && <p>{t('achievementComingSoonNote')}</p>}
        <div className="coming-soon-progress" aria-hidden="true"><span /><i /><i /><i /></div>
      </div>

      {variant === 'achievements' ? (
        <div className="achievement-archive" aria-hidden="true">
          <div className="archive-constellation"><i /><i /><i /><i /></div>
          <div className="archive-medal"><Medal /></div>
          <div className="archive-stamp"><Stamp /><span>LIFE<br />MILESTONE</span></div>
          <div className="archive-locked"><LockKeyhole /><small>ARCHIVE 05</small></div>
        </div>
      ) : (
        <div className="roadmap-journal" aria-hidden="true">
          <div className="map-coordinates">31.2304° N<br />121.4737° E</div>
          <div className="route-line"><i /><i /><i /><i /></div>
          <div className="roadmap-postcard"><MapPinned /><span>THE NEXT CHAPTER</span></div>
          <div className="map-compass"><Compass /></div>
          <Milestone className="map-milestone" />
        </div>
      )}
    </section>
  )
}
