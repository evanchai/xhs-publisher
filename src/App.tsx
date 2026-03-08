import { useState, useRef, useCallback, useEffect } from 'react'
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import type { XHSPost, ThemeConfig } from './types'
import { themes } from './services/themes'
import { generateXHSPost } from './services/ai'
import { downloadAllSlides, exportSlideAsImage, downloadImage } from './services/export'
import ArticleInput from './components/ArticleInput'
import ThemePicker from './components/ThemePicker'
import SlideRenderer from './components/SlideRenderer'
import CaptionPreview from './components/CaptionPreview'

const DEFAULT_ARTICLE = `边缘 AI 宠物监控：用树莓派 AI 摄像头打造猫咪沙发警报系统

不靠云端 GPU、不靠模型训练。一个 IMX500 芯片做边缘推理，一个 Gemini 做精细判断，一个 Redis 做状态中继——从硬件到全栈，搭建一个实时猫咪监控系统。

为什么用边缘 AI：家里两只猫——萨摩和小白——老是偷偷上沙发。需要实时监控+即时告警，但传统方案延迟高、依赖网络、隐私问题。IMX500 芯片直接在传感器上跑神经网络，推理延迟 <100ms，不需要上传原始图像到云端。

两级检测架构：第一级 EfficientDet Lite0 在 IMX500 芯片上运行，零延迟低功耗（<5W），输出 bounding boxes 和 confidence scores。阈值设为 0.3，宁可误报不漏报。第二级 Gemini 2.5 Flash 视觉分析，只在第一级触发时调用，判断是哪只猫、在不在沙发上、在做什么。5 分钟冷却期避免重复调用。

图像压缩三层设计：原始 12MP 用于 Discord 告警；960px/q65 约 60KB 推送 Redis 做实时预览；800px/q70 约 70KB 存事件缩略图。最初没压缩，20 条事件 48MB 直接让 Vercel 超时。

实时数据流：Pi → Redis（3 个 key）→ Vercel API → React Dashboard。Redis TTL 本身就是心跳机制——Pi 断电后 snapshot 10 秒过期，Dashboard 自动显示 Offline。

模型升级：从 nanodet（cat 置信度仅 0.15-0.27）切换到 EfficientDet Lite0（置信度稳定 0.4-0.7），只需改一行模型路径。

核心洞察：不要在边缘和云端之间二选一，让它们各做最擅长的事。IMX500 零成本每秒扫描两次，99% 时间静默运行，检测到猫才唤醒 Gemini。整个系统功耗不到 5W，一根 USB-C 线供电。`

