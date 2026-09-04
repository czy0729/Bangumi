/*
 * @Author: czy0729
 * @Date: 2026-08-07 07:48:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-07 07:48:29
 */

/** 匹配指定范围 html, 若没有匹配到返回原 html */
export function htmlMatch(html: string, start: string, end: string, removeScript: boolean = true) {
  if (!html || !start || !end) return html || ''

  if (removeScript) html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')

  return html.match(new RegExp(start + '[\\s\\S]+' + end, 'g'))?.[0] || html || ''
}
