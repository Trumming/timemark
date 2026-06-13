'use client'

import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ProgressInstrument } from '@/components/ProgressInstrument'
import { SettingsPanel } from '@/components/SettingsPanel'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { QuickShare } from '@/components/QuickShare'
import { About, HowItWorks, FAQ } from '@/components/sections/EditorialSections'
import { ProgressConfig, ProgressShape } from '@/lib/progress'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { useDarkMode } from '@/lib/hooks/useDarkMode'
import { useProgress, useMilestone } from '@/lib/hooks/useProgress'
import { Locale, translations } from '@/lib/i18n'
import { siteConfig } from '@/lib/site'

const defaultConfig: ProgressConfig = {
  type: 'year',
  shape: 'linear',
  primaryColor: '#be5a2e', // persimmon
  backgroundColor: '#f3efe6', // warm paper
  showPercentage: true,
  showDaysRemaining: true,
  birthDate: undefined,
}

function ShapeIcon({ shape, className = '' }: { shape: ProgressShape; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
  }
  if (shape === 'circular') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    )
  }
  if (shape === 'arc') {
    return (
      <svg {...common}>
        <path d="M4 17a8 8 0 0 1 16 0" />
        <path d="M4 17a8 8 0 0 1 6 -7.5" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="3" y="10" width="18" height="4" rx="2" />
      <rect x="3" y="10" width="9" height="4" rx="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function HomeClient() {
  const [config, setConfig, isConfigLoaded] = useLocalStorage<ProgressConfig>(
    'progress-config',
    defaultConfig
  )
  const [darkMode, setDarkMode] = useDarkMode()
  const [locale, setLocale] = useState<Locale>('zh')
  const reduceMotion = useReducedMotion() ?? false

  const progressData = useProgress(config, locale)
  const { showMilestone, milestoneMessage, dismissMilestone } = useMilestone(
    progressData.percentage,
    locale
  )
  const texts = translations[locale]

  const today = new Date()
  const dateStr = today.toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  )

  return (
    <main className="relative min-h-screen">
      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-baseline gap-2.5">
            <span className="font-display text-lg tracking-tight text-foreground">
              {texts.appName}
            </span>
            <span className="kicker hidden sm:inline">{siteConfig.nameEn}</span>
          </a>

          <div className="flex items-center gap-1.5">
            {isConfigLoaded && (
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
            )}
            <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="icon-btn h-9 w-9"
              aria-label={texts.toggleTheme}
            >
              {darkMode ? (
                <svg className="h-[18px] w-[18px] text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="top" className="mx-auto w-full max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-center gap-3">
          <span className="kicker-dot kicker">{texts.heroKicker}</span>
        </div>

        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-light leading-[1.08] tracking-tightest text-foreground sm:text-5xl md:text-6xl">
          {texts.heroHeadline}
        </h1>

        {/* Milestone */}
        {showMilestone && milestoneMessage && (
          <div className="surface surface-raised mt-8 max-w-md px-6 py-4 text-balance font-display text-lg text-foreground">
            {milestoneMessage}
            <button
              type="button"
              onClick={dismissMilestone}
              className="ml-3 align-middle text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 hover:underline"
            >
              {texts.close}
            </button>
          </div>
        )}

        {/* Interactive cluster — client-only after load (avoids SSR date mismatch + flash) */}
        <div className="mt-12 sm:mt-16">
          {isConfigLoaded ? (
            <div className="animate-rise-in">
              <ProgressInstrument
                shape={config.shape}
                percentage={progressData.percentage}
                primaryColor={config.primaryColor}
                backgroundColor={config.backgroundColor}
                showPercentage={config.showPercentage}
                reduceMotion={reduceMotion}
              />

              {/* Controls + data row */}
              <div className="mt-12 space-y-8">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <div className="seg" role="group" aria-label={texts.settings.progressType}>
                    {(Object.keys(texts.progressTypes) as Array<keyof typeof texts.progressTypes>).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setConfig({ ...config, type })}
                          aria-pressed={config.type === type}
                          className="seg-btn"
                        >
                          {texts.progressTypes[type]}
                        </button>
                      )
                    )}
                  </div>

                  <div className="seg" role="group" aria-label={texts.settings.shape}>
                    {(Object.keys(texts.shapes) as Array<keyof typeof texts.shapes>).map((shape) => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setConfig({ ...config, shape })}
                        aria-pressed={config.shape === shape}
                        className="seg-btn px-2.5"
                        title={texts.shapes[shape]}
                        aria-label={texts.shapes[shape]}
                      >
                        <ShapeIcon shape={shape} className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-center text-sm font-light leading-relaxed text-foreground/80 sm:text-base">
                  {progressData.message}
                </p>

                {/* Instrument data row */}
                <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-border py-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="num">
                    Day {progressData.daysPassed} / {progressData.daysTotal}
                  </span>
                  {config.showDaysRemaining && (
                    <>
                      <span className="text-foreground/40" aria-hidden>
                        ·
                      </span>
                      <span>
                        {texts.daysPassed}{' '}
                        <span className="num text-foreground">{progressData.daysPassed}</span>{' '}
                        {texts.day}
                      </span>
                      <span className="text-foreground/40" aria-hidden>
                        ·
                      </span>
                      <span>
                        {texts.daysRemaining}{' '}
                        <span className="num text-foreground">{progressData.daysRemaining}</span>{' '}
                        {texts.day}
                      </span>
                    </>
                  )}
                </div>

                <p className="kicker text-center num">{dateStr}</p>
              </div>
            </div>
          ) : (
            /* Skeleton — reserves hero height to avoid layout shift */
            <div className="flex flex-col items-center">
              <div className="hero-figure text-[26vw] leading-[0.82] text-foreground/10 sm:text-[22vw] md:text-[15rem]">
                —
              </div>
              <div className="mt-10 h-2.5 w-full max-w-2xl overflow-hidden rounded-full bg-foreground/[0.06]" />
              <div className="kicker mt-10 animate-pulse">{texts.appTagline}</div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Editorial content (crawlable, locale-aware) ---------------- */}
      <div className="space-y-24 border-t border-border bg-foreground/[0.015] py-24 sm:py-28">
        <About locale={locale} />
        <HowItWorks locale={locale} />
        <FAQ locale={locale} />

        <div className="mx-auto w-full max-w-3xl px-1">
          <SettingsPanel config={config} onConfigChange={setConfig} locale={locale} />
        </div>
      </div>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-8">
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="icon-btn h-9 w-9"
              aria-label="GitHub"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              className="icon-btn h-9 w-9"
              aria-label="X (Twitter)"
            >
              <svg className="h-[16px] w-[16px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.53 2.477h3.7l-8.13 9.3 9.57 9.746h-7.53l-5.93-6.6-6.78 6.6H1.47l8.7-9.98L.29 2.477h7.68l5.37 5.98 6.29-5.98zm-1.29 16.843h2.05L7.1 4.61H4.92l11.32 14.71z" />
              </svg>
            </a>
          </div>

          <p className="max-w-md text-pretty text-sm text-muted-foreground">
            {texts.privacyNote}
          </p>
          <p className="kicker num">
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.nameEn}
          </p>
        </div>
      </footer>
    </main>
  )
}
