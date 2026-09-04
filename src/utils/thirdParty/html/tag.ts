/*
 * @Author: czy0729
 * @Date: 2026-08-31 20:16:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-31 20:16:12
 */
import { removeCF } from './parse'

/** 去除 HTML */
export function removeHTMLTag(str: string, removeAllSpace: boolean = true): string {
  const _str = String(str)
    .replace(/<\/?[^>]*>/g, '') // 去除 HTML tag
    .replace(/[ | ]*\n/g, '\n') // 去除行尾空白
    .replace(/\n[\s| | ]*\r/g, '\n') // 去除多余空行

  if (!removeAllSpace) return _str

  return _str.replace(/ /gi, '') // 去掉空格
}

/** HTML 压缩 */
export function HTMLTrim<T>(str: T, deep?: boolean) {
  if (typeof str !== 'string') return str

  const s = str as string
  if (deep) {
    return removeCF(s)
      .replace(/<!--.*?-->/gi, '')
      .replace(/\/\*.*?\*\//gi, '')
      .replace(/[ ]+</gi, '<')
      .replace(/\n+|\s\s\s*|\t/g, '')
      .replace(/"class="/g, '" class="')
      .replace(/> </g, '><') as T
  }

  return removeCF(s)
    .replace(/\n+|\s\s\s*|\t/g, '')
    .replace(/"class="/g, '" class="')
    .replace(/> </g, '><') as T
}
