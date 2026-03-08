import { themes } from '../services/themes'
import type { ThemeConfig } from '../types'

interface Props {
  selected: ThemeConfig
  onSelect: (t: ThemeConfig) => void
}

export default function ThemePicker({ selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">主题</span>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className={`w-8 h-8 rounded-lg border-2 transition-all ${
            selected.id === t.id ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
          }`}
          style={{ background: t.accentGradient }}
          title={t.name}
        />
      ))}
    </div>
  )
}
