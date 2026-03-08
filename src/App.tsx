import { useState, useRef, useCallback } from 'react'
import { Download, RotateCcw } from 'lucide-react'
import type { XHSPost, ThemeConfig } from './types'
import { themes } from './services/themes'
import { generateXHSPost } from './services/ai'
import { downloadAllSlides, exportSlideAsImage, downloadImage } from './services/export'
import ArticleInput from './components/ArticleInput'
import ThemePicker from './components/ThemePicker'
import SlideRenderer from './components/SlideRenderer'
import CaptionPreview from './components/CaptionPreview'

export default function App() {
  const [article, setArticle] = useState('')
  const [post, setPost] = useState<XHSPost | null>(null)
  const [theme, setTheme] = useState<ThemeConfig>(themes[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleGenerate = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateXHSPost(article)
      setPost(result)
      slideRefs.current = []
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }, [article])

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
    setArticle('')
    setError('')
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              书
            </div>
            <h1 className="text-lg font-semibold text-white">小红书发布助手</h1>
          </div>
          {post && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw size={14} />
              重新生成
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {!post ? (
          /* Input phase */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                一键生成小红书图文帖子
              </h2>
              <p className="text-gray-500 text-sm">
                输入文章或主题，AI 自动生成精美图片 + 文案
              </p>
            </div>
            <ArticleInput
              value={article}
              onChange={setArticle}
              onGenerate={handleGenerate}
              loading={loading}
            />
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        ) : (
          /* Preview phase */
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <ThemePicker selected={theme} onSelect={setTheme} />
              <button
                onClick={handleDownloadAll}
                disabled={exporting}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-xl transition-all text-sm"
              >
                <Download size={16} />
                {exporting ? '导出中...' : `下载全部图片 (${post.slides.length}张)`}
              </button>
            </div>

            {/* Slides grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {post.slides.map((slide, i) => (
                <div key={i} className="group relative">
                  <SlideRenderer
                    ref={el => { slideRefs.current[i] = el }}
                    slide={slide}
                    theme={theme}
                    totalSlides={post.slides.length}
                  />
                  {/* Download overlay on hover */}
                  <button
                    onClick={() => handleDownloadOne(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Download size={20} className="text-white" />
                    </div>
                  </button>
                </div>
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
