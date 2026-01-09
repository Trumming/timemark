'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
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
  { name: '🌿 Sage', primary: '#a7c7a0', bg: '#f5f5f0' },
  { name: '🌸 Coral', primary: '#e8b4b8', bg: '#fef6f6' },
  { name: '🌊 Aqua', primary: '#a7d1d9', bg: '#f0f7f8' },
  { name: '🍑 Blush', primary: '#e8c4b8', bg: '#fef8f6' },
  { name: '💜 Lavender', primary: '#c4b8d9', bg: '#f8f6fc' },
  { name: '🌾 Wheat', primary: '#d4c4a8', bg: '#fcfaf6' },
]

export function SettingsPanel({ config, onConfigChange, locale }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const texts = translations[locale]

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full btn-soft-secondary"
      >
        {isOpen ? texts.close : texts.panels.settings}
      </Button>

      {isOpen && (
        <Card className="settings-panel mt-4">
          <CardHeader>
            <CardTitle className="display-font">{texts.settings.title}</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              {texts.settings.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color presets */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">{texts.settings.colorTheme}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onConfigChange({
                      ...config,
                      primaryColor: preset.primary,
                      backgroundColor: preset.bg
                    })}
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-sm"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span className="text-sm">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">{texts.settings.primaryColor}</Label>
                <Input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => onConfigChange({ ...config, primaryColor: e.target.value })}
                  className="h-12 w-full cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">{texts.settings.backgroundColor}</Label>
                <Input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onConfigChange({ ...config, backgroundColor: e.target.value })}
                  className="h-12 w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Display options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{texts.settings.showPercentage}</Label>
                <Switch
                  checked={config.showPercentage}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">{texts.settings.showDaysRemaining}</Label>
                <Switch
                  checked={config.showDaysRemaining}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showDaysRemaining: checked })}
                />
              </div>
            </div>

            {/* Birthdate (for lifetime) */}
            {config.type === 'lifetime' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">{texts.settings.birthdate}</Label>
                <Input
                  type="date"
                  value={config.birthDate || ''}
                  onChange={(e) => onConfigChange({ ...config, birthDate: e.target.value })}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
