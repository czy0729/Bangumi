/*
 * @Author: czy0729
 * @Date: 2026-01-25 06:35:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 06:36:12
 */
import { decimal, HTMLDecode, removeHTMLTag } from '@utils'

const htmlLengthCache = new Map<number, string>()

export function getHtmlTextLength(html: string) {
  const key = html.length

  if (htmlLengthCache.has(key)) {
    return htmlLengthCache.get(key)!
  }

  const text = HTMLDecode(removeHTMLTag(html))
  const value = decimal(text.length)

  htmlLengthCache.set(key, value)
  return value
}
