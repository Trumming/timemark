'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Share2, Copy, Check, Download } from 'lucide-react'
import { ProgressShape, ProgressType } from '@/lib/progress'

interface SharePanelProps {
  percentage: number
  type: ProgressType
  shape: ProgressShape
}

export function SharePanel({ percentage, type, shape }: SharePanelProps) {
  const [copied, setCopied] = useState(false)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareTexts = {
    year: `🎯 ${new Date().getFullYear()}年已过 ${percentage}%！\n时光飞逝，珍惜当下！\n`,
    month: `📅 本月已过 ${percentage}%！\n继续加油！\n`,
    week: `🗓️ 本周已过 ${percentage}%！\n保持动力！\n`,
    lifetime: `⏳ 人生已过 ${percentage}%！\n每一刻都珍贵！\n`,
  }

  const shareText = shareTexts[type] + currentUrl

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

  const downloadImage = () => {
    // 在实际应用中，这里可以使用 html2canvas 等库生成图片
    alert('图片导出功能开发中...\n\n提示：您可以使用截图工具保存当前页面')
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
          >
            <Download className="w-4 h-4 mr-2" />
            下载进度条图片
          </Button>
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
