/*
 * @Author: czy0729
 * @Date: 2024-06-13 16:21:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 21:36:25
 */

/** 分割 BGM 表情 */
export function parseEmojis(input: string) {
  const regex = /<img[^>]+alt="\(\s*bgm(\d+)\s*\)"[^>]*>/gi
  const result: (string | { type: 'smile'; id: number })[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input))) {
    const [full, id] = match
    const start = match.index

    // 前面的普通文本
    if (start > lastIndex) result.push(input.slice(lastIndex, start))

    // 表情对象
    result.push({ type: 'smile', id: Number(id) })

    // 更新位置
    lastIndex = start + full.length
  }

  // 最后剩余文本
  if (lastIndex < input.length) result.push(input.slice(lastIndex))

  return result
}

/** 清除显示不出来的 emoji */
export function removeHtmlEntities(str: string) {
  // 使用正则表达式匹配 HTML 实体字符
  return str.replace(/&#?[a-zA-Z0-9]+;/g, '').replace(/\[来自Bangumi for (iOS|android)\] 获取/g, '')
}
