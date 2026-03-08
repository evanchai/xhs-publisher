import type { ThemeConfig } from '../types'

interface SlideBaseProps {
  theme: ThemeConfig
  children: React.ReactNode
  /** Page indicator like "2/8" */
  pageInfo?: string
}

/**
 * Base wrapper for all slides — 1080x1440 (3:4 ratio, XHS standard).
 * Rendered at 360x480 in preview, exported at 1080x1440.
 */
export default function SlideBase({ theme, children, pageInfo }: SlideBaseProps) {
  return (
    <div
      className="slide-base"
      style={{
        width: 360,
        height: 480,
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Decorative blurred circles */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: theme.accentGradient,
          opacity: 0.12,
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: theme.accentGradient,
          opacity: 0.08,
          filter: 'blur(50px)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', padding: 32 }}>
        {children}
      </div>

      {/* Page indicator */}
      {pageInfo && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 20,
            fontSize: 11,
            color: theme.mutedColor,
            opacity: 0.6,
            letterSpacing: 1,
          }}
        >
          {pageInfo}
        </div>
      )}
    </div>
  )
}
