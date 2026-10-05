import { useMemo, useState } from 'react'
import { Map, Sparkles } from 'lucide-react'
import { LevelUpToast } from '../components/skills/LevelUpToast'
import { SkillCategoryFilter, type CategoryFilter } from '../components/skills/SkillCategoryFilter'
import { SkillDetailPanel } from '../components/skills/SkillDetailPanel'
import { SkillGrid } from '../components/skills/SkillGrid'
import { useLanguage } from '../hooks/useLanguage'
import { useLifeRPG } from '../hooks/life-rpg-context'
import { useSkills } from '../hooks/useSkills'
import { getLevelFromXP, getSkillThreshold } from '../utils/skill-progression'

export function SkillTreePage(){
  const {state}=useLifeRPG(); const {skills,adjustXP,changeLevel,toggleLocked}=useSkills(); const {t}=useLanguage()
  const [filter,setFilter]=useState<CategoryFilter>('all'); const [selectedId,setSelectedId]=useState<string|undefined>('python'); const [toast,setToast]=useState<{level:number;direction:'up'|'down'}|null>(null)
  const filtered=useMemo(()=>filter==='all'?skills:skills.filter(skill=>skill.category===filter),[filter,skills]); const selected=skills.find(skill=>skill.id===selectedId)
  const chooseFilter=(next:CategoryFilter)=>{setFilter(next);const first=next==='all'?skills[0]:skills.find(skill=>skill.category===next);setSelectedId(first?.id)}
  const notify=(oldLevel:number,newLevel:number)=>{if(oldLevel===newLevel)return;setToast({level:newLevel,direction:newLevel>oldLevel?'up':'down'});window.setTimeout(()=>setToast(null),2600)}
  const handleXP=(delta:number)=>{if(!selected)return;const nextLevel=getLevelFromXP(Math.min(getSkillThreshold(5),Math.max(0,selected.xp+delta)));notify(selected.level,nextLevel);adjustXP(selected.id,delta)}
  const handleLevel=(level:number)=>{if(!selected)return;notify(selected.level,level);changeLevel(selected.id,level)}
  return <div className="skill-tree-page"><header className="skill-page-header"><div className="atlas-kicker"><Map/>LIFE RPG · ATLAS 03</div><h1>{t('skillTree')}<span>{t('skillAtlas')}</span></h1><p>{t('skillAtlasIntro')}</p><div className="atlas-counts"><span><Sparkles/>{skills.filter(skill=>!skill.locked).length} {t('discovered')}</span><span>{skills.length} {t('skillsCount')}</span></div></header><SkillCategoryFilter value={filter} onChange={chooseFilter}/><div className={`skill-workspace${selected?' has-detail':''}`}><main className="skill-explorer"><SkillGrid skills={filtered} selectedId={selectedId} onSelect={setSelectedId}/>{filtered.length===0&&<p className="skill-empty">{t('undiscovered')}</p>}</main>{selected&&<SkillDetailPanel skill={selected} quests={state.quests} onAdjustXP={handleXP} onChangeLevel={handleLevel} onToggleLock={()=>toggleLocked(selected.id)} onClose={()=>setSelectedId(undefined)}/>}</div>{toast&&<LevelUpToast {...toast}/>}</div>
}
