import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 06 — dark ending, insight list, quote box, tags */
export default function ConclusionSlide({ slide, theme, totalSlides, series }: Props) {
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const insights = slide.insights ?? []
  const tags = slide.tags ?? []

  return (
    <SlideBase theme={theme} darkBg series={series} pageNum={slide.index} totalPages={totalSlides}>
      {/* Decorative rings (bottom-right) */}
      <svg style={{
        position: 'absolute', right: -40, bottom: -40,
        pointerEvents: 'none', zIndex: 0,
      }} width="220" height="220" viewBox="0 0 220 220" fill="none">
        <circle cx="110" cy="110" r="105" stroke="rgba(94,112,80,0.07)" strokeWidth="1" />
        <circle cx="110" cy="110" r="75" stroke="rgba(94,112,80,0.10)" strokeWidth="1" />
        <circle cx="110" cy="110" r="46" stroke="rgba(94,112,80,0.14)" strokeWidth="1" />
        <circle cx="110" cy="110" r="20" stroke="rgba(94,112,80,0.2)" strokeWidth="1" />
      </svg>

      <div style={{
        padding: '24px 26px 18px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%', position: 'relative', zIndex: 1,
      }}>
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 18, height: 1, background: g1 }} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.44rem', letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: 'rgba(94,112,80,0.65)',
            }}>
              {slide.sectionTitle ?? '核心洞察'}
            </span>
          </div>

          {/* Insights list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{
                display: 'flex', gap: 11, alignItems: 'flex-start',
                padding: '11px 0',
                borderTop: i === 0 ? '1px solid rgba(212,204,194,0.08)' : 'none',
                borderBottom: '1px solid rgba(212,204,194,0.08)',
              }}>
                <span style={{ fontSize: '0.8rem', flexShrink: 0, width: 18, textAlign: 'center' as const, marginTop: 1 }}>
                  {ins.icon}
                </span>
                <span style={{
                  fontSize: '0.72rem', color: 'rgba(166,158,148,0.7)',
                  lineHeight: 1.65, fontWeight: 300,
                }}>
                  {ins.text.split('**').map((seg, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} style={{ fontWeight: 500, color: 'rgba(240,235,228,0.82)' }}>{seg}</strong>
                    ) : seg
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote box */}
        {slide.quote && (
          <div style={{
            marginTop: 16, padding: '15px 17px',
            border: '1px solid rgba(94,112,80,0.2)', borderRadius: 5,
            background: 'rgba(94,112,80,0.06)',
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 200, fontSize: '1rem',
              lineHeight: 1.5, color: 'rgba(240,235,228,0.78)',
            }}>
              {slide.quote.split('**').map((seg, i) =>
                i % 2 === 1 ? <em key={i} style={{ fontStyle: 'italic', color: g2 }}>{seg}</em> : seg
              )}
            </div>
          </div>
        )}

        {/* Bottom row */}
        <div style={{
          marginTop: 16,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.5rem', letterSpacing: '0.1em',
            color: 'rgba(94,112,80,0.55)',
          }}>
            ning.codes
          </span>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6 }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  padding: '4px 10px',
                  border: '1px solid rgba(94,112,80,0.2)', borderRadius: 100,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.39rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(94,112,80,0.5)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideBase>
  )
}
