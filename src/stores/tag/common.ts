/*
 * @Author: czy0729
 * @Date: 2019-07-28 15:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-18 03:40:15
 */
import { cData, cFind, cHas, cheerio, cMap, cText, HTMLDecode, htmlMatch } from '@utils'

import type { Cover } from '@types'
import type { TagItem } from './types'

/** 标签 */
export function cheerioTags(html: string): {
  list: TagItem[]
  meta: boolean
  pageTotal: number
} {
  return {
    list: cMap(
      cheerio(
        htmlMatch(
          html,
          '<div class="columns clearit">',
          '<div id="columnSubjectBrowserB" class="column">'
        )
      )('li.item'),
      $row => {
        const $a = $row.find('h3 a.l')
        return {
          id: cData($a, 'href'),
          name: cText($row.find('small.grey')),
          nameCn: cText($a),
          cover: cData($row.find('img.cover'), 'src') as Cover<'c'>,
          rank: cText($row.find('.rank')).split(' ')?.[1] || '',
          score: cText($row.find('.rateInfo small')),
          total: cText($row.find('.tip_j')),
          tip: cText($row.find('.info')),
          collected: !!cData($row.find('.collectModify'), 'class')
        }
      }
    ),
    meta: htmlMatch(
      html,
      '<div id="columnSubjectBrowserB" class="column">',
      '<div id="footer">'
    ).includes('公共标签'),

    // ( 1 / 75 )
    pageTotal: Number(
      (
        cText(
          cheerio(htmlMatch(html, '<div class="page_inner">', '<hr class="board"'))('.p_edge')
        ).split('/')?.[1] || ''
      ).replace(/ |\)/g, '') || 0
    )
  }
}

/** 排行榜、索引 */
export function cheerioRank(html: string) {
  const $ = cheerio(htmlMatch(html, '<ul id="browserItemList', '<div id="columnSubjectBrowserB'))
  return cMap($('#browserItemList li.item'), $row => {
    const $a = cFind($row, 'h3 a.l')
    const cover = cData(cFind($row, 'img.cover'), 'src')
    return {
      collected: cHas(cFind($row, '.collectModify .thickbox')),
      cover: cover === '/img/info_only.png' ? '' : cover,
      id: cData($a, 'href'),
      name: HTMLDecode(cText(cFind($row, 'small.grey'))),
      nameCn: HTMLDecode(cText($a)),
      rank: cText(cFind($row, '.rank'), true),
      score: cText(cFind($row, '.rateInfo .fade')),
      tip: HTMLDecode(cText(cFind($row, '.info.tip')).replace(/\s+/g, ' ')),
      total: cText(cFind($row, '.rateInfo .tip_j'))
    } as TagItem
  })
}
