import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 04 — compress list / data bars, bullets, highlight box */
export default function DataSlide({ slide, theme, totalSlides, series }: Props) {
  const t1 = '#2e2b26'
  const t2 = '#6d665c'
  const t3 = '#a69e94'
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const line = '#d4ccc2'
  const dataItems = slide.dataItems ?? []
  const bullets = slide.bullets ?? []

  return (
    <SlideBase theme={theme} series={series} pageNum={slide.index} totalPages={totalSlides} bgOverride="#e7e0d6">
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
            fontSize: '0.7rem', color: t2, lineHeight: 1.7, fontWeight: 300,
            marginBottom: 13,
          }}>
            {slide.body.split('**').map((seg, i) =>
              i % 2 === 1 ? <strong key={i} style={{ fontWeight: 500, color: t1 }}>{seg}</strong> : seg
            )}
          </p>
        )}

        {/* Compress data list */}
        {dataItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 14 }}>
            {dataItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0',
                borderTop: i === 0 ? `1px solid ${line}` : 'none',
                borderBottom: `1px solid ${line}`,
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.43rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const, color: t3,
                  width: 20, flexShrink: 0,
                }}>
                  {item.tag}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                  <div style={{
                    height: 5, borderRadius: 100,
                    background: i === 0 ? `rgba(109,102,92,0.2)` : i === dataItems.length - 1 ? g2 : g1,
                    width: `${item.barPercent}%`, flexShrink: 0,
                  }} />
                </div>
                <span style={{ fontSize: '0.68rem', color: t1, fontWeight: 300, flex: 1, lineHeight: 1.35 }}>
                  {item.description.split('**').map((seg, j) =>
                    j % 2 === 1 ? <strong key={j} style={{ fontWeight: 500 }}>{seg}</strong> : seg
                  )}
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.46rem', color: g1,
                  flexShrink: 0, textAlign: 'right' as const, width: 38,
                }}>
                  {item.size}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Divider + subtitle */}
        {bullets.length > 0 && (
          <>
            <div style={{ height: 1, background: line, margin: '12px 0' }} />
            {slide.subtitle && (
              <div style={{
                fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.4,
                color: t1, marginBottom: 9,
              }}>
                {slide.subtitle}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: b.bold?.includes('nanodet') ? t3 : g1,
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: '0.73rem', color: t1, lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                    {b.bold && <strong style={{ fontWeight: 500 }}>{b.bold}</strong>}
                    {b.text.split(/`([^`]+)`/).map((seg, j) =>
                      j % 2 === 1 ? (
                        <span key={j} style={{
                          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
                          background: 'rgba(46,43,38,0.06)', color: t1,
                          padding: '1px 6px', borderRadius: 3,
                        }}>{seg}</span>
                      ) : seg
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Highlight box */}
        {slide.highlightText && (
          <div style={{
            background: 'rgba(94,112,80,0.08)',
            border: '1px solid rgba(94,112,80,0.25)',
            borderRadius: 5, padding: '12px 14px', marginTop: 12,
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
