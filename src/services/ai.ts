import type { XHSPost } from '../types'

export async function generateXHSPost(
  article: string,
  modeOverride?: 'auto' | 'vibe' | 'handbook',
): Promise<XHSPost> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ article, mode: modeOverride }),
  })
  if (!res.ok) throw new Error('生成失败')
  return await res.json() as XHSPost
}

export async function refineXHSPost(
  currentPost: XHSPost,
  feedback: string,
): Promise<XHSPost> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPost, feedback }),
  })
  if (!res.ok) throw new Error('修改失败')
  return await res.json() as XHSPost
}
