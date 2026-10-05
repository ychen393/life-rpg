import { Award, Flame, FolderKanban, SquareCheckBig } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'

export function CharacterStats() {
  const { state: { character } } = useLifeRPG()
  const { t } = useLanguage()
  const stats = [
    [Flame, character.streak, t('dayStreak')], [SquareCheckBig, `${character.completedQuestCount} / ${character.questsTodayTotal}`, t('questsToday')],
    [Award, character.unlockedAchievementCount, t('achievements')], [FolderKanban, character.activeProjectCount, t('activeProjects')],
  ] as const
  return (
    <section className="character-stats">
      {stats.map(([Icon, value, label]) => <div className="stat-item" key={label}><Icon /><strong>{value}</strong><span>{label}</span></div>)}
      <blockquote>“{t('journeyNote')}”</blockquote>
    </section>
  )
}
