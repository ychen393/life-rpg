import { LockKeyhole, UnlockKeyhole, X } from 'lucide-react'
import type { Quest, Skill } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { calculateSkillProgress } from '../../utils/skill-progression'
import { SkillIcon } from './skill-icons'
import { SkillLevelMilestones } from './SkillLevelMilestones'
import { SkillPrerequisites } from './SkillPrerequisites'
import { SkillXPControls } from './SkillXPControls'
import { SkillXPHistory } from './SkillXPHistory'

interface Props { skill: Skill; quests: Quest[]; onAdjustXP:(delta:number)=>void; onChangeLevel:(level:number)=>void; onToggleLock:()=>void; onClose:()=>void }
export function SkillDetailPanel({ skill, quests, onAdjustXP, onChangeLevel, onToggleLock, onClose }: Props) {
  const { t, localize } = useLanguage(); const progress=calculateSkillProgress(skill.xp)
  const related=quests.filter(quest=>skill.questIds.includes(quest.id))
  return <aside className="skill-detail-panel">
    <div className="detail-top"><button className="detail-close" onClick={onClose} aria-label={t('close')}><X /></button><div className={`detail-emblem category-${skill.category}`}><SkillIcon name={skill.icon} /></div><div><span className={`status-chip ${skill.locked?'locked':''}`}>{skill.locked?t('lockedStatus'):t('unlockedStatus')}</span><h2>{localize(skill.name)}</h2><p>{localize(skill.description)}</p></div></div>
    <div className="detail-scroll"><section className="detail-progress"><div><span>{t('currentLevel')}</span><strong>Lv.{skill.level}</strong></div><div className="detail-xp-row"><b>{skill.xp} XP</b><small>{skill.level===skill.maxLevel?t('maxLevel'):`/ ${progress.nextThreshold} XP`}</small></div><div className="detail-progress-track"><i style={{width:`${progress.percentage}%`}}/></div><label className="level-select"><span>{t('setLevel')}</span><select value={skill.level} onChange={(event)=>onChangeLevel(Number(event.target.value))}>{[0,1,2,3,4,5].map(level=><option value={level} key={level}>Lv.{level}</option>)}</select></label><small className="xp-separation-note">{t('skillXPNote')}</small></section>
    {skill.locked?<section className="locked-discovery"><LockKeyhole /><h3>{t('lockedStatus')}</h3><p>{t('lockedHint')}</p></section>:<SkillXPControls onAdjust={onAdjustXP}/>} 
    <section className="detail-section"><h3>{t('description')}</h3><div className="level-now-next"><article><span>{t('currentLevel')} · Lv.{skill.level}</span><p>{localize(skill.levelMilestones[skill.level])}</p></article>{skill.level<skill.maxLevel&&<article><span>{t('nextLevelLabel')} · Lv.{skill.level+1}</span><p>{localize(skill.levelMilestones[skill.level+1])}</p></article>}</div></section>
    <SkillPrerequisites skill={skill}/><SkillLevelMilestones skill={skill}/>
    <section className="detail-section"><h3>{t('relatedQuests')}</h3>{related.length?<ul className="related-quests">{related.map(quest=><li key={quest.id}>{localize(quest.title)} <b>+{quest.xpReward} XP</b></li>)}</ul>:<p className="detail-empty">{t('noRelatedQuests')}</p>}</section>
    <SkillXPHistory skill={skill}/></div>
    <div className="detail-footer"><button className={skill.locked?'unlock-button':'lock-button'} onClick={onToggleLock}>{skill.locked?<UnlockKeyhole/>:<LockKeyhole/>}{skill.locked?t('unlock'):t('lock')}</button></div>
  </aside>
}
