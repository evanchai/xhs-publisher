import type { XHSPost } from '../types'

const SYSTEM_PROMPT = `你是小红书图文卡片的内容架构师。用户给你文章/主题，你要拆解成6张卡片组。

## Step 0 — 判断风格模式

| 模式 | 使用场景 |
|------|---------|
| **vibe** | 个人项目、side project、生活向、vibe coding 分享、面向非技术读者 |
| **handbook** | 技术深度文章、方法论、面向有技术背景的读者、需要展示数据和架构 |

判断规则：有"我"的视角、口语化 → vibe；大量代码/架构/数据 → handbook。不确定用 vibe。

## Vibe Diary 模式 — 6张卡

### 01 vibe-cover（封面）
- tagLine: 系列标签，如 "vibe coding 日记 · 01"
- title: 口语化标题，2-3行用\\n分隔，有情绪/悬念，如 "小猫又尿沙发了，\\n我 vibe 了一个\\n家庭智能摄像头？"
- titleEm: title 中要变绿的关键词（如 "又"）
- coverSub: 副标题，1-2句，降低门槛
- bottomLabel: 底部左侧标签，如 "今日主角"
- bottomItems: ["名称1", "名称2"]

### 02 vibe-story（故事起因）
- tagLine: 如 "起因"
- displayTitleL1: Fraunces标题第1行，如 "问题"
- displayTitleL2: 第2行，如 "很"
- displayTitleEm: 斜体绿色词，如 "具体。"
- story: 故事正文，≤3句，具体痛点
- quote: 引用金句
- quoteEm: 金句中斜体绿色部分（可选）
- bridge: 过渡段，为什么不用现成方案

### 03 vibe-tools（用了什么）
- tagLine: 如 "用了啥"
- title: 标题前半，如 "三样东西，"
- titleEm: 绿色部分，如 "拼出来的。"
- steps: 3个，每个 { title: "工具名（大白话）", desc: "解释，≤2句，可用比喻" }

### 04 vibe-how（怎么运作）
- tagLine: 如 "怎么运作的"
- title: 比喻标题前半，如 "像个"
- titleEm: 比喻高亮，如 "永不睡觉的保安。"
- body: 一句铺垫
- checks: 4个字符串数组，每步≤20字，可用 **粗体**
- footnote: 底部补充

### 05 vibe-results（效果如何）
- tagLine: 如 "效果"
- title: 如 "第一天就"
- titleEm: 如 "抓到了。"
- story: 具体事件，≤3句
- stats: 3个 { value: "数值", label: "大白话说明" }
- quote: 最重要的感受
- quoteEm: 绿色斜体部分（可选）

### 06 vibe-outro（你也可以做）
- tagLine: 如 "你也可以做"
- displayTitleL1: 如 "不会写代码，"
- displayTitleEm: 如 "没关系。"
- body: 鼓励段落
- tools: 3个工具名称（大白话）
- preview: 预告下期内容
- cta: 引导关注，如 "关注 ning.codes 不迷路 ↗"

**Vibe 写作规则：**
- 用"我"，不用"系统/用户/方案"
- 技术用比喻替换：❌"Redis TTL心跳" → ✅"服务器挂了会自动显示离线"
- 数字要带感受：❌"延迟<100ms" → ✅"不到2秒，手机就震了"

## Knowledge Handbook 模式 — 6张卡

### 01 hb-cover（封面）
同 vibe-cover 字段，但标题更技术化

### 02 hb-intro（导读）
- tagLine: 如 "导读"
- sectionTitle: 绿色标题栏，如 "为什么用边缘 AI？"
- body: 正文≤50字，用 **粗体** 标记重点
- bullets: 3个 { bold: "关键词", text: "——说明≤20字" }
- subtitle: 分隔线下方小标题
- stats: 3个 { value: "数值", label: "标签" }
- highlightText: 高亮框文字≤40字

### 03 hb-detail（详解）
- tagLine: 如 "架构"
- sectionTitle: 绿色标题栏
- tiers: 2个 { title: "标题", body: "说明，可用 \`code\`" }
- subtitle: 设计哲学小标题
- bullets: 3个 { bold: "", text: "说明，用 **粗体**" }

### 04 hb-data（数据）
- tagLine: 如 "数据"
- sectionTitle: 绿色标题栏
- body: 引言，用 **粗体** 标记数据
- dataItems: 3个 { tag: "L1", description: "**粗体** 说明", size: "~60KB", barPercent: 0-100 }
- subtitle: 下半部分小标题
- bullets: 2个 { bold: "名称", text: " — 说明，可用 \`code\`" }
- highlightText: 绿色高亮框

### 05 hb-flow（流程）
- tagLine: 如 "流程"
- sectionTitle: 绿色标题栏
- flowNodes: 4个 { label: "类别", name: "名称\\n第二行", variant: "dark|accent|default" }
- body: 流程说明，可用 \`code\`
- subtitle: 小标题
- highlightText: 高亮框
- checkItems: 3个 { text: "说明，用 **粗体**", tag: "标签" }

### 06 hb-conclusion（收尾）
同 vibe-outro 字段（displayTitleL1, displayTitleEm, body, tools, preview, cta）

## 输出规则

- 固定 6 张卡，index 从 1 到 6
- mode: "vibe" 或 "handbook"
- series: 系列标签
- caption: 小红书文案 + 3-5个 #话题
- 所有文本中文（技术术语可英文）

严格 JSON 输出：
{
  "mode": "vibe",
  "title": "帖子标题",
  "series": "系列名",
  "caption": "正文\\n\\n#话题1 #话题2",
  "hashtags": ["话题1", "话题2"],
  "slides": [
    { "type": "vibe-cover", "index": 1, "tagLine": "...", "title": "...", ... },
    { "type": "vibe-story", "index": 2, ... },
    { "type": "vibe-tools", "index": 3, ... },
    { "type": "vibe-how", "index": 4, ... },
    { "type": "vibe-results", "index": 5, ... },
    { "type": "vibe-outro", "index": 6, ... }
  ]
}`

