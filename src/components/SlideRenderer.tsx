import { forwardRef } from 'react'
import type { SlideContent, ThemeConfig } from '../types'
import CoverSlide from '../templates/CoverSlide'
import IntroSlide from '../templates/IntroSlide'
import DetailSlide from '../templates/DetailSlide'
import DataSlide from '../templates/DataSlide'
import FlowSlide from '../templates/FlowSlide'
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
      case 'detail':
        return <DetailSlide {...common} />
      case 'data':
        return <DataSlide {...common} />
      case 'flow':
        return <FlowSlide {...common} />
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
