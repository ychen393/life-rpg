import { Sparkles } from 'lucide-react'

export function QuestRewardBadge({ value }: { value: number }) {
  return <span className="quest-reward-badge"><Sparkles />+{value} XP</span>
}
