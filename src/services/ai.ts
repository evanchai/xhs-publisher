import type { XHSPost } from '../types'

const SYSTEM_PROMPT = `你是一个小红书内容创作专家。用户会给你一篇文章或主题，你需要将其转化为小红书风格的图文帖子。

要求：
1. 标题：吸引眼球，带 1-2 个 emoji，不超过 20 个字
2. 正文（caption）：小红书风格，短句、分段、适当 emoji，末尾带 3-5 个话题标签
3. 图片内容：拆分为 6-9 张图片（slides），每张聚焦一个要点
   - 第 1 张是封面（type: "cover"）：大标题 + 副标题摘要
   - 中间是内容页（type: "content"）：每张一个核心观点，标题简短有力，正文 2-4 句话
   - 最后一张是结尾页（type: "end"）：总结 + 互动引导（如"你觉得呢？评论区聊聊"）
4. 每张 slide 配一个相关 emoji 作为 icon
5. 内容要有干货，信息密度高，语言通俗易懂

请严格按以下 JSON 格式输出，不要有多余文字：
{
  "title": "帖子标题",
  "caption": "正文内容\\n\\n#话题1 #话题2",
  "hashtags": ["话题1", "话题2"],
  "slides": [
    { "type": "cover", "title": "封面标题", "body": "封面副标题/摘要", "icon": "🔥", "index": 1 },
    { "type": "content", "title": "要点标题", "body": "详细内容", "icon": "💡", "index": 2 },
    { "type": "end", "title": "结尾标题", "body": "总结+互动引导", "icon": "✨", "index": 8 }
  ]
}`

export async function generateXHSPost(article: string): Promise<XHSPost> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('请在 .env 中配置 VITE_GEMINI_API_KEY')
  }

  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({ apiKey })

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n请将以下内容转化为小红书帖子：\n\n${article}` }],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.8,
    },
  })

  const text = response.text ?? ''
  const parsed = JSON.parse(text) as XHSPost
  return parsed
}
