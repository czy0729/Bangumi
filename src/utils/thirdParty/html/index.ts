/*
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 16:07:01
 */
import { DEV } from '@src/config'
import { logger } from '../../dev'
import { safeObject } from '../../utils'
import HTMLParser from '../html-parser'
import { htmlMatch } from './match'
import { cheerio, cText, HTMLDecode } from './parse'
import { HTMLTrim as htmlTrim } from './tag'

export { cEach, cPagination, cText, cheerio, HTMLDecode, removeCF } from './parse'
export { getFormhash } from './formhash'
export { removeHTMLTag } from './tag'
export * from './match'

import type { CheerioSelection } from './types'

const TAG = '@utils/thirdParty/html'

/** 解码十进制或十六进制数字 HTML 实体（如 emoji） */
export function decodeNumericHTMLEntity(match: string, value: string, radix: number): string {
  const codePoint = Number.parseInt(value, radix)

  if (!Number.isFinite(codePoint)) return match

  // 越界与代理项区间: fromCodePoint 对代理项不抛错, 会产出孤立代理项字符,
  // 该字符无法被 JSON 序列化, 会让后续持久化直接失败, 这里统一回退为原文
  if (codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
    return match
  }

  try {
    return String.fromCodePoint(codePoint)
  } catch {
    return match
  }
}

/** 含十进制或十六进制数字 HTML 实体（如 emoji）的 HTML 反转义 */
export function decodeHTMLEntities(str: string = ''): string {
  if (str.length === 0) return ''

  // 命名实体复用 parse 的实现, 保持与 HTMLDecode 完全一致 (含多次编码只解一次的行为)
  return HTMLDecode(str)
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return decodeNumericHTMLEntity(match, hex, 16)
    })
    .replace(/&#(\d+);/g, (match, dec) => {
      return decodeNumericHTMLEntity(match, dec, 10)
    })
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
 * @deprecated html 字符串转对象
 * @param {*} html
 * @param {*} cmd  是否生成 cmd 字符串(开发用)
 */
export function HTMLToTree(html: string, cmd = true) {
  const tree: any = {
    tag: 'root',
    attrs: {},
    text: [],
    children: []
  }
  if (cmd) tree.cmd = 'root'

  let ref = tree
  HTMLParser(html, {
    start: (tag, attrs, unary) => {
      const attrsMap = {}
      attrs.forEach(({ name, value, escaped }) => {
        // @issue 190507
        // 带有 cookie 的请求经过 cloudflare 返回的 html 部分 attr 的属性被加上了 data-cf 前缀 ??? 醉了
        const _name = name.replace('data-cf', '')
        return (attrsMap[_name] = escaped || value)
      })
      const item: any = {
        tag,
        attrs: attrsMap
      }
      if (cmd) {
        item.cmd = `${ref.cmd} > ${tag}`
      }
      if (!unary) {
        item.parent = ref
        item.text = []
        item.children = []
      }
      ref.children.push(item)

      if (!unary) {
        ref = item
      }
    },
    chars: text => {
      ref.text.push(text)
    },
    end: () => {
      const _ref = ref.parent
      delete ref.parent
      ref = _ref
    }
  })

  return tree
}

/**
 * @deprecated tree 查找
 * ul > li > a|title
 * ul > li > a|title=123
 * ul > li > a|title=123&class=article
 * ul > li > a|text&title=123&class=article
 * @param {*} children
 * @param {*} cmd
 * @return {Array}
 */
export function findTreeNode(children: any, cmd: string = '', defaultValue?) {
  if (!cmd) return children

  // children 可能不是数组 (脏数据或节点没有子节点), 直接 filter 会抛错
  if (!Array.isArray(children)) return defaultValue

  const split = ' > '
  const tags = cmd.split(split)
  const tag = tags.shift()
  const find = children.filter(item => {
    let temp = tag.split('|')
    const _tag = temp[0]
    const attr = temp[1] || ''

    if (attr) {
      const attrs = attr.split('&')
      let match = true
      attrs.forEach(attr => {
        if (attr.indexOf('~') !== -1) {
          // ~
          temp = attr.split('~')
          const _attr = temp[0]
          const _value = temp[1]
          if (_value) {
            match =
              match &&
              item.tag === _tag &&
              item.attrs[_attr] &&
              item.attrs[_attr].indexOf(_value) !== -1
          } else if (_attr) {
            match = match && item.tag === _tag && item.attrs[_attr] !== undefined
          }
        } else {
          // =
          temp = attr.split('=')
          const _attr = temp[0]
          const _value = temp[1]
          if (_value) {
            match = match && item.tag === _tag && item.attrs[_attr] == _value
          } else if (_attr) {
            if (_attr === 'text') {
              match = match && item.tag === _tag && item.text.length !== 0
            } else {
              match = match && item.tag === _tag && item.attrs[_attr] !== undefined
            }
          }
        }
      })
      return match
    }
    return item.tag === _tag
  })
  if (!find.length) return defaultValue
  if (!tags.length) return find

  const _find = []
  find.forEach(item => {
    _find.push(...(findTreeNode(item.children, tags.join(split)) || []))
  })
  if (!_find.length) return defaultValue
  return _find
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