export default function App() {
  const [article, setArticle] = useState(DEFAULT_ARTICLE)
  const [post, setPost] = useState<XHSPost | null>(null)
  const [theme, setTheme] = useState<ThemeConfig>(themes[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleGenerate = useCallback(async (text?: string) => {
    setLoading(true)
    setError('')
    try {
      const result = await generateXHSPost(text ?? article)
      setPost(result)
      setActiveSlide(0)
      slideRefs.current = []
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }, [article])

  // Auto-generate on mount
  useEffect(() => {
    handleGenerate(DEFAULT_ARTICLE)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownloadAll = useCallback(async () => {
    if (!post) return
    const elements = slideRefs.current.filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return
    setExporting(true)
    try {
      await downloadAllSlides(elements, post.title)
    } finally {
      setExporting(false)
    }
  }, [post])

  const handleDownloadOne = useCallback(async (index: number) => {
    const el = slideRefs.current[index]
    if (!el) return
    const dataUrl = await exportSlideAsImage(el)
    downloadImage(dataUrl, `slide_${index + 1}.png`)
  }, [])

  const handleReset = useCallback(() => {
    setPost(null)
    setArticle(DEFAULT_ARTICLE)
    setError('')
    setActiveSlide(0)
  }, [])

  const navigate = useCallback((dir: -1 | 1) => {
    if (!post) return
    setActiveSlide(prev => Math.max(0, Math.min(prev + dir, post.slides.length - 1)))
  }, [post])

  return (
    <div className="min-h-screen" style={{ background: '#ddd5c9' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              border: '1.5px solid #5e7050',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fraunces', serif", fontSize: 12, color: '#5e7050',
            }}>
              书
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 300, color: '#2e2b26' }}>
              小红书发布助手
            </h1>
          </div>
          {post && (
            <button
              onClick={handleReset}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, color: '#6d665c',
                border: '1px solid #d4ccc2', borderRadius: 100,
                padding: '6px 16px', background: 'transparent', cursor: 'pointer',
              }}
            >
              <RotateCcw size={11} />
              重新生成
            </button>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        {!post ? (
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 200, color: '#2e2b26', marginBottom: 8 }}>
                一键生成小红书图文
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#a69e94', letterSpacing: '0.18em' }}>
                ARTICLE → AI → CARD SET
              </p>
            </div>
            <ArticleInput
              value={article}
              onChange={setArticle}
              onGenerate={handleGenerate}
              loading={loading}
            />
            {error && (
              <div style={{ marginTop: 16, padding: 12, background: 'rgba(220,50,50,0.06)', border: '1px solid rgba(220,50,50,0.15)', borderRadius: 8, color: '#c33', fontSize: 12 }}>
                {error}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <ThemePicker selected={theme} onSelect={setTheme} />
              <button
                onClick={handleDownloadAll}
                disabled={exporting}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 20px',
                  border: '1px solid #5e7050', color: '#5e7050',
                  borderRadius: 100, background: 'transparent', cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.06em',
                  opacity: exporting ? 0.5 : 1,
                }}
              >
                <Download size={13} />
                {exporting ? '导出中...' : `下载全部 (${post.slides.length}张)`}
              </button>
            </div>

            {/* Slide viewer: active card centered */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              {/* Navigation + card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Left arrow */}
                <button
                  onClick={() => navigate(-1)}
                  disabled={activeSlide === 0}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid #d4ccc2', background: '#f0ebe4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: activeSlide === 0 ? 'default' : 'pointer',
                    opacity: activeSlide === 0 ? 0.3 : 1,
                  }}
                >
                  <ChevronLeft size={16} color="#6d665c" />
                </button>

                {/* The card */}
                <div style={{ position: 'relative' }}>
                  <SlideRenderer
                    ref={el => { slideRefs.current[activeSlide] = el }}
                    slide={post.slides[activeSlide]}
                    theme={theme}
                    totalSlides={post.slides.length}
                    series={post.series}
                  />
                  {/* Download overlay */}
                  <button
                    onClick={() => handleDownloadOne(activeSlide)}
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0.6,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.6' }}
                  >
                    <Download size={13} color="#2e2b26" />
                  </button>
                </div>

                {/* Right arrow */}
                <button
                  onClick={() => navigate(1)}
                  disabled={activeSlide === post.slides.length - 1}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid #d4ccc2', background: '#f0ebe4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: activeSlide === post.slides.length - 1 ? 'default' : 'pointer',
                    opacity: activeSlide === post.slides.length - 1 ? 0.3 : 1,
                  }}
                >
                  <ChevronRight size={16} color="#6d665c" />
                </button>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {post.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    style={{
                      width: i === activeSlide ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === activeSlide ? '#5e7050' : '#d4ccc2',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hidden slides for export (off-screen, full render for each) */}
            <div style={{ position: 'absolute', left: -9999, top: 0 }}>
              {post.slides.map((slide, i) => (
                <SlideRenderer
                  key={i}
                  ref={el => { slideRefs.current[i] = el }}
                  slide={slide}
                  theme={theme}
                  totalSlides={post.slides.length}
                  series={post.series}
                />
              ))}
            </div>

            {/* Caption */}
            <CaptionPreview post={post} />
          </div>
        )}
      </main>
    </div>
  )
}
