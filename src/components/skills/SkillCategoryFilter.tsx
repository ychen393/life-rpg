import { Brain, BriefcaseBusiness, Compass, Dumbbell, Languages, Palette, Sparkles, WalletCards } from 'lucide-react'
import type { SkillCategory } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'

export type CategoryFilter = 'all' | SkillCategory
const filters = [
  ['all','allCategories',Sparkles],['intelligence','intelligence',Brain],['languages','languages',Languages],['adventure','adventure',Compass],
  ['aesthetics','aesthetics',Palette],['fitness','fitness',Dumbbell],['career','career',BriefcaseBusiness],['freedom','freedom',WalletCards],
] as const

export function SkillCategoryFilter({ value, onChange }: { value: CategoryFilter; onChange: (value: CategoryFilter) => void }) {
  const { t } = useLanguage()
  return <div className="skill-filters" role="tablist">{filters.map(([id,key,Icon]) => <button role="tab" aria-selected={value===id} className={value===id?'active':''} onClick={()=>onChange(id)} key={id}><Icon />{t(key)}</button>)}</div>
}
