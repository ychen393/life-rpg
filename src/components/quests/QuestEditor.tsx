import { X } from 'lucide-react'
import type { Quest, Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { QuestForm } from './QuestForm'

export function QuestEditor({quest,skills,onSave,onClose}:{quest?:Quest;skills:Skill[];onSave:(quest:Quest)=>void;onClose:()=>void}){const{t}=useLanguage();return <div className="quest-editor-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><section className="quest-editor" role="dialog" aria-modal="true" aria-label={quest?t('editQuest'):t('addQuest')}><header><div><span>QUEST FIELD NOTE</span><h2>{quest?t('editQuest'):t('addQuest')}</h2></div><button onClick={onClose} aria-label={t('close')}><X/></button></header><QuestForm quest={quest} skills={skills} onSave={onSave} onCancel={onClose}/></section></div>}
