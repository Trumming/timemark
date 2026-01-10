import html2canvas from 'html2canvas'

export interface ExportImageOptions {
  filename?: string
  backgroundColor?: string
  padding?: number
}

/**
 * Export a DOM element as an image
 * @param element - The DOM element to capture
 * @param options - Export options
 * @returns Promise that resolves when the image is downloaded
 */
export async function exportElementAsImage(
  element: HTMLElement,
  options: ExportImageOptions = {}
): Promise<void> {
  const {
    filename = 'progress-share.png',
    backgroundColor = '#ffffff',
    padding = 0
  } = options

  try {
    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor,
      logging: false,
      useCORS: true,
      allowTaint: true,
      // Note: Using window.devicePixelRatio for higher quality
      // The scale option is available in html2canvas 1.4+ but not in @types
    } as any)

    // Scale the canvas for better quality
    const scaledCanvas = document.createElement('canvas')
    const ctx = scaledCanvas.getContext('2d')
    const scale = 2 // 2x for better quality
    scaledCanvas.width = canvas.width * scale
    scaledCanvas.height = canvas.height * scale

    if (ctx) {
      ctx.scale(scale, scale)
      ctx.drawImage(canvas, 0, 0)
    }

    // Convert canvas to blob and download
    scaledCanvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to generate image')
      }

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 'image/png')
  } catch (error) {
    console.error('Failed to export image:', error)
    throw error
  }
}

/**
 * Generate shareable image data URL
 * @param element - The DOM element to capture
 * @param options - Export options
 * @returns Promise that resolves to the data URL
 */
export async function generateImageDataURL(
  element: HTMLElement,
  options: ExportImageOptions = {}
): Promise<string> {
  const {
    backgroundColor = '#ffffff',
  } = options

  try {
    const canvas = await html2canvas(element, {
      backgroundColor,
      logging: false,
      useCORS: true,
      allowTaint: true,
    } as any)

    // Scale for better quality
    const scaledCanvas = document.createElement('canvas')
    const ctx = scaledCanvas.getContext('2d')
    const scale = 2
    scaledCanvas.width = canvas.width * scale
    scaledCanvas.height = canvas.height * scale

    if (ctx) {
      ctx.scale(scale, scale)
      ctx.drawImage(canvas, 0, 0)
    }

    return scaledCanvas.toDataURL('image/png')
  } catch (error) {
    console.error('Failed to generate image data URL:', error)
    throw error
  }
}
