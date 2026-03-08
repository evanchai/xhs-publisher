import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B3 style — left color stripe, big headline, numbered list */
export default function StepsSlide({ slide, theme, series }: Props) {
  const isDark = theme.id === 'ink'
  const t1 = isDark ? '#f0ebe4' : '#2e2b26'
  const t3 = isDark ? '#6d665c' : '#a69e94'
  const g1 = '#5e7050'
  const line = isDark ? 'rgba(212,204,194,0.12)' : '#d4ccc2'
  const items = slide.items ?? []

  return (
    <SlideBase theme={theme}>
      <div style={{ display: 'flex', height: '100%', position: 'relative', zIndex: 1 }}>
        {/* Left stripe */}
        <div style={{
          width: 3, flexShrink: 0,
          background: `linear-gradient(to bottom, ${g1} 0%, #7a9469 50%, transparent 100%)`,
        }} />

        {/* Body */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '46px 44px 42px 42px',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: g1,
          }}>
            {series} · {String(slide.index).padStart(2, '0')}
          </span>

          <div>
            {/* Big headline */}
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 100,
              fontSize: '3rem', lineHeight: 1.0, color: t1,
              letterSpacing: '-0.02em', marginBottom: 32,
            }}>
              {slide.title.length > 4 ? (
                <>
                  {slide.title.slice(0, Math.ceil(slide.title.length * 0.6))}
                  <br />
                  <em style={{ fontStyle: 'italic', color: g1 }}>
                    {slide.title.slice(Math.ceil(slide.title.length * 0.6))}
                  </em>
                </>
              ) : (
                <em style={{ fontStyle: 'italic', color: g1 }}>{slide.title}</em>
              )}
            </div>

            {/* Numbered list */}
            <div>
              {items.map((item, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderTop: i === 0 ? `1px solid ${line}` : 'none',
                  borderBottom: `1px solid ${line}`,
                  display: 'flex', alignItems: 'baseline', gap: 14,
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: '0.45rem',
                    letterSpacing: '0.1em', color: t3, flexShrink: 0, width: 18,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontSize: '0.8rem', color: t1, fontWeight: 300,
                    lineHeight: 1.4, flex: 1,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 22, height: 1, background: line }} />
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.46rem',
              letterSpacing: '0.14em', color: t3,
            }}>
              ning.codes
            </span>
          </div>
        </div>
      </div>
    </SlideBase>
  )
}
