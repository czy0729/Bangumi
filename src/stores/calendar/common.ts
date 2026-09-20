/*
 * @Author: czy0729
 * @Date: 2019-08-11 20:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:35
 */
import { cheerio, cMap, cText } from '@utils'
import { HOST_BGM_STATIC } from '@constants'

import type { CheerioDoc, CheerioSelection } from '@utils/thirdParty/html/types'
import type { HomeItem } from './types'
import type { SubjectType } from '@types'

/** 轮播分类顺序, 与页面 HTML 里 <li> 的顺序一致 */
export const FEATURED_TYPES: readonly SubjectType[] = ['anime', 'game', 'book', 'music', 'real']

/** 封面图路径 */
const COVER_RE = /\/cover\/.+?\/(.+?).jpg/

/**
 * 属性读取
 *  - 原生属性优先 (空串视为缺失), cloudflare 注入的 data-cf 前缀属性兜底
 *  - 与旧 HTMLToTree (同名属性按出现顺序互相覆盖) 的差异仅在两者并存且都非空时, 此处取原生值
 */
function cfAttr($el: CheerioSelection, name: string): string | undefined {
  const value = $el.attr(name)
  if (value) return value

  return $el.attr(`data-cf${name}`)
}

/** 属性值是否含指定子串 (与旧实现同为大小写敏感的 indexOf) */
function hasAttrValue($el: CheerioSelection, name: string, value: string) {
  const attr = cfAttr($el, name)

  return !!attr && attr.indexOf(value) !== -1
}

/** 首个一级文本节点内容 */
function firstText($el: CheerioSelection) {
  const $text = $el
    .contents()
    .filter(function () {
      return this.nodeType === 3
    })
    .first()

  return $text.length ? $text.text() : ''
}

/** 标签栏链接 href 归一为分类 (/anime → anime), 取不到返回 undefined */
function tabType($: CheerioDoc, $tab: CheerioSelection): SubjectType | undefined {
  let type: SubjectType | undefined
  $tab.find('a').each((_idx, el) => {
    if (type) return

    const href = cfAttr($(el), 'href')
    if (!href) return

    type = FEATURED_TYPES.find(item => href.replace(/\/+$/, '').endsWith(`/${item}`))
  })

  return type
}

/** 发现页轮播 (分类取自标签栏 href, 取不到时按位置回退; 每个分组跳过第一个标签栏节点) */
export function cheerioFeaturedItems(fragment: string): Record<SubjectType, HomeItem[]> {
  // 键由 FEATURED_TYPES 逐个填满
  const result = {} as Record<SubjectType, HomeItem[]>
  FEATURED_TYPES.forEach(type => {
    result[type] = []
  })

  const $ = cheerio(fragment)
  $.root()
    .children()
    .each((index, item) => {
      const $group = $(item)
      const type = tabType($, $group.children().first()) || FEATURED_TYPES[index]
      if (!type) return

      $group.children().each((idx, child) => {
        // 第一个是标签栏, 排除掉
        if (idx === 0) return

        const $item = $(child)
        const $link = $item
          .children('a')
          .filter(
            (_idx, el) =>
              cfAttr($(el), 'href') !== undefined && cfAttr($(el), 'title') !== undefined
          )
          .first()

        let $cover = $item
          .children('a')
          .children('div')
          .filter((_idx, el) => hasAttrValue($(el), 'style', 'background'))
          .first()
        if (!$cover.length) {
          $cover = $item
            .children('a')
            .filter((_idx, el) => hasAttrValue($(el), 'style', 'background'))
            .first()
        }

        let cover = (cfAttr($cover, 'style') || '').match(COVER_RE)?.[1] || ''
        if (cover) cover = `${HOST_BGM_STATIC}/pic/cover/l/${cover}.jpg`

        let $small = $item.children('p').children('small').first()
        if (!$small.length) $small = $item.children('div').children('small').first()

        result[type].push({
          cover,
          title: $link.length ? cfAttr($link, 'title') || '' : '',
          subjectId: $link.length ? (cfAttr($link, 'href') || '').replace('/subject/', '') : '',
          info: $small.length ? firstText($small) : ''
        })
      })
    })

  return result
}

/** 今日收看记录 */
export function cheerioToday(html: string) {
  return String(cheerio(html)('li').text())
    .replace('部。', '部，')
    .replace(/今日番组|。/g, '')
}

export function cheerioRaw(html: string) {
  const $ = cheerio(html)
  return cMap($('table'), $row => ({
    title: cText($row.find('.title_main_r p').eq(0)),
    weekDayCN: cText($row.find('.broadcast_r')),
    timeCN: '',
    type: cText($row.find('.title_main_r + td')),
    tag: cText($row.find('.type_tag_r')),
    origin: cText($row.find('tr').eq(2).find('td').eq(0)).split('动画制作：')?.[1] || ''
  }))
}
