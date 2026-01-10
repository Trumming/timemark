import html2canvas from 'html2canvas'

export interface ExportImageOptions {
  filename?: string
  backgroundColor?: string
  padding?: number
}

/**
 * Convert canvas to blob as a Promise
 */
function canvasToBlob(canvas: HTMLCanvasElement, type = 'image/png', quality = 1): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Canvas toBlob failed'))
      }
    }, type, quality)
  })
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
  } = options

  try {
    console.log('Starting image export for:', element)

    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor,
      logging: true, // Enable logging for debugging
      useCORS: true,
      allowTaint: true,
      scale: 2, // Use scale option for higher quality
    } as any)

    console.log('Canvas created:', canvas.width, 'x', canvas.height)

    // Convert canvas to blob
    const blob = await canvasToBlob(canvas, 'image/png')

    console.log('Blob created:', blob.size, 'bytes')

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)

    console.log('Image export completed')
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
      scale: 2,
    } as any)

    return canvas.toDataURL('image/png')
  } catch (error) {
    console.error('Failed to generate image data URL:', error)
    throw error
  }
}
