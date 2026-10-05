import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createSeedState } from '../data/seed'
import type { LifeRPGState } from '../models/life-rpg'
import { clearState, loadState, saveState } from '../utils/storage'
import { LifeRPGContext, type LifeRPGContextValue } from './life-rpg-context'
import { translations } from '../i18n/translations'

export function LifeRPGProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LifeRPGState>(loadState)

  useEffect(() => { saveState(state) }, [state])
  useEffect(() => {
    document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en'
    document.title = 'Life RPG · 人生技能书'
    document.querySelector('meta[name="description"]')?.setAttribute('content', translations[state.language].metadataDescription)
  }, [state.language])

  const value = useMemo<LifeRPGContextValue>(() => ({
    state,
    setState,
    setLanguage: (language) => setState((current) => ({ ...current, language })),
    resetDemoData: () => { clearState(); setState(createSeedState()) },
  }), [state])

  return <LifeRPGContext.Provider value={value}>{children}</LifeRPGContext.Provider>
}
