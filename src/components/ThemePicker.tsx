import { themes } from '../services/themes'
import type { ThemeConfig } from '../types'

interface Props {
  selected: ThemeConfig
  onSelect: (t: ThemeConfig) => void
}

export default function ThemePicker({ selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#6d665c] mr-1 tracking-wider">主题</span>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className={`w-7 h-7 rounded-full border transition-all ${
            selected.id === t.id ? 'border-[#2e2b26] scale-110' : 'border-[#d4ccc2] opacity-60 hover:opacity-100'
          }`}
          style={{ background: t.bg }}
          title={t.name}
        />
      ))}
    </div>
  )
}
