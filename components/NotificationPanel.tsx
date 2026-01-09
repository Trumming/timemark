'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Bell, Check } from 'lucide-react'

interface NotificationPanelProps {
  percentage: number
  onNotificationRequest?: (permission: NotificationPermission) => void
}

export function NotificationPanel({ percentage, onNotificationRequest }: NotificationPanelProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'milestones'>('milestones')
  const [lastNotifiedMilestone, setLastNotifiedMilestone] = useState<number | null>(null)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const sendNotification = useCallback((title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'progress-notification',
      })
    }
  }, [permission])

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('您的浏览器不支持通知功能')
      return
    }

    const result = await Notification.requestPermission()
    setPermission(result)
    onNotificationRequest?.(result)
  }

  // 检查里程碑并通知
  useEffect(() => {
    if (!notificationsEnabled || frequency !== 'milestones') return

    const milestones = [1, 10, 25, 50, 75, 90, 99, 100]
    for (const milestone of milestones) {
      if (Math.abs(percentage - milestone) < 0.5 && lastNotifiedMilestone !== milestone) {
        sendNotification(`里程碑达成！`, `${milestone}% 已完成！`)
        setLastNotifiedMilestone(milestone)
        break
      }
    }
  }, [percentage, notificationsEnabled, frequency, lastNotifiedMilestone, sendNotification])

  const toggleNotifications = (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      requestPermission()
    }
    setNotificationsEnabled(enabled)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          通知提醒
        </CardTitle>
        <CardDescription>
          {permission === 'granted'
            ? '通知已启用，您可以管理提醒设置'
            : '开启浏览器通知以接收提醒'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 权限状态 */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            {permission === 'granted' ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Bell className="w-5 h-5 text-muted-foreground" />
            )}
            <span className="text-sm">
              {permission === 'granted'
                ? '通知权限已授予'
                : permission === 'denied'
                ? '通知权限被拒绝'
                : '未请求通知权限'}
            </span>
          </div>
          {permission !== 'granted' && (
            <Button size="sm" onClick={requestPermission}>
              启用通知
            </Button>
          )}
        </div>

        {/* 通知开关 */}
        {permission === 'granted' && (
          <>
            <div className="flex items-center justify-between">
              <Label>启用提醒</Label>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={toggleNotifications}
              />
            </div>

            {/* 提醒频率 */}
            {notificationsEnabled && (
              <div className="space-y-2">
                <Label>提醒频率</Label>
                <Select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                >
                  <option value="milestones">里程碑提醒</option>
                  <option value="daily">每日提醒</option>
                  <option value="weekly">每周提醒</option>
                </Select>
              </div>
            )}

            {/* 测试通知 */}
            {notificationsEnabled && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => sendNotification('测试通知', '这是一条测试通知')}
              >
                发送测试通知
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
