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

  // Localized labels
  const labels = {
    zh: {
      title: '分享与导出',
      description: '分享进度或嵌入到你的网站',
      socialShare: '分享到社交媒体',
      x: 'X (Twitter)',
      weibo: '微博',
      copyText: '复制分享文本',
      generating: '生成中...',
      saveImage: '保存图片',
      exportImage: '导出为图片',
      imageHint: '保存进度卡片图片用于社交媒体分享',
      embedCode: '嵌入到网站',
      copyCode: '复制代码并粘贴到你的网站HTML中',
      copyFailed: '复制失败:',
      exportFailed: '导出图片失败:'
    },
    en: {
      title: 'Share & Export',
      description: 'Share your progress or embed it on your website',
      socialShare: 'Share to Social Media',
      x: 'X (Twitter)',
      weibo: 'Weibo',
      copyText: 'Copy Share Text',
      generating: 'Generating...',
      saveImage: 'Save Image',
      exportImage: 'Export as Image',
      imageHint: 'Save progress card image for social media sharing',
      embedCode: 'Embed to Website',
      copyCode: 'Copy code and paste to your website HTML',
      copyFailed: 'Copy failed:',
      exportFailed: 'Failed to export image:'
    },
    ja: {
      title: '共有とエクスポート',
      description: '進捗を共有またはウェブサイトに埋め込み',
      socialShare: 'ソーシャルメディアで共有',
      x: 'X (Twitter)',
      weibo: 'Weibo',
      copyText: '共有テキストをコピー',
      generating: '生成中...',
      saveImage: '画像を保存',
      exportImage: '画像としてエクスポート',
      imageHint: 'ソーシャルメディア共有のための進捗カード画像を保存',
      embedCode: 'ウェブサイトに埋め込み',
      copyCode: 'コードをコピーしてウェブサイトのHTMLに貼り付け',
      copyFailed: 'コピーに失敗しました:',
      exportFailed: '画像のエクスポートに失敗しました:'
    }
  }

  const lang = labels[locale as keyof typeof labels] || labels.zh

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
      console.error(lang.copyFailed, err)
    }
  }

  const shareToX = () => {
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
      alert(`${lang.exportFailed} ${errorMsg}`)
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
      console.error(lang.copyFailed, err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          {lang.title}
        </CardTitle>
        <CardDescription>{lang.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Social Media Share */}
        <div className="space-y-2">
          <Label>{lang.socialShare}</Label>
          <div className={locale === 'zh' ? 'grid grid-cols-2 gap-2' : ''}>
            <Button variant="outline" onClick={shareToX} className={locale !== 'zh' ? 'w-full' : ''}>
              {lang.x}
            </Button>
            {locale === 'zh' && (
              <Button variant="outline" onClick={shareToWeibo}>
                {lang.weibo}
              </Button>
            )}
          </div>
        </div>

        {/* Copy Share Text */}
        <div className="space-y-2">
          <Label>{lang.copyText}</Label>
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

        {/* Download Image */}
        <div className="space-y-2">
          <Label>{lang.exportImage}</Label>
          <Button
            variant="outline"
            className="w-full"
            onClick={downloadImage}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Download className="w-4 h-4 mr-2 animate-pulse" />
                {lang.generating}
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                {lang.saveImage}
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            {lang.imageHint}
          </p>
        </div>

        {/* Embed Code */}
        <div className="space-y-2">
          <Label>{lang.embedCode}</Label>
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
            {lang.copyCode}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
