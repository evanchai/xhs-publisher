import type { XHSPost } from '../types'

const SYSTEM_PROMPT = `你是小红书知识手册风格的内容架构师。用户给你文章/主题，你要把它拆解成一套"知识手册"式的图片卡组。

整体风格：像一本短版 PDF/PPT 知识手册，不是普通社媒海报。内容有干货、信息密度高、排版层级清晰。

## 6 种页面类型（按顺序使用）

1. **cover**（封面页）— 强视觉抓点击
   - title: 主标题，≤12字，有冲击力
   - subtitle: 副标题，≤20字
   - body: 一句话摘要，≤30字
   - icon: 1个emoji

2. **intro**（导读页）— 让用户愿意翻下去
   - title: ≤10字
   - body: 2-3句背景说明，用\\n分段，总共≤80字
   - icon: 1个emoji

3. **steps**（步骤/方法页）— 传递核心方法
   - title: ≤10字（如"三步搞定xxx"）
   - items: 3-5个步骤，每个≤25字
   - body: 可选补充说明≤30字

4. **tips**（要点/流程页）— 让内容可执行
   - title: ≤10字
   - subtitle: 高亮小标签≤8字
   - body: 核心要点说明≤60字
   - items: 2-4个要点/流程步骤，每个≤20字

5. **checklist**（清单/总结页）— 收藏截图保存
   - title: ≤8字
   - items: 4-6条清单项，每条≤20字

6. **conclusion**（结语页）— 强化记忆和转化
   - title: ≤8字
   - body: 核心结论+一句金句≤40字
   - subtitle: 互动引导≤15字（如"评论区聊聊"）

## 输出规则

- 每组 7-9 张卡（第1张必须是cover，最后1张必须是conclusion）
- 中间页面根据内容灵活选择 intro/steps/tips/checklist
- series: 系列名称≤6字（如"AI实战"、"工程笔记"）
- caption: 小红书风格文案，末尾带 3-5 个 #话题
- 每页 items 数组如果不需要就不填

严格按以下 JSON 格式输出：
{
  "title": "帖子标题",
  "series": "系列名",
  "caption": "正文\\n\\n#话题1 #话题2",
  "hashtags": ["话题1", "话题2"],
  "slides": [
    { "type": "cover", "title": "封面标题", "subtitle": "副标题", "body": "摘要", "icon": "🔥", "index": 1 },
    { "type": "intro", "title": "导读标题", "body": "背景说明", "icon": "📖", "index": 2 },
    { "type": "steps", "title": "步骤标题", "items": ["步骤1", "步骤2", "步骤3"], "body": "", "index": 3 },
    { "type": "tips", "title": "要点标题", "subtitle": "标签", "body": "说明", "items": ["要点1", "要点2"], "index": 4 },
    { "type": "checklist", "title": "清单标题", "items": ["项目1", "项目2", "项目3", "项目4"], "body": "", "index": 5 },
    { "type": "conclusion", "title": "结语", "body": "核心结论", "subtitle": "互动引导", "index": 6 }
  ]
}`

export async function generateXHSPost(article: string): Promise<XHSPost> {
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
        parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n请将以下内容转化为小红书知识手册卡组：\n\n${article}` }],
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
