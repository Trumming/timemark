'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
import { Switch } from './ui/switch'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ProgressType, ProgressShape } from '@/lib/progress'

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
}

const colorPresets = [
  { name: '蓝色', primary: '#3b82f6', bg: '#e2e8f0' },
  { name: '紫色', primary: '#8b5cf6', bg: '#f3e8ff' },
  { name: '绿色', primary: '#22c55e', bg: '#dcfce7' },
  { name: '红色', primary: '#ef4444', bg: '#fee2e2' },
  { name: '橙色', primary: '#f97316', bg: '#ffedd5' },
  { name: '青色', primary: '#06b6d4', bg: '#cffafe' },
]

export function SettingsPanel({ config, onConfigChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full"
      >
        {isOpen ? '隐藏设置' : '显示设置'}
      </Button>

      {isOpen && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>自定义选项</CardTitle>
            <CardDescription>个性化你的进度条</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 进度类型 */}
            <div className="space-y-2">
              <Label>进度类型</Label>
              <Select
                value={config.type}
                onChange={(e) => onConfigChange({ ...config, type: e.target.value as ProgressType })}
              >
                <option value="year">年度进度</option>
                <option value="month">月度进度</option>
                <option value="week">周进度</option>
                <option value="lifetime">一生进度</option>
              </Select>
            </div>

            {/* 形状 */}
            <div className="space-y-2">
              <Label>进度条形状</Label>
              <Select
                value={config.shape}
                onChange={(e) => onConfigChange({ ...config, shape: e.target.value as ProgressShape })}
              >
                <option value="linear">线性</option>
                <option value="circular">圆形</option>
                <option value="arc">弧形</option>
              </Select>
            </div>

            {/* 颜色预设 */}
            <div className="space-y-2">
              <Label>颜色主题</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onConfigChange({
                      ...config,
                      primaryColor: preset.primary,
                      backgroundColor: preset.bg
                    })}
                    className="flex items-center gap-2 p-2 border rounded-md hover:bg-accent transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span className="text-sm">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 自定义颜色 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>主色调</Label>
                <Input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => onConfigChange({ ...config, primaryColor: e.target.value })}
                  className="h-10 w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>背景色</Label>
                <Input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onConfigChange({ ...config, backgroundColor: e.target.value })}
                  className="h-10 w-full"
                />
              </div>
            </div>

            {/* 显示选项 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>显示百分比</Label>
                <Switch
                  checked={config.showPercentage}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>显示剩余天数</Label>
                <Switch
                  checked={config.showDaysRemaining}
                  onCheckedChange={(checked) => onConfigChange({ ...config, showDaysRemaining: checked })}
                />
              </div>
            </div>

            {/* 出生日期（仅一生进度时显示） */}
            {config.type === 'lifetime' && (
              <div className="space-y-2">
                <Label>出生日期</Label>
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
