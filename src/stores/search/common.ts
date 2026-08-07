/*
 * @Author: czy0729
 * @Date: 2020-10-23 10:49:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 09:30:00
 */
import { cData, cFind, cHas, cheerio, cMap, cPagination, cParse, cText, HTMLDecode } from '@utils'

import type { SearchItem } from './types'

/** 条目搜索结果 */
export function cheerioSearch(html: string) {
  const $ = cParse(html, '<div id="columnSearchB', '<div id="footer')
  const $items = $('#browserItemList .item')
  return {
    pagination: cPagination($),
    list: cMap($items, $row => {
      const $a = cFind($row, 'h3 a.l')
      const $rateInfo = cFind($row, '.rateInfo')
      return {
        id: cData($a, 'href'),
        cover: cData(cFind($row, 'img.cover'), 'src'),
        name: cText(cFind($row, 'h3 small.grey')),
        nameCn: cText($a),
        tip: cText(cFind($row, 'p.info')),
        score: cText(cFind($rateInfo, '.fade')),
        total: cText(cFind($rateInfo, '.tip_j')),
        rank: cText(cFind($row, '.rank'), true),
        type: cData(cFind($row, 'h3 span.ll'), 'class').match(/subject_type_(\d+)/)?.[1] || '',
        collected: cHas(cFind($row, '.collectModify')),
        comments: ''
      } as SearchItem
    })
  }
}

/** 人物搜索结果 */
export function cheerioSearchMono(html: string) {
  const $ = cParse(html, '<div id="columnSearchB', '<div id="footer')
  return {
    pagination: cPagination($),
    list: cMap($('.light_odd'), $row => {
      const $a = cFind($row, 'h2 a.l')
      const [name = '', ...nameCnParts] = cText($a).split('/')
      return {
        id: cData($a, 'href'),
        cover: cData(cFind($row, 'img.avatar'), 'src'),
        name: name.trim(),
        nameCn: nameCnParts.join('/').trim(),
        tip: cText(cFind($row, '.prsn_info')),
        score: '',
        total: '',
        rank: '',
        type: '',
        collected: false,
        comments: cText(cFind($row, 'small.na'))
      } as SearchItem
    })
  }
}

export function cheerioSearchRakuen(html: string) {
  const $ = cheerio(html)
  const list =
    $('#hits-list .item')
      .map((_index: number, element: any) => {
        const $item = cheerio(element)
        const splits = $item.find('a.path').text().trim().split('/')
        return {
          topicId: `group/${splits[splits.length - 1].replace('.html', '')}`,
          content: HTMLDecode($item.find('code').text().trim().replace(/\t/g, '　')).replace(
            / {2,100}/g,
            ' '
          )
        }
      })
      .get() || []

  const $lis = $('ul.pagination li')
  let pageTotal = 1
  if ($lis.length >= 2) {
    pageTotal = parseInt(
      cheerio($lis[$lis.length - 2])
        .text()
        .trim()
    )
  }

  return {
    list,
    pageTotal
  }
}
