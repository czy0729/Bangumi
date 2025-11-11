/*
 * @Author: czy0729
 * @Date: 2020-10-23 10:49:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 11:53:33
 */
import {
  cData,
  cFind,
  cHas,
  cheerio,
  cMap,
  cPagination,
  cText,
  HTMLDecode,
  htmlMatch
} from '@utils'

import type { SearchItem } from './types'

export function cheerioSearch(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnSearchB', '<div id="footer'))
  return {
    pagination: cPagination($),
    list: cMap($('#browserItemList .item'), $row => {
      const $a = cFind($row, 'h3 a.l')
      return {
        id: cData($a, 'href'),
        cover: cData(cFind($row, 'img.cover'), 'src'),
        name: cText(cFind($row, 'h3 small.grey')),
        nameCn: cText($a),
        tip: cText(cFind($row, 'p.info')),
        score: cText(cFind($row, '.rateInfo .fade')),
        total: cText(cFind($row, '.rateInfo .tip_j')),
        rank: cText(cFind($row, '.rank'), true),
        type: cData(cFind($row, 'h3 span.ll'), 'class').match(/subject_type_(\d+)/)?.[1] || '',
        collected: cHas(cFind($row, '.collectModify')),
        comments: ''
      } as SearchItem
    })
  }
}

export function cheerioSearchMono(html: string) {
  const $ = cheerio(htmlMatch(html, '<div id="columnSearchB', '<div id="footer'))
  return {
    pagination: cPagination($),
    list: cMap($('.light_odd'), $row => {
      const $a = cFind($row, 'h2 a.l')
      const [name = '', nameCn = ''] = cText($a).split('/')
      return {
        id: cData($a, 'href'),
        cover: cData(cFind($row, 'img.avatar'), 'src'),
        name: name.trim(),
        nameCn: nameCn.trim(),
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
