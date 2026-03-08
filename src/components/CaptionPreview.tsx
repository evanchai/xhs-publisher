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
    <div className="bg-[#f6f2ec] border border-[#d4ccc2] rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-[#6d665c] tracking-wider uppercase">文案预览</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[#6d665c] hover:text-[#5e7050] transition-colors px-3 py-1.5 rounded-full border border-[#d4ccc2] hover:border-[#5e7050]"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? '已复制' : '复制文案'}
        </button>
      </div>
      <div className="text-sm text-[#2e2b26] whitespace-pre-wrap leading-relaxed">
        <div className="font-medium mb-2" style={{ fontFamily: "'Fraunces', serif" }}>{post.title}</div>
        {post.caption}
      </div>
    </div>
  )
}
