import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 02 — accent bar, bullets, stat row, highlight box */
export default function IntroSlide({ slide, theme, totalSlides, series }: Props) {
  const t1 = '#2e2b26'
  const t2 = '#6d665c'
  const t3 = '#a69e94'
  const g1 = '#5e7050'
  const line = '#d4ccc2'
  const bullets = slide.bullets ?? []
  const stats = slide.stats ?? []

  return (
    <SlideBase theme={theme} series={series} pageNum={slide.index} totalPages={totalSlides} bgOverride="#f0ebe4">
      <div style={{ padding: '22px 26px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Accent bar */}
        {slide.sectionTitle && (
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(94,112,80,0.08)',
            borderLeft: `3px solid ${g1}`,
            padding: '5px 12px',
            fontSize: '0.68rem', fontWeight: 500,
            color: g1, letterSpacing: '0.04em',
            marginBottom: 15, borderRadius: '0 3px 3px 0',
            width: 'fit-content',
          }}>
            {slide.sectionTitle}
          </div>
        )}

        {/* Body text */}
        {slide.body && (
          <p style={{
            fontSize: '0.76rem', color: t2, lineHeight: 1.75, fontWeight: 400,
            marginBottom: 12,
          }}>
            {slide.body.split('**').map((seg, i) =>
              i % 2 === 1 ? <strong key={i} style={{ fontWeight: 500, color: t1 }}>{seg}</strong> : seg
            )}
          </p>
        )}

        {/* Bullet list */}
        {bullets.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: g1, flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: '0.73rem', color: t1, lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                  {b.bold && <strong style={{ fontWeight: 500 }}>{b.bold}</strong>}
                  {b.bold ? '——' : ''}{b.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        {(stats.length > 0 || slide.subtitle) && (
          <div style={{ height: 1, background: line, margin: '12px 0' }} />
        )}

        {/* Section subtitle */}
        {slide.subtitle && (
          <div style={{
            fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.4,
            color: t1, marginBottom: 10,
          }}>
            {slide.subtitle}
          </div>
        )}

        {/* Stat row */}
        {stats.length > 0 && (
          <div style={{ display: 'flex', gap: 0, margin: '10px 0' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', padding: '11px 12px',
                border: `1px solid ${line}`,
                borderRight: i < stats.length - 1 ? 'none' : `1px solid ${line}`,
                borderRadius: i === 0 ? '6px 0 0 6px' : i === stats.length - 1 ? '0 6px 6px 0' : 0,
              }}>
                <div style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 200, fontSize: '1.55rem',
                  color: t1, lineHeight: 1, marginBottom: 3,
                }}>
                  {s.value.replace(/(\d+)/g, '__$1__').split('__').map((part, j) =>
                    /^\d+$/.test(part) ? <em key={j} style={{ fontStyle: 'italic', color: g1 }}>{part}</em> : part
                  )}
                  {s.unit ?? ''}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.41rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const, color: t3,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Highlight box */}
        {slide.highlightText && (
          <div style={{
            background: '#e7e0d6', borderRadius: 5,
            padding: '12px 14px', marginTop: 12,
          }}>
            <p style={{ fontSize: '0.7rem', color: t2, lineHeight: 1.7, fontWeight: 300 }}>
              {slide.highlightText.split('**').map((seg, i) =>
                i % 2 === 1 ? <strong key={i} style={{ fontWeight: 500, color: t1 }}>{seg}</strong> : seg
              )}
            </p>
          </div>
        )}
      </div>
    </SlideBase>
  )
}
