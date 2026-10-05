import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function SkillXPControls({ onAdjust }: { onAdjust: (delta: number) => void }) {
  const { t } = useLanguage(); const [custom, setCustom] = useState('')
  const amount = Math.max(0, Number(custom) || 0)
  return <section className="detail-section xp-controls"><h3>{t('xpControls')}</h3><div className="quick-xp">{[5,10,25].map(value=><button onClick={()=>onAdjust(value)} key={value}>+{value} XP</button>)}</div><div className="custom-xp"><label><span>{t('customXP')}</span><input min="1" step="1" type="number" value={custom} onChange={(event)=>setCustom(event.target.value)} placeholder="0" /></label><button disabled={!amount} onClick={()=>{onAdjust(amount);setCustom('')}}><Plus />{t('add')}</button><button disabled={!amount} onClick={()=>{onAdjust(-amount);setCustom('')}}><Minus />{t('subtract')}</button></div></section>
}
