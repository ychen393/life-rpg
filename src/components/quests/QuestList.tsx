import type { Quest, Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { QuestCard } from './QuestCard'
import { QuestEmptyState } from './QuestEmptyState'

interface Props{quests:Quest[];skills:Skill[];onToggle:(quest:Quest)=>void;onEdit:(quest:Quest)=>void;onDelete:(quest:Quest)=>void}
export function QuestList({quests,skills,onToggle,onEdit,onDelete}:Props){const{t}=useLanguage();if(!quests.length)return <QuestEmptyState/>;const active=quests.filter(quest=>!quest.completed);const completed=quests.filter(quest=>quest.completed);const section=(title:string,items:Quest[])=><section className="quest-group"><h2>{title}<span>{items.length}</span></h2><div>{items.map(quest=><QuestCard key={quest.id} quest={quest} skill={skills.find(skill=>skill.id===quest.linkedSkillId)} onToggle={()=>onToggle(quest)} onEdit={()=>onEdit(quest)} onDelete={()=>onDelete(quest)}/>)}</div></section>;return <>{section(t('activeQuests'),active)}{completed.length>0&&section(t('completedQuests'),completed)}</>}
