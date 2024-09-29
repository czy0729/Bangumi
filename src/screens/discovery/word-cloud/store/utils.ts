/*
 * @Author: czy0729
 * @Date: 2024-09-29 18:22:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 18:41:40
 */
import { HTMLDecode, removeHTMLTag } from '@utils'

export function getPlainText(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = HTMLDecode(removeHTMLTag(str, false))
  if (max) str = str.slice(0, max)

  return str
}

export function removeSlogan(str: string, max?: number) {
  if (!str || typeof str !== 'string') return str

  str = str.split('[来自Bangumi')?.[0] || ''
  if (max) str = str.slice(0, max)

  return str
}

export function removeSpec(str: string) {
  if (!str || typeof str !== 'string') return str

  return (
    str
      // 链接
      .replace(/https?:\/\/[^\s]+|www\.[^\s]+/g, '')

      // 特殊字符, 如 emoji
      .replace(/x[a-zA-Z0-9]{5}/g, '')

      // 特殊残留字符
      .replace(/&#;/g, '')
  )
}
