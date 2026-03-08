import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
}

export default function EndSlide({ slide, theme, totalSlides }: Props) {
  return (
    <SlideBase theme={theme} pageInfo={`${totalSlides} / ${totalSlides}`}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {/* Large icon */}
        <div style={{ fontSize: 56, marginBottom: 24 }}>
          {slide.icon}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.textColor,
            lineHeight: 1.4,
            marginBottom: 16,
          }}
        >
          {slide.title}
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: theme.mutedColor,
            lineHeight: 1.8,
            maxWidth: 260,
            marginBottom: 32,
          }}
        >
          {slide.body}
        </p>

        {/* CTA card */}
        <div
          style={{
            background: theme.accentGradient,
            borderRadius: 14,
            padding: '14px 28px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
            关注 + 收藏 不迷路 ❤️
          </span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 60,
            height: 3,
            borderRadius: 2,
            background: theme.accentGradient,
            opacity: 0.4,
            marginTop: 32,
          }}
        />
      </div>
    </SlideBase>
  )
}