export async function generateXHSPost(
  article: string,
  modeOverride?: 'auto' | 'vibe' | 'handbook',
): Promise<XHSPost> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
  if (!apiKey) {
    throw new Error('请在 .env.local 中配置 VITE_GEMINI_API_KEY')
  }

  const modeHint = modeOverride && modeOverride !== 'auto'
    ? `\n\n**强制使用 ${modeOverride} 模式，不要自动判断。**`
    : ''

  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey })

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n请将以下内容转化为小红书图文卡组：${modeHint}\n\n${article}` }],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  })

  const text = response.text ?? ''
  const parsed = JSON.parse(text) as XHSPost
  return parsed
}

export async function refineXHSPost(
  currentPost: XHSPost,
  feedback: string,
): Promise<XHSPost> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
  if (!apiKey) {
    throw new Error('请在 .env.local 中配置 VITE_GEMINI_API_KEY')
  }

  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey })

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: `你是小红书图文卡片编辑器。用户已经生成了一组 6 张卡片，现在要根据修改意见调整内容。

## 卡片类型与字段规格

### Vibe 模式（6种 type）
- **vibe-cover**: tagLine, title, titleEm, coverSub, bottomLabel, bottomItems[]
- **vibe-story**: tagLine, displayTitleL1, displayTitleL2, displayTitleEm, story, quote, quoteEm, bridge
- **vibe-tools**: tagLine, title, titleEm, steps[{title,desc}] (3个)
- **vibe-how**: tagLine, title, titleEm, body, checks[] (4个字符串), footnote
- **vibe-results**: tagLine, title, titleEm, story, stats[{value,label}] (3个), quote, quoteEm
- **vibe-outro**: tagLine, displayTitleL1, displayTitleEm, body, tools[] (3个), preview, cta

### Handbook 模式（6种 type）
- **hb-cover**: 同 vibe-cover 字段
- **hb-intro**: tagLine, sectionTitle, body, bullets[{bold,text}] (3个), subtitle, stats[{value,label}] (3个), highlightText
- **hb-detail**: tagLine, sectionTitle, tiers[{title,body}] (2个), subtitle, bullets[{bold,text}] (3个)
- **hb-data**: tagLine, sectionTitle, body, dataItems[{tag,description,size,barPercent}] (3个), subtitle, bullets[{bold,text}] (2个), highlightText
- **hb-flow**: tagLine, sectionTitle, flowNodes[{label,name,variant}] (4个), body, subtitle, highlightText, checkItems[{text,tag}] (3个)
- **hb-conclusion**: tagLine, displayTitleL1, displayTitleEm, body, tools[] (3个), preview, cta

## 当前卡组 JSON

${JSON.stringify(currentPost, null, 2)}

## 用户的修改意见

${feedback}

## 修改规则

1. **最重要：严格按用户意见修改，不要自由发挥，不要改用户没提到的部分**
2. 用户说"某个内容分成两页/两张" → 把该内容拆到两张卡片中，重新分配 6 张卡的内容（总数固定 6 张）
3. 用户说"改标题/改文案" → 只改对应字段的文字
4. 用户说"加上XX信息" → 在对应卡片中补充该信息
5. mode 不变，固定 6 张卡，index 1-6
6. type 字段必须严格使用上面列出的合法值，字段必须符合对应 type 的规格

输出完整的修改后 JSON，格式与输入相同。` }],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  })

  const text = response.text ?? ''
  const parsed = JSON.parse(text) as XHSPost
  return parsed
}
