import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

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
- title: 口语化标题，2-3行用\\n分隔，有情绪/悬念
- titleEm: title 中要变绿的关键词
- coverSub: 副标题，1-2句，降低门槛
- bottomLabel: 底部左侧标签
- bottomItems: ["名称1", "名称2"]

### 02 vibe-story（故事起因）
- tagLine, displayTitleL1, displayTitleL2, displayTitleEm
- story: 故事正文，≤3句
- quote: 引用金句
- quoteEm: 金句中斜体绿色部分（可选）
- bridge: 过渡段

### 03 vibe-tools（用了什么）
- tagLine, title, titleEm
- steps: 3个 { title, desc }

### 04 vibe-how（怎么运作）
- tagLine, title, titleEm, body
- checks: 4个字符串数组
- footnote

### 05 vibe-results（效果如何）
- tagLine, title, titleEm, story
- stats: 3个 { value, label }
- quote, quoteEm

### 06 vibe-outro（你也可以做）
- tagLine, displayTitleL1, displayTitleEm, body
- tools: 3个工具名称
- preview, cta

## Knowledge Handbook 模式 — 6张卡

### 01 hb-cover 同 vibe-cover
### 02 hb-intro - tagLine, sectionTitle, body, bullets[3]{bold,text}, subtitle, stats[3]{value,label}, highlightText
### 03 hb-detail - tagLine, sectionTitle, tiers[2]{title,body}, subtitle, bullets[3]{bold,text}
### 04 hb-data - tagLine, sectionTitle, body, dataItems[3]{tag,description,size,barPercent}, subtitle, bullets[2]{bold,text}, highlightText
### 05 hb-flow - tagLine, sectionTitle, flowNodes[4]{label,name,variant}, body, subtitle, highlightText, checkItems[3]{text,tag}
### 06 hb-conclusion 同 vibe-outro

**写作规则：**
- vibe: 用"我"，技术用比喻替换，数字要带感受
- 固定6张卡，index 1-6
- mode: "vibe" 或 "handbook"
- series: 系列标签
- caption: 小红书文案 + 3-5个 #话题

严格 JSON 输出：
{
  "mode": "vibe",
  "title": "帖子标题",
  "series": "系列名",
  "caption": "正文\\n\\n#话题1 #话题2",
  "hashtags": ["话题1", "话题2"],
  "slides": [
    { "type": "vibe-cover", "index": 1, ... },
    ...
  ]
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin || req.headers.referer || '';
  if (!origin.includes('xhs-publisher') && !origin.includes('localhost')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { article, mode, currentPost, feedback } = req.body || {};

  // Refine mode: currentPost + feedback
  if (currentPost && feedback) {
    const modeHint = `\n\n**强制使用 ${currentPost.mode} 模式，不要自动判断。**`;
    const refineArticle = `## 这是一次修改任务，不是从头生成

当前已生成的卡组 JSON 如下，请根据用户的修改意见调整：

\`\`\`json
${JSON.stringify(currentPost, null, 2)}
\`\`\`

## 用户的修改意见

${feedback}

## 修改规则
- 严格按用户意见修改，不要自由发挥，不要改用户没提到的部分
- 用户说"分成两页" → 把该内容拆到两张卡中，重新分配 6 张卡内容
- mode 不变，固定 6 张卡，index 1-6
- 输出完整修改后的 JSON`;

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n${refineArticle}${modeHint}` }] }],
        config: { responseMimeType: "application/json", temperature: 0.7 },
      });
      return res.status(200).json(JSON.parse(response.text ?? "{}"));
    } catch (err) {
      console.error("Gemini refine error:", err);
      return res.status(500).json({ error: "Refine failed" });
    }
  }

  // Generate mode: article + optional mode
  if (!article || typeof article !== "string") {
    return res.status(400).json({ error: "article is required" });
  }

  const modeHint = mode && mode !== "auto"
    ? `\n\n**强制使用 ${mode} 模式，不要自动判断。**`
    : "";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n请将以下内容转化为小红书图文卡组：${modeHint}\n\n${article}` }] }],
      config: { responseMimeType: "application/json", temperature: 0.7 },
    });
    return res.status(200).json(JSON.parse(response.text ?? "{}"));
  } catch (err) {
    console.error("Gemini generate error:", err);
    return res.status(500).json({ error: "Generation failed" });
  }
}
