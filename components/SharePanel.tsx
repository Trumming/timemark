'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Share2, Copy, Check, Download, Image as ImageIcon } from 'lucide-react'
import { ProgressShape, ProgressType } from '@/lib/progress'
import { exportProgressAsImage } from '@/lib/utils/exportSvg'

interface SharePanelProps {
  percentage: number
  type: ProgressType
  shape: ProgressShape
  progressCardRef: React.RefObject<HTMLDivElement>
  locale?: string
  message?: string
  daysPassed?: number
  daysRemaining?: number
  primaryColor?: string
  backgroundColor?: string
}

export function SharePanel({
  percentage,
  type,
  shape,
  progressCardRef,
  locale = 'zh',
  message = '',
  daysPassed = 0,
  daysRemaining = 0,
  primaryColor = '#a7c7a0',
  backgroundColor = '#f5f5f0'
}: SharePanelProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Get localized share texts
  const getShareText = () => {
    const currentYear = new Date().getFullYear()
    const percentageFixed = percentage.toFixed(1)

    const shareTexts: Record<string, Record<string, string>> = {
      zh: {
        year: `🎯 ${currentYear}年已过 ${percentageFixed}%！时光温柔流逝，每一刻都值得珍惜。`,
        month: `📅 本月已过 ${percentageFixed}%！继续优雅前行。`,
        week: `🗓️ 本周已过 ${percentageFixed}%！保持内心的节奏。`,
        lifetime: `⏳ 人生旅程已过 ${percentageFixed}%！每一步都是风景。`,
      },
      en: {
        year: `🎯 ${percentageFixed}% of ${currentYear} has passed! Time flows gently, cherish every moment.`,
        month: `📅 ${percentageFixed}% of this month has passed! Keep moving forward gracefully.`,
        week: `🗓️ ${percentageFixed}% of this week has passed! Maintain your inner rhythm.`,
        lifetime: `⏳ ${percentageFixed}% of life's journey has passed! Every step is a scenery.`,
      },
      ja: {
        year: `🎯 ${currentYear}年の${percentageFixed}%が経過しました！時は優しく流れ、瞬瞬を大切に。`,
        month: `📅 今月の${percentageFixed}%が経過しました！優雅に前進しましょう。`,
        week: `🗓️ 今週の${percentageFixed}%が経過しました！心のリズムを保ちましょう。`,
        lifetime: `⏳ 人生の旅の${percentageFixed}%が経過しました！一歩一歩が風景。`,
      },
    }

    return (shareTexts[locale]?.[type] || shareTexts.zh[type]) + '\n' + currentUrl
  }

  const shareText = getShareText()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, '_blank')
  }

  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(shareText)}`
    window.open(weiboUrl, '_blank')
  }

  const downloadImage = async () => {
    console.log('downloadImage called')

    setIsDownloading(true)
    try {
      const currentYear = new Date().getFullYear()
      const filename = `${type}-progress-${currentYear}.png`

      await exportProgressAsImage({
        percentage,
        type,
        shape,
        primaryColor,
        backgroundColor,
        message,
        daysPassed,
        daysRemaining,
        locale,
        filename,
      })
    } catch (error) {
      console.error('Failed to export image:', error)
      const errorMsg = error instanceof Error ? error.message : String(error)
      alert(`导出图片失败: ${errorMsg}`)
    } finally {
      setIsDownloading(false)
    }
  }

  const generateEmbedCode = () => {
    return `<iframe
  src="${currentUrl}embed"
  width="600"
  height="400"
  frameborder="0"
  style="border-radius: 12px;">
</iframe>`
  }

  const [embedCode, setEmbedCode] = useState(generateEmbedCode())
  const [embedCopied, setEmbedCopied] = useState(false)

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setEmbedCopied(true)
      setTimeout(() => setEmbedCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          分享与导出
        </CardTitle>
        <CardDescription>分享进度或嵌入到你的网站</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 社交分享 */}
        <div className="space-y-2">
          <Label>分享到社交媒体</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={shareToTwitter}>
              Twitter/X
            </Button>
            <Button variant="outline" onClick={shareToWeibo}>
              微博
            </Button>
          </div>
        </div>

        {/* 复制文本 */}
        <div className="space-y-2">
          <Label>复制分享文本</Label>
          <div className="flex gap-2">
            <Input
              value={shareText}
              readOnly
              className="font-mono text-xs"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 下载图片 */}
        <div className="space-y-2">
          <Label>导出为图片</Label>
          <Button
            variant="outline"
            className="w-full"
            onClick={downloadImage}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Download className="w-4 h-4 mr-2 animate-pulse" />
                生成中...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                保存图片
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            保存进度卡片图片用于社交媒体分享
          </p>
        </div>

        {/* 嵌入代码 */}
        <div className="space-y-2">
          <Label>嵌入到网站</Label>
          <div className="flex gap-2">
            <Input
              value={embedCode}
              readOnly
              className="font-mono text-xs"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={copyEmbedCode}
            >
              {embedCopied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            复制代码并粘贴到你的网站HTML中
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
