/*
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 09:30:00
 */
import { DEV } from '@src/config'
import { logger } from '../dev'
import type { Cheerio } from 'cheerio-without-node-native'
import HTMLParser from '../thirdParty/html-parser'
import { safeObject } from '../utils'
import { htmlMatch } from './match'
import { cheerio, cText, DECODE_SPECIAL_CHARS, removeCF } from './parse'

export { cEach, cPagination, cText, cheerio, HTMLDecode, removeCF } from './parse'
export * from './match'

/** 去除 HTML */
export function removeHTMLTag(str: any, removeAllSpace: boolean = true): string {
  const _str = String(str)
    .replace(/<\/?[^>]*>/g, '') // 去除 HTML tag
    .replace(/[ | ]*\n/g, '\n') // 去除行尾空白
    .replace(/\n[\s| | ]*\r/g, '\n') // 去除多余空行

  if (!removeAllSpace) return _str

  return _str.replace(/ /gi, '') // 去掉
}

/** 解码十进制或十六进制数字 HTML 实体（如 emoji） */
export function decodeNumericHTMLEntity(match: string, value: string, radix: number): string {
  const codePoint = Number.parseInt(value, radix)

  if (!Number.isFinite(codePoint)) return match

  try {
    return String.fromCodePoint(codePoint)
  } catch {
    return match
  }
}

/** 含十进制或十六进制数字 HTML 实体（如 emoji）的 HTML 反转义 */
export function decodeHTMLEntities(str: string = ''): string {
  if (str.length === 0) return ''

  return str
    .replace(/(&amp;|&lt;|&gt;|&nbsp;|&#39;|&quot;)/g, match => {
      return DECODE_SPECIAL_CHARS[match] || match
    })
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

/** HTML 压缩 */
export function HTMLTrim(str: any = '', deep?: boolean) {
  if (typeof str !== 'string') return str

  if (deep) {
    return removeCF(str)
      .replace(/<!--.*?-->/gi, '')
      .replace(/\/\*.*?\*\//gi, '')
      .replace(/[ ]+</gi, '<')
      .replace(/\n+|\s\s\s*|\t/g, '')
      .replace(/"class="/g, '" class="')
      .replace(/> </g, '><')
  }

  return removeCF(str)
    .replace(/\n+|\s\s\s*|\t/g, '')
    .replace(/"class="/g, '" class="')
    .replace(/> </g, '><')
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

/** 裁剪 HTML 后 cheerio 解析（替代 $ 避免命名冲突） */
export function cParse(html: string, start: string, end: string, removeScript: boolean = true) {
  return cheerio(htmlMatch(html, start, end, removeScript))
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
    logger.warn('@utils/html/cData', '$el 不是有效的 cheerio 对象')
  }

  try {
    if (key.startsWith('data-')) return $el.data(key.split('data-')[1]) || ''
    return $el.attr(key) || ''
  } catch (error) {
    return ''
  }
}

/** HTMLTrim(cheerio.html(key)) */
export function cHtml($el: any): string {
  if (DEV && !$el?.html) {
    logger.warn('@utils/html/cHtml', '$el 不是有效的 cheerio 对象')
  }

  try {
    return HTMLTrim($el.html() || '').replace(/\u0000/g, '')
  } catch (error) {
    return ''
  }
}

/** cheerio.map */
export function cMap<T>($el: any, callback: ($ele: Cheerio, index?: number) => T): T[] {
  if (DEV && !$el?.map) {
    logger.warn('@utils/html/cMap', '$el 不是有效的 cheerio 对象')
  }

  try {
    return (
      $el
        .map((index: number, ele: any) => {
          const result = callback(cheerio(ele), index)
          return typeof result === 'object' ? (safeObject(result) as T) : result
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
export function cFind($el: any, selector: string, index: number | 'last' = 0): Cheerio {
  if (DEV && !$el?.find) {
    logger.warn('@utils/html/cFind', '$el 不是有效的 cheerio 对象')
  }

  try {
    return index === 'last' ? $el.find(selector).last() : $el.find(selector).eq(index)
  } catch (error) {
    return $el
  }
}

/** cheerio.find */
export function cList($el: any, selector: string): Cheerio {
  if (DEV && !$el?.find) {
    logger.warn('@utils/html/cList', '$el 不是有效的 cheerio 对象')
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
    logger.warn('@utils/html/cFilter', '$el 不是有效的 cheerio 对象')
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
    logger.warn('@utils/html/cHas', '$el 不是有效的 cheerio 对象')
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
    logger.warn('@utils/html/cHasClass', '$el 不是有效的 cheerio 对象')
  }

  try {
    return $el.hasClass(className)
  } catch (error) {
    return false
  }
}

/** 去除字符串中所有链接 */
export function removeURLs(str: string = '') {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return str.replace(urlRegex, '')
}
