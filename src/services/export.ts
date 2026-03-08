import { toPng } from 'html-to-image'

export async function exportSlideAsImage(element: HTMLElement): Promise<string> {
  const dataUrl = await toPng(element, {
    pixelRatio: 3,
  })
  return dataUrl
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

export async function downloadAllSlides(elements: HTMLElement[], title: string) {
  for (let i = 0; i < elements.length; i++) {
    const dataUrl = await exportSlideAsImage(elements[i])
    downloadImage(dataUrl, `${title}_${i + 1}.png`)
    // Small delay between downloads to avoid browser blocking
    await new Promise(r => setTimeout(r, 300))
  }
}
