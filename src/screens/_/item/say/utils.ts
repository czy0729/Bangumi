/*
 * @Author: czy0729
 * @Date: 2024-01-13 23:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-26 10:31:14
 */
export function getBgmHtml(html = '') {
  let _html = html
  const matchs = _html.match(/\(bgm\d+\)/g) || []
  if (matchs.length) {
    matchs.forEach(item => {
      const index = parseInt(item.match(/\d+/g)[0])

      // 防止 2 连同一个 bgm 表情, 替换不了后面的
      _html = _html.replace(item, `<img smileid alt="(bgm~~~${index})" />`)
    })
  }

  return _html.replace(/~~~/g, '')
}

export function extractAHrefs(html: string): string[] {
  if (!html) return []

  // 支持换行的 <a> 标签匹配
  const regex = /<a[\s\S]*?\shref\s*=\s*["']([^"']+)["'][\s\S]*?>/gi

  const hrefs: string[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[1])
  }

  return hrefs
}
