export type SlideType = 'cover' | 'intro' | 'steps' | 'tips' | 'checklist' | 'conclusion'

export interface SlideContent {
  type: SlideType
  title: string
  subtitle?: string
  body: string
  /** Bullet points / checklist / step items */
  items?: string[]
  icon?: string
  index: number
}

export interface XHSPost {
  title: string
  /** Series name shown in page header */
  series: string
  caption: string
  hashtags: string[]
  slides: SlideContent[]
}

export interface ThemeConfig {
  id: string
  name: string
  bg: string
  cardBg: string
  textColor: string
  mutedColor: string
  accentColor: string
  accentGradient: string
}
