/*
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-12 15:30:46
 */
import cheerioRN from 'cheerio-without-node-native'
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'
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
        console.info(
          TEXT_BADGES.plain,
          '[@utils/html/cheerio]',
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

/** cheerio() */
export function $(html: string, start: string, end: string, removeScript: boolean = true) {
  return cheerio(htmlMatch(html, start, end, removeScript))
}

/** HTMLDecode(cheerio.text().trim()) */
export function cText($el: any, matchRawTextNode: boolean = false): string {
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
        .trim()
    } else {
      text = $el.text().trim()
    }

    return HTMLDecode(text || '')
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
): string {
  try {
    if (key.startsWith('data-')) return $el.data(key.split('data-')[1]) || ''
    return $el.attr(key) || ''
  } catch (error) {
    return ''
  }
}

/** HTMLTrim(cheerio.html(key)) */
export function cHtml($el: any): string {
  try {
    return HTMLTrim($el.html() || '')
  } catch (error) {
    return ''
  }
}

/** cheerio.map */
export function cMap<T>($el: any, callback: ($ele: any, index?: number) => T): T[] {
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
  try {
    $el.each((index: number, ele: any) => {
      callback(cheerio(ele), index)
    })
  } catch (error) {}
}

/** cheerio.filter */
export function cFilter($el: any, match: string) {
  try {
    return $el.filter((_index: number, ele: any) => {
      return cText(cheerio(ele)).includes(match)
    })
  } catch (error) {
    return []
  }
}

/** 去除字符串中所有链接 */
export function removeURLs(str: string = '') {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return str.replace(urlRegex, '')
}
