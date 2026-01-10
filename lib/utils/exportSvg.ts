export interface SvgExportOptions {
  percentage: number
  type: string
  shape: string
  primaryColor: string
  message: string
  daysPassed: number
  daysRemaining: number
  locale: string
  filename?: string
}

/**
 * Generate a simple SVG image for export
 */
function generateProgressSvg(options: SvgExportOptions): string {
  const {
    percentage,
    type,
    primaryColor,
    message,
    daysPassed,
    daysRemaining,
    locale,
  } = options

  const width = 800
  const height = 600
  const padding = 60

  // Format numbers for display
  const percentageText = percentage.toFixed(1) + '%'

  // Get localized labels
  const labels = {
    zh: { passed: '已过', remaining: '剩余', day: '天' },
    en: { passed: 'Passed', remaining: 'Remaining', day: 'days' },
    ja: { passed: '経過', remaining: '残り', day: '日' },
  }
  const lang = labels[locale as keyof typeof labels] || labels.zh

  // Generate SVG
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&amp;family=Outfit:wght@400;500;600&amp;display=swap');
      .title { font-family: 'Noto Sans SC', 'Outfit', sans-serif; font-size: 32px; font-weight: 600; fill: #1a1a1a; }
      .subtitle { font-family: 'Noto Sans SC', 'Outfit', sans-serif; font-size: 18px; font-weight: 400; fill: #666; }
      .percentage { font-family: 'Outfit', sans-serif; font-size: 72px; font-weight: 600; fill: ${primaryColor}; }
      .message { font-family: 'Noto Sans SC', 'Outfit', sans-serif; font-size: 24px; font-weight: 400; fill: #333; }
      .label { font-family: 'Noto Sans SC', 'Outfit', sans-serif; font-size: 16px; font-weight: 400; fill: #888; }
      .number { font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 500; fill: ${primaryColor}; }
      .card-bg { fill: #ffffff; }
      .border { stroke: #e5e5e5; stroke-width: 2; fill: none; }
      .progress-bar { fill: ${primaryColor}; }
      .progress-bg { fill: #f0f0f0; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#ffffff"/>

  <!-- Card border with rounded corners -->
  <rect x="${padding}" y="${padding}" width="${width - padding * 2}" height="${height - padding * 2}" rx="24" class="border" fill="#ffffff"/>

  <!-- Title -->
  <text x="${width / 2}" y="120" text-anchor="middle" class="title">时光印记</text>
  <text x="${width / 2}" y="150" text-anchor="middle" class="subtitle">${type === 'year' ? new Date().getFullYear() + '年' : type}</text>

  <!-- Percentage -->
  <text x="${width / 2}" y="280" text-anchor="middle" class="percentage">${percentageText}</text>

  <!-- Message -->
  <text x="${width / 2}" y="340" text-anchor="middle" class="message">${message}</text>

  <!-- Day counters -->
  <g transform="translate(${width / 2 - 150}, 420)">
    <!-- Passed -->
    <text x="75" y="0" text-anchor="middle" class="number">${daysPassed}</text>
    <text x="75" y="30" text-anchor="middle" class="label">${lang.passed} ${lang.day}</text>
  </g>

  <g transform="translate(${width / 2 + 75}, 420)">
    <!-- Remaining -->
    <text x="0" y="0" text-anchor="middle" class="number">${daysRemaining}</text>
    <text x="0" y="30" text-anchor="middle" class="label">${lang.remaining} ${lang.day}</text>
  </g>

  <!-- Footer -->
  <text x="${width / 2}" y="540" text-anchor="middle" class="subtitle" style="font-size: 14px;">时光温柔流逝，每一刻都值得珍惜</text>
</svg>`
}

/**
 * Convert SVG string to Blob and download
 */
function svgToPng(svgString: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Create a blob from the SVG string
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      // Create an image element
      const img = new Image()
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = 800
        canvas.height = 600
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Draw the image
        ctx.drawImage(img, 0, 0)

        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create PNG blob'))
            return
          }

          const pngUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = pngUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          setTimeout(() => {
            URL.revokeObjectURL(url)
            URL.revokeObjectURL(pngUrl)
          }, 100)

          resolve()
        }, 'image/png')
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load SVG image'))
      }

      img.src = url
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Export progress as image using SVG
 */
export async function exportProgressAsImage(options: SvgExportOptions): Promise<void> {
  const filename = options.filename || `progress-${Date.now()}.png`

  try {
    console.log('Generating SVG for export...')
    const svgString = generateProgressSvg(options)
    console.log('Converting SVG to PNG...')
    await svgToPng(svgString, filename)
    console.log('Image export completed')
  } catch (error) {
    console.error('Failed to export image:', error)
    throw error
  }
}
