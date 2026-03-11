import { useState, useRef, useCallback } from 'react'
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import type { XHSPost } from './types'
import { generateXHSPost } from './services/ai'
import { downloadAllSlides, exportSlideAsImage, downloadImage } from './services/export'
import ArticleInput from './components/ArticleInput'
import SlideRenderer from './components/SlideRenderer'
import CaptionPreview from './components/CaptionPreview'

const DEFAULT_ARTICLE = `小白又尿沙发了，作为铲屎官我想搞清楚它到底啥时候尿的、多频繁

家里两猫一狗，小白老是偷偷上沙发尿。买过摄像头，但普通摄像头只能事后回放，等我看到的时候沙发已经湿了。我想实时知道谁上了沙发、在干嘛。

于是我 vibe coding 了一个智能宠物监控系统。

一个树莓派 + 一个 AI 摄像头，插上 USB 就能工作。摄像头自带 AI 芯片，不用联网就能认出猫和狗，每秒扫两次。发现有动物上沙发，自动拍照发给 AI 判断是哪只、在干嘛。

然后 Discord 直接弹消息通知我，附带截图和 AI 分析："小白正在沙发上趴着，看起来要睡觉"。从检测到通知不到 2 秒。

每天还自动生成一份日报，统计当天每只动物的活动——谁上了几次沙发、什么时间段最活跃。

整套系统功耗不到 5W，一根充电线供电，成本不到 500 块。代码全部 vibe coding 完成。

现在每天看日报已经成了习惯，终于知道它们一天都在干嘛了。下期分享怎么搭。`

export default function App() {
  const [article, setArticle] = useState(DEFAULT_ARTICLE)
  const [post, setPost] = useState<XHSPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [mode, setMode] = useState<'auto' | 'vibe' | 'handbook'>('auto')
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleGenerate = useCallback(async (text?: string) => {
    setLoading(true)
    setError('')
    try {
      const result = await generateXHSPost(text ?? article, mode)
      setPost(result)
      setActiveSlide(0)
      slideRefs.current = []
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }, [article, mode])

  // Generate when mode is selected (not on mount)
  const handleModeSelect = useCallback((m: 'auto' | 'vibe' | 'handbook') => {
    setMode(m)
    handleGenerate(undefined)
  }, [handleGenerate])

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Mode badge */}
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.44rem', letterSpacing: '0.16em',
                textTransform: 'uppercase' as const,
                color: '#5e7050', padding: '4px 10px',
                border: '1px solid rgba(94,112,80,0.3)', borderRadius: 100,
              }}>
                {post.mode === 'vibe' ? 'Vibe Diary' : 'Handbook'}
              </span>
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
            </div>
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
            {/* Mode selector */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 0,
              marginBottom: 20,
              border: '1px solid #d4ccc2', borderRadius: 100,
              overflow: 'hidden', width: 'fit-content',
              margin: '0 auto 20px',
            }}>
              {(['auto', 'vibe', 'handbook'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeSelect(m)}
                  style={{
                    padding: '7px 18px',
                    fontSize: '0.7rem', letterSpacing: '0.06em',
                    fontFamily: "'Space Mono', monospace",
                    textTransform: 'uppercase' as const,
                    border: 'none', cursor: 'pointer',
                    background: mode === m ? '#5e7050' : 'transparent',
                    color: mode === m ? '#f0ebe4' : '#6d665c',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {m === 'auto' ? '自动' : m === 'vibe' ? 'Vibe 日记' : '知识手册'}
                </button>
              ))}
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
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

            {/* Slide viewer */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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

                <div style={{ position: 'relative' }}>
                  <SlideRenderer
                    ref={el => { slideRefs.current[activeSlide] = el }}
                    slide={post.slides[activeSlide]}
                  />
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
                      width: i === activeSlide ? 20 : 6, height: 6,
                      borderRadius: 3,
                      background: i === activeSlide ? '#5e7050' : '#d4ccc2',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hidden slides for export */}
            <div style={{ position: 'absolute', left: -9999, top: 0 }}>
              {post.slides.map((slide, i) => (
                <SlideRenderer
                  key={i}
                  ref={el => { slideRefs.current[i] = el }}
                  slide={slide}
                />
              ))}
            </div>

            <CaptionPreview post={post} />
          </div>
        )}
      </main>
    </div>
  )
}
