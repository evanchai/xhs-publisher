import type { SlideContent } from '../types'
import SlideBase, { T1, T2, T3, G1, G2, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Handbook Card 04 — Data: compress list + bullets + highlight box */
export default function DataSlide({ slide, bg }: Props) {
  const dataItems = slide.dataItems ?? []
  const bullets = slide.bullets ?? []

  return (
    <SlideBase pageNum={4} totalPages={6} bg={bg}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '数据'}
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

      {slide.body && (
        <p style={{ fontSize: '0.7rem', color: T2, lineHeight: 1.7, fontWeight: 300, marginBottom: 13 }}
          dangerouslySetInnerHTML={{
            __html: slide.body.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:500;color:${T1}">$1</strong>`)
          }}
        />
      )}

      {/* Compress list */}
      {dataItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 14 }}>
          {dataItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
              borderTop: i === 0 ? `1px solid ${LINE}` : 'none',
              borderBottom: `1px solid ${LINE}`,
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: '0.43rem',
                letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                color: T3, width: 20, flexShrink: 0,
              }}>{item.tag}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div style={{
                  height: 5, borderRadius: 100,
                  background: i === 0 ? 'rgba(109,102,92,0.2)' : i === dataItems.length - 1 ? G2 : G1,
                  width: `${item.barPercent}%`, flexShrink: 0,
                }} />
              </div>
              <span style={{ fontSize: '0.68rem', color: T1, fontWeight: 300, flex: 1, lineHeight: 1.35 }}
                dangerouslySetInnerHTML={{
                  __html: item.description.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:500">$1</strong>')
                }}
              />
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: '0.46rem',
                color: G1, flexShrink: 0, textAlign: 'right' as const, width: 38,
              }}>{item.size}</span>
            </div>
          ))}
        </div>
      )}

      {bullets.length > 0 && (
        <>
          <div style={{ height: 1, background: LINE, margin: '12px 0' }} />
          {slide.subtitle && (
            <div style={{ fontWeight: 500, fontSize: '0.9rem', color: T1, marginBottom: 9 }}>{slide.subtitle}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: G1, flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: '0.73rem', color: T1, lineHeight: 1.6, fontWeight: 300 }}
                  dangerouslySetInnerHTML={{
                    __html: (b.bold ? `<strong style="font-weight:500">${b.bold}</strong>` : '') +
                      b.text.replace(/`([^`]+)`/g, '<span style="font-family:\'Space Mono\',monospace;font-size:0.6rem;background:rgba(46,43,38,0.06);padding:1px 6px;border-radius:3px">$1</span>')
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {slide.highlightText && (
        <div style={{
          background: 'rgba(94,112,80,0.08)', border: '1px solid rgba(94,112,80,0.25)',
          borderRadius: 5, padding: '12px 14px', marginTop: 12,
        }}>
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
