import { BookOpen, Bot, Dumbbell, Sparkles, TerminalSquare } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'

const questIcons = [BookOpen, TerminalSquare, Bot, Dumbbell, Sparkles]

export function QuestPreview() {
  const { state } = useLifeRPG()
  const { t, localize } = useLanguage()
  return (
    <section className="panel quests-preview">
      <div className="section-heading"><div><h2>{t('todaysQuests')}</h2><span>{t('preview')}</span></div><small className="read-only-tag">{t('viewOnly')}</small></div>
      <div className="quest-list">{state.quests.map((quest, index) => { const Icon = questIcons[index] ?? Sparkles; return (
        <div className={`quest-row${quest.completed ? ' completed' : ''}`} key={quest.id}><span className="quest-check">{quest.completed ? '✓' : ''}</span><Icon /><div><strong>{localize(quest.title)}</strong><small>+{quest.xpReward} XP</small></div></div>
      ) })}</div>
    </section>
  )
}
