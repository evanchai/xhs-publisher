import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** B3 variant — left stripe, big title, checklist items */
export default function ChecklistSlide({ slide, theme }: Props) {
  const isDark = theme.id === 'ink'
  const t1 = isDark ? '#f0ebe4' : '#2e2b26'
  const t3 = isDark ? '#6d665c' : '#a69e94'
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const line = isDark ? 'rgba(212,204,194,0.12)' : '#d4ccc2'
  const bg = isDark ? '#18160f' : '#f0ebe4'
  const items = slide.items ?? []

  return (
    <SlideBase theme={theme}>
      <div style={{ display: 'flex', height: '100%', position: 'relative', zIndex: 1, background: bg }}>
        {/* Left stripe */}
        <div style={{
          width: 3, flexShrink: 0,
          background: `linear-gradient(to bottom, ${g1} 0%, ${g2} 50%, transparent 100%)`,
        }} />

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '46px 44px 42px 42px',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: g1,
          }}>
            Checklist · {String(slide.index).padStart(2, '0')}
          </span>

          <div>
            {/* Title */}
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 100,
              fontSize: '2.8rem', lineHeight: 1.0, color: t1,
              letterSpacing: '-0.02em', marginBottom: 28,
            }}>
              <em style={{ fontStyle: 'italic', color: g1 }}>{slide.title}</em>
            </div>

            {/* Checklist */}
            {items.map((item, i) => (
              <div key={i} style={{
                padding: '11px 0',
                borderTop: i === 0 ? `1px solid ${line}` : 'none',
                borderBottom: `1px solid ${line}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 3,
                  border: `1.5px solid ${g2}`, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: 1.5,
                    background: g1, opacity: 0.5,
                  }} />
                </div>
                <span style={{
                  fontSize: '0.78rem', color: t1, fontWeight: 300, lineHeight: 1.4,
                }}>
                  {item}
                </span>
              </div>
            ))}
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
