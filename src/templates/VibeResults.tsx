import type { SlideContent } from '../types'
import SlideBase, { T1, T2, T3, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 05 — Results: title + story + 3 stat cells + quote */
export default function VibeResults({ slide, bg }: Props) {
  const stats = slide.stats ?? []

  return (
    <SlideBase pageNum={5} totalPages={6} bg={bg}>
      {/* Tag line */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '效果'}
      </div>

      {/* Big title */}
      <div style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 700, fontSize: '1.65rem',
        lineHeight: 1.38, color: T1,
        letterSpacing: '-0.01em', marginBottom: 16,
      }}>
        {slide.title}
        {slide.titleEm && (
          <>
            <br />
            <span style={{ color: G1 }}>{slide.titleEm}</span>
          </>
        )}
      </div>

      {/* Story */}
      {slide.story && (
        <p style={{
          fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300,
          marginBottom: 18,
        }}>
          {slide.story}
        </p>
      )}

      {/* Stat row */}
      {stats.length > 0 && (
        <div style={{
          display: 'flex', gap: 0,
          border: `1px solid ${LINE}`, borderRadius: 8,
          overflow: 'hidden', marginBottom: 18,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: 14,
              borderRight: i < stats.length - 1 ? `1px solid ${LINE}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 200, fontSize: '1.5rem',
                lineHeight: 1, color: T1,
              }}>
                <span style={{ fontStyle: 'italic', color: G1 }}>{s.value}</span>
              </div>
              <div style={{
                fontSize: '0.65rem', color: T3,
                fontWeight: 300, lineHeight: 1.4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quote */}
      {slide.quote && (
        <div style={{
          background: '#e7e0d6', borderRadius: 8,
          padding: '16px 18px',
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 200, fontSize: '0.95rem',
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
    </SlideBase>
  )
}
