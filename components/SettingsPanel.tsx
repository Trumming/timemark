'use client'

import { useState } from 'react'
import { Switch } from './ui/switch'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ProgressType, ProgressShape } from '@/lib/progress'
import { Locale, translations } from '@/lib/i18n'

interface SettingsPanelProps {
  config: {
    type: ProgressType
    shape: ProgressShape
    primaryColor: string
    backgroundColor: string
    showPercentage: boolean
    showDaysRemaining: boolean
    birthDate?: string
  }
  onConfigChange: (config: any) => void
  locale: Locale
}

const colorPresets = [
  { name: '柿 Persimmon', primary: '#be5a2e', bg: '#f3efe6' },
  { name: '墨 Ink', primary: '#23201b', bg: '#f3efe6' },
  { name: '赭 Ochre', primary: '#b5852f', bg: '#f4f0e5' },
  { name: '苔 Moss', primary: '#5c6b3a', bg: '#eff0e6' },
  { name: '青 Indigo', primary: '#324a66', bg: '#ecf0f4' },
  { name: '绛 Crimson', primary: '#8e2f3d', bg: '#f3ecee' },
]

export function SettingsPanel({ config, onConfigChange, locale }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const texts = translations[locale]

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="surface flex w-full items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-foreground/[0.03]"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-3">
          <span className="kicker num">§ 04</span>
          <span className="font-medium">{texts.panels.settings}</span>
        </span>
        <span
          aria-hidden
          className="font-mono text-lg text-muted-foreground transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="surface mt-2 p-6 sm:p-8">
          <div className="space-y-8">
            {/* Color presets */}
            <div className="space-y-3">
              <Label className="kicker">{texts.settings.colorTheme}</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {colorPresets.map((preset) => {
                  const selected =
                    config.primaryColor.toLowerCase() === preset.primary &&
                    config.backgroundColor.toLowerCase() === preset.bg
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() =>
                        onConfigChange({
                          ...config,
                          primaryColor: preset.primary,
                          backgroundColor: preset.bg,
                        })
                      }
                      className="surface flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-all hover:bg-foreground/[0.03]"
                      style={selected ? { borderColor: 'hsl(var(--primary) / 0.5)' } : undefined}
                      aria-pressed={selected}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="truncate">{preset.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rule" />

            {/* Custom colors */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="kicker">{texts.settings.primaryColor}</Label>
                <Input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => onConfigChange({ ...config, primaryColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="kicker">{texts.settings.backgroundColor}</Label>
                <Input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onConfigChange({ ...config, backgroundColor: e.target.value })}
                />
              </div>
            </div>

            <div className="rule" />

            {/* Display options */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal text-foreground/80">
                  {texts.settings.showPercentage}
                </Label>
                <Switch
                  checked={config.showPercentage}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal text-foreground/80">
                  {texts.settings.showDaysRemaining}
                </Label>
                <Switch
                  checked={config.showDaysRemaining}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showDaysRemaining: checked })}
                />
              </div>
            </div>

            {/* Birthdate (lifetime only) */}
            {config.type === 'lifetime' && (
              <>
                <div className="rule" />
                <div className="space-y-2">
                  <Label className="kicker">{texts.settings.birthdate}</Label>
                  <Input
                    type="date"
                    value={config.birthDate || ''}
                    onChange={(e) => onConfigChange({ ...config, birthDate: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
