import type { ThemeConfig } from '../types'

interface SlideBaseProps {
  theme: ThemeConfig
  children: React.ReactNode
  darkBg?: boolean
  noHeader?: boolean
  noPadding?: boolean
}

export default function SlideBase({ theme, children, darkBg, noHeader, noPadding }: SlideBaseProps) {
  const isDark = darkBg || theme.id === 'ink'
  const bg = isDark ? '#18160f' : '#f6f2ec'

  return (
    <div
      className="slide-base"
      style={{
        width: 390,
        aspectRatio: '3 / 4',
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      {!noHeader && !noPadding && children}
      {(noHeader || noPadding) && children}

      {/* Noise texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        pointerEvents: 'none',
        opacity: isDark ? 0.6 : 0.3,
      }} />
    </div>
  )
}
