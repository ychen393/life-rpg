import { AttributeRadar } from '../components/dashboard/AttributeRadar'
import { CharacterHero } from '../components/dashboard/CharacterHero'
import { CharacterStats } from '../components/dashboard/CharacterStats'
import { MainQuestCard } from '../components/dashboard/MainQuestCard'
import { QuestPreview } from '../components/dashboard/QuestPreview'
import { RecentUnlocks } from '../components/dashboard/RecentUnlocks'
import { RoadmapPreview } from '../components/dashboard/RoadmapPreview'
import { SkillPreview } from '../components/dashboard/SkillPreview'

export function DashboardPage() {
  return <div className="dashboard-page"><CharacterHero /><CharacterStats /><div className="dashboard-grid"><AttributeRadar /><QuestPreview /><div className="dashboard-side"><MainQuestCard /><RecentUnlocks /></div><SkillPreview /><RoadmapPreview /></div></div>
}
