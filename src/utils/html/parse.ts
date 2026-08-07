/*
 * @Author: czy0729
 * @Date: 2026-08-08 09:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 09:30:00
 */
import cheerioRN from 'cheerio-without-node-native'
import { DEV } from '@src/config'
import { logger } from '../dev'

import type { Cheerio, CheerioElement } from 'cheerio-without-node-native'

export const DECODE_SPECIAL_CHARS: Record<string, string> = {
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

/** 去除 cloudfare 乱插的 dom */
export function removeCF(HTML: string = ''): string {
  return HTML.replace(
    /<script[^>]*>([\s\S](?!<script))*?<\/script>|<noscript[^>]*>([\s\S](?!<script))*?<\/noscript>|style="display:none;visibility:hidden;"/g,
    ''
  ).replace(/data-cfsrc/g, 'src')
}

/** cheerio.load */
export function cheerio(
  target: string | CheerioElement,
  remove: boolean | object = true,
  decodeEntities: boolean = false
): Cheerio {
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

/**
 * 获取清理后的文本内容
 * @param $el cheerio 对象
 * @param matchRawTextNode 是否只匹配一级文本节点
 * @param cleanWhitespace 是否去除换行并合并多个空格
 */
export function cText(
  $el: Cheerio,
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

/** cheerio.each */
export function cEach($el: Cheerio, callback: ($ele: Cheerio, index?: number) => void) {
  if (DEV && !$el?.each) {
    logger.warn('@utils/html/cEach', '$el 不是有效的 cheerio 对象')
  }

  try {
    $el.each((index: number, ele) => {
      callback(cheerio(ele), index)
    })
  } catch {}
}

/**
 * cheerio 查找最大页码、当前页码
 *  - 只适用于 bgm.tv
 * */
export function cPagination($: Cheerio) {
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
