'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
import { History, TrendingUp } from 'lucide-react'

interface HistoryData {
  date: string
  percentage: number
  type: string
}

export function HistoryPanel() {
  const [history, setHistory] = useState<HistoryData[]>([])
  const [viewType, setViewType] = useState<'all' | 'year' | 'month' | 'week'>('all')

  useEffect(() => {
    // 从 localStorage 加载历史数据
    const saved = localStorage.getItem('progress-history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setHistory(parsed)
      } catch (err) {
        console.error('加载历史数据失败:', err)
      }
    }
  }, [])

  // 保存当前进度到历史
  const saveCurrentProgress = () => {
    const now = new Date()
    const newEntry: HistoryData = {
      date: now.toISOString(),
      percentage: parseFloat(calculateYearProgress().toFixed(2)),
      type: 'year'
    }

    const updatedHistory = [...history, newEntry]
    setHistory(updatedHistory)
    localStorage.setItem('progress-history', JSON.stringify(updatedHistory))
  }

  const calculateYearProgress = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const end = new Date(now.getFullYear(), 11, 31)
    const total = end.getTime() - start.getTime()
    const passed = now.getTime() - start.getTime()
    return (passed / total) * 100
  }

  const clearHistory = () => {
    if (confirm('确定要清空所有历史数据吗？')) {
      setHistory([])
      localStorage.removeItem('progress-history')
    }
  }

  const filteredHistory = history.filter(entry =>
    viewType === 'all' || entry.type === viewType
  )

  const yearHistory = filteredHistory.filter(h => h.type === 'year')
  const avgPercentage = yearHistory.length > 0
    ? yearHistory.reduce((sum, h) => sum + h.percentage, 0) / yearHistory.length
    : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          历史数据与分析
        </CardTitle>
        <CardDescription>查看你的进度历史和趋势</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 统计概览 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{yearHistory.length}</div>
            <div className="text-sm text-muted-foreground">记录次数</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{avgPercentage.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">平均进度</div>
          </div>
        </div>

        {/* 筛选 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">查看类型</label>
          <Select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as any)}
          >
            <option value="all">全部</option>
            <option value="year">年度</option>
            <option value="month">月度</option>
            <option value="week">周</option>
          </Select>
        </div>

        {/* 历史记录列表 */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              暂无历史记录
            </div>
          ) : (
            filteredHistory.slice().reverse().map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium">
                    {new Date(entry.date).toLocaleDateString('zh-CN')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.type === 'year' ? '年度' : entry.type === 'month' ? '月度' : '周'}进度
                  </div>
                </div>
                <div className="text-lg font-bold">
                  {entry.percentage}%
                </div>
              </div>
            ))
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={saveCurrentProgress}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            记录当前进度
          </Button>
          <Button
            variant="outline"
            onClick={clearHistory}
            disabled={history.length === 0}
          >
            清空
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
