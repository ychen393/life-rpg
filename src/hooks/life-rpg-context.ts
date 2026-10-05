import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Language, LifeRPGState } from '../models/life-rpg'

export interface LifeRPGContextValue {
  state: LifeRPGState
  setState: Dispatch<SetStateAction<LifeRPGState>>
  setLanguage: (language: Language) => void
  resetDemoData: () => void
}

export const LifeRPGContext = createContext<LifeRPGContextValue | null>(null)

export function useLifeRPG() {
  const context = useContext(LifeRPGContext)
  if (!context) throw new Error('useLifeRPG must be used inside LifeRPGProvider')
  return context
}
