import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 04 — How it works: metaphor title + ghost num + 4 checklist + footnote */
export default function VibeHow({ slide, bg }: Props) {
  const checks = slide.checks ?? []

  return (
    <SlideBase pageNum={4} totalPages={6} bg={bg}>
      {/* Ghost number */}
      <div style={{
        position: 'absolute', right: -20, top: 10,
        fontFamily: "'Fraunces', serif", fontWeight: 100,
        fontSize: '11rem', lineHeight: 1,
        color: 'rgba(46,43,38,0.04)',
        letterSpacing: '-0.04em',
        pointerEvents: 'none', userSelect: 'none' as const,
        zIndex: 0,
      }}>
        04
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tag line */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem', letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: G1, marginBottom: 16,
        }}>
          {slide.tagLine ?? '怎么运作的'}
        </div>

        {/* Metaphor title */}
        <div style={{
          fontFamily: "'Noto Sans SC', sans-serif",
          fontWeight: 700, fontSize: '1.65rem',
          lineHeight: 1.38, color: T1,
          letterSpacing: '-0.01em', marginBottom: 20,
        }}>
          {slide.title}
          {slide.titleEm && (
            <>
              <br />
              <span style={{ color: G1 }}>{slide.titleEm}</span>
            </>
          )}
        </div>

        {/* Intro text */}
        {slide.body && (
          <p style={{
            fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300,
            marginBottom: 18,
          }}>
            {slide.body}
          </p>
        )}

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {checks.map((text, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 11,
              padding: '12px 0',
              borderTop: i === 0 ? `1px solid ${LINE}` : 'none',
              borderBottom: `1px solid ${LINE}`,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `1.5px solid ${G1}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '0.48rem', color: G1,
                marginTop: 1,
              }}>
                ●
              </div>
              <span style={{
                fontSize: '0.74rem', color: T1, fontWeight: 300,
                lineHeight: 1.5, flex: 1,
              }}
                dangerouslySetInnerHTML={{
                  __html: text.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:500">$1</strong>')
                }}
              />
            </div>
          ))}
        </div>

        {/* Footnote */}
        {slide.footnote && (
          <div style={{
            marginTop: 16, fontSize: '0.7rem', color: '#a69e94',
            lineHeight: 1.7, fontWeight: 300,
          }}>
            {slide.footnote}
          </div>
        )}
      </div>
    </SlideBase>
  )
}
