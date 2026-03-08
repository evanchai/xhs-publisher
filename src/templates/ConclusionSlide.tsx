import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B2 variant — dark room, concentric rings, centered summary */
export default function ConclusionSlide({ slide, theme, totalSlides }: Props) {
  const g2 = '#7a9469'

  return (
    <SlideBase theme={theme} darkBg>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100%', position: 'relative',
      }}>
        {/* Ripples */}
        {[300, 220, 145, 78].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', width: size, height: size, borderRadius: '50%',
            border: `1px solid rgba(94,112,80,${0.08 + i * 0.06})`,
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
            color: 'rgba(94,112,80,0.55)', marginBottom: 32,
          }}>
            {slide.icon} · Summary
          </span>

          <div style={{
            fontFamily: "'Fraunces', serif", fontWeight: 100,
            fontSize: '3.2rem', letterSpacing: '-0.02em',
            color: 'rgba(240,235,228,0.88)', lineHeight: 1.1,
            marginBottom: 22,
          }}>
            <em style={{ fontStyle: 'italic', color: g2 }}>{slide.title}</em>
          </div>

          {/* Vertical rule */}
          <div style={{
            width: 1, height: 32,
            background: 'linear-gradient(to bottom, rgba(212,204,194,0.3), transparent)',
            marginBottom: 24,
          }} />

          <p style={{
            fontSize: '0.72rem', color: 'rgba(166,158,148,0.6)',
            lineHeight: 1.85, fontWeight: 300, maxWidth: 240,
            marginBottom: 28,
          }}>
            {slide.body}
          </p>

          {/* Tags */}
          {slide.subtitle && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
              {slide.subtitle.split(/[,，、]/).map((tag, i) => (
                <span key={i} style={{
                  padding: '5px 14px',
                  border: '1px solid rgba(94,112,80,0.35)',
                  borderRadius: 100,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.44rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: g2,
                }}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
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
