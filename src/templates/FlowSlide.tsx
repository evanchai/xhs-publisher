import type { SlideContent } from '../types'
import SlideBase, { T1, T2, T3, G1, LINE } from './SlideBase'

interface Props { slide: SlideContent; bg: string }

/** Handbook Card 05 — Flow: flow diagram + highlight box + checklist */
export default function FlowSlide({ slide, bg }: Props) {
  const flowNodes = slide.flowNodes ?? []
  const checkItems = slide.checkItems ?? []

  return (
    <SlideBase pageNum={5} totalPages={6} bg={bg}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem', letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: G1, marginBottom: 16,
      }}>
        {slide.tagLine ?? '流程'}
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

      {/* Flow diagram */}
      {flowNodes.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 8px' }}>
          {flowNodes.map((node, i) => {
            const v = node.variant ?? 'default'
            const isDark = v === 'dark'
            const isAccent = v === 'accent'
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  flex: 1, borderRadius: 5, padding: '8px 6px', textAlign: 'center' as const,
                  display: 'flex', flexDirection: 'column', gap: 3,
                  background: isDark ? T1 : isAccent ? 'rgba(94,112,80,0.08)' : '#e7e0d6',
                  border: `1px solid ${isDark ? T1 : isAccent ? 'rgba(94,112,80,0.25)' : LINE}`,
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: '0.4rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                    color: isDark ? 'rgba(240,235,228,0.35)' : T3,
                  }}>{node.label}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 500, lineHeight: 1.2,
                    color: isDark ? 'rgba(240,235,228,0.88)' : isAccent ? G1 : T1,
                  }}
                    dangerouslySetInnerHTML={{ __html: node.name.replace(/\\n|\n/g, '<br/>') }}
                  />
                </div>
                {i < flowNodes.length - 1 && (
                  <span style={{ fontSize: '0.55rem', color: LINE, padding: '0 3px', flexShrink: 0 }}>→</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {slide.body && (
        <p style={{ fontSize: '0.7rem', color: T2, lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}
          dangerouslySetInnerHTML={{
            __html: slide.body.replace(/`([^`]+)`/g, '<span style="font-family:\'Space Mono\',monospace;font-size:0.6rem;background:rgba(46,43,38,0.06);padding:1px 6px;border-radius:3px">$1</span>')
          }}
        />
      )}

      {(slide.subtitle || slide.highlightText) && <div style={{ height: 1, background: LINE, margin: '12px 0' }} />}

      {slide.subtitle && (
        <div style={{ fontWeight: 500, fontSize: '0.9rem', color: T1, marginBottom: 9 }}>{slide.subtitle}</div>
      )}

      {slide.highlightText && (
        <div style={{
          background: 'rgba(94,112,80,0.08)', border: '1px solid rgba(94,112,80,0.25)',
          borderRadius: 5, padding: '12px 14px', marginBottom: 12,
        }}>
          <p style={{ fontSize: '0.7rem', color: T2, lineHeight: 1.7, fontWeight: 300 }}
            dangerouslySetInnerHTML={{
              __html: slide.highlightText.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:500;color:${T1}">$1</strong>`)
            }}
          />
        </div>
      )}

      {/* Checklist */}
      {checkItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {checkItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
              borderTop: i === 0 ? `1px solid ${LINE}` : 'none',
              borderBottom: `1px solid ${LINE}`,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `1.5px solid ${G1}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '0.48rem', color: G1,
              }}>✓</div>
              <span style={{ fontSize: '0.74rem', color: T1, fontWeight: 300, flex: 1, lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{
                  __html: item.text.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:500">$1</strong>')
                }}
              />
              {item.tag && (
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '0.39rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  color: T3, flexShrink: 0,
                }}>{item.tag}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </SlideBase>
  )
}
