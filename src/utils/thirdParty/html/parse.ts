/*
 * @Author: czy0729
 * @Date: 2026-08-08 09:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 15:55:37
 */
import { DEV } from '@src/config'
import { logger } from '../../dev'
import { resolveEngine } from './engines'

import type { CheerioDoc, CheerioNode, CheerioSelection } from './types'

const TAG = '@utils/thirdParty/html'

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

/**
 * cheerio.load: 传 DOM 节点返回元素级集合, 传 HTML 返回文档级 $
 *  - 节点重载在前: 业务回调的 element 实参常为 any, TS 会命中第一个重载,
 *    而元素级路径 (有 .find/.text 等) 才是 any 场景下语义正确的默认值
 */
export function cheerio(
  target: CheerioNode,
  remove?: boolean | object,
  decodeEntities?: boolean
): CheerioSelection
export function cheerio(
  target: string,
  remove?: boolean | object,
  decodeEntities?: boolean
): CheerioDoc
export function cheerio(
  target: string | CheerioNode,
  remove: boolean | object = true,
  decodeEntities: boolean = false
): CheerioDoc | CheerioSelection {
  if (typeof target === 'string') {
    // 需要优化内容
    if (target.indexOf('<!DOCTYPE html>') === 0) {
      if (DEV) {
        logger.info(TAG, 'cheerio', 'need match', target.match(/<title>(.*?)<\/title>/g)?.[0])
      }
    }

    if (remove) {
      // decodeEntities 是 0.20 的顶层选项 (1.x 收进 htmlparser2 子项, 默认行为一致),
      // 双引擎同参传递保证行为一致
      return resolveEngine().load(removeCF(target), {
        decodeEntities
      } as any)
    }
    return resolveEngine().load(target, {
      decodeEntities
    } as any)
  }

  return resolveEngine()(target)
}

/**
 * 获取清理后的文本内容
 * @param $el cheerio 对象
 * @param matchRawTextNode 是否只匹配一级文本节点
 * @param cleanWhitespace 是否去除换行并合并多个空格
 */
export function cText(
  $el: CheerioSelection,
  matchRawTextNode: boolean = false,
  cleanWhitespace: boolean = false
): string {
  if (DEV && !$el?.text) {
    logger.warn(TAG, 'cText', '$el 不是有效的 cheerio 对象')
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
export function cEach(
  $el: CheerioSelection,
  callback: ($ele: CheerioSelection, index?: number) => void
) {
  if (DEV && !$el?.each) {
    logger.warn(TAG, 'cEach', '$el 不是有效的 cheerio 对象')
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
export function cPagination($: CheerioDoc) {
  if (DEV && !$) {
    logger.warn(TAG, 'cPagination', '$ 不是有效的 cheerio 对象')
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
