/*
 * @Author: czy0729
 * @Date: 2024-06-13 16:21:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-31 05:36:01
 */

/** 分割并转换 BGM 表情 ID */
export function parseEmojis(input: string) {
  // 正则：捕获前缀 (blake/musume) 和 数字 (20)
  const regex = /<img[^>]+alt="\(\s*([a-z]+)_?(\d+)\s*\)"[^>]*>/gi
  const result: (string | { type: 'smile'; id: number })[] = []

  // 基础分值映射表
  const prefixBase: Record<string, number> = {
    blake: 700,
    musume: 600,
    bgm: 0
  }

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input))) {
    const [, prefix, idStr] = match
    const start = match.index

    // 1. 推入前面的文本
    if (start > lastIndex) {
      result.push(input.slice(lastIndex, start))
    }

    // 2. 计算转换后的 ID
    const base = prefixBase[prefix.toLowerCase()] ?? 0 // 如果找不到前缀，默认加 0
    const finalId = base + Number(idStr)

    result.push({
      type: 'smile',
      id: finalId
    })

    lastIndex = regex.lastIndex
  }

  // 3. 剩余文本
  if (lastIndex < input.length) {
    result.push(input.slice(lastIndex))
  }

  return result
}

/** 清除显示不出来的 emoji */
export function removeHtmlEntities(str: string) {
  // 使用正则表达式匹配 HTML 实体字符
  return str.replace(/&#?[a-zA-Z0-9]+;/g, '').replace(/\[来自Bangumi for (iOS|android)\] 获取/g, '')
}
