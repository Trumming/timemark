import { Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

const languages: { code: Locale; label: string; native: string }[] = [
  { code: 'zh', label: '中', native: '中文' },
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'ja', label: '日', native: '日本語' },
]

export function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onLocaleChange(lang.code)}
          className={currentLocale === lang.code ? 'active' : ''}
          title={lang.native}
          aria-label={`Switch to ${lang.native}`}
          aria-pressed={currentLocale === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
