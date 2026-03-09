import type { SlideContent } from '../types'
import SlideBase, { T1, T2, G1, G2, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Handbook Card 03 — Detail: accent bar + tier cards + design bullets */
export default function DetailSlide({ slide, bg }: Props) {
  const tiers = slide.tiers ?? []
  const bullets = slide.bullets ?? []

  return (
    <SlideBase pageNum={3} totalPages={6} bg={bg}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '架构'}
      </div>

      {slide.sectionTitle && (
        <div style={{
          display: 'inline-flex', background: 'rgba(94,112,80,0.08)',
          borderLeft: `3px solid ${G1}`, padding: '5px 12px',
          fontSize: '0.68rem', fontWeight: 500, color: G1,
          marginBottom: 15, borderRadius: '0 3px 3px 0', width: 'fit-content',
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
            borderLeft: `3px solid ${isSecond ? G2 : G1}`,
            ...(isSecond ? { border: `1px solid ${LINE}`, borderLeftWidth: 3, borderLeftColor: G2 } : {}),
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif", fontWeight: 200, fontStyle: 'italic',
              fontSize: '1.4rem', color: isSecond ? G2 : G1, lineHeight: 1, flexShrink: 0, width: 24,
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.8rem', color: isSecond ? G2 : T1, marginBottom: 5 }}>
                {tier.title}
              </div>
              <div style={{ fontSize: '0.68rem', color: T2, lineHeight: 1.65, fontWeight: 300 }}
                dangerouslySetInnerHTML={{
                  __html: tier.body
                    .replace(/`([^`]+)`/g, '<span style="font-family:\'Space Mono\',monospace;font-size:0.6rem;background:rgba(46,43,38,0.06);padding:1px 6px;border-radius:3px">$1</span>')
                }}
              />
            </div>
          </div>
        )
      })}

      {/* Design bullets */}
      {bullets.length > 0 && (
        <>
          <div style={{ height: 1, background: LINE, margin: '12px 0' }} />
          {slide.subtitle && (
            <div style={{ fontWeight: 500, fontSize: '0.9rem', color: T1, marginBottom: 9 }}>
              {slide.subtitle}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1.5px solid ${G2}`, flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: '0.73rem', color: T1, lineHeight: 1.6, fontWeight: 300 }}
                  dangerouslySetInnerHTML={{
                    __html: (b.bold ? `<strong style="font-weight:500">${b.bold}</strong>` : '') + b.text
                      .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:500">$1</strong>')
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </SlideBase>
  )
}
