/*
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-13 06:36:05
 */
import cheerioRN from 'cheerio-without-node-native'
import { DEV } from '@src/config'
import { logger } from '../dev'
import HTMLParser from '../thirdParty/html-parser'
import { safeObject } from '../utils'

/** 去除 HTML */
export function removeHTMLTag(str: any, removeAllSpace: boolean = true): string {
  const _str = String(str)
    .replace(/<\/?[^>]*>/g, '') // 去除 HTML tag
    .replace(/[ | ]*\n/g, '\n') // 去除行尾空白
    .replace(/\n[\s| | ]*\r/g, '\n') // 去除多余空行

  if (!removeAllSpace) return _str

  return _str.replace(/ /gi, '') // 去掉
}

const DECODE_SPECIAL_CHARS = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&#39;': "'",
  '&quot;': '"'
} as const

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

/** HTML 反转义 */
export function HTMLDecode(str: string = ''): string {
  if (str.length === 0) return ''

  return str.replace(/(&amp;|&lt;|&gt;|&nbsp;|&#39;|&quot;)/g, match => DECODE_SPECIAL_CHARS[match])
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

/** 匹配指定范围 html, 若没有匹配到返回原 html */
export function htmlMatch(html: string, start: string, end: string, removeScript: boolean = true) {
  if (!html || !start || !end) return html || ''

  if (removeScript) html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')

  return html.match(new RegExp(start + '[\\s\\S]+' + end, 'g'))?.[0] || html || ''
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

/** 去除 cloudfare 乱插的 dom */
export function removeCF(HTML: string = ''): string {
  return HTML.replace(
    /<script[^>]*>([\s\S](?!<script))*?<\/script>|<noscript[^>]*>([\s\S](?!<script))*?<\/noscript>|style="display:none;visibility:hidden;"/g,
    ''
  ).replace(/data-cfsrc/g, 'src')
}

/** cheerio.load */
export function cheerio(
  target: any,
  remove: boolean | object = true,
  decodeEntities: boolean = false
) {
  if (typeof target === 'string') {
    // 需要优化内容
    if (target.indexOf('<!DOCTYPE html>') === 0) {
      if (DEV) {
        logger.info(
          '@utils/html/cheerio',
          'need match',
          target.match(/<title>(.*?)<\/title>/g)?.[0]
        )
      }
    }

    if (remove) {
      return cheerioRN.load(removeCF(target), {
        decodeEntities
      })
    }
    return cheerioRN.load(target, {
      decodeEntities
    })
  }

  return cheerioRN(target)
}

/** 裁剪 HTML 后 cheerio 解析（替代 $ 避免命名冲突） */
export function cParse(html: string, start: string, end: string, removeScript: boolean = true) {
  return cheerio(htmlMatch(html, start, end, removeScript))
}

/**
 * 获取清理后的文本内容
 * @param $el cheerio 对象
 * @param matchRawTextNode 是否只匹配一级文本节点
 * @param cleanWhitespace 是否去除换行并合并多个空格
 */
export function cText(
  $el: any,
  matchRawTextNode: boolean = false,
  cleanWhitespace: boolean = false
): string {
  if (DEV && !$el?.text) {
    logger.warn('@utils/html/cText', '$el 不是有效的 cheerio 对象')
  }

  try {
    let text = ''

    // 过滤出文本节点
    if (matchRawTextNode) {
      text = $el
        .contents()
        .filter(function () {
          return this.nodeType === 3
        })
        .text()
    } else {
      text = $el.text()
    }

    let result = HTMLDecode(text || '').trim()
    if (cleanWhitespace) {
      result = result
        .replace(/[\r\n]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    }
    return result
  } catch (error) {
    return ''
  }
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
export function cMap<T>($el: any, callback: ($ele: any, index?: number) => T): T[] {
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

/** cheerio.each */
export function cEach($el: any, callback: ($ele: any, index?: number) => void) {
  if (DEV && !$el?.each) {
    logger.warn('@utils/html/cEach', '$el 不是有效的 cheerio 对象')
  }

  try {
    $el.each((index: number, ele: any) => {
      callback(cheerio(ele), index)
    })
  } catch {}
}

/**
 * cheerio.find.eq
 *  - 切勿使用 cFind($, ...)
 * */
export function cFind($el: any, selector: string, index: number | 'last' = 0) {
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
export function cList($el: any, selector: string) {
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

/**
 * cheerio 查找最大页码、当前页码
 *  - 只适用于 bgm.tv
 * */
export function cPagination($: any) {
  if (DEV && !$?.find) {
    logger.warn('@utils/html/cPagination', '$ 不是有效的 cheerio 对象')
  }

  let pageTotal = 1
  let page = 1

  try {
    // 先看是否存在 .p_edge
    const edgeText = cText($('#multipage .p_edge'))
    if (edgeText) {
      // 形如 "( 1 / 20 )"
      const match = edgeText.match(/\/\s*(\d+)/)
      if (match) pageTotal = parseInt(match[1], 10)
    } else {
      // 否则取所有分页数字
      const pages: number[] = []
      cEach($('#multipage .p, #multipage .p_cur'), $row => {
        const num = parseInt(cText($row))
        if (!isNaN(num)) pages.push(num)
      })
      if (pages.length > 0) pageTotal = Math.max(...pages)
    }

    const current = parseInt(cText($('#multipage .p_cur')))
    if (!isNaN(current)) page = current
  } catch {}

  return {
    pageTotal,
    page
  }
}

/** 去除字符串中所有链接 */
export function removeURLs(str: string = '') {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return str.replace(urlRegex, '')
}
