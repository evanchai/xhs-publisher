import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B4 style — ghost number bg, quote-style layout, pills */
export default function TipsSlide({ slide, theme, totalSlides, series }: Props) {
  const isDark = theme.id === 'ink'
  const t1 = isDark ? '#f0ebe4' : '#2e2b26'
  const t2 = isDark ? '#a69e94' : '#6d665c'
  const t3 = isDark ? '#6d665c' : '#a69e94'
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const line = isDark ? 'rgba(212,204,194,0.15)' : '#d4ccc2'
  const bg = isDark ? '#22201a' : '#e7e0d6'
  const items = slide.items ?? []

  return (
    <SlideBase theme={theme}>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        position: 'relative', background: bg,
      }}>
        {/* Ghost number */}
        <div style={{
          position: 'absolute', top: -28, right: -16,
          fontFamily: "'Fraunces', serif", fontWeight: 100,
          fontSize: '13rem', lineHeight: 1, letterSpacing: '-0.04em',
          color: isDark ? 'rgba(240,235,228,0.03)' : 'rgba(46,43,38,0.045)',
          pointerEvents: 'none', userSelect: 'none' as const,
        }}>
          {String(slide.index).padStart(2, '0')}
        </div>

        {/* Top */}
        <div style={{
          padding: '40px 44px 0', position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: t3,
          }}>
            {slide.subtitle ?? series}
          </span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: i === slide.index - 1 ? g1 : line,
              }} />
            )).slice(0, 7)}
          </div>
        </div>

        {/* Quote block */}
        <div style={{
          flex: 1, padding: '32px 44px', position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Open quote mark */}
          <div style={{
            fontFamily: "'Fraunces', serif", fontWeight: 100,
            fontSize: '3.5rem', lineHeight: 0.6, color: g2,
            opacity: 0.6, marginBottom: 18,
          }}>
            "
          </div>

          <div style={{
            fontFamily: "'Fraunces', serif", fontWeight: 200,
            fontSize: '1.6rem', lineHeight: 1.3, color: t1,
            letterSpacing: '-0.01em',
          }}>
            {slide.body.split('\n').map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <em style={{ fontStyle: 'italic', fontWeight: 100, color: g1 }}>{line}</em>
                ) : line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>

          {/* Source */}
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 28, height: 1.5, background: g1 }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.5rem',
              letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: t3,
            }}>
              {series} · {String(slide.index).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          padding: '0 44px 40px', position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            {items.slice(0, 3).map((item, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', border: `1px solid ${line}`, borderRadius: 100,
                fontFamily: "'Space Mono', monospace", fontSize: '0.46rem',
                letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: t2,
              }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: g1, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: `1.5px solid ${line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Fraunces', serif", fontWeight: 100,
            fontStyle: 'italic', fontSize: '1.1rem', color: t2,
          }}>
            n.
          </div>
        </div>
      </div>
    </SlideBase>
  )
}
