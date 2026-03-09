export type CardMode = 'vibe' | 'handbook'

/** Background color rotation — no adjacent cards share same bg */
export const BG_CYCLE = ['#f0ebe4', '#f6f2ec', '#e7e0d6', '#f6f2ec', '#f0ebe4', '#e7e0d6'] as const

// ── Vibe Diary mode ──
export type VibeSlideType = 'vibe-cover' | 'vibe-story' | 'vibe-tools' | 'vibe-how' | 'vibe-results' | 'vibe-outro'

// ── Knowledge Handbook mode ──
export type HandbookSlideType = 'hb-cover' | 'hb-intro' | 'hb-detail' | 'hb-data' | 'hb-flow' | 'hb-conclusion'

export type SlideType = VibeSlideType | HandbookSlideType

/** Step item for tools page */
export interface StepItem {
  title: string
  desc: string
}

/** Stat cell for data display */
export interface StatItem {
  value: string
  label: string
}

/** Check item */
export interface CheckItem {
  text: string
  tag?: string
}

/** Tier card */
export interface TierItem {
  title: string
  body: string
}

/** Data bar item */
export interface DataItem {
  tag: string
  description: string
  size: string
  barPercent: number
}

/** Flow node */
export interface FlowNode {
  label: string
  name: string
  variant?: 'dark' | 'accent' | 'default'
}

/** Insight item (conclusion) */
export interface InsightItem {
  icon: string
  text: string
}

/** Bullet item */
export interface BulletItem {
  bold?: string
  text: string
}

/**
 * Unified slide content — flexible fields used by both modes.
 * Each template reads only the fields it needs.
 */
export interface SlideContent {
  type: SlideType
  index: number

  // ── Shared ──
  tagLine?: string
  title?: string
  titleEm?: string
  body?: string

  // ── Vibe Cover ──
  coverSub?: string
  bottomLabel?: string
  bottomItems?: string[]

  // ── Vibe Story ──
  displayTitleL1?: string
  displayTitleL2?: string
  displayTitleEm?: string
  story?: string
  quote?: string
  quoteEm?: string
  bridge?: string

  // ── Vibe Tools / Handbook Detail ──
  steps?: StepItem[]
  tiers?: TierItem[]

  // ── Vibe How ──
  checks?: string[]
  footnote?: string

  // ── Vibe Results / Handbook Intro ──
  stats?: StatItem[]

  // ── Vibe Outro ──
  tools?: string[]
  preview?: string
  cta?: string

  // ── Handbook-specific ──
  sectionTitle?: string
  subtitle?: string
  bullets?: BulletItem[]
  highlightText?: string
  dataItems?: DataItem[]
  flowNodes?: FlowNode[]
  checkItems?: CheckItem[]
  insights?: InsightItem[]
  tags?: string[]
  badge?: string
  eyebrow?: string
  titleHighlight?: string
  chips?: string[]
}

export interface XHSPost {
  mode: CardMode
  title: string
  series: string
  caption: string
  hashtags: string[]
  slides: SlideContent[]
}
