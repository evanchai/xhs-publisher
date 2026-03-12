import { useState, useRef, useCallback } from 'react'
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import type { XHSPost } from './types'
import { generateXHSPost } from './services/ai'
import { downloadAllSlides, exportSlideAsImage, downloadImage } from './services/export'
import ArticleInput from './components/ArticleInput'
import SlideRenderer from './components/SlideRenderer'
import CaptionPreview from './components/CaptionPreview'

const DEFAULT_ARTICLE = `树莓派 + AI 摄像头，¥500 搞一个能认猫的 AI 监控

我用树莓派 4 和一个 AI 摄像头模块，花 10 分钟组装了一个智能监控摄像头。它不只是录像——能实时识别画面里的猫和狗，0.5 秒出结果，功耗才 5W。

这篇分享从零开始的完整过程：硬件怎么买、怎么装、怎么拍第一张照片、怎么让它自动认出动物。

## 硬件清单

三样东西，Micro Center 一趟买齐，总共 $128（约 ¥930）：
1. Raspberry Pi 4（树莓派 4）— 信用卡大小的小电脑，$35
2. Raspberry Pi AI Camera — 官方 AI 摄像头模块，内置索尼 IMX500 AI 芯片，$78
3. 外壳 + 风扇散热套装 — 保护主板 + 散热，$15

不需要显示器、键盘鼠标。全程用笔记本 SSH 远程操作。还需要一张 SD 卡和一根 USB-C 充电线，家里基本都有。

## 组装：10 分钟搞定

第一步：排线连接。AI 摄像头有一根扁平排线，插到树莓派的 Camera 接口。金属触点朝向卡扣方向，推进去按下固定，咔哒一声就好。

第二步：刷系统。用官方 Raspberry Pi Imager 把最新的 Raspberry Pi OS 写入 SD 卡。关键：在设置里提前配好 WiFi 密码和 SSH，这样开机就能远程连接，不需要接显示器。

第三步：通电。插上 USB-C 充电线，等一分钟开机完成。从电脑终端 ssh 连上去就能操作了。

没有焊接，没有螺丝，没有驱动安装。真的就是插线、刷卡、开机。

## 拍第一张照片

SSH 连上后，树莓派已经自带 picamera2 库。写 4 行 Python 代码就能拍照：初始化相机 → 启动 → 拍照保存 → 关闭。

出来的照片是 4056×3040 分辨率，1200 万像素，比大部分家用摄像头都清晰。还能调亮度、对比度、锐度、曝光时间，我后来写了自适应曝光算法，白天晚上都能自动调到最佳效果。

## AI 识别：IMX500 芯片的魔法

这个摄像头最特别的地方：它自带一颗索尼 IMX500 AI 芯片。

普通方案是摄像头拍照，然后把图片传给电脑跑 AI，吃 CPU 吃内存。IMX500 不一样——AI 推理直接在摄像头芯片上完成，树莓派 CPU 几乎零负载。

我加载了 EfficientDet Lite0 模型（专门做物体检测），加载后摄像头每一帧都自动输出：画面里有什么、在哪个位置、置信度多少。

实测：猫走进画面，0.5 秒内识别出来。能区分猫和狗，但分不清具体是哪只——这个下期用 Gemini AI 解决。

## 你拥有了什么

一个 $128、功耗 5W 的设备，能拍 1200 万像素高清照片，还能实时识别猫和狗。不联网也能工作，一根充电线供电。

下期：接入 Gemini AI，让它不光认出「有猫」，还能告诉你是哪只猫、正在干嘛。`

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
              onGenerate={() => handleGenerate()}
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
