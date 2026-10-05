import { Award, BookOpen, Compass, Map, RotateCcw, Sparkles, Swords } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useLifeRPG } from '../hooks/life-rpg-context'
import { LanguageToggle } from './LanguageToggle'

const navItems = [
  ['/', 'dashboard', BookOpen], ['/skills', 'skillTree', Sparkles], ['/quests', 'quests', Swords],
  ['/achievements', 'achievements', Award], ['/roadmap', 'roadmap', Map],
] as const

export function AppShell() {
  const { state, resetDemoData } = useLifeRPG()
  const { t } = useLanguage()
  const reset = () => { if (window.confirm(t('resetConfirm'))) resetDemoData() }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Life RPG home">
          <span className="brand-mark"><Compass size={20} /></span>
          <span><strong>Life RPG</strong><small>人生技能书</small></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(([to, key, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'}><Icon size={19} /><span><b>{t(key)}</b><small>{key === 'dashboard' ? 'Dashboard' : key === 'skillTree' ? 'Skill Tree' : key === 'quests' ? 'Daily Quests' : key === 'achievements' ? 'Achievements' : 'Roadmap'}</small></span></NavLink>
          ))}
        </nav>
        <div className="sidebar-release"><strong>{t('versionLabel')}</strong><p>{t('localStorageNotice')}</p></div>
        <div className="sidebar-art" aria-hidden="true"><div className="sun-disc" /><div className="arch-window"><i /><i /><i /></div><p>A life with<br />more freedom<br />and optionality.</p></div>
      </aside>
      <header className="topbar">
        <div className="top-actions">
          <LanguageToggle />
          <div className="level-pill"><span>Lv.{state.character.level}</span><small>{state.character.xp} XP</small></div>
          <button className="icon-button" onClick={reset} title={t('resetDemo')} aria-label={t('resetDemo')}><RotateCcw size={17} /></button>
        </div>
      </header>
      <main><Outlet /><footer className="mobile-storage-note"><strong>{t('versionLabel')}</strong><span>{t('localStorageNotice')}</span></footer></main>
    </div>
  )
}
