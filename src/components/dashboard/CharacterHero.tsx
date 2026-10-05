import { Plane, Sun } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'
import { XPProgress } from './XPProgress'

export function CharacterHero() {
  const { state } = useLifeRPG()
  const { t, localize } = useLanguage()
  const { character } = state
  return (
    <section className="character-hero">
      <div className="hero-copy">
        <p className="hero-greeting">{t('goodMorning')}</p>
        <div className="hero-name-row"><h1>{character.name}</h1><Sun size={32} /></div>
        <div className="hero-role"><strong>Lv. {character.level}</strong><span>{localize(character.role)}</span></div>
        <blockquote>“{localize(character.mainQuest)}。”</blockquote>
        <div className="hero-xp-label"><span>{character.xp.toLocaleString()} / {character.xpToNextLevel.toLocaleString()} XP</span><small>Lv.{character.level + 1}</small></div>
        <XPProgress value={character.xp} max={character.xpToNextLevel} />
      </div>
      <div className="hero-landscape" aria-hidden="true">
        <div className="hero-sun" /><div className="hero-sea" /><div className="mountain mountain-one" /><div className="mountain mountain-two" />
        <div className="postcard"><Plane /><span>FLY BEYOND</span></div>
        <p>{t('travelWhisper')}</p>
      </div>
    </section>
  )
}
