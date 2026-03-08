import type { ThemeConfig } from '../types'

interface SlideBaseProps {
  theme: ThemeConfig
  children: React.ReactNode
  series: string
  pageNum: number
  totalPages: number
  darkBg?: boolean
  /** Override card background color */
  bgOverride?: string
}

const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

export default function SlideBase({
  theme, children, series, pageNum, totalPages, darkBg, bgOverride,
}: SlideBaseProps) {
  const isDark = darkBg || theme.id === 'ink'
  const bg = bgOverride ?? (isDark ? '#1c1a14' : '#f6f2ec')

  const headerBg = bgOverride ?? (isDark ? 'transparent' : bg)
  const borderColor = isDark ? 'rgba(212,204,194,0.1)' : '#d4ccc2'
  const seriesColor = isDark ? 'rgba(166,158,148,0.35)' : '#a69e94'
  const numColor = isDark ? 'rgba(166,158,148,0.3)' : '#a69e94'
  const dotColor = isDark ? '#7a9469' : '#5e7050'

  return (
    <div style={{
      width: 390, height: 553,
      position: 'relative', overflow: 'hidden',
      background: bg,
      fontFamily: "'Noto Sans SC', sans-serif",
    }}>
      {/* Noise texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: NOISE_URL, backgroundSize: '256px',
        opacity: isDark ? 0.6 : 0.3, zIndex: 2,
      }} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 26px',
        borderBottom: `1px solid ${borderColor}`,
        zIndex: 10, background: headerBg,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.43rem', letterSpacing: '0.18em',
          textTransform: 'uppercase' as const, color: seriesColor,
        }}>
          <span style={{ color: dotColor }}>●</span>&nbsp; {series}
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.43rem', letterSpacing: '0.12em', color: numColor,
        }}>
          <em style={{ fontStyle: 'normal', color: dotColor }}>
            {String(pageNum).padStart(2, '0')}
          </em> / {String(totalPages).padStart(2, '0')}
        </span>
      </div>

      {/* Body area — between header and footer */}
      <div style={{
        position: 'absolute', top: 36, bottom: 32, left: 0, right: 0,
        zIndex: 1,
      }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 26px',
        borderTop: `1px solid ${borderColor}`,
        zIndex: 10, background: headerBg,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.43rem', letterSpacing: '0.12em', color: seriesColor,
        }}>
          ningcode
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.43rem', letterSpacing: '0.12em', color: numColor,
        }}>
          <em style={{ fontStyle: 'normal', color: dotColor }}>
            {String(pageNum).padStart(2, '0')}
          </em> / {String(totalPages).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
