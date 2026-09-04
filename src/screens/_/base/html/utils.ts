/*
 * @Author: czy0729
 * @Date: 2026-09-04 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 06:00:00
 *
 * HTML 截断工具
 */

/**
 * 安全截断 HTML: 切点落在标签内部时回退到最近的 '<' 之前, 避免展开前解析到残缺标签
 *
 * @param html 原始 HTML
 * @param length 目标长度
 */
export function safeSliceHtml(html: string = '', length: number = 0) {
  const sliced = html.slice(0, length)

  const lastOpen = sliced.lastIndexOf('<')
  const lastClose = sliced.lastIndexOf('>')
  if (lastOpen > lastClose) return sliced.slice(0, lastOpen)

  return sliced
}
