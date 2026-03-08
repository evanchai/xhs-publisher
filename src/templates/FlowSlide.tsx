import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 05 — flow diagram, highlight box, check list */
export default function FlowSlide({ slide, theme, totalSlides, series }: Props) {
  const t1 = '#2e2b26'
  const t2 = '#6d665c'
  const t3 = '#a69e94'
  const g1 = '#5e7050'
  const line = '#d4ccc2'
  const flowNodes = slide.flowNodes ?? []
  const checkItems = slide.checkItems ?? []

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

        {/* Flow diagram */}
        {flowNodes.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '10px 0 8px' }}>
            {flowNodes.map((node, i) => {
              const variant = node.variant ?? 'default'
              const isDark = variant === 'dark'
              const isAccent = variant === 'accent'
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    flex: 1, borderRadius: 5, padding: '8px 6px', textAlign: 'center' as const,
                    display: 'flex', flexDirection: 'column', gap: 3,
                    background: isDark ? t1 : isAccent ? 'rgba(94,112,80,0.08)' : '#e7e0d6',
                    border: isDark ? `1px solid ${t1}` : isAccent ? '1px solid rgba(94,112,80,0.25)' : `1px solid ${line}`,
                  }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.4rem', letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: isDark ? 'rgba(240,235,228,0.35)' : t3,
                    }}>
                      {node.label}
                    </span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500, lineHeight: 1.2,
                      color: isDark ? 'rgba(240,235,228,0.88)' : isAccent ? g1 : t1,
                    }}>
                      {node.name.split('\n').map((l, j) => (
                        <span key={j}>{l}{j < node.name.split('\n').length - 1 && <br />}</span>
                      ))}
                    </span>
                  </div>
                  {i < flowNodes.length - 1 && (
                    <span style={{ fontSize: '0.55rem', color: line, padding: '0 3px', flexShrink: 0 }}>→</span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Body text */}
        {slide.body && (
          <p style={{
            fontSize: '0.7rem', color: t2, lineHeight: 1.7, fontWeight: 300,
            marginBottom: 12,
          }}>
            {slide.body.split(/`([^`]+)`/).map((seg, j) =>
              j % 2 === 1 ? (
                <span key={j} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
                  background: 'rgba(46,43,38,0.06)', color: t1,
                  padding: '1px 6px', borderRadius: 3,
                }}>{seg}</span>
              ) : seg
            )}
          </p>
        )}

        {/* Divider */}
        {(slide.subtitle || slide.highlightText) && (
          <div style={{ height: 1, background: line, margin: '12px 0' }} />
        )}

        {/* Section subtitle */}
        {slide.subtitle && (
          <div style={{
            fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.4,
            color: t1, marginBottom: 9,
          }}>
            {slide.subtitle}
          </div>
        )}

        {/* Highlight box */}
        {slide.highlightText && (
          <div style={{
            background: 'rgba(94,112,80,0.08)',
            border: '1px solid rgba(94,112,80,0.25)',
            borderRadius: 5, padding: '12px 14px', marginBottom: 12,
          }}>
            <p style={{ fontSize: '0.7rem', color: t2, lineHeight: 1.7, fontWeight: 300 }}>
              {slide.highlightText.split('**').map((seg, i) =>
                i % 2 === 1 ? <strong key={i} style={{ fontWeight: 500, color: t1 }}>{seg}</strong> : seg
              )}
            </p>
          </div>
        )}

        {/* Check list */}
        {checkItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {checkItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0',
                borderTop: i === 0 ? `1px solid ${line}` : 'none',
                borderBottom: `1px solid ${line}`,
              }}>
                <div style={{
                  width: 19, height: 19, borderRadius: '50%',
                  border: `1.5px solid ${g1}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '0.5rem', color: g1,
                }}>
                  ✓
                </div>
                <span style={{ fontSize: '0.72rem', color: t1, fontWeight: 300, flex: 1, lineHeight: 1.4 }}>
                  {item.text.split('**').map((seg, j) =>
                    j % 2 === 1 ? <strong key={j} style={{ fontWeight: 500 }}>{seg}</strong> : seg
                  )}
                </span>
                {item.tag && (
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.39rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const, color: t3, flexShrink: 0,
                  }}>
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SlideBase>
  )
}
