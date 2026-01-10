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

    // Create a canvas from the element
    let canvas: HTMLCanvasElement
    try {
      canvas = await html2canvas(element, {
        backgroundColor,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scale: 2,
        onclone: (clonedDoc: Document) => {
          // Remove elements and classes that cause CSS parsing issues
          const allElements = clonedDoc.querySelectorAll('*')
          allElements.forEach(el => {
            // Remove gradient-dawn class which uses CSS variables
            el.classList.remove('gradient-dawn')

            // Remove text-transparent class that works with gradients
            if (el.classList.contains('text-transparent') ||
                el.classList.contains('bg-clip-text')) {
              el.classList.remove('text-transparent', 'bg-clip-text')
            }
          })

          // Force solid background on glass-gentle elements
          const glassElements = clonedDoc.querySelectorAll('.glass-gentle')
          glassElements.forEach((el: any) => {
            el.style.background = '#ffffff'
            el.style.backgroundColor = '#ffffff'
          })
        },
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
