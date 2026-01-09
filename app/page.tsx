'use client'

import { useMemo } from 'react'
import { ProgressBar } from '@/components/ProgressBar'
import { SettingsPanel } from '@/components/SettingsPanel'
import { NotificationPanel } from '@/components/NotificationPanel'
import { SharePanel } from '@/components/SharePanel'
import { HistoryPanel } from '@/components/HistoryPanel'
import { ProgressConfig } from '@/lib/progress'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { useDarkMode } from '@/lib/hooks/useDarkMode'
import { useProgress, useMilestone } from '@/lib/hooks/useProgress'
import { Sun, Moon } from 'lucide-react'

const defaultConfig: ProgressConfig = {
  type: 'year',
  shape: 'linear',
  primaryColor: '#3b82f6',
  backgroundColor: '#e2e8f0',
  showPercentage: true,
  showDaysRemaining: true,
  birthDate: undefined
}

export default function Home() {
  const [config, setConfig] = useLocalStorage<ProgressConfig>('progress-config', defaultConfig)
  const [darkMode, setDarkMode] = useDarkMode()

  const progressData = useProgress(config)
  const { showMilestone, milestoneMessage, dismissMilestone } = useMilestone(progressData.percentage)

  const typeLabel = useMemo(() => {
    const year = new Date().getFullYear()
    const labels = {
      year: `${year}年度进度`,
      month: '本月进度',
      week: '本周进度',
      lifetime: '人生进度'
    }
    return labels[config.type]
  }, [config.type])

  return (
    <main className={`min-h-screen py-8 px-4 transition-colors ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 头部 */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <div />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              年度进度条
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="切换暗黑模式"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-muted-foreground">
            可视化时间进度，珍惜每一刻
          </p>
        </header>

        {showMilestone && milestoneMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg font-medium flex items-center gap-2">
              <span>{milestoneMessage}</span>
              <button
                onClick={dismissMilestone}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="关闭提示"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 进度条展示区 */}
        <div className="bg-card rounded-lg p-8 shadow-lg border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">{typeLabel}</h2>

            <div className="flex items-center justify-center py-8">
              <ProgressBar
                shape={config.shape}
                percentage={progressData.percentage}
                primaryColor={config.primaryColor}
                backgroundColor={config.backgroundColor}
                showPercentage={config.showPercentage}
              />
            </div>

            {/* 进度信息 */}
            <div className="space-y-2">
              <p className="text-xl font-medium">{progressData.message}</p>
              {config.showDaysRemaining && (
                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                  <span>已过 {progressData.daysPassed} 天</span>
                  <span>剩余 {progressData.daysRemaining} 天</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 功能面板网格 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 设置面板 */}
          <div>
            <SettingsPanel config={config} onConfigChange={setConfig} />
          </div>

          {/* 通知面板 */}
          <div>
            <NotificationPanel percentage={progressData.percentage} />
          </div>

          {/* 分享面板 */}
          <div>
            <SharePanel
              percentage={progressData.percentage}
              type={config.type}
              shape={config.shape}
            />
          </div>

          {/* 历史面板 */}
          <div>
            <HistoryPanel />
          </div>
        </div>

        {/* 页脚 */}
        <footer className="text-center text-sm text-muted-foreground py-8">
          <p>数据保存在本地浏览器，不会上传到服务器</p>
          <p className="mt-2">
            使用 Next.js + React + Tailwind CSS 构建
          </p>
        </footer>
      </div>
    </main>
  )
}
