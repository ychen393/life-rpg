import { Clock3, Edit3, Link2, Trash2 } from 'lucide-react'
import type { Quest, Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { QuestCompletionControl } from './QuestCompletionControl'
import { QuestDifficultyBadge } from './QuestDifficultyBadge'
import { QuestRewardBadge } from './QuestRewardBadge'

interface Props { quest: Quest; skill?: Skill; onToggle:()=>void; onEdit:()=>void; onDelete:()=>void }
export function QuestCard({quest,skill,onToggle,onEdit,onDelete}:Props){
  const {t,localize,language}=useLanguage(); const time=quest.completedAt?new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{hour:'2-digit',minute:'2-digit'}).format(new Date(quest.completedAt)):null
  return <article className={`quest-card${quest.completed?' is-completed':''}`}><QuestCompletionControl completed={quest.completed} onToggle={onToggle}/><div className="quest-card-body"><div className="quest-card-title"><div><h2>{localize(quest.title)}</h2>{localize(quest.description)&&<p>{localize(quest.description)}</p>}</div><QuestRewardBadge value={quest.xpReward}/></div><div className="quest-meta"><QuestDifficultyBadge difficulty={quest.difficulty}/><span><Link2/>{skill?localize(skill.name):t('noLinkedSkill')}</span>{time&&<span><Clock3/>{t('completedAt')} {time}</span>}{quest.completed&&quest.completionReward&&<span className="rewarded-note">{t('questRewarded')}: +{quest.completionReward.characterXp} XP</span>}</div></div><div className="quest-card-actions"><button onClick={onEdit} aria-label={t('editQuest')} title={t('editQuest')}><Edit3/></button><button onClick={onDelete} aria-label={t('deleteQuest')} title={t('deleteQuest')}><Trash2/></button></div></article>
}
