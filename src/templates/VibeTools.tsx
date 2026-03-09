import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1, G2, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 03 — Tools: big title + 3 numbered steps */
export default function VibeTools({ slide, bg }: Props) {
  const steps = slide.steps ?? []

  return (
    <SlideBase pageNum={3} totalPages={6} bg={bg}>
      {/* Tag line */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '用了啥'}
      </div>

      {/* Big title */}
      <div style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 700, fontSize: '1.65rem',
        lineHeight: 1.38, color: T1,
        letterSpacing: '-0.01em', marginBottom: 18,
      }}>
        {slide.title}
        {slide.titleEm && (
          <>
            <br />
            <span style={{ color: G1 }}>{slide.titleEm}</span>
          </>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            padding: '14px 0',
            borderTop: i === 0 ? `1px solid ${LINE}` : 'none',
            borderBottom: `1px solid ${LINE}`,
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 200, fontStyle: 'italic',
              fontSize: '1.5rem', color: G2,
              lineHeight: 1, flexShrink: 0, width: 26,
              marginTop: -2,
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{
                fontWeight: 500, fontSize: '0.82rem',
                color: T1, marginBottom: 4, lineHeight: 1.3,
              }}>
                {step.title}
              </div>
              <div style={{
                fontSize: '0.7rem', color: T2,
                lineHeight: 1.65, fontWeight: 300,
              }}>
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideBase>
  )
}
