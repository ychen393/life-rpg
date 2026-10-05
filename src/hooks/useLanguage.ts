import { translate, type TranslationKey } from '../i18n/translations'
import { useLifeRPG } from './life-rpg-context'

export function useLanguage() {
  const { state, setLanguage } = useLifeRPG()
  return {
    language: state.language,
    setLanguage,
    t: (key: TranslationKey) => translate(state.language, key),
    localize: <T extends { zh: string; en: string }>(text: T) => text[state.language],
  }
}
