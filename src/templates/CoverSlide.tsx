import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
  series: string
}

/** Card 01 — dark cover with badge, eyebrow, bold title, chips */
export default function CoverSlide({ slide, theme, totalSlides, series }: Props) {
  const g1 = '#5e7050'
  const g2 = '#7a9469'
  const chips = slide.chips ?? []

  // Split title for highlight
  const hl = slide.titleHighlight
  let titleBefore = slide.title
  let titleHL = ''
  if (hl && slide.title.includes(hl)) {
    const idx = slide.title.indexOf(hl)
    titleBefore = slide.title.slice(0, idx)
    titleHL = hl
  }

  return (
    <SlideBase theme={theme} darkBg series={series} pageNum={slide.index} totalPages={totalSlides}>
      <div style={{
        padding: '28px 28px 22px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* Badge */}
        {slide.badge && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px',
            border: '1px solid rgba(94,112,80,0.3)', borderRadius: 100,
            width: 'fit-content',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: g2, opacity: 0.8 }} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.44rem', letterSpacing: '0.16em',
              textTransform: 'uppercase' as const, color: 'rgba(122,148,105,0.8)',
            }}>
              {slide.badge}
            </span>
          </div>
        )}

        {/* Main content */}
        <div>
          {slide.eyebrow && (
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.46rem', letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: 'rgba(122,148,105,0.7)', marginBottom: 12,
            }}>
              {slide.eyebrow}
            </div>
          )}

          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 700, fontSize: '1.5rem',
            lineHeight: 1.42, color: 'rgba(240,235,228,0.92)',
            letterSpacing: '-0.01em', marginBottom: 16,
          }}>
            {titleHL ? (
              <>
                {titleBefore}
                <span style={{ color: g2 }}>{titleHL}</span>
              </>
            ) : (
              slide.title
            )}
          </div>

          {slide.body && (
            <p style={{
              fontSize: '0.73rem', color: 'rgba(166,158,148,0.65)',
              lineHeight: 1.75, fontWeight: 300, maxWidth: 300,
            }}>
              {slide.body}
            </p>
          )}

          {chips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginTop: 18 }}>
              {chips.map((chip, i) => (
                <span key={i} style={{
                  padding: '4px 12px',
                  border: '1px solid rgba(212,204,194,0.12)', borderRadius: 100,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.42rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(166,158,148,0.45)',
                }}>
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom decorative */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {/* Ghost text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {(slide.subtitle ?? '').split(/[,，]/).slice(0, 2).map((line, i) => (
              <div key={i} style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 100, fontStyle: 'italic',
                fontSize: '1.9rem', lineHeight: 1,
                color: 'rgba(240,235,228,0.1)', letterSpacing: '0.02em',
              }}>
                {line.trim()}
              </div>
            ))}
          </div>

          {/* Ring */}
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '1px solid rgba(94,112,80,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: '1px solid rgba(94,112,80,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: g1, opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>
    </SlideBase>
  )
}
