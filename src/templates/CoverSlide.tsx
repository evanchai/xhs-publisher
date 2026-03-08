import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
}

export default function CoverSlide({ slide, theme, totalSlides }: Props) {
  return (
    <SlideBase theme={theme} pageInfo={`1 / ${totalSlides}`}>
      {/* Top decorative bar */}
      <div
        style={{
          width: 40,
          height: 4,
          borderRadius: 2,
          background: theme.accentGradient,
          marginBottom: 40,
        }}
      />

      {/* Icon */}
      <div style={{ fontSize: 48, marginBottom: 20 }}>
        {slide.icon}
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: theme.textColor,
          lineHeight: 1.3,
          letterSpacing: -0.5,
          marginBottom: 20,
        }}
      >
        {slide.title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 15,
          color: theme.mutedColor,
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {slide.body}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          width: '100%',
          height: 3,
          borderRadius: 2,
          background: theme.accentGradient,
          opacity: 0.5,
          marginTop: 'auto',
        }}
      />
    </SlideBase>
  )
}
