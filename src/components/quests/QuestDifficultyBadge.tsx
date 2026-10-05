import type { Quest } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'

export function QuestDifficultyBadge({ difficulty }: { difficulty: Quest['difficulty'] }) {
  const { t } = useLanguage()
  return <span className={`difficulty-badge difficulty-${difficulty}`}>{t(difficulty)}</span>
}
