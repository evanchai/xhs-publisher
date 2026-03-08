import { forwardRef } from 'react'
import type { SlideContent, ThemeConfig } from '../types'
import CoverSlide from '../templates/CoverSlide'
import ContentSlide from '../templates/ContentSlide'
import EndSlide from '../templates/EndSlide'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
}

const SlideRenderer = forwardRef<HTMLDivElement, Props>(({ slide, theme, totalSlides }, ref) => {
  const renderSlide = () => {
    switch (slide.type) {
      case 'cover':
        return <CoverSlide slide={slide} theme={theme} totalSlides={totalSlides} />
      case 'end':
        return <EndSlide slide={slide} theme={theme} totalSlides={totalSlides} />
      default:
        return <ContentSlide slide={slide} theme={theme} totalSlides={totalSlides} />
    }
  }

  return (
    <div ref={ref} className="shrink-0">
      {renderSlide()}
    </div>
  )
})

SlideRenderer.displayName = 'SlideRenderer'

export default SlideRenderer
