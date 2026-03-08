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
      <label className="block text-xs text-[#6d665c] tracking-wider uppercase">
        输入文章或主题
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="粘贴你的文章内容，或输入一个主题..."
        className="w-full h-48 bg-[#f6f2ec] border border-[#d4ccc2] rounded-lg px-4 py-3 text-[#2e2b26] placeholder-[#a69e94] resize-none focus:outline-none focus:border-[#5e7050] transition-all text-sm leading-relaxed"
      />
      <button
        onClick={onGenerate}
        disabled={loading || !value.trim()}
        className="flex items-center gap-2 px-6 py-2.5 border border-[#5e7050] text-[#5e7050] hover:bg-[rgba(94,112,80,0.07)] disabled:border-[#d4ccc2] disabled:text-[#a69e94] disabled:cursor-not-allowed rounded-full transition-all text-xs tracking-wide"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            AI 生成中...
          </>
        ) : (
          <>
            <Sparkles size={14} />
            生成小红书帖子
          </>
        )}
      </button>
    </div>
  )
}
