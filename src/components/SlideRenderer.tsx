import { forwardRef } from 'react'
import type { SlideContent, ThemeConfig } from '../types'
import CoverSlide from '../templates/CoverSlide'
import IntroSlide from '../templates/IntroSlide'
import StepsSlide from '../templates/StepsSlide'
import TipsSlide from '../templates/TipsSlide'
import ChecklistSlide from '../templates/ChecklistSlide'
import ConclusionSlide from '../templates/ConclusionSlide'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

const SlideRenderer = forwardRef<HTMLDivElement, Props>(({ slide, theme, totalSlides, series }, ref) => {
  const common = { slide, theme, totalSlides, series }

  const renderSlide = () => {
    switch (slide.type) {
      case 'cover':
        return <CoverSlide {...common} />
      case 'intro':
        return <IntroSlide {...common} />
      case 'steps':
        return <StepsSlide {...common} />
      case 'tips':
        return <TipsSlide {...common} />
      case 'checklist':
        return <ChecklistSlide {...common} />
      case 'conclusion':
        return <ConclusionSlide {...common} />
      default:
        return <IntroSlide {...common} />
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
