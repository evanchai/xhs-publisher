import type { SlideContent, ThemeConfig } from '../types'
import SlideBase from './SlideBase'

interface Props {
  slide: SlideContent
  theme: ThemeConfig
  totalSlides: number
}

export default function ContentSlide({ slide, theme, totalSlides }: Props) {
  // Split body into paragraphs for better layout
  const paragraphs = slide.body.split('\n').filter(Boolean)

  return (
    <SlideBase theme={theme} pageInfo={`${slide.index} / ${totalSlides}`}>
      {/* Slide number badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: theme.accentGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {slide.index - 1}
        </div>
        <span style={{ fontSize: 20 }}>{slide.icon}</span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: theme.textColor,
          lineHeight: 1.3,
          marginBottom: 24,
        }}
      >
        {slide.title}
      </h2>

      {/* Content card */}
      <div
        style={{
          background: theme.cardBg,
          borderRadius: 16,
          padding: '20px 22px',
          border: `1px solid ${theme.cardBg}`,
          backdropFilter: 'blur(10px)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 14,
              color: theme.textColor,
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Bottom decorative dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: 16, justifyContent: 'center' }}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === slide.index - 1 ? 18 : 5,
              height: 5,
              borderRadius: 3,
              background: i === slide.index - 1 ? theme.accentColor : theme.mutedColor,
              opacity: i === slide.index - 1 ? 1 : 0.3,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </SlideBase>
  )
}
