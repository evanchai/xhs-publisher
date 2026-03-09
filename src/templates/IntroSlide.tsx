import type { SlideContent } from '../types'
import SlideBase, { T1, T2, T3, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Handbook Card 02 — Intro: accent bar + bullets + stat row + highlight box */
export default function IntroSlide({ slide, bg }: Props) {
  const bullets = slide.bullets ?? []
  const stats = slide.stats ?? []

  return (
    <SlideBase pageNum={2} totalPages={6} bg={bg}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '导读'}
      </div>

      {/* Accent bar section title */}
      {slide.sectionTitle && (
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(94,112,80,0.08)',
          borderLeft: `3px solid ${G1}`,
          padding: '5px 12px',
          fontSize: '0.68rem', fontWeight: 500,
          color: G1, letterSpacing: '0.04em',
          marginBottom: 15, borderRadius: '0 3px 3px 0',
          width: 'fit-content',
        }}>
          {slide.sectionTitle}
        </div>
      )}

      {/* Body */}
      {slide.body && (
        <p style={{ fontSize: '0.78rem', color: T2, lineHeight: 1.8, fontWeight: 300, marginBottom: 12 }}
          dangerouslySetInnerHTML={{
            __html: slide.body.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:500;color:${T1}">$1</strong>`)
          }}
        />
      )}

      {/* Bullets */}
      {bullets.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: G1, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.73rem', color: T1, lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                {b.bold && <strong style={{ fontWeight: 500 }}>{b.bold}</strong>}
                {b.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Divider + subtitle */}
      {(stats.length > 0 || slide.subtitle) && <div style={{ height: 1, background: LINE, margin: '12px 0' }} />}

      {slide.subtitle && (
        <div style={{ fontWeight: 500, fontSize: '0.9rem', color: T1, marginBottom: 10 }}>
          {slide.subtitle}
        </div>
      )}

      {/* Stat row */}
      {stats.length > 0 && (
        <div style={{ display: 'flex', gap: 0, border: `1px solid ${LINE}`, borderRadius: 8, overflow: 'hidden', margin: '10px 0' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: 14,
              borderRight: i < stats.length - 1 ? `1px solid ${LINE}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: '1.5rem', lineHeight: 1, color: T1 }}>
                <span style={{ fontStyle: 'italic', color: G1 }}>{s.value}</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: T3, fontWeight: 300, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Highlight box */}
      {slide.highlightText && (
        <div style={{ background: '#e7e0d6', borderRadius: 5, padding: '12px 14px', marginTop: 12 }}>
          <p style={{ fontSize: '0.7rem', color: T2, lineHeight: 1.7, fontWeight: 300 }}
            dangerouslySetInnerHTML={{
              __html: slide.highlightText.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:500;color:${T1}">$1</strong>`)
            }}
          />
        </div>
      )}
    </SlideBase>
  )
}
