import { Sparkles, Loader2 } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
  onGenerate: () => void
  loading: boolean
}

export default function ArticleInput({ value, onChange, onGenerate, loading }: Props) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-400">
        输入文章或主题
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="粘贴你的文章内容，或输入一个主题（如：2025年最值得学习的编程语言）..."
        className="w-full h-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm leading-relaxed"
      />
      <button
        onClick={onGenerate}
        disabled={loading || !value.trim()}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all text-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            AI 生成中...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            生成小红书帖子
          </>
        )}
      </button>
    </div>
  )
}
