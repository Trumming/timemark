'use client'

import { useState, useEffect, useRef } from 'react'
import { Download, X, Image as ImageIcon, Share2 } from 'lucide-react'
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
  backgroundColor,
}: QuickShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const getShareText = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const currentYear = new Date().getFullYear()
    const p = percentage.toFixed(1)

    const shareTexts: Record<string, Record<string, string>> = {
      zh: {
        year: `今年 ${currentYear} 已过 ${p}%。时光温柔流逝，每一刻都值得珍惜。`,
        month: `本月已过 ${p}%，继续从容前行。`,
        week: `本周已过 ${p}%，保持内心的节奏。`,
        lifetime: `人生旅程已过 ${p}%，每一步都是风景。`,
      },
      en: {
        year: `${p}% of ${currentYear} has passed. Time flows gently — cherish every moment.`,
        month: `${p}% of this month has passed. Keep moving gracefully.`,
        week: `${p}% of this week has passed. Hold your inner rhythm.`,
        lifetime: `${p}% of life's journey has passed. Every step is scenery.`,
      },
      ja: {
        year: `${currentYear}年の${p}%が経過しました。時は優しく流れ、瞬瞬を大切に。`,
        month: `今月の${p}%が経過しました。優雅に前進を。`,
        week: `今週の${p}%が経過しました。心のリズムを保って。`,
        lifetime: `人生の旅の${p}%が経過しました。一歩一歩が風景。`,
      },
    }

    return (shareTexts[locale]?.[type] || shareTexts.zh[type]) + '\n' + currentUrl
  }

  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const shareToWeibo = () => {
    const url = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(getShareText())}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const downloadImage = async () => {
    setIsDownloading(true)
    try {
      const year = new Date().getFullYear()
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
        filename: `${type}-progress-${year}.png`,
      })
    } catch (error) {
      console.error('Failed to export image:', error)
      const msg = error instanceof Error ? error.message : String(error)
      alert(`${t(locale, 'exportFailed') || 'Export failed:'} ${msg}`)
    } finally {
      setIsDownloading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="icon-btn h-9 w-9"
        aria-label={t(locale, 'share') || 'Share'}
        aria-expanded={isOpen}
      >
        <Share2 className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </button>

      {isOpen && (
        <div className="surface surface-raised absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden p-1">
          <button
            type="button"
            onClick={downloadImage}
            disabled={isDownloading}
            className="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground/5 disabled:opacity-50"
          >
            {isDownloading ? (
              <Download className="h-4 w-4 animate-pulse" strokeWidth={1.6} />
            ) : (
              <ImageIcon className="h-4 w-4" strokeWidth={1.6} />
            )}
            <span>
              {isDownloading
                ? t(locale, 'generating') || 'Generating…'
                : t(locale, 'saveImage') || 'Save Image'}
            </span>
          </button>

          <button
            type="button"
            onClick={shareToX}
            className="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground/5"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
            <span>X (Twitter)</span>
          </button>

          {locale === 'zh' && (
            <button
              type="button"
              onClick={shareToWeibo}
              className="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground/5"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.98 17.55c-4.42-.01-8.4-3.07-9.38-7.03-.36-1.45-.3-2.84.14-4.13.53-1.54 1.53-2.88 2.91-3.96.95-.74 2.04-1.28 3.22-1.57.88-.21 1.79-.27 2.7-.16 1.63.19 3.12.81 4.4 1.83.79.63 1.46 1.38 1.97 2.23.52.87.86 1.82.99 2.81.13.99.03 2.01-.29 2.96-.37 1.1-.99 2.09-1.82 2.9-.83.81-1.84 1.43-2.95 1.8-.97.33-1.99.41-2.99.27-.63-.09-1.24-.26-1.82-.52z" />
              </svg>
              <span>微博</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
