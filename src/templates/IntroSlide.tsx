import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B2 style — dark room, concentric ripples, centered Chinese text */
export default function IntroSlide({ slide, theme, totalSlides, series }: Props) {
  const g2 = '#7a9469'

  return (
    <SlideBase theme={theme} darkBg>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100%', position: 'relative',
      }}>
        {/* Ripples */}
        {[340, 250, 165, 88].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', width: size, height: size, borderRadius: '50%',
            border: `1px solid rgba(94,112,80,${0.1 + i * 0.07})`,
            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          }} />
        ))}

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.48rem',
            letterSpacing: '0.28em', textTransform: 'uppercase' as const,
            color: 'rgba(94,112,80,0.55)', marginBottom: 36,
          }}>
            {series} · {slide.icon}
          </span>

          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300,
            fontSize: '3.6rem', letterSpacing: '0.15em',
            color: 'rgba(240,235,228,0.88)', lineHeight: 1.15,
            marginBottom: 20,
          }}>
            {slide.title}
          </div>

          {slide.subtitle && (
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 100,
              fontStyle: 'italic', fontSize: '1rem',
              color: g2, letterSpacing: '0.06em', marginBottom: 44,
            }}>
              {slide.subtitle}
            </div>
          )}

          {/* Vertical rule */}
          <div style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, rgba(212,204,194,0.3), transparent)',
            marginBottom: 28,
          }} />

          <p style={{
            fontSize: '0.7rem', color: 'rgba(166,158,148,0.55)',
            lineHeight: 1.85, fontWeight: 300, maxWidth: 220,
          }}>
            {slide.body}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.46rem',
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: 'rgba(94,112,80,0.4)',
          }}>
            ning.codes · {String(slide.index).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>
    </SlideBase>
  )
}
