export interface SlideContent {
  type: 'cover' | 'content' | 'end'
  title: string
  body: string
  /** Optional emoji/icon for visual flair */
  icon?: string
  /** Slide number (1-based) */
  index: number
}

export interface XHSPost {
  /** Post title with emoji */
  title: string
  /** Post body text with hashtags */
  caption: string
  /** Hashtags extracted */
  hashtags: string[]
  /** Slides content for image generation */
  slides: SlideContent[]
}

export interface ThemeConfig {
  id: string
  name: string
  /** Background gradient or color */
  bg: string
  /** Card background */
  cardBg: string
  /** Primary text color */
  textColor: string
  /** Secondary/muted text */
  mutedColor: string
  /** Accent color for highlights */
  accentColor: string
  /** Accent gradient for decorative elements */
  accentGradient: string
}
