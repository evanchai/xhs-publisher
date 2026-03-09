interface SlideBaseProps {
  children: React.ReactNode
  pageNum: number
  totalPages: number
  bg?: string
}

// Design tokens (shared)
export const T1 = '#2e2b26'
export const T2 = '#6d665c'
export const T3 = '#a69e94'
export const G1 = '#5e7050'
export const G2 = '#7a9469'
export const LINE = '#d4ccc2'
export const BG = '#f0ebe4'
export const BG2 = '#e7e0d6'
export const CARD = '#f6f2ec'

/** Card shell: 390×553, footer only (no header), noise texture */
export default function SlideBase({ children, pageNum, totalPages, bg = CARD }: SlideBaseProps) {
  return (
    <div style={{
      width: 390, height: 553,
      position: 'relative', overflow: 'hidden',
      background: bg,
      fontFamily: "'Noto Sans SC', 'PingFang SC', sans-serif",
      display: 'flex', flexDirection: 'column',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      {/* Body area */}
      <div style={{
        flex: 1, padding: '32px 30px 20px',
        display: 'flex', flexDirection: 'column',
        position: 'relative', zIndex: 1,
      }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{
        height: 32, flexShrink: 0,
        borderTop: `1px solid ${LINE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        background: bg,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.44rem', letterSpacing: '0.16em',
          color: T3,
        }}>
          ning.codes
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.44rem', letterSpacing: '0.12em',
          color: T3,
        }}>
          <span style={{ color: G1 }}>{String(pageNum).padStart(2, '0')}</span> / {String(totalPages).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
