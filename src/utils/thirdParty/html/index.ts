/*
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:54
 */
import { DEV } from '@src/config'
import { logger } from '../../dev'
import { safeObject } from '../../utils'
import { decodeEntitiesLoose } from './decode-loose'
import { htmlMatch } from './match'
import { cheerio, cText } from './parse'
import { HTMLTrim as htmlTrim } from './tag'

export { cEach, cPagination, cText, cheerio, HTMLDecode, removeCF } from './parse'
export { getFormhash } from './formhash'
export { removeHTMLTag } from './tag'
export * from './match'

import type { CheerioSelection } from './types'

const TAG = '@utils/thirdParty/html'

/**
 * HTML 反转义 (宽松口径, 实现在 ./decode-loose)
 *  - 匹配粒度 `&[^;]{2,};?`: 只有 `&` 后紧跟至少 2 个非 `;` 字符的候选才参与解码,
 *    故 `&amp x` 这类不带分号的残串保持原文
 *  - 命名实体取 HTML5 全表 (区分大小写); 数字实体十进制/十六进制均可, 分号可选
 *  - 超出 BMP 的码点按码点解码 (如 `&#x1F600;` 得到 emoji)
 *  - 非法数字实体 (0 / 越界 / 代理项 / 负数) 保留原文
 *  - 经 @utils / @utils/thirdParty/html 取用该函数的全部使用方共用此口径
 *  - 口径比 HTMLDecode (仅 6 个基础命名实体) 宽得多, 勿按严格 HTML5 解码理解
 */
export function decodeHTMLEntities(str: string = ''): string {
  return decodeEntitiesLoose(str)
}

const ENCODE_SPECIAL_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  ' ': '&nbsp;',
  "'": '&#39;',
  '"': '&quot;'
} as const

/** HTML 转义 */
export function HTMLEncode(str: string = ''): string {
  if (str.length === 0) return ''

  return str.replace(/[&<>"' ]/g, match => ENCODE_SPECIAL_CHARS[match])
}

/**
 * HTML 压缩
 *  - 实现在 ./tag, 这里只补空值边界: undefined / null 一律返回空字符串,
 *    保证 HTMLTrim(x).replace(...) 这类链式调用在脏数据下不会抛错
 */
export function HTMLTrim<T>(str: T, deep?: boolean): T | '' {
  if (str === undefined || str === null) return ''
  return htmlTrim(str, deep)
}

/** 裁剪 HTML 后 cheerio 解析（替代 $ 避免命名冲突） */
export function cParse(html: string, start: string, end: string, removeScript: boolean = true) {
  return cheerio(htmlMatch(html, start, end, removeScript))
}

/** @deprecated cParse 的旧名, 等价实现, 仅保留兼容历史调用 */
export const $ = cParse

/**
 * data-* 属性名转 cheerio .data() 的 camelCase 键
 *  - 不能直接用 split('data-')[1]: data-user-id 会被截断成 user, 属性名里再出现
 *    data- 时也会丢字段
 */
function toDataKey(key: string): string {
  return key.slice('data-'.length).replace(/-([a-zA-Z])/g, (_match, char: string) => {
    return char.toUpperCase()
  })
}

/** cheerio.attr(key) */
export function cData(
  $el: any,
  key:
    | 'id'
    | 'class'
    | 'style'
    | 'href'
    | 'src'
    | 'title'
    | 'value'
    | 'action'
    | 'order'
    | 'alt'
    | 'srcset'
    | 'onclick'
    | `data-${string}`
): string {
  if (DEV && !$el?.attr && !$el?.data) {
    logger.warn(TAG, 'cData', '$el 不是有效的 cheerio 对象')
  }

  try {
    if (key.startsWith('data-')) return $el.data(toDataKey(key)) || ''
    return $el.attr(key) || ''
  } catch (error) {
    return ''
  }
}

/** HTMLTrim(cheerio.html(key)) */
export function cHtml($el: any): string {
  if (DEV && !$el?.html) {
    logger.warn(TAG, 'cHtml', '$el 不是有效的 cheerio 对象')
  }

  try {
    return htmlTrim($el.html() || '').replace(/\u0000/g, '')
  } catch (error) {
    return ''
  }
}

/** cheerio.map */
export function cMap<T>($el: any, callback: ($ele: CheerioSelection, index?: number) => T): T[] {
  if (DEV && !$el?.map) {
    logger.warn(TAG, 'cMap', '$el 不是有效的 cheerio 对象')
  }

  try {
    return (
      $el
        .map((index: number, ele: any) => {
          const result = callback(cheerio(ele), index)

          // null 的 typeof 同样是 object: safeObject(null) 会抛错并被外层 catch 吞掉,
          // 单个回调返回 null 会让整次 map 的结果全部丢失; 数组则会 Object.fromEntries
          // 变成 { 0: ... } 下标对象, 两者都要排除
          return result !== null && typeof result === 'object' && !Array.isArray(result)
            ? (safeObject(result as Record<string, unknown>) as T)
            : result
        })
        .get() || []
    )
  } catch (error) {
    return []
  }
}

/**
 * cheerio.find.eq
 *  - 切勿使用 cFind($, ...)
 * */
export function cFind($el: any, selector: string, index: number | 'last' = 0): CheerioSelection {
  if (DEV && !$el?.find) {
    logger.warn(TAG, 'cFind', '$el 不是有效的 cheerio 对象')
  }

  try {
    return index === 'last' ? $el.find(selector).last() : $el.find(selector).eq(index)
  } catch (error) {
    return $el
  }
}

/** cheerio.find */
export function cList($el: any, selector: string): CheerioSelection {
  if (DEV && !$el?.find) {
    logger.warn(TAG, 'cList', '$el 不是有效的 cheerio 对象')
  }

  try {
    return $el.find(selector)
  } catch (error) {
    return $el
  }
}

/** cheerio.filter */
export function cFilter($el: any, match: string) {
  if (DEV && !$el?.filter) {
    logger.warn(TAG, 'cFilter', '$el 不是有效的 cheerio 对象')
  }

  try {
    return $el.filter((_index: number, ele: any) => {
      return cText(cheerio(ele)).includes(match)
    })
  } catch (error) {
    return []
  }
}

/** cheerio.length > 0 */
export function cHas($el: any) {
  if (DEV && $el?.length === undefined) {
    logger.warn(TAG, 'cHas', '$el 不是有效的 cheerio 对象')
  }

  try {
    return $el.length > 0
  } catch (error) {
    return false
  }
}

/** cheerio.hasClass */
export function cHasClass($el: any, className: string) {
  if (DEV && !$el?.hasClass) {
    logger.warn(TAG, 'cHasClass', '$el 不是有效的 cheerio 对象')
  }

  try {
    return $el.hasClass(className)
  } catch (error) {
    return false
  }
}

/**
 * 链接字符集按 RFC 3986 收窄, 而不是 [^\s]+
 *  - 中文没有空格分词, 用 [^\s]+ 会把紧贴链接的标点连同后面的正文一并删掉
 *    ("见 https://bgm.tv，好看" 会整段消失)
 */
const URL_REGEX = /https?:\/\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/g

/** 去除字符串中所有链接 */
export function removeURLs(str: string = ''): string {
  return str.replace(URL_REGEX, '')
}
