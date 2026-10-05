import { Languages } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="language-toggle" aria-label="Language">
      <Languages size={15} aria-hidden="true" />
      <button className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中文</button>
      <span>/</span>
      <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
    </div>
  )
}
