'use client'

import { useState, useEffect, useRef } from 'react'
import { Share2, Download, X, Image as ImageIcon } from 'lucide-react'
import { ProgressShape, ProgressType } from '@/lib/progress'
import { exportProgressAsImage } from '@/lib/utils/exportSvg'
import { t, Locale } from '@/lib/i18n'

interface QuickShareProps {
  percentage: number
  type: ProgressType
  shape: ProgressShape
  locale: Locale
  message: string
  daysPassed: number
  daysRemaining: number
  primaryColor: string
  backgroundColor: string
}

export function QuickShare({
  percentage,
  type,
  shape,
  locale,
  message,
  daysPassed,
  daysRemaining,
  primaryColor,
  backgroundColor
}: QuickShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Get localized share texts
  const getShareText = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
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

  const shareToX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, '_blank')
    setIsOpen(false)
  }

  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(shareText)}`
    window.open(weiboUrl, '_blank')
    setIsOpen(false)
  }

  const downloadImage = async () => {
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
      alert(`${t(locale, 'exportFailed') || 'Export failed:'} ${errorMsg}`)
    } finally {
      setIsDownloading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black rounded-xl shadow-lg border border-black/5 dark:border-white/10 z-[10000] overflow-hidden">
            {/* Download Image */}
            <button
              onClick={downloadImage}
              disabled={isDownloading}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Download className="w-4 h-4 animate-pulse" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
              <span className="text-sm">
                {isDownloading
                  ? (t(locale, 'generating') || 'Generating...')
                  : (t(locale, 'saveImage') || 'Save Image')
                }
              </span>
            </button>

            {/* Share to X */}
            <button
              onClick={shareToX}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">X (Twitter)</span>
            </button>

            {/* Share to Weibo (Chinese only) */}
            {locale === 'zh' && (
              <button
                onClick={shareToWeibo}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.98 17.55c-4.42-.01-8.4-3.07-9.38-7.03-.36-1.45-.3-2.84.14-4.13.53-1.54 1.53-2.88 2.91-3.96.95-.74 2.04-1.28 3.22-1.57.88-.21 1.79-.27 2.7-.16 1.63.19 3.12.81 4.4 1.83.79.63 1.46 1.38 1.97 2.23.52.87.86 1.82.99 2.81.13.99.03 2.01-.29 2.96-.37 1.1-.99 2.09-1.82 2.9-.83.81-1.84 1.43-2.95 1.8-.97.33-1.99.41-2.99.27-.63-.09-1.24-.26-1.82-.52-.36-.16-.7-.37-1.01-.61-.31-.25-.59-.54-.82-.87-.24-.33-.42-.7-.54-1.09-.12-.4-.15-.82-.08-1.24.07-.42.22-.82.45-1.17.23-.35.53-.65.88-.88.35-.23.75-.39 1.17-.46.42-.07.85-.04 1.25.09.28.09.54.23.77.42.23.19.43.42.58.68.15.26.25.55.29.85.04.3.02.61-.07.9-.09.29-.24.56-.44.79-.15.17-.32.32-.52.44-.19.12-.4.2-.62.25-.22.05-.44.06-.66.02-.15-.03-.3-.08-.43-.16-.14-.08-.26-.18-.36-.3-.1-.12-.18-.26-.23-.41-.05-.15-.07-.31-.05-.47.02-.16.07-.31.15-.44.08-.13.19-.25.32-.34.13-.09.28-.15.44-.18.11-.02.22-.02.33.01.11.03.21.08.3.15.09.07.16.16.22.26.05.1.09.21.1.32.01.11 0 .22-.03.33-.04.11-.09.21-.17.29-.08.08-.17.15-.28.19-.1.05-.21.07-.33.07-.11 0-.22-.02-.32-.07-.1-.05-.19-.11-.27-.2-.07-.08-.13-.18-.17-.28-.04-.1-.06-.21-.05-.32.01-.11.03-.22.08-.32.05-.1.11-.19.19-.27.08-.08.17-.14.27-.18.1-.05.21-.07.33-.07.11 0 .23.02.33.07.11.05.2.11.28.19.08.08.15.17.19.27.05.1.07.21.07.33 0 .11-.02.23-.07.33-.05.11-.11.2-.19.28-.08.08-.17.15-.28.19-.1.05-.21.07-.33.07-.11 0-.23-.02-.33-.07z"/>
                </svg>
                <span className="text-sm">微博</span>
              </button>
            )}
          </div>
      )}
    </div>
  )
}
