'use client'

import { Language } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentLang === 'zh'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentLang === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        EN
      </button>
    </div>
  )
}
