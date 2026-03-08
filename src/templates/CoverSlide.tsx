import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B1 style — giant title, extreme breathing, minimal elements */
export default function CoverSlide({ slide, theme, totalSlides, series }: Props) {
  const isDark = theme.id === 'ink'
  const t1 = isDark ? '#f0ebe4' : '#2e2b26'
  const t3 = isDark ? '#6d665c' : '#a69e94'
  const g1 = '#5e7050'
  const line = isDark ? 'rgba(212,204,194,0.15)' : '#d4ccc2'

  return (
    <SlideBase theme={theme}>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '44px 46px 42px', height: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: '0.85rem',
            fontStyle: 'italic', color: t1, letterSpacing: '0.02em',
          }}>
            ningcodes
          </span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.48rem',
            letterSpacing: '0.16em', color: t3,
          }}>
            01 / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Center — giant title */}
        <div>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.52rem',
            letterSpacing: '0.22em', textTransform: 'uppercase' as const,
            color: g1, display: 'block', marginBottom: 14,
          }}>
            {series}
          </span>

          <div style={{
            fontFamily: "'Fraunces', serif", fontWeight: 100,
            fontSize: '4.8rem', lineHeight: 0.92, color: t1,
            letterSpacing: '-0.03em',
          }}>
            {slide.title.length > 6 ? (
              <>
                {slide.title.slice(0, Math.ceil(slide.title.length / 2))}
                <br />
                <em style={{ fontStyle: 'italic', color: g1, fontWeight: 100 }}>
                  {slide.title.slice(Math.ceil(slide.title.length / 2))}
                </em>
              </>
            ) : (
              <em style={{ fontStyle: 'italic', color: g1, fontWeight: 100 }}>
                {slide.title}
              </em>
            )}
          </div>

          <p style={{
            marginTop: 22, fontSize: '0.78rem', color: t3,
            fontWeight: 300, lineHeight: 1.75, maxWidth: 210,
          }}>
            {slide.body}
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.5rem',
            letterSpacing: '0.12em', color: t3,
          }}>
            ning.codes
          </span>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            border: `1.5px solid ${line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: g1, opacity: 0.5,
            }} />
          </div>
        </div>
      </div>
    </SlideBase>
  )
}
