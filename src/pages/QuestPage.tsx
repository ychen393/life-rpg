import { useState } from 'react'
import { Plus, ScrollText, Sparkles } from 'lucide-react'
import type { Quest } from '../models/life-rpg'
import { QuestEditor } from '../components/quests/QuestEditor'
import { QuestList } from '../components/quests/QuestList'
import { useLanguage } from '../hooks/useLanguage'
import { useLifeRPG } from '../hooks/life-rpg-context'
import { useQuests } from '../hooks/useQuests'

export function QuestPage(){const{state}=useLifeRPG();const{quests,complete,uncomplete,create,update,remove}=useQuests();const{t}=useLanguage();const[editorOpen,setEditorOpen]=useState(false);const[editing,setEditing]=useState<Quest|undefined>();const openAdd=()=>{setEditing(undefined);setEditorOpen(true)};const openEdit=(quest:Quest)=>{setEditing(quest);setEditorOpen(true)};const save=(quest:Quest)=>{if(editing)update(quest);else create(quest);setEditorOpen(false)};const deleteOne=(quest:Quest)=>{if(window.confirm(quest.completed?t('deleteQuestConfirm'):t('deleteIncompleteConfirm')))remove(quest.id)};return <div className="quest-page"><header className="quest-page-header"><div className="quest-kicker"><ScrollText/>LIFE RPG · DAILY LOG 04</div><div><h1>{t('quests')}<span>{t('questLog')}</span></h1><button onClick={openAdd}><Plus/><span>{t('addQuest')}</span></button></div><p>{t('questIntro')}</p><div className="quest-summary"><span><Sparkles/>{quests.filter(quest=>quest.completed).length} / {quests.length} {t('completed')}</span><span>+{quests.filter(quest=>quest.completed).reduce((total,quest)=>total+(quest.completionReward?.characterXp??0),0)} XP</span></div></header><main className="quest-page-main"><QuestList quests={quests} skills={state.skills} onToggle={quest=>quest.completed?uncomplete(quest.id):complete(quest.id)} onEdit={openEdit} onDelete={deleteOne}/></main>{editorOpen&&<QuestEditor quest={editing} skills={state.skills} onSave={save} onClose={()=>setEditorOpen(false)}/>}</div>}
