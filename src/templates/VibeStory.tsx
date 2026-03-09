import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1 } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 02 — Story: Fraunces display title + story + quote + bridge */
export default function VibeStory({ slide, bg }: Props) {
  return (
    <SlideBase pageNum={2} totalPages={6} bg={bg}>
      {/* Tag line */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '起因'}
      </div>

      {/* Display title (Fraunces) */}
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 200, fontSize: '2.6rem',
        lineHeight: 1.05, color: T1,
        letterSpacing: '-0.02em', marginBottom: 20,
      }}>
        {slide.displayTitleL1}
        <br />
        {slide.displayTitleL2}
        {slide.displayTitleEm && (
          <em style={{ fontStyle: 'italic', color: G1 }}>{slide.displayTitleEm}</em>
        )}
      </div>

      {/* Story text */}
      {slide.story && (
        <p style={{
          fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300,
          marginBottom: 18,
        }}>
          {slide.story}
        </p>
      )}

      {/* Quote block */}
      {slide.quote && (
        <div style={{
          background: '#e7e0d6', borderRadius: 8,
          padding: '16px 18px', marginBottom: 18,
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 200, fontSize: '1.1rem',
            lineHeight: 1.5, color: T1,
          }}>
            {slide.quote}
            {slide.quoteEm && (
              <>
                <br />
                <em style={{ fontStyle: 'italic', color: G1 }}>{slide.quoteEm}</em>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bridge */}
      {slide.bridge && (
        <p style={{ fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300 }}>
          {slide.bridge}
        </p>
      )}
    </SlideBase>
  )
}
