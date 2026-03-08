import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 03 — tier cards with numbered borders, design bullets */
export default function DetailSlide({ slide, theme, totalSlides, series }: Props) {
  const t1 = '#2e2b26'
  const t2 = '#6d665c'
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const line = '#d4ccc2'
  const tiers = slide.tiers ?? []
  const bullets = slide.bullets ?? []

  return (
    <SlideBase theme={theme} series={series} pageNum={slide.index} totalPages={totalSlides}>
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

        {/* Tier cards */}
        {tiers.map((tier, i) => {
          const isSecond = i > 0
          return (
            <div key={i} style={{
              background: isSecond ? '#f6f2ec' : '#e7e0d6',
              borderRadius: 6, padding: '12px 14px',
              marginBottom: 10, display: 'flex', gap: 12,
              alignItems: 'flex-start',
              borderLeft: `3px solid ${isSecond ? g2 : g1}`,
              border: isSecond ? `1px solid ${line}` : undefined,
              borderLeftWidth: 3,
              borderLeftStyle: 'solid',
              borderLeftColor: isSecond ? g2 : g1,
            }}>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 200, fontStyle: 'italic',
                fontSize: '1.4rem', color: isSecond ? g2 : g1,
                lineHeight: 1, flexShrink: 0, width: 24,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{
                  fontWeight: 500, fontSize: '0.8rem',
                  color: isSecond ? g2 : t1, marginBottom: 5,
                }}>
                  {tier.title}
                </div>
                <div style={{
                  fontSize: '0.68rem', color: t2,
                  lineHeight: 1.65, fontWeight: 300,
                }}>
                  {tier.body.split(/`([^`]+)`/).map((seg, j) =>
                    j % 2 === 1 ? (
                      <span key={j} style={{
                        fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
                        background: 'rgba(46,43,38,0.06)', color: t1,
                        padding: '1px 6px', borderRadius: 3,
                      }}>{seg}</span>
                    ) : seg
                  )}
                </div>
              </div>
            </div>
          )
        })}

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
                    border: `1.5px solid ${g2}`, flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: '0.73rem', color: t1, lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                    {b.bold && <strong style={{ fontWeight: 500 }}>{b.bold}</strong>}
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SlideBase>
  )
}
