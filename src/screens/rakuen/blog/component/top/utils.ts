/*
 * @Author: czy0729
 * @Date: 2026-01-25 06:35:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 日志正文纯文本字数估算
 */
import { decimal, HTMLDecode, removeHTMLTag } from '@utils'
import { ensureCacheLimit } from '@utils/cache'
import hash from '@utils/thirdParty/hash'

/** 正文缓存: 长度与哈希 -> 估算字数 */
const htmlLengthCache = new Map<string, string>()

/**
 * 估算日志正文的字数
 *
 * @param html 正文 html
 */
export function getHtmlTextLength(html: string) {
  const key = `${html.length}_${hash(html)}`

  const cached = htmlLengthCache.get(key)
  if (cached !== undefined) return cached

  const text = HTMLDecode(removeHTMLTag(html))
  const value = decimal(text.length)

  htmlLengthCache.set(key, value)
  ensureCacheLimit(htmlLengthCache, 32)

  return value
}
