export type SlideType = 'cover' | 'intro' | 'detail' | 'data' | 'flow' | 'conclusion'

/** Bullet item with optional bold prefix */
export interface BulletItem {
  bold?: string
  text: string
}

/** Stat cell — e.g. "<100 ms" */
export interface StatItem {
  value: string
  unit?: string
  label: string
}

/** Tier card — numbered block with left border */
export interface TierItem {
  title: string
  body: string
}

/** Data row — for compress list / bar charts */
export interface DataItem {
  tag: string
  description: string
  size: string
  /** 0–100, rendered as bar width percentage */
  barPercent: number
}

/** Flow diagram node */
export interface FlowNode {
  label: string
  name: string
  variant?: 'dark' | 'accent' | 'default'
}

/** Check item with optional tag label */
export interface CheckItem {
  text: string
  tag?: string
}

/** Insight row — icon + text (for conclusion) */
export interface InsightItem {
  icon: string
  text: string
}

export interface SlideContent {
  type: SlideType
  index: number
  title: string
  subtitle?: string
  body?: string

  // Cover-specific
  badge?: string
  eyebrow?: string
  titleHighlight?: string
  chips?: string[]

  // Intro / Detail / Data
  sectionTitle?: string
  bullets?: BulletItem[]
  stats?: StatItem[]
  highlightText?: string

  // Detail
  tiers?: TierItem[]

  // Data
  dataItems?: DataItem[]

  // Flow
  flowNodes?: FlowNode[]
  checkItems?: CheckItem[]

  // Conclusion
  insights?: InsightItem[]
  quote?: string
  tags?: string[]

  // Legacy compat
  items?: string[]
  icon?: string
}

export interface XHSPost {
  title: string
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
