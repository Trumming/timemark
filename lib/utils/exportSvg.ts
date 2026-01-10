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
 * Generate a premium, visually stunning SVG progress card
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

  const width = 1080
  const height = 1080
  const centerX = width / 2
  const centerY = height / 2

  // Format numbers for display
  const percentageText = percentage.toFixed(1) + '%'

  // Get localized labels
  const labels = {
    zh: { passed: '已过', remaining: '剩余', day: '天', footer: '时光温柔流逝，每一刻都值得珍惜' },
    en: { passed: 'Passed', remaining: 'Remaining', day: 'days', footer: 'Time flows gently, cherish every moment' },
    ja: { passed: '経過', remaining: '残り', day: '日', footer: '時は優しく流れ、瞬瞬を大切に' },
  }
  const lang = labels[locale as keyof typeof labels] || labels.zh

  // Dawn-inspired gradient colors
  const gradientStart = primaryColor || '#a7c7a0'
  const gradientMid = '#f4c5b0'
  const gradientEnd = '#e8d5f0'

  // Calculate circular progress
  const radius = 180
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (percentage / 100) * circumference
  const startAngle = -90 // Start from top

  // Generate premium SVG
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- Premium gradient background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#faf8f5;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#f5f3ef;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f0ede7;stop-opacity:1" />
    </linearGradient>

    <!-- Dawn gradient for progress ring -->
    <linearGradient id="dawnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradientStart};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${gradientMid};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradientEnd};stop-opacity:1" />
    </linearGradient>

    <!-- Soft shadow for glass card -->
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="30" result="blur"/>
      <feOffset in="blur" dx="0" dy="20" result="offsetBlur"/>
      <feFlood flood-color="#a7c7a0" flood-opacity="0.15" result="offsetColor"/>
      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Glassmorphism effect -->
    <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"/>
      <feBlend in="SourceGraphic" in2="blur" mode="normal"/>
    </filter>

    <!-- Subtle noise texture -->
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.03 0"/>
    </filter>

    <!-- Glow effect for percentage -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Font definitions -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700;900&amp;family=Cormorant+Garamond:wght@400;500;600;700&amp;family=Outfit:wght@300;400;500;600&amp;display=swap');

      .bg-rect { fill: url(#bgGradient); }

      .decorative-circle-1 {
        fill: none;
        stroke: ${gradientStart};
        stroke-width: 1;
        opacity: 0.2;
      }

      .decorative-circle-2 {
        fill: none;
        stroke: ${gradientMid};
        stroke-width: 0.5;
        opacity: 0.15;
      }

      .decorative-circle-3 {
        fill: ${gradientEnd};
        opacity: 0.08;
      }

      .glass-card {
        fill: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(20px);
        stroke: rgba(255, 255, 255, 0.8);
        stroke-width: 1.5;
      }

      .title {
        font-family: 'Noto Serif SC', serif;
        font-size: 42px;
        font-weight: 700;
        fill: #2c2c2c;
        letter-spacing: 0.15em;
      }

      .subtitle {
        font-family: 'Cormorant Garamond', serif;
        font-size: 22px;
        font-weight: 400;
        fill: #7c7c7c;
        letter-spacing: 0.1em;
        font-style: italic;
      }

      .percentage {
        font-family: 'Outfit', sans-serif;
        font-size: 140px;
        font-weight: 300;
        fill: url(#dawnGradient);
        filter: url(#glow);
      }

      .message {
        font-family: 'Noto Serif SC', serif;
        font-size: 28px;
        font-weight: 400;
        fill: #3c3c3c;
        letter-spacing: 0.08em;
      }

      .label {
        font-family: 'Outfit', sans-serif;
        font-size: 14px;
        font-weight: 400;
        fill: #9c9c9c;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .number {
        font-family: 'Cormorant Garamond', serif;
        font-size: 48px;
        font-weight: 600;
        fill: ${primaryColor};
      }

      .footer {
        font-family: 'Noto Serif SC', serif;
        font-size: 13px;
        font-weight: 400;
        fill: #a0a0a0;
        letter-spacing: 0.15em;
      }

      .brand {
        font-family: 'Outfit', sans-serif;
        font-size: 11px;
        font-weight: 500;
        fill: #c0c0c0;
        letter-spacing: 0.2em;
      }

      .progress-ring-bg {
        fill: none;
        stroke: rgba(167, 199, 160, 0.1);
        stroke-width: 8;
        stroke-linecap: round;
      }

      .progress-ring {
        fill: none;
        stroke: url(#dawnGradient);
        stroke-width: 8;
        stroke-linecap: round;
        stroke-dasharray: ${circumference};
        stroke-dashoffset: ${progressOffset};
        transform: rotate(${startAngle}deg);
        transform-origin: center;
        filter: url(#glow);
      }
    </style>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" class="bg-rect"/>

  <!-- Noise texture overlay -->
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4"/>

  <!-- Decorative floating circles -->
  <circle cx="120" cy="180" r="80" class="decorative-circle-1"/>
  <circle cx="960" cy="900" r="120" class="decorative-circle-1"/>
  <circle cx="900" cy="200" r="60" class="decorative-circle-2"/>
  <circle cx="180" cy="880" r="100" class="decorative-circle-2"/>
  <circle cx="100" cy="540" r="40" class="decorative-circle-3"/>
  <circle cx="980" cy="540" r="50" class="decorative-circle-3"/>

  <!-- Glass card in center -->
  <rect x="140" y="140" width="800" height="800" rx="32" class="glass-card" filter="url(#shadow)"/>

  <!-- Inner decorative lines -->
  <line x1="180" y1="180" x2="280" y2="180" stroke="${gradientStart}" stroke-width="1" opacity="0.3"/>
  <line x1="180" y1="180" x2="180" y2="280" stroke="${gradientStart}" stroke-width="1" opacity="0.3"/>
  <line x1="900" y1="900" x2="800" y2="900" stroke="${gradientEnd}" stroke-width="1" opacity="0.3"/>
  <line x1="900" y1="900" x2="900" y2="800" stroke="${gradientEnd}" stroke-width="1" opacity="0.3"/>

  <!-- Title section -->
  <text x="${centerX}" y="230" text-anchor="middle" class="title">时光印记</text>
  <text x="${centerX}" y="265" text-anchor="middle" class="subtitle">${type === 'year' ? new Date().getFullYear() + ' · 年度进度' : type}</text>

  <!-- Progress ring -->
  <g transform="translate(${centerX}, ${centerY - 20})">
    <!-- Background ring -->
    <circle cx="0" cy="0" r="${radius}" class="progress-ring-bg"/>
    <!-- Progress ring -->
    <circle cx="0" cy="0" r="${radius}" class="progress-ring"/>

    <!-- Decorative inner circles -->
    <circle cx="0" cy="0" r="${radius - 30}" fill="none" stroke="${gradientStart}" stroke-width="0.5" opacity="0.15"/>
    <circle cx="0" cy="0" r="${radius - 60}" fill="none" stroke="${gradientMid}" stroke-width="0.5" opacity="0.1"/>
  </g>

  <!-- Percentage in center -->
  <text x="${centerX}" y="${centerY + 25}" text-anchor="middle" class="percentage">${percentageText}</text>

  <!-- Message -->
  <text x="${centerX}" y="${centerY + 120}" text-anchor="middle" class="message">${message}</text>

  <!-- Day counters -->
  <g transform="translate(${centerX - 180}, ${centerY + 200})">
    <text x="0" y="-20" text-anchor="middle" class="label">${lang.passed}</text>
    <text x="0" y="30" text-anchor="middle" class="number">${daysPassed}</text>
    <text x="0" y="55" text-anchor="middle" class="label">${lang.day}</text>
  </g>

  <g transform="translate(${centerX + 180}, ${centerY + 200})">
    <text x="0" y="-20" text-anchor="middle" class="label">${lang.remaining}</text>
    <text x="0" y="30" text-anchor="middle" class="number">${daysRemaining}</text>
    <text x="0" y="55" text-anchor="middle" class="label">${lang.day}</text>
  </g>

  <!-- Decorative divider -->
  <line x1="${centerX - 100}" y1="${centerY + 290}" x2="${centerX + 100}" y2="${centerY + 290}"
        stroke="${gradientStart}" stroke-width="1" opacity="0.3" stroke-linecap="round"/>

  <!-- Footer -->
  <text x="${centerX}" y="${centerY + 340}" text-anchor="middle" class="footer">${lang.footer}</text>

  <!-- Brand watermark -->
  <text x="${centerX}" y="870" text-anchor="middle" class="brand">TIME MARK · 时光印记</text>

  <!-- Corner accents -->
  <path d="M 160 160 L 200 160 L 160 200 Z" fill="${gradientStart}" opacity="0.15"/>
  <path d="M 920 920 L 880 920 L 920 880 Z" fill="${gradientEnd}" opacity="0.15"/>
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
        // Create canvas with 1080x1080 for high quality
        const canvas = document.createElement('canvas')
        canvas.width = 1080
        canvas.height = 1080
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

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
