import { Sparkles } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function LevelUpToast({ level, direction }: { level:number; direction:'up'|'down' }) {
  const { t }=useLanguage()
  return <div className="level-toast" role="status"><Sparkles/><div><strong>{t(direction==='up'?'levelUp':'levelDown')} · Lv.{level}</strong><span>{t('levelChanged')}</span></div></div>
}
