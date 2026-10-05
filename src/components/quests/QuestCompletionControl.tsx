import { Check } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function QuestCompletionControl({ completed, onToggle }: { completed: boolean; onToggle: () => void }) {
  const { t } = useLanguage()
  return <button className={`completion-control${completed?' completed':''}`} onClick={onToggle} aria-label={completed?t('undo'):t('complete')} title={completed?t('undo'):t('complete')}>{completed&&<Check />}</button>
}
