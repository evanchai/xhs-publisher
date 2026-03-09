import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Vibe Card 01 — Cover: tag + big bold title + caption + bottom items + leaf */
export default function VibeCover({ slide, bg }: Props) {
  const items = slide.bottomItems ?? []

  return (
    <SlideBase pageNum={1} totalPages={6} bg={bg}>
      {/* Decorative leaf SVG */}
      <svg style={{
        position: 'absolute', right: -10, bottom: 50,
        pointerEvents: 'none', opacity: 0.12,
      }} width="140" height="140" viewBox="0 0 140 140" fill="none">
        <path d="M20 120 Q70 20 130 10 Q110 70 20 120Z" fill={G1} />
        <path d="M20 120 Q75 65 130 10" stroke={bg} strokeWidth="1.5" fill="none" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div>
          {/* Tag line */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.5rem', letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: G1, marginBottom: 16,
          }}>
            {slide.tagLine}
          </div>

          {/* Big title with green em */}
          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 700, fontSize: '1.75rem',
            lineHeight: 1.38, color: T1,
            letterSpacing: '-0.01em', marginBottom: 20,
          }}>
            {slide.title && slide.title.split('\n').map((line, i) => (
              <span key={i}>
                {slide.titleEm && line.includes(slide.titleEm) ? (
                  <>
                    {line.replace(slide.titleEm, '')}
                    <span style={{ color: G1 }}>{slide.titleEm}</span>
                  </>
                ) : (
                  line
                )}
                {i < (slide.title?.split('\n').length ?? 1) - 1 && <br />}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          {slide.coverSub && (
            <p style={{ fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300 }}>
              {slide.coverSub}
            </p>
          )}
        </div>

        {/* Bottom: label + items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ height: 1, background: LINE }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#a69e94', lineHeight: 1.7, fontWeight: 300 }}>
              {slide.bottomLabel ?? '今日主角'}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {items.map((item, i) => (
                <span key={i} style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 200, fontStyle: 'italic',
                  fontSize: '1.1rem', color: T2,
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideBase>
  )
}
