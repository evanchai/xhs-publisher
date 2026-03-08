import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { XHSPost } from '../types'

interface Props {
  post: XHSPost
}

export default function CaptionPreview({ post }: Props) {
  const [copied, setCopied] = useState(false)

  const fullText = `${post.title}\n\n${post.caption}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-400">文案预览</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制文案'}
        </button>
      </div>
      <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
        <div className="font-semibold text-white mb-2">{post.title}</div>
        {post.caption}
      </div>
    </div>
  )
}
