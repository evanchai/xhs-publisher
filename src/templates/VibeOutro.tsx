import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 06 — Outro: display title + body + tool pills + preview + CTA + leaf */
export default function VibeOutro({ slide, bg }: Props) {
  const tools = slide.tools ?? []

  return (
    <SlideBase pageNum={6} totalPages={6} bg={bg}>
      {/* Decorative leaf (top-right, rotated) */}
      <svg style={{
        position: 'absolute', right: -8, top: -8,
        pointerEvents: 'none', opacity: 0.12,
        transform: 'rotate(120deg)',
      }} width="120" height="120" viewBox="0 0 140 140" fill="none">
        <path d="M20 120 Q70 20 130 10 Q110 70 20 120Z" fill={G1} />
        <path d="M20 120 Q75 65 130 10" stroke={bg} strokeWidth="1.5" fill="none" />
      </svg>

      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        flex: 1, position: 'relative', zIndex: 1,
      }}>
        <div>
          {/* Tag line */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.5rem', letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: G1, marginBottom: 16,
          }}>
            {slide.tagLine ?? '你也可以做'}
          </div>

          {/* Display title (Fraunces) */}
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 200, fontSize: '2.2rem',
            lineHeight: 1.05, color: T1,
            letterSpacing: '-0.02em', marginBottom: 20,
          }}>
            {slide.displayTitleL1}
            <br />
            {slide.displayTitleEm && (
              <em style={{ fontStyle: 'italic', color: G1 }}>{slide.displayTitleEm}</em>
            )}
          </div>

          {/* Body */}
          {slide.body && (
            <p style={{
              fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300,
              marginBottom: 18,
            }}>
              {slide.body}
            </p>
          )}

          {/* Tool pills */}
          {tools.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 7, marginBottom: 18 }}>
              {tools.map((tool, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  border: `1px solid ${LINE}`, borderRadius: 100,
                  fontSize: '0.72rem', fontWeight: 300, color: T1,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: G1, flexShrink: 0 }} />
                  {tool}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: preview + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ height: 1, background: LINE }} />
          <p style={{ fontSize: '0.7rem', color: '#a69e94', lineHeight: 1.75, fontWeight: 300 }}>
            {slide.preview}
            <br />
            <span style={{ color: G1, fontWeight: 400 }}>
              {slide.cta ?? '关注 ning.codes 不迷路 ↗'}
            </span>
          </p>
        </div>
      </div>
    </SlideBase>
  )
}
