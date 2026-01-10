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

  // Generate premium SVG with improved spacing
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
        fill: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        stroke: rgba(255, 255, 255, 0.85);
        stroke-width: 1;
      }

      .title {
        font-family: 'Noto Serif SC', serif;
        font-size: 44px;
        font-weight: 700;
        fill: #2c2c2c;
        letter-spacing: 0.18em;
      }

      .subtitle {
        font-family: 'Cormorant Garamond', serif;
        font-size: 20px;
        font-weight: 400;
        fill: #8c8c8c;
        letter-spacing: 0.08em;
        font-style: italic;
      }

      .percentage {
        font-family: 'Outfit', sans-serif;
        font-size: 128px;
        font-weight: 300;
        fill: url(#dawnGradient);
        filter: url(#glow);
      }

      .message {
        font-family: 'Noto Serif SC', serif;
        font-size: 26px;
        font-weight: 400;
        fill: #4a4a4a;
        letter-spacing: 0.06em;
      }

      .label {
        font-family: 'Outfit', sans-serif;
        font-size: 12px;
        font-weight: 500;
        fill: #9c9c9c;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .number {
        font-family: 'Cormorant Garamond', serif;
        font-size: 52px;
        font-weight: 600;
        fill: ${primaryColor};
      }

      .footer {
        font-family: 'Noto Serif SC', serif;
        font-size: 12px;
        font-weight: 400;
        fill: #a8a8a8;
        letter-spacing: 0.12em;
      }

      .brand {
        font-family: 'Outfit', sans-serif;
        font-size: 10px;
        font-weight: 500;
        fill: #b8b8b8;
        letter-spacing: 0.25em;
      }

      .progress-ring-bg {
        fill: none;
        stroke: rgba(167, 199, 160, 0.08);
        stroke-width: 6;
        stroke-linecap: round;
      }

      .progress-ring {
        fill: none;
        stroke: url(#dawnGradient);
        stroke-width: 6;
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
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.35"/>

  <!-- Decorative floating circles -->
  <circle cx="100" cy="160" r="90" class="decorative-circle-1"/>
  <circle cx="980" cy="920" r="110" class="decorative-circle-1"/>
  <circle cx="920" cy="180" r="65" class="decorative-circle-2"/>
  <circle cx="160" cy="900" r="85" class="decorative-circle-2"/>
  <circle cx="90" cy="540" r="35" class="decorative-circle-3"/>
  <circle cx="990" cy="540" r="45" class="decorative-circle-3"/>

  <!-- Glass card in center -->
  <rect x="120" y="120" width="840" height="840" rx="28" class="glass-card" filter="url(#shadow)"/>

  <!-- Inner decorative lines -->
  <line x1="155" y1="155" x2="245" y2="155" stroke="${gradientStart}" stroke-width="1" opacity="0.25"/>
  <line x1="155" y1="155" x2="155" y2="245" stroke="${gradientStart}" stroke-width="1" opacity="0.25"/>
  <line x1="925" y1="925" x2="835" y2="925" stroke="${gradientEnd}" stroke-width="1" opacity="0.25"/>
  <line x1="925" y1="925" x2="925" y2="835" stroke="${gradientEnd}" stroke-width="1" opacity="0.25"/>

  <!-- Title section - moved up for better breathing room -->
  <text x="${centerX}" y="215" text-anchor="middle" class="title">时光印记</text>
  <text x="${centerX}" y="250" text-anchor="middle" class="subtitle">${type === 'year' ? new Date().getFullYear() + ' · 年度进度' : type}</text>

  <!-- Progress ring - centered better -->
  <g transform="translate(${centerX}, 510)">
    <!-- Background ring -->
    <circle cx="0" cy="0" r="${radius}" class="progress-ring-bg"/>
    <!-- Progress ring -->
    <circle cx="0" cy="0" r="${radius}" class="progress-ring"/>

    <!-- Decorative inner circles -->
    <circle cx="0" cy="0" r="${radius - 25}" fill="none" stroke="${gradientStart}" stroke-width="0.5" opacity="0.12"/>
    <circle cx="0" cy="0" r="${radius - 50}" fill="none" stroke="${gradientMid}" stroke-width="0.5" opacity="0.08"/>
  </g>

  <!-- Percentage in center -->
  <text x="${centerX}" y="535" text-anchor="middle" class="percentage">${percentageText}</text>

  <!-- Message - improved spacing -->
  <text x="${centerX}" y="640" text-anchor="middle" class="message">${message}</text>

  <!-- Day counters - repositioned for better balance -->
  <g transform="translate(${centerX - 200}, 720)">
    <text x="0" y="0" text-anchor="middle" class="label">${lang.passed}</text>
    <text x="0" y="48" text-anchor="middle" class="number">${daysPassed}</text>
    <text x="0" y="78" text-anchor="middle" class="label">${lang.day}</text>
  </g>

  <g transform="translate(${centerX + 200}, 720)">
    <text x="0" y="0" text-anchor="middle" class="label">${lang.remaining}</text>
    <text x="0" y="48" text-anchor="middle" class="number">${daysRemaining}</text>
    <text x="0" y="78" text-anchor="middle" class="label">${lang.day}</text>
  </g>

  <!-- Decorative divider - adjusted position -->
  <line x1="${centerX - 80}" y1="820" x2="${centerX + 80}" y2="820"
        stroke="${gradientStart}" stroke-width="1" opacity="0.25" stroke-linecap="round"/>

  <!-- Footer - adjusted for better spacing -->
  <text x="${centerX}" y="865" text-anchor="middle" class="footer">${lang.footer}</text>

  <!-- Brand watermark -->
  <text x="${centerX}" y="910" text-anchor="middle" class="brand">TIME MARK · 时光印记</text>

  <!-- Corner accents -->
  <path d="M 140 140 L 175 140 L 140 175 Z" fill="${gradientStart}" opacity="0.12"/>
  <path d="M 940 940 L 905 940 L 940 905 Z" fill="${gradientEnd}" opacity="0.12"/>
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
