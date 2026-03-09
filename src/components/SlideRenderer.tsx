import { forwardRef } from 'react'
import type { SlideContent } from '../types'
import { BG_CYCLE } from '../types'

// Vibe templates
import VibeCover from '../templates/VibeCover'
import VibeStory from '../templates/VibeStory'
import VibeTools from '../templates/VibeTools'
import VibeHow from '../templates/VibeHow'
import VibeResults from '../templates/VibeResults'
import VibeOutro from '../templates/VibeOutro'

// Handbook templates
import CoverSlide from '../templates/CoverSlide'
import IntroSlide from '../templates/IntroSlide'
import DetailSlide from '../templates/DetailSlide'
import DataSlide from '../templates/DataSlide'
import FlowSlide from '../templates/FlowSlide'
import ConclusionSlide from '../templates/ConclusionSlide'

interface Props {
  slide: SlideContent
}

const SlideRenderer = forwardRef<HTMLDivElement, Props>(({ slide }, ref) => {
  const bg = BG_CYCLE[(slide.index - 1) % BG_CYCLE.length]

  const renderSlide = () => {
    switch (slide.type) {
      // Vibe
      case 'vibe-cover': return <VibeCover slide={slide} bg={bg} />
      case 'vibe-story': return <VibeStory slide={slide} bg={bg} />
      case 'vibe-tools': return <VibeTools slide={slide} bg={bg} />
      case 'vibe-how': return <VibeHow slide={slide} bg={bg} />
      case 'vibe-results': return <VibeResults slide={slide} bg={bg} />
      case 'vibe-outro': return <VibeOutro slide={slide} bg={bg} />
      // Handbook
      case 'hb-cover': return <CoverSlide slide={slide} bg={bg} />
      case 'hb-intro': return <IntroSlide slide={slide} bg={bg} />
      case 'hb-detail': return <DetailSlide slide={slide} bg={bg} />
      case 'hb-data': return <DataSlide slide={slide} bg={bg} />
      case 'hb-flow': return <FlowSlide slide={slide} bg={bg} />
      case 'hb-conclusion': return <ConclusionSlide slide={slide} bg={bg} />
      default: return <IntroSlide slide={slide} bg={bg} />
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
