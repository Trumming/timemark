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
    console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight)

    // Store original classes and styles
    const originalClasses: Array<{ el: Element, classes: string[] }> = []
    const originalStyles: Array<{ el: HTMLElement, style: string }> = []

    // Temporarily remove problematic classes and styles
    const allElements = element.querySelectorAll('*')
    allElements.forEach(el => {
      // Store original classes
      if (el.classList.contains('gradient-dawn')) {
        originalClasses.push({ el, classes: Array.from(el.classList) })
        el.classList.remove('gradient-dawn')
      }
      if (el.classList.contains('text-transparent')) {
        originalClasses.push({ el, classes: Array.from(el.classList) })
        el.classList.remove('text-transparent')
      }

      // Force solid background on glass-gentle elements
      if (el.classList.contains('glass-gentle') && el instanceof HTMLElement) {
        originalStyles.push({ el, style: el.style.cssText })
        el.style.background = '#ffffff'
        el.style.backgroundColor = '#ffffff'
        el.style.boxShadow = '0 4px 24px -1px rgb(0 0 0 / 0.04)'
      }
    })

    // Handle the main element too
    if (element.classList.contains('glass-gentle')) {
      originalStyles.push({ el: element, style: element.style.cssText })
      element.style.background = '#ffffff'
      element.style.backgroundColor = '#ffffff'
      element.style.boxShadow = '0 4px 24px -1px rgb(0 0 0 / 0.04)'
    }

    try {
      // Create a canvas from the element
      let canvas: HTMLCanvasElement
      try {
        canvas = await html2canvas(element, {
          backgroundColor,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scale: 2,
        } as any)
        console.log('Canvas created successfully:', canvas.width, 'x', canvas.height)
      } catch (err) {
        console.error('html2canvas failed:', err)
        throw new Error(`html2canvas failed: ${err}`)
      }

      // Convert canvas to blob
      let blob: Blob
      try {
        blob = await canvasToBlob(canvas, 'image/png')
        console.log('Blob created successfully:', blob.size, 'bytes')
      } catch (err) {
        console.error('canvasToBlob failed:', err)
        throw new Error(`canvasToBlob failed: ${err}`)
      }

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

      console.log('Image export completed successfully')
    } finally {
      // Restore original classes and styles
      originalClasses.forEach(({ el, classes }) => {
        el.className = classes.join(' ')
      })
      originalStyles.forEach(({ el, style }) => {
        el.style.cssText = style
      })
    }
  } catch (error) {
    console.error('Failed to export image. Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error
    })
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
