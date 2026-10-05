import { MapPinned } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function QuestEmptyState(){const{t}=useLanguage();return <div className="quest-empty"><MapPinned/><p>{t('noQuests')}</p></div>}
