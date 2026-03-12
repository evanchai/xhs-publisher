import { useState, useRef, useCallback } from 'react'
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import type { XHSPost } from './types'
import { generateXHSPost } from './services/ai'
import { downloadAllSlides, exportSlideAsImage, downloadImage } from './services/export'
import ArticleInput from './components/ArticleInput'
import SlideRenderer from './components/SlideRenderer'
import CaptionPreview from './components/CaptionPreview'

const DEFAULT_ARTICLE = `树莓派 + AI 摄像头，我花了 10 分钟组装了一个能认猫的智能相机

这是我 AI 猫咪监控系列的第一篇。先不聊复杂的，今天只讲最基础的：怎么把硬件组起来，拍第一张照片，然后让它自己认出画面里的猫。

## 为什么要搞这个

家里两只猫一只狗。小白（白色长毛布偶）特别喜欢偷偷上沙发，买过普通摄像头但只能事后回放，完全来不及。我想要一个能「主动识别」动物的摄像头——不是录完再看，而是看到猫就告诉我。

## 硬件清单

就两样东西：
1. Raspberry Pi 4（树莓派 4）— 一台信用卡大小的小电脑，大概 ¥200-300
2. Raspberry Pi AI Camera — 官方出的 AI 摄像头模块，内置索尼 IMX500 芯片，大概 ¥200

总成本不到 ¥500。不需要额外买显示器、键盘，因为我们全程用 SSH 远程操作。

## 组装过程（真的只要 10 分钟）

第一步：把 AI 摄像头的排线插到树莓派的 Camera 接口上。排线有方向，金属触点朝向接口的卡扣方向，轻轻推进去，按下卡扣固定。

第二步：SD 卡刷入 Raspberry Pi OS。用官方的 Raspberry Pi Imager 工具，选最新的系统，写入 SD 卡。在设置里提前配好 WiFi 和 SSH，这样开机就能远程连。

第三步：插上电源线（普通 USB-C 充电线就行），等一分钟，然后从电脑 SSH 上去：ssh ningchai@pi4.local

就这样，硬件搞定了。没有焊接，没有螺丝，没有驱动安装。

## 拍第一张照片

SSH 连上之后，装一个 Python 库就能拍照：

用 picamera2 库，4 行代码就能拍一张 4056×3040 分辨率的照片。这是 1200 万像素，比很多家用摄像头清晰多了。拍出来的照片效果很惊艳，颜色准确，细节丰富。

还可以调参数：亮度、对比度、锐度、曝光时间都能控制。我后来写了自动曝光算法，让它根据环境光自动调节，白天晚上都能拍清楚。

## 让它认猫：IMX500 的魔法

这个摄像头最厉害的地方在于它内置了一颗 AI 芯片——索尼 IMX500。

普通摄像头只能拍照，AI 要在电脑端跑，吃 CPU 吃内存。但 IMX500 不一样，它在摄像头芯片上就能跑 AI 模型，完全不占树莓派的算力。

我用的模型是 EfficientDet Lite0，专门做物体检测。加载模型后，摄像头每一帧都会输出检测结果：画面里有什么东西、在哪个位置、置信度多少。

实测效果：猫走进画面，0.5 秒内就能识别出来，置信度 0.4 以上就很稳了。它能分辨猫和狗（COCO 数据集里猫是 class 15，狗是 class 16），但分不清是哪只猫——这个后面要靠 Gemini AI 来搞定。

整个识别过程功耗极低，因为推理全在摄像头芯片上完成，树莓派的 CPU 几乎没负载。

## 这一步完成后你拥有了什么

一个 ¥500 不到的设备，能自动拍高清照片，还能实时识别画面里的猫和狗。不联网也能工作，功耗 5W，一根充电线供电。

下期预告：光知道「有猫」还不够，我要知道是哪只猫、在干嘛。下一篇讲怎么接入 Gemini AI，让它像真人一样描述画面。`

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
