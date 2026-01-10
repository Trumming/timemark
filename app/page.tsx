'use client'

import { useMemo, useState, useRef } from 'react'
import { ProgressBar } from '@/components/ProgressBar'
import { SettingsPanel } from '@/components/SettingsPanel'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { QuickShare } from '@/components/QuickShare'
import { ProgressConfig } from '@/lib/progress'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { useDarkMode } from '@/lib/hooks/useDarkMode'
import { useProgress, useMilestone } from '@/lib/hooks/useProgress'
import { t, Locale, translations } from '@/lib/i18n'

const defaultConfig: ProgressConfig = {
  type: 'year',
  shape: 'linear',
  primaryColor: '#a7c7a0', // Soft sage green
  backgroundColor: '#f5f5f0',
  showPercentage: true,
  showDaysRemaining: true,
  birthDate: undefined
}

function getShapeIcon(shape: string) {
  switch (shape) {
    case 'linear':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="10" width="20" height="4" rx="2" />
        </svg>
      )
    case 'circular':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" fill="none" />
          <circle cx="12" cy="12" r="10" fill="none" strokeDasharray="63" strokeDashoffset="16" transform="rotate(-90 12 12)" />
        </svg>
      )
    case 'arc':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 18 A 9 9 0 0 1 18 18" fill="none" />
        </svg>
      )
    default:
      return null
  }
}

export default function Home() {
  const [config, setConfig, isConfigLoaded] = useLocalStorage<ProgressConfig>('progress-config', defaultConfig)
  const [darkMode, setDarkMode] = useDarkMode()
  const [locale, setLocale] = useState<Locale>('zh')

  // Ref for the progress card to enable image export
  const progressCardRef = useRef<HTMLDivElement>(null)

  const progressData = useProgress(config, locale)
  const { showMilestone, milestoneMessage, dismissMilestone } = useMilestone(progressData.percentage, locale)

  const texts = translations[locale]

  // Don't render until config is loaded to prevent shape type flashing
  if (!isConfigLoaded) {
    return (
      <main className={`min-h-screen transition-colors duration-700 ${darkMode ? 'dark' : ''}`}>
        <div className="ambient-glow" />
        <div className="min-h-screen flex items-center justify-center">
          {/* Loading spinner */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen transition-colors duration-700 ${darkMode ? 'dark' : ''}`}>
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      {/* Top Control Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-gentle border-b border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ height: '48px' }}>
          {/* Left side - Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-xl display-font">
              {texts.appName}
            </h1>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            <QuickShare
              percentage={progressData.percentage}
              type={config.type}
              shape={config.shape}
              locale={locale}
              message={progressData.message}
              daysPassed={progressData.daysPassed}
              daysRemaining={progressData.daysRemaining}
              primaryColor={config.primaryColor}
              backgroundColor={config.backgroundColor}
            />
            <LanguageSwitcher
              currentLocale={locale}
              onLocaleChange={setLocale}
            />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              aria-label={texts.toggleTheme}
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12 pb-12 md:pt-16 md:pb-20">
        {/* Staggered fade-in animations */}
        <div className="stagger-children space-y-6 md:space-y-8">
          {/* Milestone notification */}
          {showMilestone && milestoneMessage && (
            <div className="fade-gentle">
              <div className="glass-gentle rounded-2xl px-8 py-5 max-w-md mx-auto text-center animate-breathe">
                <p className="text-lg font-medium gradient-dawn">
                  {milestoneMessage}
                </p>
                <button
                  onClick={dismissMilestone}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {texts.close}
                </button>
              </div>
            </div>
          )}

          {/* Progress display */}
          <div ref={progressCardRef} className="progress-card fade-gentle" style={{ animationDelay: '200ms' }}>
            <div className="text-center space-y-8">
              {/* Progress type and shape switchers */}
              <div className="space-y-6">
                {/* Type and shape selector tabs */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                  {/* Progress type selector */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm">
                    {(Object.keys(texts.progressTypes) as Array<keyof typeof texts.progressTypes>).map((type) => (
                      <button
                        key={type}
                        onClick={() => setConfig({ ...config, type })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          config.type === type
                            ? 'bg-white dark:bg-black shadow-md text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {texts.progressTypes[type]}
                      </button>
                    ))}
                  </div>

                  {/* Shape selector */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm">
                    {(Object.keys(texts.shapes) as Array<keyof typeof texts.shapes>).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setConfig({ ...config, shape })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          config.shape === shape
                            ? 'bg-white dark:bg-black shadow-md text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                        title={texts.shapes[shape]}
                      >
                        {getShapeIcon(shape)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current date display */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {new Date().toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="py-8">
                <ProgressBar
                  shape={config.shape}
                  percentage={progressData.percentage}
                  primaryColor={config.primaryColor}
                  backgroundColor={config.backgroundColor}
                  showPercentage={config.showPercentage}
                />
              </div>

              {/* Progress message */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/90">
                  {progressData.message}
                </p>

                {/* Day counters */}
                {config.showDaysRemaining && (
                  <div className="flex justify-center gap-6 md:gap-12 text-sm">
                    <div className="text-center space-y-1">
                      <p className="text-2xl md:text-3xl font-light display-font" style={{ color: config.primaryColor }}>
                        {progressData.daysPassed}
                      </p>
                      <p className="text-muted-foreground">
                        {texts.daysPassed} {texts.day}
                      </p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl md:text-3xl font-light display-font" style={{ color: config.primaryColor }}>
                        {progressData.daysRemaining}
                      </p>
                      <p className="text-muted-foreground">
                        {texts.daysRemaining} {texts.day}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings panel */}
          <div className="fade-gentle" style={{ animationDelay: '400ms' }}>
            <SettingsPanel
              config={config}
              onConfigChange={setConfig}
              locale={locale}
            />
          </div>

          {/* Footer */}
          <footer className="text-center py-8 space-y-2 fade-gentle" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <a href="https://github.com/Trumming/timemark" target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
              <a href="https://x.com/xcm0215" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.53 2.477h3.7l-8.13 9.3 9.57 9.746h-7.53l-5.93-6.6-6.78 6.6H1.47l8.7-9.98L.29 2.477h7.68l5.37 5.98 6.29-5.98zm-1.29 16.843h2.05L7.1 4.61H4.92l11.32 14.71z" />
                </svg>
              </a>
              <span>{texts.privacyNote}</span>
            </div>
            <p className="text-xs text-muted-foreground/70">
              {texts.builtWith}
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}
